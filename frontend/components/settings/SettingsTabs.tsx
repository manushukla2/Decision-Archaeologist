"use client";
import { useState } from "react";
import { User, Building2 } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import OrgSettings from "@/components/settings/OrgSettings";

type TabId = "profile" | "organization";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
];

export default function SettingsTabs() {
  const [active, setActive] = useState<TabId>("profile");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: "4px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(tab.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                marginBottom: "-1px",
                background: "none",
                border: "none",
                borderBottom: "2px solid " + (isActive ? "var(--primary)" : "transparent"),
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {active === "profile" ? <ProfileSettings /> : <OrgSettings />}
    </div>
  );
}
