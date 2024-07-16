"use client";

import ButtonDashboard from "@/components/Button/ButtonDashboard";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import useEvent from "@/hooks/useEvent";
import { EventValues } from "@/types/datatypes";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FormEvent from "@/app/(event)/components/FormEvent/FormEvent";

const EditEvent: React.FC = () => {
  const { getEvent, updateEvent } = useEvent();
  const [initialValues, setInitialValues] = useState<EventValues | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      const event = await getEvent(id);
      console.log("this event", event.data);
      if (event) {
        setInitialValues({
          name: event.data.name || "",
          description: event.data.description || "",
          date: event.data.date || "",
          time: event.data.time || "",
          location: event.data.location || "",
          city: event.data.city || "",
          eventType: event.data.eventType || "",
          category: event.data.category || "",
          ticketTiers: event.data.ticketTiers || [{ name: "", price: 0, totalSeats: 0 }],
          eventVouchers: event.data.eventVouchers || [],
          referralQuota: event.data.referralQuota || 0,
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = useCallback(async (values: EventValues) => {
    if (!id) return;
    const result = await updateEvent(id, values);
    if (result) {
      alert("Event updated successfully!");
      router.push("/dashboard/my-event");
    } else {
      alert("Failed to update event. Please try again.");
    }
  }, [id, updateEvent, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return initialValues ? (
    <ProtectedRouteDashboard>
      <div className="flex items-center justify-center m-auto p-5 w-full">
        <div className="flex flex-col max-w-[800px]">
          <div className="">
            <ButtonDashboard>
              <Link href="/dashboard/my-event" className="flex items-center">
                <FaArrowLeft className="mr-2" /> Back
              </Link>
            </ButtonDashboard>
            <h1 className="font-bold text-head3 mt-4">Edit Event</h1>
          </div>
          <FormEvent initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
      </div>
    </ProtectedRouteDashboard>
  ) : (
    <p>Event not found.</p>
  );
};

export default EditEvent;
