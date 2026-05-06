"use client";

import ListOfEmployeeTask from "@/components/custom/employee/ListOfEmployeeTask";
import OrderListSkeleton from "@/components/custom/order/admin/OrderListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/order/get-employee-order");
      if (res.status === 200) {
        setListOfOrders(res.data.data);
        setIsPageLoading(false);
      }
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {isPageLoading ? (
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-[30px] w-[150px] rounded-sm bg-gray-300" />
          <Skeleton className="h-[15px] w-[250px] rounded-sm bg-gray-300" />
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">My Tasks</h3>
          <p className="text-[#745247] text-[14px]">
            Track and manage your assigned work
          </p>
        </div>
      )}
      {isPageLoading ? (
        <OrderListSkeleton />
      ) : (
        <ListOfEmployeeTask
          listOfOrders={listOfOrders}
          setListOfOrders={setListOfOrders}
        />
      )}
    </div>
  );
}
