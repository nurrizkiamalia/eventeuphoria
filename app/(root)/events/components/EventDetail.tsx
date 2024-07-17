'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCalendarDate } from 'react-icons/bs';
import { GiTicket } from 'react-icons/gi';
import { IoTimeOutline } from 'react-icons/io5';
import { MdMapsHomeWork, MdOutlineCategory } from 'react-icons/md';
import { formatDate } from '@/utils/formatDate';
import useEvent from '@/hooks/useEvent';
import { EventDetailsProps } from '@/types/datatypes';
import RelatedEvents from './RelatedEvents';
import Review from './Review/Review';
import art from '@/public/assets/art-exhibition.webp';
import organizer from "@/public/assets/organizer1.jpg";
import Button from '@/components/Button/Button';

const EventDetails: React.FC<EventDetailsProps> = ({ params }) => {
  const { event, events, loading, error, fetchEventById, fetchEventsByCategory } = useEvent();

  useEffect(() => {
    if (params.id) {
      fetchEventById(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (event?.category) {
      fetchEventsByCategory(event.category);
    }
  }, [event]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event: {error}</p>;
  if (!event) return <p>Event not found.</p>;

  const relatedEvents = events.filter(e => e.id !== event.id);

  const imageUrl = event.eventPicture ? event.eventPicture : art.src;

  return (
    <div className="p-5 lg:p-10 flex flex-col gap-10">
      <div className="">
        <h1 className="text-tXxl md:text-head3 lg:text-head2 font-bold">
          {event.name}
        </h1>
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <p className="font-medium text-gray-500">
            {formatDate(event.date)} - {event.time}{" "}
          </p>
          <p className="font-semibold uppercase">{event.eventType}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-5 lg:w-[70%]">
          <div className="rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={event.name}
              width={1000}
              height={1000}
              className="object-contain rounded-xl hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-tXl font-bold">
              Description
            </span>
            {event.description.split('\n').map((desc, index) => (
              <p className="text-dspGray md:text-tMd lg:text-tLg" key={index}>
                {desc}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="p-10 shadow-tightBoxed shadow-gray-400 rounded-xl flex flex-col gap-5 max-w-[500px]">
            <h2 className="text-tLg lg:text-tXl font-bold">Details</h2>
            <div className="flex gap-5 items-start">
              <BsCalendarDate className="text-tXl" />
              <div>
                <h3 className="font-semibold text-tLg">Date: </h3>
                <p className="text-dspGray">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <IoTimeOutline className="text-tXl" />
              <div className="">
                <h3 className="font-semibold text-tLg">Time: </h3>
                <p className="text-dspGray">{event.time}</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <GiTicket className="text-tXl" />
              <div>
                <h3 className="font-semibold text-tLg">Price: </h3>
                {event.ticketTiers && event.ticketTiers.length > 0 ? (
                  event.ticketTiers.map((item, index) => (
                    <p className="text-dspGray" key={index}>
                      <span className="font-medium capitalize text-tLg">
                        {item.name}
                      </span>{" "}
                      : {item.price} IDR
                    </p>
                  ))
                ) : (
                  <p className="text-dspGray">No tickets available</p>
                )}
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <MdOutlineCategory className="text-tXl" />
              <div>
                <h3 className="font-semibold text-tLg">Category: </h3>
                <p className="text-dspGray">{event.category}</p>
              </div>
            </div>
          </div>
          <div className="p-10 shadow-tightBoxed shadow-gray-400 rounded-xl flex items-center gap-5 max-w-[500px]">
            <Image
              src={event.organizer.avatar || organizer}
              alt={event.organizer.firstName}
              width={80}
              height={80}
              className="rounded-full border-2 border-black"
            />
            <div>
              <h2 className="text-tXl font-bold">Organizer</h2>
              <p className="font-semibold">{event.organizer.firstName || "Organizer"}</p>
              <Link href="/" className="underline">
                view profile
              </Link>
            </div>
          </div>
          <div className="p-10 shadow-tightBoxed shadow-gray-400 rounded-xl flex flex-col gap-5 max-w-[500px]">
            <h2 className="text-tXl font-bold">Location</h2>
            <div className="flex gap-5">
              <MdMapsHomeWork className="text-tXl" />
              <div>
                <p className="font-bold text-tLg">{event.city}</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-boxed shadow-gray-300 p-5 lg:p-10 lg:w-[65%] rounded-xl flex flex-col gap-5 items-start border border-dspLightGray">
        <h2 className="font-bold text-tXl">Reserve Your Ticket Now</h2>
        <p>
          Fusce aliquam nunc sit amet dolor accumsan, non blandit elit
          porttitor. Suspendisse sapien tellus, ultrices non odio sed, ultrices
          accumsan eros.
        </p>
        <Button>
          <Link href={`/events/${event.id}/checkout`}>Book Ticket</Link>
        </Button>
      </div>
      <div className="self-start lg:w-[65%]">
        <Review eventId={event.id} />
      </div>
      <div>
        <RelatedEvents events={relatedEvents} />
      </div>
    </div>
  );
};

export default EventDetails;
