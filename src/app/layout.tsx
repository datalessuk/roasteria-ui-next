import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/features/nav/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/features/footer/Footer";

const outfit = Outfit({
  subsets: ["latin"], // include the character sets you need
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // optional
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
