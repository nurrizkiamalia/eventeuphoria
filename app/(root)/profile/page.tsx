"use client";

import Image from "next/image";
import userImg from "@/public/assets/user.png";
import Sections from "./components/Sections";
import EditProfile from "./components/EditProfile";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); 
    } else{
      router.push('/profile')
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-5 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex gap-5 items-center lg:w-[75%]">
          <Image
            src={currentUser.avatar || userImg}
            alt="user"
            width={70}
            height={70}
            className="rounded-full shadow-boxed object-cover object-center border-4 border-black"
          />
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-tXl">{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
            <p className="text-tMd">{` — "${currentUser.quotes || 'I love party.'}"`}</p>
            <div className="w-full">
              <EditProfile />
            </div>
          </div>
        </div>
        <div className="text-dspDarkPurple p-5 rounded-xl border border-dspDarkPurple flex flex-col gap-3 lg:w-[25%]">
          <div className="flex gap-3 items-center">
            <h3>Your Referral Code:</h3>
            <p className="font-bold border-2 border-dspDarkPurple p-2 rounded-xl text-center">{currentUser.referralCode || 'N/A'}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3>Your Points:</h3>
            <p className="font-bold">{currentUser.points}</p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <Sections />
      </div>
    </div>
  );
};

export default ProfilePage;
