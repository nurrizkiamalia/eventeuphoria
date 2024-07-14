import DashboardFooter from "@/components/Footer/DashboardFooter";
import Header from "@/components/Header/DashboardHeader/DashboardHeader";
import SideNavDashboard from "@/components/Header/SideNavDashboard/SideNavDashboard";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="flex gap-3 w-full relative">
        <div className="md:w-[18%] relative">
          <SideNavDashboard />
        </div>
        <div className="mr-5 flex flex-col gap-2 md:w-[82%]">
          <Header />
          <div className="">           
              {children}
          </div>
        </div>
      </div>
          <DashboardFooter />
    </div>
  );
}
