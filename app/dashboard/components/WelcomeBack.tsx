"use client";

import { useAuth } from "@/context/AuthContext";

const WelcomeBack: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="bg-hero-img bg-cover bg-center py-10 px-5 rounded-xl ">
        <h1 className="text-tXxl font-semibold text-white">
          Welcome back {currentUser?.firstName && currentUser?.lastName}!
        </h1>
      </div>
    </>
  );
};

export default WelcomeBack;
