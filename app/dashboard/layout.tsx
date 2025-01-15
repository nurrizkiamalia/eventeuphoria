import DashboardFooter from "@/components/Footer/DashboardFooter";
import Header from "@/components/DashboardHeader/DashboardHeader";
import SideNavDashboard from "@/components/SideNavDashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden p-5">
      <SidebarProvider>
        <SideNavDashboard />
        <main className="w-full flex flex-col justify-between">
          <div>
            <SidebarTrigger />
            <Header />
            {children}
          </div>
          <DashboardFooter />
        </main>
      </SidebarProvider>
    </div>
  );
}
