"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (currentUser?.role === "ORGANIZER") {
      router.push('/dashboard/my-event');
    } 
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return <p>Loading...</p>
  }

  return <>{children}</>;
};

export default ProtectedRoute;
