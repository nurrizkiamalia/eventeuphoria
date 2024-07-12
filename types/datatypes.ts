
export interface EventListProps {
  events: Event[];
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  isOrganizer: boolean;
  organizerName?: string;
}

export interface Event {
  id: number;
  eventName: string;
  eventPicture: string;
  category: string;
  date: string;
  time: string;
  location: string;
  ticketTiers: TicketTier[];
  eventType: 'Free' | 'Paid' | 'Free | Paid';
  organizerAvatar: string;
  organizerName: string;
  ticketsAvailable: number;
  ticketsTotal: number;
  city: string;
  description: string[];
}

export interface TicketTier {
  tierName: string;
  price: number;
  availableSeats: number;
}


export interface EventDetailsProps {
  params: {
    id: number;
  };
}


export interface Cities {
  city: string;
}

export interface reviewProps{
  id: number;
  review: string;
  rating: number;
}