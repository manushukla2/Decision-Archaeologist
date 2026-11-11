import type { GraphNodeType, GraphRelation } from "@/types";

export const NODE_STYLE: Record<
  GraphNodeType,
  { label: string; color: string; radius: number; alwaysLabel: boolean }
> = {
  decision: { label: "Decision", color: "var(--primary)", radius: 16, alwaysLabel: true },
  person: { label: "Person", color: "var(--info)", radius: 11, alwaysLabel: true },
  project: { label: "Project", color: "var(--success)", radius: 12, alwaysLabel: true },
  document: { label: "Document", color: "var(--text-secondary)", radius: 9, alwaysLabel: true },
  event: { label: "Event", color: "#8B5CF6", radius: 8, alwaysLabel: false },
  reason: { label: "Reason", color: "var(--danger)", radius: 7, alwaysLabel: false },
  alternative: { label: "Alternative", color: "#EC4899", radius: 7, alwaysLabel: false },
  outcome: { label: "Outcome", color: "#06B6D4", radius: 8, alwaysLabel: false },
};

export const NODE_TYPE_ORDER: GraphNodeType[] = [
  "decision",
  "person",
  "project",
  "document",
  "event",
  "reason",
  "alternative",
  "outcome",
];

export const RELATION_LABELS: Record<GraphRelation, string> = {
  MADE_BY: "made by",
  SUPPORTED_BY: "supported by",
  REJECTED_BECAUSE: "rejected because",
  DISCUSSED_IN: "discussed in",
  RELATED_TO: "related to",
  REPLACED_BY: "replaced by",
  CAUSED: "caused",
  PARTICIPATED_IN: "participated in",
  OCCURRED_DURING: "occurred during",
};

export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
}
