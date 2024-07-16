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
import { IoSettings } from "react-icons/io5";
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
      return `Rp${minPrice} - Rp${maxPrice}`;
    }
    return "No tickets available";
  };

  return (
    <div ref={ref} className="event-card flex gap-3 items-center justify-between border-dspLightPurple border-4 rounded-xl p-5">
      <p>{index}. </p>
      <div>
        <Image
          src={event.eventPicture || placeholderImg}
          alt="event image"
          width={100}
          height={100}
          className="rounded-xl border-2 border-dspLightPurple"
        />
      </div>
      <h3 className="font-bold text-tXl">
        <Link href={`dashboard/my-event/transaction`} className="cursor-pointer">
          {event.name}
        </Link>
      </h3>
      <p>{event.category}</p>
      <p>{getPriceRange()}</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoSettings className="text-head3 text-dspLightGray" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{event.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/upload-image?eventId=${event.id}&isUpdate=true`}>Edit Image</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/dashboard/my-event/${event.id}`}>Edit Event</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default MyEventCard;
