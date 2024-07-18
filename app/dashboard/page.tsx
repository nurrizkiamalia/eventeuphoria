import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import DashboardChart from "./components/DashboardChart";
import TotalRevenueDashboard from "./components/TotalRevenueChart";
import TotalTicketsDashboard from "./components/TotalTicketsChart";
import WelcomeBack from "./components/WelcomeBack";

const Dashboard: React.FC = () => {
  return (
    <>
    <ProtectedRouteDashboard>
      <div className="w-full flex flex-col lg:flex-row gap-5 ">
        <div className="flex flex-col gap-5 lg:w-[70%] ">
          <WelcomeBack />
          <div className=" flex flex-col gap-3 w-full h-fit bg-white shadow-boxed shadow-gray-300 p-5 rounded-xl text-tMd">
            <h1 className="text-tXxl font-bold">Sales Visualization</h1>
            <hr />
            <DashboardChart />
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:w-[30%]">
          <div className="bg-white flex flex-col gap-3 shadow-boxed shadow-gray-300 rounded-xl p-5">
            <h2 className="font-bold text-tLg">Total Revenue</h2>
            <hr />
            <TotalRevenueDashboard />
          </div>
          <div className="bg-white flex flex-col gap-3 shadow-boxed shadow-gray-300  rounded-xl p-5">
            <h2 className="font-bold text-tLg">Total Tickets Sold</h2>
            <hr />
            <TotalTicketsDashboard />
          </div>
        </div>
      </div>
      </ProtectedRouteDashboard>
    </>
  );
};

export default Dashboard;
