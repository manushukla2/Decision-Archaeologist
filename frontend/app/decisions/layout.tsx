import type { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function DecisionsLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
