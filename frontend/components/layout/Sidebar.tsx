"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  FileText,
  Zap,
  CalendarDays,
  Network,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Decisions", href: "/decisions", icon: Zap },
  { label: "Timeline", href: "/timeline", icon: CalendarDays },
  { label: "Knowledge Graph", href: "/knowledge-graph", icon: Network },
  { label: "AI Chat", href: "/chat", icon: MessageSquare },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;
      setEmail(user.email ?? "");
      setName((user.user_metadata?.full_name as string) || user.email || "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const initial = (name || "U").trim().charAt(0).toUpperCase();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "240px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "20px 20px 16px",
        }}
      >
        <Landmark size={22} color="var(--primary)" />
        <span
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Decision Archaeologist
        </span>
      </div>

      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          padding: "8px 12px",
          overflowY: "auto",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const isHover = hovered === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                borderLeft: active ? "3px solid var(--primary)" : "3px solid transparent",
                backgroundColor: active
                  ? "var(--primary-subtle)"
                  : isHover
                  ? "var(--bg-elevated)"
                  : "transparent",
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: "14px",
                fontWeight: 500,
                transition: "background 0.15s",
              }}
            >
              <Icon size={20} color={active ? "var(--primary)" : "currentColor"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--primary-subtle)",
            border: "1px solid var(--primary-border)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {initial}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name || "Loading..."}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {email}
          </div>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            padding: "6px",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-secondary)",
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
