import type { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function KnowledgeGraphLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
