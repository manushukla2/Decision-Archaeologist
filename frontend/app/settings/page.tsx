import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import SettingsTabs from "@/components/settings/SettingsTabs";

export const metadata = {
  title: "Settings | Decision Archaeologist",
};

export const instant = false;

export default function SettingsPage() {
  return (
    <>
      <TopBar
        title="Settings"
        subtitle="Manage your profile and organization"
        actions={<ThemeToggle />}
      />
      <main style={{ padding: "32px", maxWidth: "720px" }}>
        <SettingsTabs />
      </main>
    </>
  );
}
