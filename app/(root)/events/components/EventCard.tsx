import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdMapsHomeWork } from 'react-icons/md';
import { GiTicket } from 'react-icons/gi';
import { Event } from '@/types/datatypes';
import { formatDate } from '@/utils/formatDate';
import art from '@/public/assets/art-exhibition.webp';
import organizer from "@/public/assets/organizer1.jpg";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const priceDisplay = event.ticketTiers && event.ticketTiers.length > 0
    ? event.ticketTiers.length > 1 
      ? `start Rp${event.ticketTiers[0].price}` 
      : `Rp${event.ticketTiers[0].price}` 
    : 'No tickets available';

  const imageUrl = event.eventPicture ? event.eventPicture : art.src;

  return (
    <div
      key={event.id}
      className="bg-white shadow-eventBox hover:shadow-dspLightGray rounded-2xl flex flex-col gap-2 justify-start hover:scale-105 transition-all duration-500"
    >
      <div className="relative rounded-t-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="image"
          width={1000}
          height={500}
          className="rounded-t-2xl object-cover max-w-fit h-[200px] object-center hover:scale-105 transition-all duration-500"
        />
        <div className="absolute bottom-0 bg-transparent rounded-bl-2xl rounded-tr-2xl py-1 px-5 backdrop-blur-md">
          <p className="text-tMd text-white font-medium">{event.category}</p>
        </div>
      </div>
      <div className="px-5 py-2">
        <h3 className="font-bold text-tXl">
          <Link href={`/events/${event.id}`}>{event.name}</Link>
        </h3>
        <div className="flex justify-between gap-1">
          <div>
            <p>
              {formatDate(event.date)} {event.time}{" "}
            </p>
            <p className="flex gap-2 items-center">
              <MdMapsHomeWork />
              {event.city}
            </p>
            <p className="text-tMd font-bold flex gap-2 items-center">
              <GiTicket />
              {priceDisplay}
            </p>
            <div className="flex items-center gap-2 my-5">
              <Image
                src={event.organizer.avatar || organizer}
                alt="organizer"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-dspLightGray">{event.organizer.firstName || "Organizer"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
