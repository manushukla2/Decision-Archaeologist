import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ChatView from "@/components/chat/ChatView";

export const metadata = {
  title: "AI Chat | Decision Archaeologist",
};

export const instant = false;

export default function ChatPage() {
  return (
    <>
      <TopBar
        title="AI Chat"
        subtitle="Ask questions about your organization's decisions"
        actions={<ThemeToggle />}
      />
      <main style={{ padding: "24px 32px", maxWidth: "860px" }}>
        <ChatView />
      </main>
    </>
  );
}
