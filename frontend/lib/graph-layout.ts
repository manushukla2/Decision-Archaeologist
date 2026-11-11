import type { GraphData, PositionedNode } from "@/types";

export function layoutGraph(data: GraphData, width: number, height: number): PositionedNode[] {
  const count = data.nodes.length;
  if (count === 0) return [];

  const index = new Map<string, number>();
  data.nodes.forEach((node, i) => index.set(node.id, i));

  const links: [number, number][] = [];
  data.edges.forEach((edge) => {
    const a = index.get(edge.source);
    const b = index.get(edge.target);
    if (a !== undefined && b !== undefined) links.push([a, b]);
  });

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.4;

  const x: number[] = [];
  const y: number[] = [];
  const vx: number[] = [];
  const vy: number[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    x.push(cx + Math.cos(angle) * radius);
    y.push(cy + Math.sin(angle) * radius);
    vx.push(0);
    vy.push(0);
  }

  const iterations = 400;
  for (let step = 0; step < iterations; step++) {
    const cooling = 1 - step / iterations;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = x[i] - x[j];
        const dy = y[i] - y[j];
        const distSq = Math.max(dx * dx + dy * dy, 25);
        const dist = Math.sqrt(distSq);
        const force = 5000 / distSq;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        vx[i] += fx;
        vy[i] += fy;
        vx[j] -= fx;
        vy[j] -= fy;
      }
    }

    links.forEach(([a, b]) => {
      const dx = x[b] - x[a];
      const dy = y[b] - y[a];
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const pull = (dist - 80) * 0.04;
      const fx = (dx / dist) * pull;
      const fy = (dy / dist) * pull;
      vx[a] += fx;
      vy[a] += fy;
      vx[b] -= fx;
      vy[b] -= fy;
    });

    for (let i = 0; i < count; i++) {
      vx[i] += (cx - x[i]) * 0.003;
      vy[i] += (cy - y[i]) * 0.003;
      vx[i] *= 0.8;
      vy[i] *= 0.8;
      x[i] += Math.max(-20, Math.min(20, vx[i] * cooling));
      y[i] += Math.max(-20, Math.min(20, vy[i] * cooling));
    }
  }

  const pad = 50;
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);
  const spanX = Math.max(maxX - minX, 1);
  const spanY = Math.max(maxY - minY, 1);
  const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);
  const offsetX = (width - spanX * scale) / 2 - minX * scale;
  const offsetY = (height - spanY * scale) / 2 - minY * scale;

  return data.nodes.map((node, i) => ({
    ...node,
    x: x[i] * scale + offsetX,
    y: y[i] * scale + offsetY,
  }));
}
