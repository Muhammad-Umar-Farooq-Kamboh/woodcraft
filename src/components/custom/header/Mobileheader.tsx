import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CircleUser, Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "../logo/Logo";
import { Separator } from "@/components/ui/separator";
import Navigation from "./Navigation";
import { useState } from "react";

export default function Mobileheader({ role }: { role?: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="block lg:hidden">
      <Drawer direction="left" open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger className="absolute top-2 left-2">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="bg-[#3D2514] border-none max-w-80">
          <DrawerClose className="flex justify-end p-2">
            <X color="#ffffff" />
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>
              <div>
                <div className="flex gap-2 items-center m-5">
                  <Logo size={30} className="p-2" />
                  <div className="flex flex-col ">
                    <h2 className="text-white text-2xl font-bold">
                      Wood craft{" "}
                    </h2>
                    <p className="text-[#948375] text-center text-[14px]">
                      Management System
                    </p>
                  </div>
                </div>
                <Separator className="bg-[#9483752f]" />
              </div>
            </DrawerTitle>
            <Navigation
              role={role}
              setcloseDraw={setOpenDrawer}
              classname="pt-4"
            />
          </DrawerHeader>
          <DrawerFooter>
            <Separator className="bg-[#9483752f]" />
            <Link
              href={"/profile"}
              className="text-[#948375] flex gap-2 px-4"
              onClick={() => setOpenDrawer(false)}
            >
              <CircleUser />
              Profile
            </Link>
            <div className="text-[#948375] text-[12px] px-4">
              © {new Date().getFullYear()} WoodCraft
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
