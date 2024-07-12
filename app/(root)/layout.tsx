import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <AuthProvider>
        <div lang="en">
          <div>
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </AuthProvider>
    );
  }
  