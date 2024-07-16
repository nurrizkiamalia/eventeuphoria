import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import Transaction from "./components/Transaction";

const TransactionPage: React.FC = () => {
  return (
    <ProtectedRouteDashboard>
    <>
    <div className="flex flex-col gap-5 ">
        <h2 className="font-bold text-tXxl">Transaction for This Event</h2>
        <hr />
        <div>
            <Transaction />    
        </div>
    </div>
    </>
    </ProtectedRouteDashboard>
  );
};

export default TransactionPage;
