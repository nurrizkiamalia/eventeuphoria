"use client";

import ButtonDashboard from "@/components/Button/ButtonDashboard";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import UploadImage from "../components/FormEvent/UploadImage";
import { useSearchParams } from "next/navigation";

const CreateEventPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return <p>Loading...</p>;
  }

  return (
    <ProtectedRouteDashboard route="upload-image">
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
          <UploadImage eventId={Number(eventId)} />
        </div>
      </div>
    </ProtectedRouteDashboard>
  );
};

export default CreateEventPage;
