import Footer from "@/components/Footer";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div lang="en">
        <div>
          {children}
          <Footer />
        </div>
      </div>
    );
  }
  