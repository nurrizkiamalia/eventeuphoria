import EventList from "@/components/EventList"
import { EventListProps } from "@/types/datatypes"

const RelatedEvents: React.FC<EventListProps> = ({events}) => {
    return(
        <>
        <div className="flex w-full h-full flex-col gap-5 bg-dspSmokeWhite p-5 rounded-xl">
            <h2 className="text-tXxl font-semibold">Other events you may like</h2>
            <div className="">
                <EventList events={events} />
            </div>
        </div>
        </>
    )
}

export default RelatedEvents