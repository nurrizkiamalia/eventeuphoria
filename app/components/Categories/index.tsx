'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { categories } from '@/data/data'; // Correct import

const Categories: React.FC = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/events?category=${category}`);
  };

  return (
    <div className="categories flex items-center justify-between w-full gap-5 p-5 lg:p-10 overflow-x-auto">
      {categories.map((item, index) => ( // Correct usage of categories
        <div
          key={index}
          className="w-full p-5 rounded-2xl flex flex-col items-center gap-3 cursor-pointer hover:shadow-eventBox hover:shadow-dspLightPurple hover:scale-105 transition-all duration-500 hover:bg-dspDarkPurple hover:text-white text-center"
          onClick={() => handleCategoryClick(item.category)}
        >
          <div className="rounded-full bg-dspLightPurple w-fit p-5">
            <Image
              alt={`${item.category} image`}
              src={`/assets/icons/${item.image}`}
              width={50}
              height={50}
              className="max-w-fit"
            />
          </div>
          <h2 className="whitespace-nowrap font-sourceSans font-semibold">
            {item.category}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Categories;
