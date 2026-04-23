"use client";

import CustomerDashboardTop from "@/components/custom/customer/CustomerDashboardTop";
import CustomerOrderList from "@/components/custom/customer/CustomerOrderList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/order/get-customers-orders");
      setListOfOrders(res.data.data);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      <CustomerDashboardTop data={listOfOrders} />
      <CustomerOrderList data={listOfOrders} />
    </div>
  );
}
