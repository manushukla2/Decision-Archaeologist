"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {
      saved = null;
    }
    const dark = saved === "dark";
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable, theme still applies for this session
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
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
      {mounted && isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
