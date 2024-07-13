import EventCard from "@/app/(root)/events/components/EventCard";
import useDebouncedSearch from "@/hooks/useDebounceSearch";
import apiClient from "@/services/apiClient";
import { Event } from "@/types/datatypes";
import axios from "axios";
import { useEffect, useState } from "react";

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 1000);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('/events/search', {
          params: {
            keyword: debouncedSearchTerm,
          },
        });

        if (Array.isArray(response.data.events)) {
          const filteredEvents = response.data.events.filter((event: Event) =>
            event.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            event.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            event.city.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
          setEvents(filteredEvents);
        } else {
          console.error('Unexpected API response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [debouncedSearchTerm]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map(event => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="text-gray-700">No events found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
