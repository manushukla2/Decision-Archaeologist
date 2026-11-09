"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace("/login");
      } else {
        setChecking(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-base)",
        }}
      >
        <Loader2 size={24} color="var(--primary)" className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-base)" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", minHeight: "100vh" }}>{children}</div>
    </div>
  );
}
