"use client";

import AdminBillingBottom from "@/components/custom/billing/AdminBillingBottom";
import AdminBillingTop from "@/components/custom/billing/AdminBillingTop";
import EmployeeListSkelition from "@/components/custom/employee/EmployeeListSkeleton";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfInvoice, setListOfInvoice] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setIsPageLoading(true);
      const res = await axios.get("/api/invoice/get-list-of-invoice");
      if (res.status === 200) {
        setListOfInvoice(res.data.data);
      }
      setIsPageLoading(false);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {isPageLoading ? (
        <InventorytopSkeleton />
      ) : (
        <AdminBillingTop listOfInvoice={listOfInvoice} />
      )}
      {isPageLoading ? (
        <EmployeeListSkelition />
      ) : (
        <AdminBillingBottom listOfInvoice={listOfInvoice} />
      )}
    </div>
  );
}
