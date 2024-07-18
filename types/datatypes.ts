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

export interface Review {
  id: number;
  rating: number;
  reviewText: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

export interface ReviewBoxProps {
  review: {
    id: number;
    rating: number;
    reviewText: string;
    user: {
      firstName: string;
      lastName: string;
      avatar: string | null;
    };
  };
}

export interface CreateReviewData {
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

export interface TicketDetails {
  ticketTier: string;
  quantity: number;
}

export interface EventDetail {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  city: string;
  eventPicture: string;
}

export interface OrderDetailsResponse {
  id: number;
  invoice: string;
  eventName: string;
  totalPrice: number;
  totalTickets: number;
  paymentMethod: string;
  ticketDetails: TicketDetails[];
  eventDetail: EventDetail;
  customerDetails?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
}

export interface OrderListUser {
  orders: OrderDetailsResponse[];
  page: number;
  perPage: number;
  totalPages: number;
  totalOrders: number;
}

export interface OrderListResponse {
  orders: OrderDetailsResponse[];
  page: number;
  perPage: number;
  totalPages: number;
  totalOrders: number;
}

export interface TransactionListOrganizer {
  totalAmount: number;
  orders: OrderDetailsResponse[];
}


export interface Transaction{
  orderId: number;
  invoice: string;
  eventName: string;
  paymentMethod: string;
  totalTickets: number;
  totalPrice: number;
  customerDetails: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
}

export interface TicketSale {
  soldSeats: number;
  saleDetails: {
    eventCategory: string;
    totalTicketSold: number;
    revenuePercentage: number;
  }[];
}

export interface Revenue {
  totalRevenue: number;
  events: {
    name: string;
    revenue: number;
    percentage: number;
  }[];
}

export interface ComprehensiveRevenue {
  yearlyRevenue: { year: number; revenue: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
  dailyRevenue: { date: string; revenue: number }[];
  totalYearlyRevenue: number;
  totalMonthlyRevenue: number;
  totalDailyRevenue: number;
}