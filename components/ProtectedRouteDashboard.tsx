"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteDashboardProps {
  children: ReactNode;
}

const ProtectedRouteDashboard: React.FC<ProtectedRouteDashboardProps> = ({ children }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (currentUser?.role !== 'ORGANIZER') {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, currentUser, router]);

  if (isLoading || !isAuthenticated || currentUser?.role !== 'ORGANIZER') {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRouteDashboard;
