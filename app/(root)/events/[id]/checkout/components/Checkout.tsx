"use client";
import { useParams } from "next/navigation";
import art from "@/public/assets/art-exhibition.webp";
import { useEffect } from "react";
import useEvent from "@/hooks/useEvent";
import Image from "next/image";
import PaymentMethod from "./PaymentMethod";
import Button from "@/components/Button/Button";
import Link from "next/link";

const Checkout: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const { event, fetchEventById, loading, error } = useEvent();

  useEffect(() => {
    fetchEventById(id);
  }, [id, fetchEventById]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error loading event: {error}</p>;
  if (!event) return <p>Event not found.</p>;

  
  const imageUrl = event.eventPicture ? `/assets/${event.eventPicture}` : art;

  return (
    <div className="p-5 lg:p-10 w-full flex flex-col gap-10">
      <h1 className=" font-bold text-tXxl md:text-head3 lg:text-head2">
        Checkout Your Tickets
      </h1>
      <hr />
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex flex-col lg:flex-row items-start gap-5 lg:w-[70%]">
          <div className="flex flex-col gap-5">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={event.eventName}
                width={1000}
                height={500}
                className="rounded-xl object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
            <h2 className=" text-tXl sm:text-tXxl md:text-head3 font-semibold ">
              {event.eventName}
            </h2>
            <div className="flex gap-5 items-center">
              <Image
                src={`/assets/${event.organizerAvatar}`}
                alt={event.organizerName}
                width={60}
                height={60}
                className="rounded-full border-2 border-black"
              />
              <p className="text-tMd ">
                {" "}
                By {event.organizerName}
              </p>
            </div>
            <div className="text-tMd flex flex-col lg:grid lg:grid-cols-2 gap-5">
              <div className=" px-5 py-1 rounded-xl min-w-[150px] border border-dspDarkPurple flex flex-col justify-center items-center">
                <p>Date</p>
                <p className="font-bold lg:text-tXxl">{event.date}</p>
              </div>
              <div className=" px-5 py-1 rounded-xl min-w-[150px] border border-dspDarkPurple flex flex-col justify-center items-center">
                <p>Time</p>
                <p className="font-bold lg:text-tXxl">{event.time}</p>
              </div>
              <div className=" lg:col-span-2 px-5 py-1 rounded-xl min-w-[150px] border border-dspDarkPurple flex flex-col justify-center items-center">
                <p>Location</p>
                <p className="font-bold lg:text-tXxl">
                  {event.location} {event.city}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-medium text-tXl md:text-tXxl ">
                Choose Tickets
              </p>
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 w-full flex-wrap">
                {event.ticketTiers.map((ticket, index) => (
                  <div
                    key={index}
                    className=" border border-dspDarkPurple rounded-xl  hover:shadow-eventBox hover:shadow-dspPurple hover:bg-dspDarkPurple hover:text-white w-full"
                  >
                    <div className=" flex flex-col p-5 justify-between gap-5 items-center ">
                      <div className="flex flex-col self-start gap-2">
                        <h3 className="text-tLg lg:text-tXl font-bold  capitalize">
                          {ticket.tierName}
                        </h3>
                        <p className="font-semibold text-tLg lg:text-tXl">Rp{ticket.price}</p>
                      </div>
                      <select name="" id="" className="min-w-[250px] text-black p-2 rounded-xl border border-dspDarkPurple">
                        <option value="">0</option>
                        <option value="">1 person</option>
                        <option value="">2 person</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:w-[30%] max-w-[500px] bg-white shadow-tightBoxed rounded-xl flex flex-col gap-5 p-5 h-fit">
          <p className=" font-semibold text-tXl">Proceed your payment</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam nihil deserunt amet eius optio aut quis? Natus quam hic optio?</p>
          <PaymentMethod />
          <div className="flex flex-col gap-3">
            <h3 className=" text-tLg font-semibold">Voucher (optional)</h3>
            <select name="" id="" className="max-w-[250px] p-2 rounded-xl">
              <option value="">No Voucher</option>
              <option value="">PROMOMANTAP disc. 10%</option>
              <option value="">PROMOGILA disc. 12%</option>
            </select>
          </div>
          <div>
            <h3 className=" text-tLg font-semibold">Points Available</h3>
            <div className="flex justify-between items-center">
              <p className="text-tXl font-semibold">20,000</p>
              <Link href="" className="underline">Use points</Link>
            </div>
          </div>
          <div>
            <h3 className=" text-tLg font-semibold">Discount Refferal</h3>
            <div className="flex justify-between items-center">
              <p className="text-tXl font-semibold">Disc. 10%</p>
              <Link href="" className="underline">Use Discount</Link>
            </div>
          </div>
          <hr />
          <div>
            <h3 className=" text-tLg font-semibold">TOTAL PRICE </h3>
            <p className="text-tXl font-semibold">150,000</p>
          </div>
          <Button className="w-fit">Checkout Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
