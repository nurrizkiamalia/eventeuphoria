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

const MyEventCard: React.FC<MyEventCardProps> = ({ event, index }) => {
  const { deleteEvent } = useEvent();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      await deleteEvent(event.id);
      window.location.reload();
    }
  };

  return (
    <div className="event-card flex gap-3 items-center justify-between border-dspLightPurple border-4 rounded-xl p-5">
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
        <Link href={`dashboard/my-event/${event.id}`} className="cursor-pointer">
          {event.name}
        </Link>
      </h3>
      <p>{event.category}</p>
      <p>{`Rp${event.ticketTiers[0]?.price} - Rp${event.ticketTiers[event.ticketTiers.length - 1]?.price}`}</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoSettings className="text-head3 text-dspLightGray" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{event.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/my-event/${event.id}`}>Edit Event</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MyEventCard;
