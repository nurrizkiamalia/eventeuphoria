import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import SideNavList from "./SideNavList/SideNavList";

const SideNavDashboard: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-semibold text-gray-800 p-4">Event Platform</div>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SideNavList />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-gray-600">© 2025 Event Platform</div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNavDashboard;
