"use client";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import EventList from "./events/components/EventList";
import ExploreEvents from "@/components/Banner/ExploreEvents";
import PopularCity from "../components/PopularCity";
import CTA from "@/components/Banner/CTA";
import SearchInput from "@/components/Search/SearchInput";
import SearchResults from "@/components/Search/SearchResult";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main>
      <Hero />
      <Categories />
      <div className="container p-5 lg:p-10 flex flex-col gap-5">
        <SearchInput onSearch={setSearchTerm} />
        {searchTerm ? <SearchResults searchTerm={searchTerm} /> : <EventList />}
      </div>
      <ExploreEvents />
      <PopularCity />
      <CTA />
    </main>
  );
}
