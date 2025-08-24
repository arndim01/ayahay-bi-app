"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IconAnchor,
  IconBuilding,
  IconCalendarCheck,
  IconCalendarPlus,
  IconCreditCard,
  IconDashboard,
  IconHelp,
  IconMapPin,
  IconMap2,
  IconReceipt,
  IconSearch,
  IconSettings,
  IconShip,
  IconUser,
  IconChartBar,
  IconTrendingUp,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavMain from "./nav-main";

const data = {
  navMain: [
    {
      title: "Executive View",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Financials",
      url: "/financials",
      icon: IconChartBar,
    },
    {
      title: "Operations",
      url: "/operations",
      icon: IconMap2,
    },
    {
      title: "People",
      url: "/passengers",
      icon: IconUser,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconTrendingUp,
    },
  ],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconShip className="!size-5" />
                <span className="text-base font-semibold">Aznar BI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}></NavMain>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
