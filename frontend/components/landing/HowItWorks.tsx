import { Upload, Cpu, MessageSquare } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your documents",
    description: "Upload PDFs, Word docs, meeting transcripts, emails, and reports. We support all major file formats.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI extracts decisions",
    description: "Our multi-agent AI system automatically identifies decisions, reasons, stakeholders, and outcomes from your documents.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Ask anything",
    description: "Chat with your organizational memory. Get evidence-backed answers with direct citations to source documents.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: "96px 24px",
      backgroundColor: "var(--bg-base)",
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
            How it works
          </h2>
          <p style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Three simple steps to turn your scattered documents into structured decision memory.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
        }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} style={{
                position: "relative",
                textAlign: "center",
                padding: "40px 32px",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
              }}>
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--primary)",
                  letterSpacing: "0.05em",
                  backgroundColor: "var(--primary-subtle)",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid var(--primary-border)",
                }}>
                  {step.number}
                </div>

                <div style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "var(--primary-subtle)",
                  border: "1px solid var(--primary-border)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <Icon size={24} color="var(--primary)" />
                </div>

                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
