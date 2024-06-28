import { cities } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

const PopularCity: React.FC = () => {
  return (
    <>
      <div className=" py-10 px-5 lg:px-10 flex flex-col gap-5">
        <h2 className="font-semibold font-montserrat text-tXl">
          Popular Cities
        </h2>
        <div className="popular-city flex gap-5 py-5 lg:gap-8 w-full h-full  overflow-x-auto">
          {cities.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center "
            >
              <div className="relative rounded-2xl shadow-eventBox shadow-dspLightGray">
                <div className="bg-black opacity-60 top-0 left-0 absolute h-full w-full z-0  rounded-2xl"></div>
                <Image
                  src={`/assets/cities/${item.image}`}
                  alt={item.city}
                  width={300}
                  height={300}
                  className="object-cover max-w-fit h-[300px] rounded-2xl hover:scale-105"
                />

                <div
                  className="absolute top-0
                            p-5 w-full h-full"
                >
                  <div className=" z-10 flex flex-col justify-between h-full items-center">
                    <Link
                      href=""
                      className=" self-end w-fit bg-dspSmokeWhite shadow-eventBox shadow-dspLightGray p-2 rounded-full hover:scale-105 transition-all duration-500 hover:bg-dspPurple hover:text-white"
                    >
                      <BsArrowUpRight className="text-head3 font-bold " />{" "}
                    </Link>
                    <h3 className="font-bold text-tXxl font-montserrat text-white backdrop-blur-md py-1 px-3 rounded-2xl">
                      {item.city}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularCity;
