import type {
  DecisionItem,
  TimelineEvent,
  GraphData,
  GraphNode,
  GraphEdge,
  GraphRelation,
} from "@/types";

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// "Priya Sharma (Product Manager)" becomes "Priya Sharma"
function personName(raw: string): string {
  return raw.replace(/\s*\(.*\)\s*$/, "").trim();
}

export function buildGraph(decisions: DecisionItem[], events: TimelineEvent[]): GraphData {
  const nodes = new Map<string, GraphNode>();
  const edges = new Map<string, GraphEdge>();

  const addNode = (node: GraphNode) => {
    if (!nodes.has(node.id)) nodes.set(node.id, node);
  };

  const addEdge = (source: string, target: string, relation: GraphRelation) => {
    const id = source + "|" + relation + "|" + target;
    if (!edges.has(id)) edges.set(id, { id, source, target, relation });
  };

  decisions.forEach((d) => {
    const decisionNodeId = "decision:" + d.id;
    addNode({ id: decisionNodeId, label: d.title, type: "decision", decisionId: d.id });

    if (d.project) {
      const projectId = "project:" + slug(d.project);
      addNode({ id: projectId, label: d.project, type: "project" });
      addEdge(decisionNodeId, projectId, "RELATED_TO");
    }

    d.people.forEach((raw) => {
      const name = personName(raw);
      const personId = "person:" + slug(name);
      addNode({ id: personId, label: name, type: "person" });
      addEdge(personId, decisionNodeId, "PARTICIPATED_IN");
    });

    d.reasons.forEach((reason, i) => {
      const reasonId = "reason:" + d.id + ":" + i;
      addNode({ id: reasonId, label: reason, type: "reason", decisionId: d.id });
      addEdge(decisionNodeId, reasonId, d.status === "rejected" ? "REJECTED_BECAUSE" : "SUPPORTED_BY");
    });

    d.alternatives.forEach((alt, i) => {
      const altId = "alternative:" + d.id + ":" + i;
      addNode({ id: altId, label: alt, type: "alternative", decisionId: d.id });
      addEdge(decisionNodeId, altId, "RELATED_TO");
    });

    if (d.outcome) {
      const outcomeId = "outcome:" + d.id;
      addNode({ id: outcomeId, label: d.outcome, type: "outcome", decisionId: d.id });
      addEdge(decisionNodeId, outcomeId, "CAUSED");
    }

    const discussionOnly = d.status === "pending" || d.status === "draft";
    d.evidence.forEach((ev) => {
      const docId = "document:" + slug(ev.documentName);
      addNode({ id: docId, label: ev.documentName, type: "document" });
      addEdge(decisionNodeId, docId, discussionOnly ? "DISCUSSED_IN" : "SUPPORTED_BY");
    });
  });

  events.forEach((e) => {
    const eventId = "event:" + e.id;
    addNode({ id: eventId, label: e.title, type: "event", decisionId: e.decisionId });
    if (e.decisionId && nodes.has("decision:" + e.decisionId)) {
      addEdge("decision:" + e.decisionId, eventId, "RELATED_TO");
    }
  });

  return { nodes: Array.from(nodes.values()), edges: Array.from(edges.values()) };
}
