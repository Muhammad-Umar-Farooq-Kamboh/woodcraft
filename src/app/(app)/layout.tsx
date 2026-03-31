"use client";
import Desktopheader from "@/components/custom/header/Desktopheader";
import Mobileheader from "@/components/custom/header/Mobileheader";
import { useSession } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  return (
    <div className="flex w-full">
      <Desktopheader role={session?.user.role || undefined} />
      <Mobileheader role={session?.user.role || undefined} />
      <div className="bg-[#F9F8F5] lg:ml-60 w-full">{children}</div>
    </div>
  );
}
