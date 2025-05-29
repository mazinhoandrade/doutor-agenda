import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/app-sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  //const session = await auth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
