"use client";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import type { GraphNodeType } from "@/types";
import { NODE_STYLE, NODE_TYPE_ORDER } from "@/lib/graph-style";

type Props = {
  counts: Record<GraphNodeType, number>;
  hiddenTypes: GraphNodeType[];
  onToggle: (type: GraphNodeType) => void;
  onReset: () => void;
};

export default function GraphControls({ counts, hiddenTypes, onToggle, onReset }: Props) {
  const types = NODE_TYPE_ORDER.filter((t) => counts[t] > 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 16px",
      }}
    >
      {types.map((type) => {
        const style = NODE_STYLE[type];
        const hidden = hiddenTypes.includes(type);
        const Icon = hidden ? EyeOff : Eye;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onToggle(type)}
            aria-pressed={!hidden}
            title={hidden ? "Show " + style.label.toLowerCase() + " nodes" : "Hide " + style.label.toLowerCase() + " nodes"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid " + (hidden ? "var(--border)" : "var(--border-strong)"),
              backgroundColor: hidden ? "transparent" : "var(--bg-base)",
              color: hidden ? "var(--text-muted)" : "var(--text-primary)",
              opacity: hidden ? 0.7 : 1,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: hidden ? "var(--border-strong)" : style.color,
                flexShrink: 0,
              }}
            />
            {style.label}
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 400 }}>{counts[type]}</span>
            <Icon size={13} />
          </button>
        );
      })}

      {hiddenTypes.length > 0 && (
        <button
          type="button"
          onClick={onReset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-strong)",
            backgroundColor: "transparent",
            color: "var(--text-secondary)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <RotateCcw size={13} />
          Show all
        </button>
      )}
    </div>
  );
}
