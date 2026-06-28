import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/app-sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) redirect("/sign-in");
  return (
    <TooltipProvider>
      <SidebarProvider>
        <main className="flex h-screen w-full">
          <AppSidebar user={loggedInUser} />
          <div className="flex flex-col flex-1 h-full">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
