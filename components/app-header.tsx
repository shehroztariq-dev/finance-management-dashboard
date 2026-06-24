import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function AppHeader() {
  return (
    <div className="fixed border rounded-2xl m-2  flex items-start">
      <SidebarTrigger />
    </div>
  );
}
