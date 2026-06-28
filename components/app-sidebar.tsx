"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { sidebarLinks } from "@/lib/constants";
import Footer from "./Footer";

export default function AppSidebar({ user }: SiderbarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 py-4">
          <Image
            src="/logo.svg"
            height={34}
            width={34}
            className="h-10 w-auto"
            alt="logo"
            priority
          />

          <span className="font-mono text-2xl font-semibold group-data-[collapsible=icon]:hidden">
            Numera
          </span>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="data-[active=true]:bg-emerald-700 data-[active=true]:text-white data-[active=true]:hover:bg-emerald-700 data-[active=true]:hover:text-white">
                      <Link href={item.route}>
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <Footer user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
