import Footer from "@/components/Footer";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      {children}
    </div>
  );
}
