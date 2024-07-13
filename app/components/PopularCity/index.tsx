'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cities } from '@/data/data';
import { Cities } from '@/types/datatypes';

const PopularCity: React.FC = () => {
  const router = useRouter();

  const handleCityClick = (city: string) => {
    router.push(`/events?city=${city}`);
  };

  return (
    <div className="py-10 px-5 lg:px-10 flex flex-col gap-5">
      <h2 className="font-semibold text-tXl">Popular Cities</h2>
      <div className="popular-city flex gap-5 py-5 lg:gap-8 w-full h-full overflow-x-auto">
        {cities.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-center cursor-pointer"
            onClick={() => handleCityClick(item.city)}
          >
            <div className="relative rounded-2xl shadow-eventBox shadow-dspLightGray overflow-hidden">
              <Image
                src={`/assets/cities/${item.image}`}
                alt={item.city}
                width={300}
                height={300}
                className="object-cover max-w-fit h-[300px] rounded-2xl hover:scale-105"
              />
              <div className="absolute top-0 p-5 w-full h-full">
                <div className="z-10 flex justify-center h-full items-end">
                  <span className="font-bold text-tXxl text-white backdrop-blur-md py-1 px-3 rounded-2xl">
                    {item.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCity;
