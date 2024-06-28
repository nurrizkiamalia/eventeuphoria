import Link from "next/link";
import NavAuth from "./NavList/NavAuth";
import Navlist from "./NavList/Navlist";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center p-5 lg:hidden">
        <Link
          href="/"
          className="flex items-center font-bold text-tXl font-montserrat"
        >
          Event Euphoria
        </Link>
        <Sheet>
          <SheetTrigger className="bg-dspDarkPurple text-white p-5 rounded-full">
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

      <div className="responsive-header hidden lg:grid lg:grid-cols-3 w-full py-5 px-5 lg:px-10 items-center">
        <Link
          href="/"
          className="flex items-center font-bold text-tXl font-montserrat"
        >
          Event Euphoria
        </Link>
        <Navlist className="" />
        <NavAuth className="" />
      </div>
    </>
  );
};

export default Header;
