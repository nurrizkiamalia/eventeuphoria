"use client";
import Button from "@/components/Button/Button";
import { Event, EventDetailsProps } from "@/types/datatypes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { GiTicket } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { MdMapsHomeWork } from "react-icons/md";

const EventDetails: React.FC<EventDetailsProps> = ({ params }) => {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchEvent = async () => {
        const response = await axios.get(
          `http://localhost:8080/events/${params.id}`
        );
        setEvent(response.data);
      };
      fetchEvent();
    }
  }, [params.id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col relative w-full h-[70vh]">
        <div className="bg-black opacity-50 top-0 left-0 absolute h-full w-full z-0 "></div>
        <div className=" absolute h-full w-full -z-10">
          <Image
            src={`/assets/${event.image}`}
            alt={event.title}
            layout="fill"
            className="object-cover object-bottom"
          />
        </div>
        <div className="z-10 w-full h-full flex flex-col justify-center p-5 lg:p-10 text-white gap-5 lg:gap-10 relative">
          <h1 className=" text-head3 lg:text-head1 uppercase font-bold font-montserrat">
            {event.title}
          </h1>
          <p className="lg:text-tXl font-bold font-montserrat border-2 border-dspPurple bg-dspDarkPurple text-white w-fit px-5 rounded-xl shadow-eventBox shadow-dspLightPurple ">
            {event.category}
          </p>
        </div>
      </div>
      <div className="flex flex-col p-5 lg:p-10 gap-10 lg:flex-row w-full">
        <div className="z-10 flex flex-col gap-5 lg:gap-10 lg:w-[60%] ">
            <div className="flex flex-col gap-3">
              <h2 className="text-tXxl font-bold">Event Details</h2>
              <p className="flex gap-3 items-center font-medium">
                <strong className="text-dspLightGray flex gap-3 items-center "> <BsCalendarDate className="text-tXl"/> Date start</strong>{" "}
                {event.date}
              </p>
              <p className="flex gap-3 items-center font-medium">
                <strong className="text-dspLightGray flex gap-3 "> <IoTimeOutline className="text-tXl"/> Time</strong> {event.time}{" "}
                - finish
              </p>
            </div>
            <div>
              <h2 className="text-tXxl font-bold">Location</h2>
              <p className="font-medium flex items-center gap-3">
                {" "}
                <MdMapsHomeWork className="text-tXl text-dspLightGray font-medium" />{" "}
                {event.location} in {event.city}{" "}
              </p>
            </div>
          <div className="flex flex-col gap-5">
            <span className="text-tXxl font-bold">Description</span>
            {event.description.map((desc, index) => (
              <p className="text-dspGray xl:w-[80%]" key={index}>
                {desc}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-5 lg:gap-10">
            <div className="flex gap-5 items-center shadow-eventBox shadow-dspPurple p-3 rounded-xl w-fit text-white bg-black">
              <Image
                src={`/assets/${event.organizerAvatar}`}
                alt={event.title}
                width={60}
                height={60}
                className="object-cover rounded-full border-2 border-dspPurple"
              />
              <div className="font-semibold text-tLg">
                <p className="text-tMd ">Organized by</p>
                <p className="font-montserrat "> {event.organizerName}</p>
                <Link href="" className="mt-2 underline text-tXs">
                  View profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:w-[40%] flex justify-center my-10 lg:my-0">
          <div className="shadow-eventBox shadow-dspPurple p-5 rounded-xl flex flex-col gap-5 bg-white h-fit w-full lg:sticky max-w-[400px]">
            <h2 className="text-tXxl font-bold">Buy Ticket</h2>
            <hr className=" " />
            <div className=" text-dspSmokeWhite">
              <p className="text-tLg font-semibold capitalize text-black">
                ticket information
              </p>
              {event.ticketTier.map((item, index) => (
                <div key={index} className="bg-dspDarkPurple my-1 p-2 rounded-xl flex items-center">
                  <h3 className="capitalize font-bold flex gap-3 items-center text-tLg">
                    {" "}
                    <span className="bg-white p-2 rounded-full"><GiTicket className="text-orange-400 text-tLg" /></span>  {item.tier}:{" "} 
                    {item.price} IDR
                  </h3>
                </div>
              ))}
            </div>
            <p>
              <strong>Tickets Available:</strong> {event.ticketsAvailable} /{" "}
              {event.ticketsTotal}
            </p>
            <Button className="flex gap-3 items-center border hover:bg-dspDarkPurple hover:shadow-eventBox hover:shadow-dspLightPurple w-fit">
              {" "}
              <GiTicket /> Book Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
