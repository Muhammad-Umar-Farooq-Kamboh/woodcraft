import React, { useState } from "react";
import Logo from "../logo/Logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { CircleUser, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Desktopheader({ role }: { role?: string }) {
  // const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // console.log(pathname);
  const logout = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    toast.success("User signout");
    router.replace("/signin");
    setIsLoading(false);
  };
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
          <Button
            onClick={() => logout()}
            disabled={isLoading}
            className="w-fit bg-[#E89230] text-[#3D2514] hover:bg-[#d68a32]"
          >
            <LogOut />
            Logout
          </Button>
          <div className="text-[#948375] text-[12px]">
            © {new Date().getFullYear()} WoodCraft
          </div>
        </div>
      </div>
    </div>
  );
}
