import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import DecisionList from "@/components/decisions/DecisionList";

export const metadata = {
  title: "Decisions | Decision Archaeologist",
};

export const instant = false;

export default function DecisionsPage() {
  return (
    <>
      <TopBar
        title="Decisions"
        subtitle="Explore decisions extracted from your documents"
        actions={<ThemeToggle />}
      />
      <main style={{ padding: "32px", maxWidth: "960px" }}>
        <DecisionList />
      </main>
    </>
  );
}
