import { EventListProps } from "@/types/datatypes";
import EventCard from "../../events/components/EventCard";

const EventAttend: React.FC<EventListProps> = ({ events }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default EventAttend;
