import { notFound } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import DecisionDetail from "@/components/decisions/DecisionDetail";
import { getDecisionById } from "@/lib/sample-data";

export const instant = false;

export default async function DecisionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decision = getDecisionById(id);

  if (!decision) notFound();

  return (
    <>
      <TopBar title="Decision details" subtitle={decision.title} actions={<ThemeToggle />} />
      <main style={{ padding: "32px", maxWidth: "960px" }}>
        <DecisionDetail decision={decision} />
      </main>
    </>
  );
}
