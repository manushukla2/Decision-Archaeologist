import Link from "next/link";
import { ArrowLeft, CalendarDays, FolderKanban } from "lucide-react";
import DecisionBadge, { ReviewBadge } from "@/components/decisions/DecisionBadge";
import EvidencePanel from "@/components/decisions/EvidencePanel";
import type { DecisionItem } from "@/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={cardStyle}>
      <h3 style={{ fontSize: "16px", color: "var(--text-primary)", marginBottom: "14px" }}>{title}</h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Nothing recorded.</p>;
  }
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: 1.6 }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              marginTop: "8px",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "var(--text-secondary)" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DecisionDetail({ decision }: { decision: DecisionItem }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Link
        href="/decisions"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "14px",
          fontWeight: 500,
          alignSelf: "flex-start",
        }}
      >
        <ArrowLeft size={14} />
        Back to decisions
      </Link>

      <div style={cardStyle}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
          <DecisionBadge status={decision.status} />
          {decision.needsReview && <ReviewBadge />}
        </div>

        <h2
          style={{
            fontSize: "26px",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          {decision.title}
        </h2>

        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
          {decision.description}
        </p>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            <CalendarDays size={14} />
            {formatDate(decision.date)}
          </span>
          {decision.project && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-muted)",
              }}
            >
              <FolderKanban size={14} />
              {decision.project}
            </span>
          )}
        </div>
      </div>

      <Section title="Reasons">
        <BulletList items={decision.reasons} />
      </Section>

      <Section title="Alternatives considered">
        <BulletList items={decision.alternatives} />
      </Section>

      <Section title="People involved">
        <BulletList items={decision.people} />
      </Section>

      {decision.outcome && (
        <Section title="Outcome">
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{decision.outcome}</p>
        </Section>
      )}

      <Section title={"Supporting evidence (" + decision.evidence.length + ")"}>
        <EvidencePanel evidence={decision.evidence} />
      </Section>
    </div>
  );
}
