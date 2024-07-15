'use client';

import { useState, useEffect, useRef } from "react";
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
  const { loading, error, fetchAllEvents } = useEvent();
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "all";
  const queryCity = searchParams.get("city") || "all";
  const querySearch = searchParams.get("search") || "";

  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>(queryCategory);
  const [city, setCity] = useState<string>(queryCity);
  const [searchTerm, setSearchTerm] = useState<string>(querySearch);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);
  const hasMore = useRef<boolean>(true);

  useEffect(() => {
    const loadEvents = async () => {
      let allEventsFetched: Event[] = [];
      let currentPage = 0;
      let morePages = true;

      while (morePages) {
        const data = await fetchAllEvents(currentPage);
        if (data) {
          allEventsFetched = [
            ...allEventsFetched,
            ...data.events.filter(
              (event: any) => !allEventsFetched.some(prevEvent => prevEvent.id === event.id)
            )
          ];
          currentPage++;
          morePages = currentPage < data.totalPages;
        } else {
          morePages = false;
        }
      }

      setAllEvents(allEventsFetched);
      setTotalPages(currentPage);
    };

    loadEvents();
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
    let filtered = [...allEvents];

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

    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setEvents(filtered);
  }, [allEvents, category, city, debouncedSearchTerm]);

  const handleShowMore = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10">
      <div className="flex flex-col lg:w-[25%]">
        <div className="hidden lg:block">
          <FilterEvent
            events={allEvents}
            onFilter={setEvents}
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
              events={allEvents}
              onFilter={setEvents}
              selectedCategory={category}
              selectedCity={city}
            />
          </SheetContent>
        </Sheet>
      </div>
      <hr className="lg:hidden" />
      <div className="flex flex-col items-center gap-5 lg:gap-10 lg:w-[75%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {events.slice(0, (page + 1) * 9).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {(page + 1) * 9 < events.length && (
          <Button onclick={handleShowMore}>Show more events</Button>
        )}
      </div>
    </div>
  );
};

export default Events;
