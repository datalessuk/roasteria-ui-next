"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/features/nav/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/features/footer/Footer";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">
            <NavBar />
          </div>
          <main className="flex-1 relative z-0">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
