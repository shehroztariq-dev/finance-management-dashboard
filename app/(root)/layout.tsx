import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <main className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 h-full">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
