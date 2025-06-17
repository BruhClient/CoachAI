import React from "react";
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { Volleyball } from "lucide-react";

const SidebarHead = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex gap-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Volleyball className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">CoachAI</span>
              <span className="truncate text-xs text-muted-foreground">
                Tailor AI to meet your needs
              </span>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default SidebarHead;
