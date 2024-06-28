import EventList from "../(root)/events/components/EventList"

const OnlineEvents: React.FC = () => {
    return(
        <>
        <div className="pt-10">
            <h2 className="font-semibold font-montserrat text-tXl px-5 lg:px-10">Best of Online Events</h2>
            <EventList />
        </div>
        </>
    )
}

export default OnlineEvents