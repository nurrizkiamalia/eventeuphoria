export interface TicketTier {
  name: string;
  price: number;
  totalSeats: number;
}

export interface EventValues {
  eventName: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  eventType: string;
  category: string;
  ticketTiers: TicketTier[];
  vouchers: Voucher[];
  referralQuota: number;
  eventPicture: string;
}

export interface TicketTier {
  name: string;
  price: number;
  totalSeats: number;
}

export interface Voucher {
  voucherName: string;
  discountAmount: number;
  expiryDate: string;
}

export interface EventVoucher {
  code: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
}

export interface Organizer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  eventType: string;
  category: string;
  referralQuota?: number;
  ticketTiers: TicketTier[];
  eventVouchers?: EventVoucher[];
  eventPicture?: string;
  organizer: Organizer;
}

export interface EventDetailsProps {
  params: {
    id: number;
  };
}

export interface EventListProps {
  events: Event[];
}

export interface Cities {
  image: string;
  city: string;
}

export interface Categories {
  image: string;
  category: string;
}

export interface ReviewProps {
  id: number;
  review: string;
  rating: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  referralCode?: string;
  avatar?: string | null;
  quotes?: string | null;
  role: 'USER' | 'ORGANIZER';
  points: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReviewProps{
  review: string;
  rating: number;
}