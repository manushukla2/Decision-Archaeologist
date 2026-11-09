import Link from "next/link";
import { Landmark, GitBranch, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--bg-surface)",
      borderTop: "1px solid var(--border)",
      padding: "64px 24px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "64px",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Landmark size={20} color="var(--primary)" />
              <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Decision Archaeologist
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "280px" }}>
              Turn scattered organizational information into structured decision memory.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {[GitBranch, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              Product
            </h4>
            {["Features", "How it works", "Pricing", "Changelog"].map((item) => (
              <div key={item} style={{ marginBottom: "10px" }}>
                <Link href="#" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{item}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              Company
            </h4>
            {["About", "Blog", "Careers", "Contact"].map((item) => (
              <div key={item} style={{ marginBottom: "10px" }}>
                <Link href="#" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{item}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              Legal
            </h4>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <div key={item} style={{ marginBottom: "10px" }}>
                <Link href="#" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{item}</Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>© 2025 Decision Archaeologist. All rights reserved.</p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Built with Next.js and FastAPI</p>
        </div>
      </div>
    </footer>
  );
}
