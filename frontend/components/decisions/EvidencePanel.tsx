import { FileText, Quote } from "lucide-react";
import type { EvidenceItem } from "@/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function EvidencePanel({ evidence }: { evidence: EvidenceItem[] }) {
  if (evidence.length === 0) {
    return (
      <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
        No supporting evidence was found for this decision.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {evidence.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "var(--bg-base)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <FileText size={15} color="var(--primary)" />
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
              {item.documentName}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {[
                item.section,
                item.page !== undefined ? "Page " + item.page : undefined,
                "Uploaded " + formatDate(item.uploadedAt),
              ]
                .filter(Boolean)
                .join("  |  ")}
            </span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Quote size={14} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: "3px" }} />
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {item.passage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
