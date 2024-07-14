import Footer from "@/components/Footer";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import TopNav from "./components/TopNav";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <TopNav />
      {children}
    </div>
  );
}
