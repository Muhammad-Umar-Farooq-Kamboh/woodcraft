"use client";

import EmployeeDashboardOrderList from "@/components/custom/employee/EmployeeDashboardOrderList";
import EmployeeDashboardTop from "@/components/custom/employee/EmployeeDashboardTop";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import RecentOrdersSkeleton from "@/components/custom/order/RecentOrdersSkeleton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [perhourSalary, setPerHourSalary] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "/api/assigment/get-all-assigment-of-employee",
      );
      setListOfOrders(res.data.data);
      const resemp = await axios.get(
        "/api/employee/get-employee-perhour-income",
      );
      if (resemp.status === 200) {
        setPerHourSalary(resemp.data.data.rate_per_hour);
      }
      setPageLoading(false);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {pageLoading ? (
        <InventorytopSkeleton />
      ) : (
        <EmployeeDashboardTop
          listOfOrders={listOfOrders}
          username={session?.user.name}
          perhourSalary={perhourSalary}
        />
      )}
      {pageLoading ? (
        <RecentOrdersSkeleton />
      ) : (
        <EmployeeDashboardOrderList listOfOrders={listOfOrders} />
      )}
    </div>
  );
}
