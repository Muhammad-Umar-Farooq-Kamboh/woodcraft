import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import Link from "next/link";

export default function CustomerNoOrderComp() {
  return (
    <Card>
      <CardContent className=" flex flex-col gap-4 items-center justify-center md:py-10">
        <div className="p-5 bg-[#F3F4F6] w-fit rounded-full">
          {/* <Package color="#99A1AF" /> */}
          <Package color="#3D2514" size={35} />
        </div>
        <h4 className="text-2xl font-semibold text-[#3D2514]">No orders yet</h4>
        <p className="text-[#4A5565] w-1/2 text-center">
          You haven't placed any woodwork orders yet. Start by creating your
          first custom project and we'll bring your vision to life.
        </p>
        <Link href="/customer/new-orders">
          <Button className="bg-[#3D2514] hover:bg-[#4d2c13]">
            Create New Order
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
