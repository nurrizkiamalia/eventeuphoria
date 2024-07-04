import { Event } from "@/types/datatypes";

export const getUpcomingEvents = (events: Event[]): Event[] => {
  const currentDate = new Date();
  return events
    .filter(event => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);
};