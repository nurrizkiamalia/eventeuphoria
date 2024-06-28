import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div lang="en">
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    );
  }
  