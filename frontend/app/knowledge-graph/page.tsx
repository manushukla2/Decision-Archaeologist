import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import GraphView from "@/components/graph/GraphView";

export const metadata = {
  title: "Knowledge Graph | Decision Archaeologist",
};

export const instant = false;

export default function KnowledgeGraphPage() {
  return (
    <>
      <TopBar
        title="Knowledge Graph"
        subtitle="Explore how decisions, people and documents connect"
        actions={<ThemeToggle />}
      />
      <main style={{ padding: "32px", maxWidth: "1100px" }}>
        <GraphView />
      </main>
    </>
  );
}
