"use client";
import { useMemo, useRef, useState } from "react";
import type { GraphData, GraphNodeType } from "@/types";
import { layoutGraph } from "@/lib/graph-layout";
import { NODE_STYLE, RELATION_LABELS, truncate } from "@/lib/graph-style";

const WIDTH = 900;
const HEIGHT = 600;
const NO_HIDDEN: GraphNodeType[] = [];

type Point = { x: number; y: number };

type Props = {
  data: GraphData;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  hiddenTypes?: GraphNodeType[];
};

export default function GraphCanvas({ data, selectedId, onSelect, hiddenTypes = NO_HIDDEN }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; moved: boolean } | null>(null);
  const [dragged, setDragged] = useState<Record<string, Point>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const basePositions = useMemo(() => {
    const map: Record<string, Point> = {};
    layoutGraph(data, WIDTH, HEIGHT).forEach((n) => {
      map[n.id] = { x: n.x, y: n.y };
    });
    return map;
  }, [data]);

  const nodes = useMemo(() => data.nodes.filter((n) => !hiddenTypes.includes(n.type)), [data, hiddenTypes]);
  const visibleIds = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);
  const edges = useMemo(
    () => data.edges.filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target)),
    [data, visibleIds]
  );

  const neighborhood = useMemo(() => {
    if (!selectedId || !visibleIds.has(selectedId)) return null;
    const ids = new Set<string>([selectedId]);
    const edgeIds = new Set<string>();
    edges.forEach((e) => {
      if (e.source === selectedId || e.target === selectedId) {
        ids.add(e.source);
        ids.add(e.target);
        edgeIds.add(e.id);
      }
    });
    return { ids, edgeIds };
  }, [selectedId, visibleIds, edges]);

  const getPos = (id: string): Point => dragged[id] ?? basePositions[id] ?? { x: WIDTH / 2, y: HEIGHT / 2 };

  const toSvgPoint = (clientX: number, clientY: number): Point | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  const handlePointerDown = (e: React.PointerEvent<SVGGElement>, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, moved: false };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGGElement>, id: string) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 4) {
      drag.moved = true;
    }
    if (!drag.moved) return;
    const p = toSvgPoint(e.clientX, e.clientY);
    if (!p) return;
    const clamped = {
      x: Math.max(20, Math.min(WIDTH - 20, p.x)),
      y: Math.max(20, Math.min(HEIGHT - 20, p.y)),
    };
    setDragged((prev) => ({ ...prev, [id]: clamped }));
  };

  const handlePointerUp = (e: React.PointerEvent<SVGGElement>, id: string) => {
    const drag = dragRef.current;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
    if (drag && drag.id === id && !drag.moved) {
      onSelect(selectedId === id ? null : id);
    }
  };

  if (nodes.length === 0) {
    return (
      <div style={{ padding: "64px 16px", textAlign: "center", fontSize: "14px", color: "var(--text-secondary)" }}>
        No nodes to show.
      </div>
    );
  }

  const hovered = hoveredId ? nodes.find((n) => n.id === hoveredId) : undefined;

  return (
    <svg
      ref={svgRef}
      viewBox={"0 0 " + WIDTH + " " + HEIGHT}
      role="img"
      aria-label="Knowledge graph of decisions, people, documents and reasons"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="transparent" onClick={() => onSelect(null)} />

      {edges.map((edge) => {
        const a = getPos(edge.source);
        const b = getPos(edge.target);
        const active = neighborhood ? neighborhood.edgeIds.has(edge.id) : false;
        const dim = neighborhood ? !active : false;
        return (
          <line
            key={edge.id}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={active ? "var(--primary)" : "var(--border-strong)"}
            strokeWidth={active ? 2 : 1.2}
            opacity={dim ? 0.12 : active ? 1 : 0.6}
          />
        );
      })}

      {neighborhood &&
        edges
          .filter((edge) => neighborhood.edgeIds.has(edge.id))
          .map((edge) => {
            const a = getPos(edge.source);
            const b = getPos(edge.target);
            return (
              <text
                key={"label-" + edge.id}
                x={(a.x + b.x) / 2}
                y={(a.y + b.y) / 2}
                textAnchor="middle"
                fontSize={10}
                fill="var(--primary)"
                stroke="var(--bg-base)"
                strokeWidth={3}
                paintOrder="stroke"
                style={{ pointerEvents: "none" }}
              >
                {RELATION_LABELS[edge.relation]}
              </text>
            );
          })}

      {nodes.map((node) => {
        const style = NODE_STYLE[node.type];
        const p = getPos(node.id);
        const isSelected = node.id === selectedId;
        const highlighted = neighborhood ? neighborhood.ids.has(node.id) : false;
        const dim = neighborhood ? !highlighted : false;
        const showLabel = style.alwaysLabel || highlighted || node.id === hoveredId;
        const isDecision = node.type === "decision";

        return (
          <g
            key={node.id}
            transform={"translate(" + p.x + "," + p.y + ")"}
            opacity={dim ? 0.25 : 1}
            style={{ cursor: "grab", touchAction: "none" }}
            onPointerDown={(e) => handlePointerDown(e, node.id)}
            onPointerMove={(e) => handlePointerMove(e, node.id)}
            onPointerUp={(e) => handlePointerUp(e, node.id)}
            onPointerEnter={() => setHoveredId(node.id)}
            onPointerLeave={() => setHoveredId(null)}
          >
            {isSelected && (
              <circle r={style.radius + 5} fill="none" stroke={style.color} strokeWidth={2} />
            )}
            <circle r={style.radius} fill={style.color} stroke="var(--bg-base)" strokeWidth={2} />
            {showLabel && (
              <text
                y={style.radius + 14}
                textAnchor="middle"
                fontSize={isDecision ? 12 : 11}
                fontWeight={isDecision ? 600 : 400}
                fill="var(--text-primary)"
                stroke="var(--bg-base)"
                strokeWidth={3}
                paintOrder="stroke"
                style={{ pointerEvents: "none" }}
              >
                {truncate(node.label, isDecision ? 30 : 24)}
              </text>
            )}
          </g>
        );
      })}

      {hovered && (() => {
        const p = getPos(hovered.id);
        const style = NODE_STYLE[hovered.type];
        const text = style.label + ": " + hovered.label;
        const w = Math.min(text.length * 6.4 + 20, 420);
        const x = Math.max(4, Math.min(WIDTH - w - 4, p.x - w / 2));
        const y = Math.max(4, p.y - style.radius - 34);
        return (
          <g style={{ pointerEvents: "none" }}>
            <rect
              x={x}
              y={y}
              width={w}
              height={24}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border-strong)"
            />
            <text x={x + 10} y={y + 16} fontSize={11} fill="var(--text-primary)">
              {truncate(text, 64)}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
