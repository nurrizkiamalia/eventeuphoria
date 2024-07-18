"use client";

import Image from "next/image";
import { OrderDetailsResponse } from "@/types/datatypes";
import featuredImg from "@/public/assets/art-exhibition.webp";
import { useRouter } from "next/navigation";


interface TicketsProps {
  orders: OrderDetailsResponse[];
}

const Tickets: React.FC<TicketsProps> = ({ orders }) => {
  const router = useRouter();
  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {orders.map(order => (
        <div key={order.id} className="flex text-white justify-center">
          <div className="flex flex-col justify-center gap-3 p-5 bg-black rounded-l-xl rounded-r-3xl border-r-2 border-white border-dashed w-[40%]">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={order.eventDetail?.eventPicture || featuredImg}
                alt="image"
                width={300}
                height={300}
                className="rounded-xl hover:scale-105 transition-all"
              />
            </div>
            <div className="">
              <p>{order.eventDetail?.date}</p>
              <p>{order.eventDetail?.date && new Date(order.eventDetail.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 p-5 bg-dspDarkPurple rounded-l-3xl rounded-r-xl w-[60%]">
            <div>
              <button className="font-bold text-tXl capitalize" onClick={() => router.push(`/events/${order.eventDetail.id}`)}>{order.eventDetail?.name}</button>
              <h3 className="font-bold">{order.eventDetail?.category}</h3>
              <p className="text-tLg font-medium text-dspSmokeWhite">
                {order.eventDetail?.city}, {order.eventDetail?.location}
              </p>
            </div>
            <hr className="border-dashed" />
            <div className="">
              <p>Total price</p>
              <p className="">IDR <span className="font-bold text-tLg">{order.totalPrice}</span> for {order.totalTickets} tickets</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
