import EventDetails from "@/app/(root)/events/components/EventDetail";
import CTA from "@/components/Banner/CTA";
import { EventDetailsProps } from "@/types/datatypes";

const EventDetailPage: React.FC<EventDetailsProps> = ({ params }) => {
    return (
        <div>
            <EventDetails params={params}/>
            <CTA />
            
        </div>
    );
};

export default EventDetailPage;