import type { ReactNode } from "react";

type TopBarProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        minHeight: "64px",
        padding: "12px 32px",
        backgroundColor: "var(--bg-base)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </header>
  );
}
