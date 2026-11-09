"use client";
import { useState } from "react";
import Link from "next/link";
import { Landmark, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      borderBottom: "1px solid var(--border)",
      backgroundColor: "var(--bg-base)",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Landmark size={22} color="var(--primary)" />
          <span style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}>
            Decision Archaeologist
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="#features" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Features</Link>
          <Link href="#how-it-works" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>How it works</Link>
          <Link href="#pricing" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Pricing</Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "8px 12px",
              cursor: "pointer",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link href="/login" style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            padding: "8px 16px",
          }}>
            Login
          </Link>

          <Link href="/signup" style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "white",
            backgroundColor: "var(--primary)",
            padding: "8px 20px",
            borderRadius: "var(--radius-md)",
            transition: "background 0.2s",
          }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
