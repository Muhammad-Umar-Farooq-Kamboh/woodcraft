import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function Inventorytop() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">Inventory</h3>
          <p className="text-[#745247] text-[14px]">
            10 materials tracked · 4 low stock alerts
          </p>
        </div>
        <Button className="bg-[#784922] hover:bg-[#784922e8] cursor-pointer">
          <Plus /> Add Material
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Wood
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">5</p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Hardware
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">5</p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Adhesives
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">5</p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Finishing
            </CardTitle>
            <p className="font-bold text-[#291D14] text-2xl">5</p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
