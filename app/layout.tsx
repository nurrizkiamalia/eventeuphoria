import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","800","900"],
  display: "swap",
  variable: "--font-montserrat"
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","800","900"],
  display: "swap",
  variable: "--font-sourceSans"
});

export const metadata: Metadata = {
  title: "Find your event",
  description: "Feels the euphoria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={`${montserrat.variable} ${sourceSans.variable} font-sourceSans`}>
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
