"use client";

import type { ReactNode } from "react";

import { OfflineBanner } from "@/components/common/offline-banner";
import { BottomNav } from "./bottom-nav";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface AppShellProps {
  children: ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar title={pageTitle} />
        <OfflineBanner />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">{children}</main>
      </div>

      <BottomNav />
    </div>
  );
}
