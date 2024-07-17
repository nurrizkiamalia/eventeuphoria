'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEvent from "@/hooks/useEvent";
import useTransaction from "@/hooks/useTransactions";
import { useAuth } from "@/context/AuthContext";
import art from "@/public/assets/art-exhibition.webp";
import organizer from "@/public/assets/organizer1.jpg";
import BookingConfirmation from "./BookingConfirmation";
import { EventDetailsProps, CreateOrderRequest, CreateOrderResponse } from '@/types/datatypes';

const Checkout: React.FC<EventDetailsProps> = ({ params }) => {
  const { id } = params;
  const { event, fetchEventById, loading, error } = useEvent();
  const { currentUser } = useAuth();
  const { createOrder, confirmOrder, deleteOrder } = useTransaction();
  const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});
  const [voucherId, setVoucherId] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [usePointsChecked, setUsePointsChecked] = useState<boolean>(false);
  const [useReferralDiscountChecked, setUseReferralDiscountChecked] = useState<boolean>(false);
  const [orderResponse, setOrderResponse] = useState<CreateOrderResponse | null>(null);
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchEventById(id);
  }, [id, fetchEventById]);

  useEffect(() => {
    if (usePointsChecked) {
      setPoints(currentUser?.points || 0);
    } else {
      setPoints(0);
    }
    calculateTotalPrice();
  }, [selectedTickets, voucherId, points, usePointsChecked, useReferralDiscountChecked]);

  const handleTicketChange = (ticketId: number, change: number) => {
    setSelectedTickets(prev => {
      const newQuantity = (prev[ticketId] || 0) + change;
      if (newQuantity < 0) return prev;
      return { ...prev, [ticketId]: newQuantity };
    });
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoucherId = e.target.value ? Number(e.target.value) : null;
    setVoucherId(selectedVoucherId);
  };

  const calculateTotalPrice = () => {
    if (!event) return;
    let total = 0;

    event.ticketTiers.forEach((ticket) => {
      total += (selectedTickets[ticket.id] || 0) * ticket.price;
    });

    if (voucherId !== null && event.eventVouchers && event.eventVouchers[voucherId]) {
      total -= total * (event.eventVouchers[voucherId].discountPercentage / 100);
    }

    const referralDiscount = currentUser?.referralDiscount &&
      useReferralDiscountChecked &&
      event.referralQuota &&
      event.referralQuota > 0 &&
      currentUser.referralDiscount !== "this user does not have referral discount"
      ? 0.10
      : 0;

    if (referralDiscount > 0) {
      total -= total * referralDiscount;
    }

    if (usePointsChecked) {
      total -= Math.min(points, total);
    }

    if (total <= 0) {
      setVoucherId(null);
      total = 0;
    }

    setCurrentTotalPrice(total);
  };

  const handleOrderCreation = async () => {
    const tickets = Object.entries(selectedTickets).map(([ticketId, quantity]) => ({
      ticketId: Number(ticketId),
      quantity
    }));
    const orderData: CreateOrderRequest = {
      eventId: event?.id,
      tickets,
      eventVoucherId: voucherId || undefined,
      points: usePointsChecked ? points : 0,
      useDisc10: currentUser?.referralDiscount &&
        useReferralDiscountChecked &&
        event?.referralQuota &&
        event.referralQuota > 0 &&
        currentUser.referralDiscount !== "this user does not have referral discount"
        ? true
        : false
    };
    const response: any = await createOrder(orderData);
    setOrderResponse(response.data);
    setIsDrawerOpen(true);
  };

  const handleOrderConfirmation = async () => {
    if (orderResponse) {
      await confirmOrder({ orderId: orderResponse.orderId, paymentMethod: currentTotalPrice === 0 ? 'Free' : 'Bank Transfer' });
      console.log("order response",orderResponse)
      setIsDrawerOpen(false);
    }
  };

  const handleOrderCancellation = async () => {
    if (orderResponse) {
      await deleteOrder(orderResponse.orderId);
      setIsDrawerOpen(false);
      setOrderResponse(null);
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error loading event: {error}</p>;
  if (!event) return <p>Event not found.</p>;

  const imageUrl = event.eventPicture ? event.eventPicture : art.src;
  const userPoints = currentUser?.points || 0;

  return (
    <div className="p-5 lg:p-10 w-full flex flex-col gap-10">
      <h1 className="font-bold text-tXxl md:text-head3 lg:text-head2">
        Checkout Your Tickets
      </h1>
      <hr />
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex flex-col lg:flex-row items-start gap-5 lg:w-[70%]">
          <div className="flex flex-col gap-5">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={event.name}
                width={1000}
                height={500}
                className="rounded-xl object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
            <h2 className="text-tXl sm:text-tXxl md:text-head3 font-semibold">
              {event.name}
            </h2>
            <div className="flex gap-5 items-center">
              <Image
                src={event.organizer.avatar || organizer}
                alt={event.organizer.firstName && event.organizer.lastName || "organizer 1"}
                width={60}
                height={60}
                className="rounded-full border-2 border-black"
              />
              <p className="text-tMd">By {event.organizer.firstName && event.organizer.lastName || "organizer 1"}</p>
            </div>
            <div className="text-tMd flex flex-col lg:grid lg:grid-cols-2 gap-5">
              <div className="px-5 py-1 rounded-xl min-w-[150px] border border-dspDarkPurple flex flex-col justify-center items-center">
                <p>Date</p>
                <p className="font-bold lg:text-tXxl">{event.date}</p>
              </div>
              <div className="px-5 py-1 rounded-xl min-w-[150px] border border-dspDarkPurple flex flex-col justify-center items-center">
                <p>Time</p>
                <p className="font-bold lg:text-tXxl">{event.time}</p>
              </div>
              <div className="lg:col-span-2 px-5 py-1 rounded-xl min-w-[150px] border border-dspDarkPurple flex flex-col justify-center items-center">
                <p>Location</p>
                <p className="font-bold lg:text-tXxl">
                  {event.location} {event.city}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-medium text-tXl md:text-tXxl">Choose Tickets</p>
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 w-full flex-wrap">
                {event.ticketTiers && event.ticketTiers.length > 0 ? (
                  event.ticketTiers.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border border-dspDarkPurple rounded-xl hover:shadow-eventBox hover:shadow-dspPurple hover:bg-dspDarkPurple hover:text-white w-full"
                    >
                      <div className="flex flex-col p-5 justify-between gap-5 items-center">
                        <div className="flex flex-col self-start gap-2">
                          <h3 className="text-tLg lg:text-tXl font-bold capitalize">
                            {ticket.name}
                          </h3>
                          <p className="font-semibold text-tLg lg:text-tXl">
                            Rp{ticket.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 w-full justify-between">
                          <button
                            className="bg-gray-200 py-1 rounded-lg px-5 disabled:bg-gray-400"
                            onClick={() => handleTicketChange(ticket.id, -1)}
                            disabled={(selectedTickets[ticket.id] || 0) === 0}
                          >
                            -
                          </button>
                          <p>{selectedTickets[ticket.id] || 0}</p>
                          <button
                            className="bg-gray-200 py-1 rounded-lg px-5 disabled:bg-gray-400"
                            onClick={() => handleTicketChange(ticket.id, 1)}
                            disabled={(selectedTickets[ticket.id] || 0) >= ticket.totalSeats}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tickets available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] max-w-[500px] bg-white shadow-tightBoxed rounded-xl flex flex-col gap-5 p-5 h-fit">
          <p className="font-semibold text-tXl">Proceed your payment</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam nihil deserunt amet eius optio aut quis? Natus quam hic optio?</p>
          <div className="flex flex-col gap-3">
            <h3 className="text-tLg font-semibold">Voucher (optional)</h3>
            <select
              name=""
              id=""
              className="max-w-[250px] p-2 rounded-xl"
              onChange={handleVoucherChange}
            >
              <option value="">No Voucher</option>
              {event.eventVouchers?.map((item, index) => (
                <option key={index} value={index}>{item.code} - {item.discountPercentage}%</option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-tLg font-semibold">Points Available</h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={usePointsChecked}
                onChange={() => setUsePointsChecked(!usePointsChecked)}
                disabled={currentTotalPrice === 0}
              />
              <p className="text-tXl font-semibold">{userPoints}</p>
            </div>
          </div>
          <div>
            <h3 className="text-tLg font-semibold">Discount Referral</h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useReferralDiscountChecked}
                onChange={() => setUseReferralDiscountChecked(!useReferralDiscountChecked)}
                disabled={currentTotalPrice === 0 || (event.referralQuota ?? 0) <= 0 || currentUser?.referralDiscount === "this user does not have referral discount"}
              />
              <p className="text-tXl font-semibold">{currentUser?.referralDiscount && currentUser.referralDiscount !== "this user does not have referral discount" ? `Disc. 10%` : 'No Discount'}</p>
            </div>
          </div>
          <hr />
          <div className="p-5">
            <h3 className="text-tLg font-semibold">CURRENT TOTAL PRICE</h3>
            <p className="text-tXl font-semibold">Rp{currentTotalPrice}</p>
          </div>
          <BookingConfirmation
            finalPrice={currentTotalPrice}
            onConfirm={handleOrderCreation}
            onOrderConfirmation={handleOrderConfirmation}
            onOrderCancellation={handleOrderCancellation}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
