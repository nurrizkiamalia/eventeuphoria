import { Event } from "@/types/datatypes";
import EventCard from "../../events/components/EventCard";

interface EventAttendProps {
  events: Event[];
}

const EventAttend: React.FC<EventAttendProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No attended events found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventAttend;