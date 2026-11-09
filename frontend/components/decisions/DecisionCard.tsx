"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays, FolderKanban, Users, FileText } from "lucide-react";
import DecisionBadge, { ReviewBadge } from "@/components/decisions/DecisionBadge";
import type { DecisionItem } from "@/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const metaStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  color: "var(--text-muted)",
};

export default function DecisionCard({ decision }: { decision: DecisionItem }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={"/decisions/" + decision.id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"),
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        transition: "border-color 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "8px",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {decision.title}
        </h3>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {decision.needsReview && <ReviewBadge />}
          <DecisionBadge status={decision.status} />
        </div>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "16px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {decision.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <span style={metaStyle}>
          <CalendarDays size={14} />
          {formatDate(decision.date)}
        </span>
        {decision.project && (
          <span style={metaStyle}>
            <FolderKanban size={14} />
            {decision.project}
          </span>
        )}
        <span style={metaStyle}>
          <Users size={14} />
          {decision.people.length} {decision.people.length === 1 ? "person" : "people"}
        </span>
        <span style={metaStyle}>
          <FileText size={14} />
          {decision.evidence.length} {decision.evidence.length === 1 ? "source" : "sources"}
        </span>
      </div>
    </Link>
  );
}
