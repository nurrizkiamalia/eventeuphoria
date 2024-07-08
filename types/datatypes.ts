export interface TicketTier {
    tier: string;
    price: string;
}

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
        title: string;
        image: string;
        category: string;
        date: string;
        time: string;
        location: string;
        ticketTier: TicketTier[];
        types: 'Free' | 'Paid' | 'Free | Paid';
        organizerAvatar: string;
        organizerName: string;
        ticketsAvailable: number;
        ticketsTotal: number;
        city: string;
        description: string[]
}

export interface EventDetailsProps {
    params: {
      id: number;
    };
}

export interface Cities {
  city: string;
}