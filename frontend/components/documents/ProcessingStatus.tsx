import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { DocumentStatus } from "@/types";

const config: Record<
  DocumentStatus,
  { label: string; color: string; icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  uploaded: { label: "Uploaded", color: "var(--text-secondary)", icon: Clock },
  processing: { label: "Processing", color: "var(--primary)", icon: Loader2 },
  processed: { label: "Processed", color: "var(--success)", icon: CheckCircle2 },
  failed: { label: "Failed", color: "var(--danger)", icon: AlertCircle },
};

export default function ProcessingStatus({ status }: { status: DocumentStatus }) {
  const { label, color, icon: Icon } = config[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid " + color,
        color: color,
        fontSize: "11px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={12} className={status === "processing" ? "animate-spin" : undefined} />
      {label}
    </span>
  );
}
