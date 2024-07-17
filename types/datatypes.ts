export interface TicketTiers {
  id: number;
  name: string;
  price: number;
  totalSeats: number;
}

export interface TicketTier {
  name: string;
  price: number;
  totalSeats: number;
}

export interface EventValues {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  eventType: string;
  category: string;
  ticketTiers: TicketTier[];
  eventVouchers: EventVoucher[];
  referralQuota: number;
}

export interface EventByOrganizer{
    id: number;
    eventPicture: string;
    name: string;
    category: string;
    tickets: [
      {
        id: number;
        name: string;
        price: number;
        totalSeats: number;
      }
    ]
}

export interface ImgUpload{
  file: string;
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
  ticketTiers: TicketTiers[];
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

export interface CreateReview{
  eventId: number;
  orderId: number;
  rating: number;
  reviewText: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  referralCode?: string;
  avatar?: string | null;
  quotes?: string | null;
  referralDiscount?: string | null;
  role: 'USER' | 'ORGANIZER';
  points: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReviewBoxProps {
  review: CreateReview;
}

export interface Ticket {
  ticketId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  eventId?: number;
  tickets: Ticket[];
  eventVoucherId?: number;
  points?: number;
  useDisc10?: boolean;
}

export interface CreateOrderResponse {
  orderId: number;
  originalPrice: number;
  finalPrice: number;
  appliedDiscounts: {
    discountType: string;
    discountAmount: number;
  }[];
}

export interface ConfirmOrderRequest {
  orderId: number;
  paymentMethod: string;
}

export interface OrderDetailsResponse {
  id: number;
  invoice: string;
  totalPrice: number;
  totalTickets: number;
  ticketDetails: {
    ticketTier: string;
    quantity: number;
  }[];
  eventDetail: {
    id: number;
    name: string;
    category: string;
    date: string;
    time: string;
    location: string;
    city: string;
  };
}

export interface OrderListResponse {
  orders: {
    id: number;
    invoice: string;
    totalPrice: number;
    totalTickets: number;
    ticketDetails: {
      ticketTier: string;
      quantity: number;
    }[];
    eventDetail: {
      id: number;
      name: string;
      category: string;
      date: string;
      time: string;
      location: string;
      city: string;
    };
  }[];
  page: number;
  perPage: number;
  totalPages: number;
  totalOrders: number;
}