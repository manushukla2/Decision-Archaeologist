"use client";
import { useState } from "react";
import { FileText, FileSpreadsheet, FileCode, File as FileIcon, Trash2 } from "lucide-react";
import ProcessingStatus from "@/components/documents/ProcessingStatus";
import type { DocumentItem, DocumentFileType } from "@/types";

const iconByType: Record<DocumentFileType, React.ComponentType<{ size?: number; color?: string }>> = {
  pdf: FileText,
  docx: FileText,
  txt: FileIcon,
  md: FileCode,
  csv: FileSpreadsheet,
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

type Props = {
  document: DocumentItem;
  onDelete?: (id: string) => void;
};

export default function DocumentCard({ document, onDelete }: Props) {
  const [hover, setHover] = useState(false);
  const Icon = iconByType[document.fileType] ?? FileIcon;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"),
        borderRadius: "var(--radius-lg)",
        padding: "16px 20px",
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--primary-subtle)",
            border: "1px solid var(--primary-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} color="var(--primary)" />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={document.name}
          >
            {document.name}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            {document.fileType.toUpperCase()} &middot; {formatSize(document.sizeBytes)} &middot; {formatDate(document.uploadedAt)}
            {document.status === "processed" && document.decisionsFound !== undefined
              ? " \u00b7 " + document.decisionsFound + (document.decisionsFound === 1 ? " decision" : " decisions")
              : ""}
          </div>
        </div>

        <ProcessingStatus status={document.status} />

        {onDelete && (
          <button
            onClick={() => onDelete(document.id)}
            aria-label={"Delete " + document.name}
            title="Delete document"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: "8px",
              borderRadius: "var(--radius-sm)",
              color: hover ? "var(--danger)" : "var(--text-muted)",
              transition: "color 0.15s",
            }}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {document.status === "failed" && document.errorMessage && (
        <div
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "var(--danger)",
            lineHeight: 1.5,
          }}
        >
          {document.errorMessage}
        </div>
      )}
    </div>
  );
}
