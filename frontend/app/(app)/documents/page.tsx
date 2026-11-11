import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import DocumentList from "@/components/documents/DocumentList";

export const metadata = {
  title: "Documents | Decision Archaeologist",
};

export const instant = false;

export default function DocumentsPage() {
  return (
    <>
      <TopBar
        title="Documents"
        subtitle="Upload files to build your decision memory"
        actions={<ThemeToggle />}
      />
      <main style={{ padding: "32px", maxWidth: "960px" }}>
        <DocumentList />
      </main>
    </>
  );
}
