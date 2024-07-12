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
            {children}
          </div>
        </div>
      </AuthProvider>
    );
  }
  