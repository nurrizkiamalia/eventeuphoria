'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

interface navProps {
    className?: string;
}

interface navItem {
    link: string;
    text: string;
}

const navlist: navItem[] = [
    { link: "create-event", text: "Create Event" },
];

const NavAuth: React.FC<navProps> = ({ className }) => {
    const { isAuthenticated, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <ul className={` ${className} flex flex-col lg:flex-row gap-10 lg:items-center justify-end w-full `}>
                {navlist.map((item, index) => (
                    <li key={index} className="">
                        <Link href={item.link}>{item.text}</Link>
                    </li>
                ))}
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/register" className="bg-dspDarkPurple text-white py-2 px-8 rounded-full">
                                Register
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="relative">
                            <button onClick={handleDropdown} className="focus:outline-none">
                                Profile
                            </button>
                            {dropdownOpen && (
                                <div className="absolute z-50 right-0 mt-2 w-48 bg-white border rounded shadow-md">
                                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Profile
                                    </Link>
                                    <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Settings
                                    </Link>
                                    <button
                                        onClick={logout}
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