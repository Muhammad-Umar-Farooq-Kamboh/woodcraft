import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/Context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WoodCraft",
  description: "Order management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased] max-w-[1920px] mx-auto bg-[#F9F8F5]`}
        >
          <NextTopLoader
            color="#E89230" // YouTube Red
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            // showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #E89230,0 0 5px #E89230"
          />
          {children}
          <Toaster richColors />
        </body>
      </AuthProvider>
    </html>
  );
}
