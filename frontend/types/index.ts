export type DocumentStatus = "uploaded" | "processing" | "processed" | "failed";

export type DocumentFileType = "pdf" | "docx" | "txt" | "md" | "csv";

export interface DocumentItem {
  id: string;
  name: string;
  fileType: DocumentFileType;
  sizeBytes: number;
  status: DocumentStatus;
  uploadedAt: string;
  decisionsFound?: number;
  errorMessage?: string;
}

export type DecisionStatus = "confirmed" | "pending" | "rejected" | "draft";

export interface EvidenceItem {
  id: string;
  documentName: string;
  section?: string;
  page?: number;
  passage: string;
  uploadedAt: string;
}

export interface DecisionItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: DecisionStatus;
  project?: string;
  people: string[];
  reasons: string[];
  alternatives: string[];
  outcome?: string;
  needsReview?: boolean;
  evidence: EvidenceItem[];
}

export type TimelineEventKind = "proposal" | "analysis" | "decision" | "change" | "review";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  kind: TimelineEventKind;
  decisionId?: string;
  sourceDocument?: string;
}

export type GraphNodeType =
  | "decision"
  | "person"
  | "document"
  | "event"
  | "project"
  | "reason"
  | "alternative"
  | "outcome";

export type GraphRelation =
  | "MADE_BY"
  | "SUPPORTED_BY"
  | "REJECTED_BECAUSE"
  | "DISCUSSED_IN"
  | "RELATED_TO"
  | "REPLACED_BY"
  | "CAUSED"
  | "PARTICIPATED_IN"
  | "OCCURRED_DURING";

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  decisionId?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: GraphRelation;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface PositionedNode extends GraphNode {
  x: number;
  y: number;
}
