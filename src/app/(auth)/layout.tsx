"use client";
import LeftComp from "@/components/custom/Signin_Layout/LeftComp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <LeftComp />
      <div className="w-full lg:w-1/2">{children}</div>
    </div>
  );
}
