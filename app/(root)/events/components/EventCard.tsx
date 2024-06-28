import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/datatypes";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const priceDisplay = event.ticketTier.length > 1
        ? `start Rp${event.ticketTier[1].price}`
        : `Rp${event.ticketTier[0].price}`;

  return (
    <div
            key={event.id}
            className="shadow-eventBox shadow-dspLightGray rounded-2xl p-5 flex flex-col gap-2 justify-between "
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={`/assets/${event.image}`}
                alt="image"
                width={1000}
                height={500}
                className="rounded-2xl object-cover max-w-fit h-[200px] object-center hover:scale-105 transition-all duration-500"
              />
              <div className="absolute bottom-0 bg-transparent rounded-bl-2xl rounded-tr-2xl py-1 px-5 backdrop-blur-md">
                <p className="text-tMd text-white font-medium">{event.category}</p>
              </div>
            </div>
            <h3 className="font-montserrat font-bold text-tMd md:text-tLg">
              <Link href={`/events/${event.id}`}>{event.title}</Link>
            </h3>
            <div className="flex justify-between gap-1">
              <div>
                <p>
                  {event.date} {event.time}{" "}
                </p>
                <p>{event.location} </p>
                <p className="text-tMd font-bold">{priceDisplay} </p>
                <div className="flex items-center gap-2 my-5">
                  <Image
                    src={`/assets/${event.organizerAvatar}`}
                    alt="organizer"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-dspLightGray">{event.organizerName} </p>
                </div>
                <p className="text-tXs font-bold">
                  {" "}
                  {event.ticketsAvailable}{" "}
                  <span className="text-dspLightGray">
                    from {event.ticketsTotal}
                  </span>{" "}
                  available{" "}
                </p>
              </div>
              <div className="w-[40%] text-right">
                <p className="font-semibold text-tMd md:text-tLg">
                  {event.types}{" "}
                </p>
              </div>
            </div>
          </div>
  )
}

export default EventCard;