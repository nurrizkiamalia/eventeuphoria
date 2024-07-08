import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ExploreEvents from "@/components/Banner/ExploreEvents";
import PopularCity from "../components/PopularCity";
import CTA from "@/components/Banner/CTA";
import UpcomingEvents from "../components/UpcomingEvents";

export default function Home() {

  return (
    <main>
      <Hero />
      <Categories />
      <hr className=" mx-5 lg:mx-10 " />
        <UpcomingEvents /> 
      <ExploreEvents />
      <PopularCity />
      <CTA />
    </main>
  );
}
