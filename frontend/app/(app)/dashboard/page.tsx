import Link from "next/link";
import { Zap, FileText, Flag, Clock, ArrowRight, Upload } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import ThemeToggle from "@/components/layout/ThemeToggle";

export const metadata = {
  title: "Dashboard | Decision Archaeologist",
};

const stats = [
  { label: "Total decisions", value: 0, icon: Zap },
  { label: "Documents", value: 0, icon: FileText },
  { label: "Needs review", value: 0, icon: Flag },
  { label: "Processing", value: 0, icon: Clock },
];

const cardStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
};

function EmptyState({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--primary-subtle)",
          border: "1px solid var(--primary-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Icon size={22} color="var(--primary)" />
      </div>
      <h4 style={{ fontSize: "15px", color: "var(--text-primary)", marginBottom: "6px" }}>{title}</h4>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)", maxWidth: "320px", lineHeight: 1.6 }}>
        {text}
      </p>
    </div>
  );
}

function SectionHeader({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <h3 style={{ fontSize: "16px", color: "var(--text-primary)" }}>{title}</h3>
      <Link
        href={href}
        style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 500 }}
      >
        {linkLabel}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Overview of your organization's decision memory"
        actions={
          <>
            <ThemeToggle />
            <Link
              href="/documents"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "9px 18px",
                borderRadius: "var(--radius-md)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              <Upload size={16} />
              Upload document
            </Link>
          </>
        }
      />

      <main style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
                    {stat.label}
                  </span>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--primary-subtle)",
                      border: "1px solid var(--primary-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={16} color="var(--primary)" />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            );
          })}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <SectionHeader title="Recent decisions" href="/decisions" linkLabel="View all" />
            <EmptyState
              icon={Zap}
              title="No decisions yet"
              text="Upload documents and the AI will extract decisions, reasons and stakeholders automatically."
            />
          </div>

          <div style={cardStyle}>
            <SectionHeader title="Recent documents" href="/documents" linkLabel="View all" />
            <EmptyState
              icon={FileText}
              title="No documents uploaded"
              text="Add PDFs, Word files or text notes to start building your decision memory."
            />
          </div>
        </section>
      </main>
    </>
  );
}
