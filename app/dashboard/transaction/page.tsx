import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import Transaction from "./components/Transaction";

const TransactionPage: React.FC<{ params: { id: number } }> = ({ params }) => {
  return (
    <ProtectedRouteDashboard>
      <>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-tXxl">Transaction for This Event</h2>
          <hr />
          <div>
            <Transaction eventId={params.id} />
          </div>
        </div>
      </>
    </ProtectedRouteDashboard>
  );
};

export default TransactionPage;
