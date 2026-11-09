import { Flag } from "lucide-react";
import type { DecisionStatus } from "@/types";

const config: Record<DecisionStatus, { label: string; color: string }> = {
  confirmed: { label: "Confirmed", color: "var(--success)" },
  pending: { label: "Pending", color: "var(--primary)" },
  rejected: { label: "Rejected", color: "var(--danger)" },
  draft: { label: "Draft", color: "var(--text-secondary)" },
};

const badgeBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  padding: "2px 8px",
  borderRadius: "var(--radius-sm)",
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  whiteSpace: "nowrap",
};

export default function DecisionBadge({ status }: { status: DecisionStatus }) {
  const { label, color } = config[status];
  return (
    <span style={{ ...badgeBase, border: "1px solid " + color, color: color }}>
      {label}
    </span>
  );
}

export function ReviewBadge() {
  return (
    <span
      style={{
        ...badgeBase,
        border: "1px solid var(--primary-border)",
        backgroundColor: "var(--primary-subtle)",
        color: "var(--primary)",
      }}
    >
      <Flag size={11} />
      Needs review
    </span>
  );
}
