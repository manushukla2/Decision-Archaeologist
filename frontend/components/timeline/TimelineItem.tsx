import Link from "next/link";
import { Lightbulb, BarChart3, CheckCircle2, RefreshCw, Flag, FileText, ArrowRight } from "lucide-react";
import type { TimelineEvent, TimelineEventKind } from "@/types";

const kindConfig: Record<
  TimelineEventKind,
  { label: string; color: string; icon: React.ComponentType<{ size?: number; color?: string }> }
> = {
  proposal: { label: "Proposal", color: "var(--info)", icon: Lightbulb },
  analysis: { label: "Analysis", color: "var(--text-secondary)", icon: BarChart3 },
  decision: { label: "Decision", color: "var(--success)", icon: CheckCircle2 },
  change: { label: "Change", color: "var(--primary)", icon: RefreshCw },
  review: { label: "Review", color: "var(--danger)", icon: Flag },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

type Props = {
  event: TimelineEvent;
  isLast: boolean;
};

export default function TimelineItem({ event, isLast }: Props) {
  const { label, color, icon: Icon } = kindConfig[event.kind];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--bg-surface)",
            border: "2px solid " + color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={16} color={color} />
        </div>
        {!isLast && (
          <div style={{ flex: 1, width: "2px", backgroundColor: "var(--border)", marginTop: "4px" }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 0 : "28px" }}>
        <div
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "18px 22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: color,
                border: "1px solid " + color,
                borderRadius: "var(--radius-sm)",
                padding: "2px 8px",
              }}
            >
              {label}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{formatDate(event.date)}</span>
          </div>

          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              marginBottom: "6px",
            }}
          >
            {event.title}
          </h3>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {event.description}
          </p>

          {(event.sourceDocument || event.decisionId) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid var(--border)",
              }}
            >
              {event.sourceDocument ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                >
                  <FileText size={13} />
                  {event.sourceDocument}
                </span>
              ) : (
                <span />
              )}

              {event.decisionId && (
                <Link
                  href={"/decisions/" + event.decisionId}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  View decision
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
