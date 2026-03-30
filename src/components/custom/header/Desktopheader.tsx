import React from "react";
import Logo from "../logo/Logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { CircleUser } from "lucide-react";

export default function Desktopheader({ role }: { role?: string }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="w-fit fixed bg-[#3D2514] min-h-screen flex-col justify-between min-w-60 hidden lg:flex">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex gap-2 justify-center items-center m-5">
            <Logo size={30} className="p-2" />
            <div className="flex flex-col ">
              <h2 className="text-white text-2xl font-bold">Wood craft </h2>
              <p className="text-[#948375] text-center text-[14px]">
                Management System
              </p>
            </div>
          </div>
          <Separator className="bg-[#9483752f]" />
        </div>
        <Navigation role={role} />
      </div>

      <div>
        <Separator className="bg-[#9483752f]" />
        <div className="m-5 flex flex-col gap-4">
          <Link href={"/profile"} className="text-[#948375] flex gap-2">
            <CircleUser />
            Profile
          </Link>
          <div className="text-[#948375] text-[12px]">
            © {new Date().getFullYear()} WoodCraft
          </div>
        </div>
      </div>
    </div>
  );
}
