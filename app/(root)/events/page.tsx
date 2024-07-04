import Events from "./components/Events";
import HeroEvents from "./components/HeroEvents";


const EventsPage: React.FC = () => {

  return (
    <div>
      <HeroEvents />
      <div className='flex flex-col lg:flex-row w-full p-5 gap-10 lg:gap-20 lg:p-10'>
        <Events />
      </div>  
    </div>
  );
};

export default EventsPage;
