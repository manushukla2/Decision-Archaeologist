"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GraphCanvas from "@/components/graph/GraphCanvas";
import GraphControls from "@/components/graph/GraphControls";
import { buildGraph } from "@/lib/graph-builder";
import { sampleDecisions } from "@/lib/sample-data";
import { sampleTimeline } from "@/lib/sample-timeline";
import { NODE_STYLE, NODE_TYPE_ORDER } from "@/lib/graph-style";
import type { GraphNodeType } from "@/types";

export default function GraphView() {
  const data = useMemo(() => buildGraph(sampleDecisions, sampleTimeline), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hiddenTypes, setHiddenTypes] = useState<GraphNodeType[]>([]);

  const counts = useMemo(() => {
    const result = {} as Record<GraphNodeType, number>;
    NODE_TYPE_ORDER.forEach((t) => {
      result[t] = 0;
    });
    data.nodes.forEach((n) => {
      result[n.type] += 1;
    });
    return result;
  }, [data]);

  const visibleCounts = useMemo(() => {
    const visibleNodes = data.nodes.filter((n) => !hiddenTypes.includes(n.type));
    const ids = new Set(visibleNodes.map((n) => n.id));
    const edgeCount = data.edges.filter((e) => ids.has(e.source) && ids.has(e.target)).length;
    return { nodes: visibleNodes.length, edges: edgeCount };
  }, [data, hiddenTypes]);

  const handleToggle = (type: GraphNodeType) => {
    const willHide = !hiddenTypes.includes(type);
    setHiddenTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    if (willHide) {
      const current = data.nodes.find((n) => n.id === selectedId);
      if (current && current.type === type) setSelectedId(null);
    }
  };

  const selected = data.nodes.find((n) => n.id === selectedId);
  const style = selected ? NODE_STYLE[selected.type] : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
        {visibleCounts.nodes} nodes, {visibleCounts.edges} connections. Drag nodes to rearrange, click one to see
        its connections.
      </div>

      <GraphControls
        counts={counts}
        hiddenTypes={hiddenTypes}
        onToggle={handleToggle}
        onReset={() => setHiddenTypes([])}
      />

      <div
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        <GraphCanvas data={data} selectedId={selectedId} onSelect={setSelectedId} hiddenTypes={hiddenTypes} />
      </div>

      <div
        style={{
          minHeight: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "14px 20px",
        }}
      >
        {selected && style ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  color: style.color,
                  border: "1px solid " + style.color,
                  borderRadius: "var(--radius-sm)",
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                }}
              >
                {style.label}
              </span>
              <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{selected.label}</span>
            </div>
            {selected.type === "decision" && selected.decisionId && (
              <Link
                href={"/decisions/" + selected.decisionId}
                style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 500 }}
              >
                View decision
                <ArrowRight size={14} />
              </Link>
            )}
          </>
        ) : (
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>No node selected.</span>
        )}
      </div>
    </div>
  );
}
