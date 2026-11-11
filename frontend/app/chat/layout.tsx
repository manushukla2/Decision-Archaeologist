import type { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
