import { Search, FileText, GitBranch, MessageSquare, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Decision Discovery",
    description: "Automatically extract decisions, reasons, and stakeholders from your documents, emails, and meeting notes.",
  },
  {
    icon: FileText,
    title: "Evidence Traceability",
    description: "Every decision is linked to its original source. Know exactly where a decision came from and who made it.",
  },
  {
    icon: GitBranch,
    title: "Decision Timeline",
    description: "See how decisions evolved over time. Track changes, reversals, and the reasoning behind each update.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Ask questions in plain English. Get answers backed by evidence from your own organizational documents.",
  },
  {
    icon: Shield,
    title: "Contradiction Detection",
    description: "Automatically identify conflicting decisions and outdated assumptions before they cause problems.",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description: "Get AI-powered recommendations on whether old decisions should be kept, updated, or reconsidered.",
  },
];

export default function Features() {
  return (
    <section id="features" style={{
      padding: "96px 24px",
      backgroundColor: "var(--bg-surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}>
            Everything your organization needs
          </h2>
          <p style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Stop losing institutional knowledge. Start building organizational memory that actually works.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} style={{
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                transition: "border-color 0.2s",
              }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "var(--primary-subtle)",
                  border: "1px solid var(--primary-border)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  <Icon size={20} color="var(--primary)" />
                </div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
