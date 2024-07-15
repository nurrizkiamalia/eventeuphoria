import MyEventList from "./components/MyEventList";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";

const MyEvent: React.FC = () => {
  return (
    <ProtectedRouteDashboard route="dashboard/my-event">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-tXxl">List of Event You Created</h1>
        <hr />
        <div>
          <MyEventList />
        </div>
      </div>
    </ProtectedRouteDashboard>
  );
};

export default MyEvent;
