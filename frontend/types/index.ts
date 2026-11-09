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
