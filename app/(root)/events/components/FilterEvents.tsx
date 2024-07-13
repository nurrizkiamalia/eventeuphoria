"use client";

import React, { useEffect, useState } from "react";
import { Event } from "@/types/datatypes";

interface FilterEventProps {
  events: Event[];
  onFilter: (filteredEvents: Event[]) => void;
  selectedCategory: string;
  selectedCity: string;
}

const prices = ["all", "free", "paid"];
const dates = ["all", "this week", "this month", "this year"];

const FilterEvent: React.FC<FilterEventProps> = ({
  events,
  onFilter,
  selectedCategory,
  selectedCity,
}) => {
  const [category, setCategory] = useState<string>(selectedCategory);
  const [price, setPrice] = useState<string>("all");
  const [date, setDate] = useState<string>("all");
  const [city, setCity] = useState<string>(selectedCity);

  const handleFilter = () => {
    let filtered = events;

    if (category !== "all") {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (price !== "all") {
      filtered = filtered.filter((event) => {
        if (price === "free") {
          return event.eventType === "Free" || event.eventType === "Free | Paid";
        }
        if (price === "paid") {
          return event.eventType === "Paid" || event.eventType === "Free | Paid";
        }
        return false;
      });
    }

    const currentDate = new Date();
    if (date !== "all") {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        if (date === "this week") {
          const startOfWeek = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
          );
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        }
        if (date === "this month") {
          const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          );
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        }
        if (date === "this year") {
          const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
          const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
          return eventDate >= startOfYear && eventDate <= endOfYear;
        }
        return false;
      });
    }

    if (city !== "all") {
      filtered = filtered.filter((event) => event.city === city);
    }

    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    onFilter(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [category, price, date, city]);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setCity(selectedCity);
  }, [selectedCity]);

  const uniqueCategories = Array.from(new Set(events.map((event) => event.category)));
  const uniqueCities = Array.from(new Set(events.map((event) => event.city)));

  const filtersRadioBtn = "flex flex-col gap-1";
  const choiceFilter = "flex gap-3 items-center capitalize";
  const labelStyle = "font-semibold  text-tXl";

  return (
    <div className="filters flex flex-col gap-5">
      <h2 className="font-bold text-head3">Filters</h2>
      <hr />
      <div className={filtersRadioBtn}>
        <label className={labelStyle}>City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="py-2 px-3 rounded-xl bg-white shadow-eventBox !font-montserrat"
        >
          <option value="all">All</option>
          {uniqueCities.map((city, index) => (
            <option value={city} key={index}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className={filtersRadioBtn}>
        <label className={labelStyle}>Category</label>
        <div className={filtersRadioBtn}>
          <div className={choiceFilter}>
            <input
              type="radio"
              name="category"
              value="all"
              checked={category === "all"}
              onChange={() => setCategory("all")}
            />
            All
          </div>
          {uniqueCategories.map((cat, index) => (
            <div className={choiceFilter} key={index}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}
              />
              {cat}
            </div>
          ))}
        </div>
      </div>
      <div className={filtersRadioBtn}>
        <label className={labelStyle}>Price</label>
        <div className={filtersRadioBtn}>
          {prices.map((priceOption, index) => (
            <div className={choiceFilter} key={index}>
              <input
                type="radio"
                name="price"
                value={priceOption}
                checked={price === priceOption}
                onChange={() => setPrice(priceOption)}
              />
              {priceOption}
            </div>
          ))}
        </div>
      </div>
      <div className={filtersRadioBtn}>
        <label className={labelStyle}>Date</label>
        <div className={filtersRadioBtn}>
          {dates.map((dateOption, index) => (
            <div className={choiceFilter} key={index}>
              <input
                type="radio"
                name="date"
                value={dateOption}
                checked={date === dateOption}
                onChange={() => setDate(dateOption)}
              />
              {dateOption}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterEvent;