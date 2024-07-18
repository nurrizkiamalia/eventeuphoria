"use client";
import useEvent from "@/hooks/useEvent";
import useTransaction from "@/hooks/useTransactions";
import { useEffect, useState } from "react";
import Tickets from "./Tickets";
import EventAttend from "./OrganizerEvents";
import { useAuth } from "@/context/AuthContext";

const Sections: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("tickets");
  const { events, loading: eventLoading, error: eventError } = useEvent();
  const { getOrderList, transactions, loading: transactionLoading, error: transactionError } = useTransaction();

  const { currentUser } = useAuth();

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  if (eventLoading || transactionLoading) return <p>Loading events or orders...</p>;
  if (eventError || transactionError) return <p>Error loading events or orders: {eventError || transactionError}</p>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <button
            className={`py-1 px-3 border rounded-xl ${activeSection === "tickets" ? "bg-dspDarkPurple text-white" : "text-dspGray"}`}
            onClick={() => setActiveSection("tickets")}
          >
            Ticket
          </button>
          <button
            className={`py-1 px-3 border rounded-xl ${activeSection === "events" ? "bg-dspDarkPurple text-white" : "text-dspGray"} ${currentUser?.role === "USER" ? "hidden" : "block"}`}
            onClick={() => setActiveSection("events")} 
          >
            Organizer Events
          </button>
        </div>
        <hr />
        <div>
          {activeSection === "tickets" && transactions && transactions.length > 0 && <Tickets orders={transactions} />}
          {activeSection === "tickets" && (!transactions || transactions.length === 0) && <p>No tickets found.</p>}
        </div>
      </div>
    </>
  );
};

export default Sections;