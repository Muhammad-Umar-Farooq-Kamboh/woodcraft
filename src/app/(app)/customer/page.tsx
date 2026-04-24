"use client";

import CustomerDashboardTop from "@/components/custom/customer/CustomerDashboardTop";
import CustomerOrderList from "@/components/custom/customer/CustomerOrderList";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import RecentOrdersSkeleton from "@/components/custom/order/RecentOrdersSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/order/get-customers-orders");
      setListOfOrders(res.data.data);
      setPageLoading(false);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {pageLoading ? (
        <InventorytopSkeleton />
      ) : (
        <CustomerDashboardTop data={listOfOrders} />
      )}
      {pageLoading ? (
        <RecentOrdersSkeleton />
      ) : (
        <CustomerOrderList data={listOfOrders} />
      )}
    </div>
  );
}
