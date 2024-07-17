'use client';

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PaymentMethod from "./PaymentMethod";

interface BookingConfirmationProps {
  finalPrice: number;
  onConfirm: () => void;
  onOrderConfirmation: () => void;
  onOrderCancellation: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ finalPrice, onConfirm, onOrderConfirmation, onOrderCancellation, isDrawerOpen, setIsDrawerOpen }) => {
  const handleOrderConfirmation = async () => {
    await onOrderConfirmation();
    setIsDrawerOpen(false);
  };

  const handleOrderCancellation = async () => {
    await onOrderCancellation();
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger><Button onClick={onConfirm}>Check total price</Button></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Confirm your booking</DrawerTitle>
            <DrawerDescription>
              Here is your detailed booking information for this event.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-5 flex flex-col gap-5">
            <div>
              <PaymentMethod finalPrice={finalPrice} />
            </div>
            <div className="">
              <h3 className="text-tLg font-semibold">TOTAL PRICE</h3>
              <p className="text-tXl font-semibold">Rp{finalPrice}</p>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleOrderConfirmation} className="w-fit">Buy Ticket</Button>
            <DrawerClose>
              <Button onClick={handleOrderCancellation}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BookingConfirmation;
