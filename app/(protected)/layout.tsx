import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Breadcrumbs from "@/components/BreadCrumbs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full ">
          <SidebarTrigger />
          <Breadcrumbs />
          <div className="h-[90vh] px-3 py-4 my-3 ">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
