'use client';

import { useState } from "react";
import { EventListProps } from "@/types/datatypes";
import EventAttend from "./EventAttend";
import Tickets from "./Tickets";
import useEvent from "@/hooks/useEvent";

const Sections: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("tickets");
  const { events, loading, error } = useEvent();

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <button
            className={`py-1 px-3 border rounded-xl ${
              activeSection === "tickets" ? "bg-dspDarkPurple text-white" : "text-dspGray"
            }`}
            onClick={() => setActiveSection("tickets")}
          >
            Ticket
          </button>
          <button
            className={`py-1 px-3 border rounded-xl ${
              activeSection === "events" ? "bg-dspDarkPurple text-white" : "text-dspGray"
            }`}
            onClick={() => setActiveSection("events")}
          >
            Event Attend
          </button>
        </div>
        <hr />
        <div>
          {activeSection === "tickets" && <Tickets />}
          {activeSection === "events" && <EventAttend events={events} />}
        </div>
      </div>
    </>
  );
};

export default Sections;
