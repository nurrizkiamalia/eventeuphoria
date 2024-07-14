"use client";

import ButtonDashboard from "@/components/Button/ButtonDashboard";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import Link from "next/link";
import FormEvent from "../components/FormEvent/FormEvent";
import { FaArrowLeft } from "react-icons/fa";
import { EventValues } from "@/types/datatypes";
import useEvent from "@/hooks/useEvent";
import { useRouter } from "next/navigation";

const CreateEventPage: React.FC = () => {
  const { postEvent } = useEvent();
  const router = useRouter();

  const initialValues: EventValues = {
    eventName: "",
    description: "",
    date: "",
    time: "",
    location: "",
    city: "",
    eventType: "",
    category: "",
    ticketTiers: [{ name: "", price: 0, totalSeats: 0 }],
    vouchers: [],
    referralQuota: 0,
    eventPicture: "",
  };

  const handleSubmit = async (values: EventValues) => {
    const result = await postEvent(values);
    if (result) {
      alert('Event created successfully!');
      router.push(`/upload-image`);
    } else {
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <ProtectedRouteDashboard route="create-event">
      <div className="flex items-center justify-center m-auto p-5 w-full">
        <div className="flex flex-col max-w-[800px]">
          <div className="">
            <ButtonDashboard>
              <Link href="/" className="flex items-center">
                <FaArrowLeft className="mr-2" /> Back
              </Link>
            </ButtonDashboard>
            <h1 className="font-bold text-head3 mt-4">Create Your Own Event</h1>
          </div>
          <FormEvent initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
      </div>
    </ProtectedRouteDashboard>
  );
};

export default CreateEventPage;
