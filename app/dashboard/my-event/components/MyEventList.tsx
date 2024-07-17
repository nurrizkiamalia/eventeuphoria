"use client";

import React, { useEffect, useRef, useCallback } from "react";
import MyEventCard from "./MyEventCard";
import useEvent from "@/hooks/useEvent";

const MyEventList: React.FC = () => {
  const { events, fetchOrganizerEvents, loading, error, page, hasMore, setPage } = useEvent();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastEventElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );

  useEffect(() => {
    fetchOrganizerEvents(page);
  }, [fetchOrganizerEvents, page]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map((event, index) => {
        const key = `${event.id}-${index}`;
        if (events.length === index + 1) {
          return <MyEventCard ref={lastEventElementRef} key={key} event={event} index={index + 1} />;
        } else {
          return <MyEventCard key={key} event={event} index={index + 1} />;
        }
      })}
      {loading && <p>Loading more events...</p>}
    </div>
  );
};

export default MyEventList;
