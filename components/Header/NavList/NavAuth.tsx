"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

interface NavProps {
  className?: string;
}

interface NavItem {
  link: string;
  text: string;
}

// const navlist: NavItem[] = [{ link: "favorite", text: "Favorite" }];

const NavAuth: React.FC<NavProps> = ({ className }) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log()

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  return (
    <div>
      <ul
        className={`${className} flex flex-col lg:flex-row gap-10 lg:items-center justify-end w-full`}
      >
        {!isAuthenticated ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link
                href="/register"
                className="bg-dspDarkPurple text-white rounded-full flex gap-3 items-center justify-between py-1 pl-5 pr-1 hover:bg-dspGray"
              >
                Register{" "}
                <span className="bg-dspLightPurple p-1 rounded-full">
                  <RiArrowRightUpLine className="text-tXl text-dspDarkPurple" />
                </span>
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* {navlist.map((item, index) => (
              <li key={index} className="">
                <Link href={item.link}>{item.text}</Link>
              </li>
            ))} */}
            <li className="relative">
              <button onClick={handleDropdown} className="focus:outline-none">
                Profile
              </button>
              {dropdownOpen && (
                <div className="absolute z-50 right-0 mt-2 w-48 bg-white border rounded shadow-md">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className={` ${
                      currentUser?.role === "ORGANIZER" ? "block" : "hidden"
                    } w-full px-4 py-2 text-gray-800 hover:bg-gray-200`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavAuth;
