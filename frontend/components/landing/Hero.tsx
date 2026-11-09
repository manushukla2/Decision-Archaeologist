import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "64px",
      backgroundColor: "var(--bg-base)",
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "0 24px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "var(--primary-subtle)",
          border: "1px solid var(--primary-border)",
          borderRadius: "999px",
          padding: "6px 14px",
          marginBottom: "32px",
        }}>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--primary)" }}>
            Now in Beta
          </span>
          <ChevronRight size={12} color="var(--primary)" />
        </div>

        <h1 style={{
          fontSize: "56px",
          fontWeight: 600,
          color: "var(--text-primary)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}>
          Uncover the{" "}
          <span style={{ color: "var(--primary)" }}>why</span>
          {" "}behind every decision
        </h1>

        <p style={{
          fontSize: "18px",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: "40px",
          maxWidth: "600px",
          margin: "0 auto 40px",
        }}>
          Decision Archaeologist turns your scattered emails, meetings, and documents
          into a structured decision memory. Never lose context again.
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <Link href="/signup" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--primary)",
            color: "white",
            padding: "12px 28px",
            borderRadius: "var(--radius-md)",
            fontSize: "15px",
            fontWeight: 500,
            transition: "background 0.2s",
          }}>
            Get Started Free
            <ArrowRight size={16} />
          </Link>

          <Link href="#how-it-works" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            padding: "12px 28px",
            borderRadius: "var(--radius-md)",
            fontSize: "15px",
            fontWeight: 500,
            border: "1px solid var(--border-strong)",
            transition: "background 0.2s",
          }}>
            See how it works
          </Link>
        </div>

        <p style={{
          marginTop: "24px",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}>
          No credit card required. Free to get started.
        </p>
      </div>
    </section>
  );
}
