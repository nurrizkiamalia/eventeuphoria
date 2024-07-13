import { Event } from '@/types/datatypes';

export const getUpcomingEvents = (events: Event[]): Event[] => {
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate > new Date();
  });

  return upcomingEvents;
};
