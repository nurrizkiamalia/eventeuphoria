"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRouteDashboard = ({ children, route }: { children: React.ReactNode, route: string }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (currentUser?.role !== 'ORGANIZER') {
        router.push('/');
      } else {
        router.push(`/${route}`);
      }
    }
  }, [isLoading, isAuthenticated, currentUser, router]);

  if (isLoading || !isAuthenticated || currentUser?.role !== 'ORGANIZER') {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRouteDashboard;
