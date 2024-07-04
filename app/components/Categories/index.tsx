'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Category {
  image: string;
  category: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  const handleCategoryClick = (category: string) => {
    router.push(`/events?category=${category}`);
  };

  return (
    <div className="categories flex items-center justify-between w-full gap-5 p-5 lg:p-10 overflow-x-auto">
      {categories.map((item, index) => (
        <div
          key={index}
          className="w-full p-5 rounded-2xl flex flex-col gap-3 cursor-pointer hover:shadow-eventBox hover:shadow-dspLightPurple hover:scale-105 transition-all duration-500 hover:bg-dspDarkPurple hover:text-white text-center"
          onClick={() => handleCategoryClick(item.category)}
        >
          <div className="rounded-full bg-dspLightPurple p-5">
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
