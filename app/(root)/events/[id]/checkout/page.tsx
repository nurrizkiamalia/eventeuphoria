"use client";

import { EventDetailsProps } from "@/types/datatypes";
import Checkout from "./components/Checkout";

const CheckoutPage: React.FC<EventDetailsProps> = ({ params }) => {
  return (
      <Checkout params={params} />
  );
};

export default CheckoutPage;
