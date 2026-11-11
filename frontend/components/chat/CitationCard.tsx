import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import type { ChatCitation } from "@/types";

export default function CitationCard({ citation, index }: { citation: ChatCitation; index: number }) {
  const where = [citation.section, citation.page !== undefined ? "Page " + citation.page : undefined]
    .filter(Boolean)
    .join("  |  ");

  return (
    <div
      style={{
        backgroundColor: "var(--bg-base)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "12px 14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
        <span
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "var(--primary-subtle)",
            border: "1px solid var(--primary-border)",
            color: "var(--primary)",
            fontSize: "11px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {index}
        </span>
        <FileText size={14} color="var(--primary)" />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
          {citation.documentName}
        </span>
        {where && <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{where}</span>}
      </div>

      <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>
        {citation.passage}
      </p>

      <Link
        href={"/decisions/" + citation.decisionId}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "12px",
          fontWeight: 500,
          marginTop: "8px",
        }}
      >
        View decision
        <ArrowRight size={12} />
      </Link>
    </div>
  );
}
