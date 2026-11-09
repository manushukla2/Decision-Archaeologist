import type { DecisionItem } from "@/types";

// TEMPORARY: sample data to build the UI. Replace with real API data later.
export const sampleDecisions: DecisionItem[] = [
  {
    id: "d-001",
    title: "Do not launch the mobile application",
    description:
      "The proposal to build a native mobile app was rejected for this planning cycle. The team agreed to improve the responsive website first and revisit the app later.",
    date: "2026-03-14",
    status: "rejected",
    project: "Mobile App",
    people: ["Priya Sharma (Product Manager)", "Rahul Verma (Engineering Manager)"],
    reasons: [
      "Development cost estimate was too high for the current budget",
      "Customer demand survey showed low interest in a dedicated app",
      "Engineering team had limited capacity",
    ],
    alternatives: ["Improve the responsive website", "Build a progressive web app"],
    outcome: "Website performance improvements were shipped in Q2.",
    needsReview: true,
    evidence: [
      {
        id: "e-001",
        documentName: "Q1-Planning-Meeting.pdf",
        section: "Mobile App Discussion",
        page: 4,
        passage:
          "After reviewing the cost analysis, the group agreed not to proceed with the mobile app this quarter. Budget and team capacity were the main concerns.",
        uploadedAt: "2026-03-15",
      },
      {
        id: "e-002",
        documentName: "Mobile-Cost-Analysis.docx",
        section: "Summary",
        passage:
          "Estimated development cost is 40 percent above the available budget. Customer survey interest in a native app was under 15 percent.",
        uploadedAt: "2026-02-20",
      },
    ],
  },
  {
    id: "d-002",
    title: "Adopt PostgreSQL as the primary database",
    description:
      "The team chose PostgreSQL over MongoDB for the core product because of relational data needs and strong tooling.",
    date: "2026-01-22",
    status: "confirmed",
    project: "Platform",
    people: ["Rahul Verma (Engineering Manager)", "Anita Desai (Tech Lead)"],
    reasons: [
      "Data is highly relational",
      "Mature tooling and extensions such as pgvector",
      "Lower hosting cost on free tiers",
    ],
    alternatives: ["MongoDB", "MySQL"],
    outcome: "Migration completed in February with no data loss.",
    evidence: [
      {
        id: "e-003",
        documentName: "Architecture-Review-Notes.md",
        section: "Database Choice",
        passage:
          "Decision confirmed: PostgreSQL will be the primary store. MongoDB was considered but the data model is relational.",
        uploadedAt: "2026-01-23",
      },
    ],
  },
  {
    id: "d-003",
    title: "Move weekly planning meeting to Mondays",
    description:
      "A proposal to shift the weekly planning meeting from Friday to Monday. Discussed, but no final approval is recorded yet.",
    date: "2026-05-09",
    status: "pending",
    project: "Team Process",
    people: ["Sneha Iyer (Project Manager)"],
    reasons: ["Friday meetings often run late", "Monday gives a clearer week plan"],
    alternatives: ["Keep Friday meeting", "Switch to biweekly"],
    evidence: [
      {
        id: "e-004",
        documentName: "Team-Retro-May.txt",
        passage:
          "Several members suggested moving planning to Monday. No decision was made; Sneha will collect feedback.",
        uploadedAt: "2026-05-10",
      },
    ],
  },
  {
    id: "d-004",
    title: "Introduce a freemium pricing tier",
    description:
      "An early idea to offer a limited free plan. Only mentioned in passing during a strategy call, so it is treated as a draft.",
    date: "2026-06-30",
    status: "draft",
    project: "Pricing",
    people: ["Priya Sharma (Product Manager)"],
    reasons: ["Could improve sign-up conversion"],
    alternatives: ["Free trial only"],
    evidence: [
      {
        id: "e-005",
        documentName: "Strategy-Call-June.md",
        section: "Open Ideas",
        passage: "Priya floated the idea of a freemium tier. We should look at the numbers before deciding.",
        uploadedAt: "2026-07-01",
      },
    ],
  },
];

export function getDecisionById(id: string): DecisionItem | undefined {
  return sampleDecisions.find((d) => d.id === id);
}
