'use client'

import Link from "next/link";
import NavAuth from "./NavList/NavAuth";
import Navlist from "./NavList/Navlist";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import SearchInput from "../Search/SearchInput";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    router.push(`/events?search=${searchTerm}`);
  };

  return (
    <div className="shadow-eventBox">
      <div className="flex justify-between gap-5 items-center p-5 lg:hidden">
        <Link
          href="/"
          className="flex items-center font-bold text-tMd sm:text-tXl font-montserrat w-fit"
        >
          Event <br /> Euphoria
        </Link>
        <SearchInput onSearch={handleSearch} />
        <Sheet>
          <SheetTrigger className="bg-dspDarkPurple text-white p-5 rounded-full lg:hidden">
            {" "}
            <FaBars />{" "}
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-10">
            <Link
              href="/"
              className="flex items-center font-bold text-tXl font-montserrat"
            >
              Event Euphoria
            </Link>
            <Navlist className="" />
            <NavAuth className="" />
          </SheetContent>
        </Sheet>
      </div>

      <div className="responsive-header hidden lg:flex lg:gap-5 w-full py-5 px-5 lg:px-10 justify-between items-center">
        <Link
          href="/"
          className="flex items-center font-bold text-tXl font-montserrat w-fit"
        >
          Event Euphoria
        </Link>
        <SearchInput onSearch={handleSearch} />
        <Navlist className="w-fit" />
        <NavAuth className="" />
      </div>
    </div>
  );
};

export default Header;
