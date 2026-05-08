"use client";

import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import AdminReports from "@/components/custom/reports/AdminReports";
import ReportBottomSection from "@/components/custom/reports/ReportBottomSection";
import ReportsBottonSkeleton from "@/components/custom/reports/ReportsBottonSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfInvoice, setListOfInvoice] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const res = await axios.get("/api/invoice/get-list-of-invoice");
      if (res.status === 200) {
        setListOfInvoice(res.data.data);
      }
      const resEmp = await axios.get("/api/employee/get-all-employee");
      if (resEmp.status === 200) {
        setListOfEmployee(resEmp.data.data);
      }
      setPageLoading(false);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {pageLoading ? (
        <InventorytopSkeleton />
      ) : (
        <AdminReports
          listOfInvoice={listOfInvoice}
          listOfEmployee={listOfEmployee}
        />
      )}
      {pageLoading ? (
        <ReportsBottonSkeleton />
      ) : (
        <ReportBottomSection listOfInvoice={listOfInvoice} />
      )}
    </div>
  );
}
