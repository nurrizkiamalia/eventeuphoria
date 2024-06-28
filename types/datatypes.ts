export interface TicketTier {
    tier: string;
    price: string;
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
      id: string;
    };
}