import type { ChatCitation, DecisionItem } from "@/types";
import { sampleDecisions } from "@/lib/sample-data";
import { sampleTimeline } from "@/lib/sample-timeline";

// TEMPORARY: demo answers built from sample data. Replace with the real /chat API later.
export const suggestedQuestions: string[] = [
  "Why did we reject the mobile application?",
  "Are the reasons for rejecting the mobile app still valid?",
  "Who was involved in the PostgreSQL decision?",
  "Have we discussed a freemium plan before?",
];

export interface DemoReply {
  content: string;
  citations: ChatCitation[];
  uncertain: boolean;
}

const rules: { id: string; pattern: RegExp }[] = [
  { id: "d-001", pattern: /mobile|\bapp\b|application/ },
  { id: "d-002", pattern: /postgres|database|mongo/ },
  { id: "d-003", pattern: /monday|planning meeting|weekly/ },
  { id: "d-004", pattern: /freemium|pricing|free plan|free tier/ },
];

function list(items: string[]): string {
  return items.map((item, i) => i + 1 + ". " + item).join("\n");
}

function evidenceCitations(d: DecisionItem): ChatCitation[] {
  return d.evidence.map((ev) => ({
    id: "c-" + ev.id,
    documentName: ev.documentName,
    section: ev.section,
    page: ev.page,
    passage: ev.passage,
    decisionId: d.id,
    decisionTitle: d.title,
  }));
}

function eventCitation(eventId: string): ChatCitation | null {
  const event = sampleTimeline.find((t) => t.id === eventId);
  if (!event || !event.decisionId) return null;
  const decision = sampleDecisions.find((d) => d.id === event.decisionId);
  if (!decision) return null;
  return {
    id: "c-" + event.id,
    documentName: event.sourceDocument ?? "Timeline event",
    passage: event.description,
    decisionId: decision.id,
    decisionTitle: decision.title,
  };
}

export function getDemoReply(question: string): DemoReply {
  const q = question.toLowerCase();
  const rule = rules.find((r) => r.pattern.test(q));
  const decision = rule ? sampleDecisions.find((d) => d.id === rule.id) : undefined;

  if (!decision) {
    return {
      content:
        "I could not find anything in your documents that answers this question. " +
        "Try asking about a specific decision, project or person, or upload more documents.",
      citations: [],
      uncertain: true,
    };
  }

  if (decision.id === "d-001" && /still|valid|changed|outdated|reconsider|assumption/.test(q)) {
    const citations: ChatCitation[] = [];
    const costEvidence = decision.evidence.find((ev) => ev.id === "e-002");
    if (costEvidence) {
      citations.push({
        id: "c-" + costEvidence.id,
        documentName: costEvidence.documentName,
        section: costEvidence.section,
        page: costEvidence.page,
        passage: costEvidence.passage,
        decisionId: decision.id,
        decisionTitle: decision.title,
      });
    }
    ["t-006", "t-008"].forEach((id) => {
      const c = eventCitation(id);
      if (c) citations.push(c);
    });

    return {
      content:
        "Two of the three original reasons may be outdated, based on newer documents:\n\n" +
        "1. Engineering capacity: the team expanded in June 2026.\n" +
        "2. Customer demand: an August survey shows interest rose from under 15 percent to 42 percent.\n\n" +
        "I found nothing newer about the third reason, development cost, so I cannot say whether it still holds. " +
        "This is advisory only. A person should review the decision before anything changes.",
      citations,
      uncertain: true,
    };
  }

  if (/who|involved|participat/.test(q)) {
    return {
      content: "People involved in this decision:\n" + list(decision.people),
      citations: evidenceCitations(decision),
      uncertain: false,
    };
  }

  if (/alternative|instead|considered/.test(q)) {
    return {
      content: "Alternatives that were considered:\n" + list(decision.alternatives),
      citations: evidenceCitations(decision),
      uncertain: false,
    };
  }

  let content =
    decision.title + " is recorded as " + decision.status + " (" + decision.date + ").\n\n" +
    "Reasons found in the documents:\n" + list(decision.reasons);

  if (decision.status === "pending" || decision.status === "draft") {
    content += "\n\nNote: this was only discussed. No final decision is recorded.";
  }
  if (decision.outcome) {
    content += "\n\nOutcome: " + decision.outcome;
  }

  return { content, citations: evidenceCitations(decision), uncertain: false };
}
