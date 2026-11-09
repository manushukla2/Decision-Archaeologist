import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import TimelineView from "@/components/timeline/TimelineView";

export const metadata = {
  title: "Timeline | Decision Archaeologist",
};

export const instant = false;

export default function TimelinePage() {
  return (
    <>
      <TopBar
        title="Timeline"
        subtitle="See how decisions evolved over time"
        actions={<ThemeToggle />}
      />
      <main style={{ padding: "32px", maxWidth: "820px" }}>
        <TimelineView />
      </main>
    </>
  );
}
