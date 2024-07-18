"use client";

import { EventDetailsProps } from "@/types/datatypes";
import Checkout from "./components/Checkout";
import ProtectedRoute from "@/components/ProtectedRoute";

const CheckoutPage: React.FC<EventDetailsProps> = ({ params }) => {
  return (
    <ProtectedRoute>
      <Checkout params={params} />
    </ProtectedRoute>
  );
};

export default CheckoutPage;
