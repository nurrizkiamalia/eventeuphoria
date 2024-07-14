"use client";

import ButtonDashboard from "@/components/Button/ButtonDashboard";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard"
import useEvent from "@/hooks/useEvent";
import { EventValues } from "@/types/datatypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FormEvent from "../components/FormEvent/FormEvent";

interface EditProps {
    params: {
      id: number;
    };
  }
  
  const EditEventPage: React.FC<EditProps> = ({ params }) => {
    const { getEvent, updateEvent } = useEvent();
    const [initialValues, setInitialValues] = useState<EventValues | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      const fetchEvent = async () => {
        const event = await getEvent(params.id);
        if (event) {
          setInitialValues({
            eventName: event.name,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            city: event.city,
            eventType: event.eventType,
            category: event.category,
            ticketTiers: event.ticketTiers || [{ tierName: "", price: 0, availableSeats: 0 }],
            vouchers: event.eventVouchers || [],
            referralQuota: event.referralQuota || 0,
            eventPicture: event.eventPicture || "",
          });
        }
        setLoading(false);
      };
      fetchEvent();
    }, [params.id, getEvent]);
  
    const handleSubmit = async (values: EventValues) => {
      const result = await updateEvent(params.id, values);
      if (result) {
        alert('Event updated successfully!');
        router.push('/my-events');
      } else {
        alert('Failed to update event. Please try again.');
      }
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
    return initialValues ? (
        <ProtectedRouteDashboard route="edit-event">
        <div className="flex items-center justify-center m-auto p-5 w-full">
          <div className="flex flex-col max-w-[800px]">
            <div className="">
              <ButtonDashboard>
                <Link href="/" className="flex items-center">
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
    
export default EditEventPage