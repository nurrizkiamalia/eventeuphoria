'use client';

import { useState, useEffect } from "react";
import useEvent from "@/hooks/useEvent";
import { Event } from "@/types/datatypes";
import FilterEvent from "./FilterEvents";
import EventCard from "./EventCard";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import useDebouncedSearch from "@/hooks/useDebounceSearch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BiFilter } from "react-icons/bi";

const Events: React.FC = () => {
  const { events, loading, error, fetchAllEvents } = useEvent();
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "all";
  const queryCity = searchParams.get("city") || "all";
  const querySearch = searchParams.get("search") || "";

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>(queryCategory);
  const [city, setCity] = useState<string>(queryCity);
  const [visibleEvents, setVisibleEvents] = useState<number>(9);
  const [searchTerm, setSearchTerm] = useState<string>(querySearch);

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  useEffect(() => {
    setCategory(queryCategory);
  }, [queryCategory]);

  useEffect(() => {
    setCity(queryCity);
  }, [queryCity]);

  useEffect(() => {
    setSearchTerm(querySearch);
  }, [querySearch]);

  useEffect(() => {
    let filtered = events;

    if (category !== "all") {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (city !== "all") {
      filtered = filtered.filter((event) => event.city === city);
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.city.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, category, city, debouncedSearchTerm]);

  const handleShowMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 6);
  };

  const filteredAndLimitedEvents = filteredEvents.slice(0, visibleEvents);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10">
      <div className="flex flex-col lg:w-[25%]">
        <div className="hidden lg:block">
          <FilterEvent
            events={events}
            onFilter={setFilteredEvents}
            selectedCategory={category}
            selectedCity={city}
          />
        </div>
        <Sheet>
          <SheetTrigger className="bg-dspDarkPurple text-white py-2 px-5 w-fit lg:hidden rounded-xl flex gap-3 items-center">
            <BiFilter className="text-tXl" />
            <span className="underline font-semibold">Filter events</span>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-10 overflow-y-auto">
            <FilterEvent
              events={events}
              onFilter={setFilteredEvents}
              selectedCategory={category}
              selectedCity={city}
            />
          </SheetContent>
        </Sheet>
      </div>
      <hr className="lg:hidden" />
      <div className="flex flex-col items-center gap-5 lg:gap-10 lg:w-[75%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredAndLimitedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {visibleEvents < filteredEvents.length && (
          <Button onclick={handleShowMore}>Show more events</Button>
        )}
      </div>
    </div>
  );
};

export default Events;
