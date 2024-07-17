import DashboardFooter from "@/components/Footer/DashboardFooter";
import Header from "@/components/DashboardHeader/DashboardHeader";
import SideNavDashboard from "@/components/SideNavDashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="flex gap-3 w-full">
        <div className="md:w-[18%]">
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
