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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut } from "lucide-react";
import { sidebarLinks } from "@/lib/constants";

export default function AppSidebar() {
  const router = useRouter();
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
      {/* <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.image ?? undefined}
              alt={user?.name ?? undefined}
            />
            <AvatarFallback className="bg-gray-200">
              {user?.name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-1 items-center justify-between overflow-hidden group-data-[collapsible=icon]:hidden">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user?.name}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>

            <button
              className="ml-2 text-muted-foreground transition hover:text-red-500"
              aria-label="Logout"
              onClick={handlSignOut}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}
