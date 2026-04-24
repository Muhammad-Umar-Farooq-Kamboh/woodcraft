"use client";

import CreateOrderComp from "@/components/custom/order/CreateOrderComp";
import CreateOrderSkeleton from "@/components/custom/order/CreateOrderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfWoodCategorie, setListOfWoodCategorie] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/inventory/get-wood-material");
      setListOfWoodCategorie(res.data.data);
      setPageLoading(false);
    })();
  }, []);

  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {pageLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[30px] w-[200px] rounded-full bg-gray-300" />
          <Skeleton className="h-[20px] w-[300px] rounded-full bg-gray-300" />
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">
            Request New Order
          </h3>
          <p className="text-[#745247] text-[14px]">
            Submit your custom woodwork project requirements
          </p>
        </div>
      )}

      {pageLoading ? (
        <CreateOrderSkeleton />
      ) : (
        <CreateOrderComp listOfWoodCategorie={listOfWoodCategorie} />
      )}
    </div>
  );
}
