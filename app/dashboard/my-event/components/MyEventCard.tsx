import React, { forwardRef } from "react";
import useEvent from "@/hooks/useEvent";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { GiTicket } from "react-icons/gi";
import placeholderImg from "@/public/assets/art-exhibition2.webp";
import Link from "next/link";
import { Event } from "@/types/datatypes";

interface MyEventCardProps {
  event: Event;
  index: number;
}

const MyEventCard = forwardRef<HTMLDivElement, MyEventCardProps>(({ event, index }, ref) => {
  const { deleteEvent } = useEvent();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      await deleteEvent(event.id);
      window.location.reload();
    }
  };

  const getPriceRange = () => {
    if (event.ticketTiers && event.ticketTiers.length > 0) {
      const prices = event.ticketTiers.map(tier => tier.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      console.log("price",prices);
      return `Rp${minPrice} - Rp${maxPrice}`;
    }
    return "No tickets available";
  };

  return (
    <div ref={ref} className="event-card flex flex-col gap-3 justify-between border-dspLightPurple border-4 rounded-xl p-5">
      <div className="overflow-hidden rounded-xl border-2 border-dspLightPurple">
        <Image
          src={event.eventPicture || placeholderImg}
          alt="event image"
          width={700}
          height={300}
          className="rounded-xl border-2 h-[200px] object-cover border-dspLightPurple hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-tLg">
          <Link href={`/events/${event.id}`} className="cursor-pointer">
            {event.name}
          </Link>
        </h3>
        <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDotsVertical className="text-tXl text-dspLightGray" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{event.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/events/${event.id}`} className="w-full">View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/upload-image?eventId=${event.id}&isUpdate=true`} className="w-full">Update Image</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/dashboard/my-event/${event.id}`} className="w-full">Edit Event</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="w-full">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      <hr />
      <p className="flex gap-3 items-center font-medium text-tMd"><MdOutlineCategory />{event.category}</p>
      <p className="flex gap-3 items-center font-medium text-tMd"><GiTicket />{getPriceRange()}</p>
    </div>
  );
});

MyEventCard.displayName = 'MyEventCard';

export default MyEventCard;
