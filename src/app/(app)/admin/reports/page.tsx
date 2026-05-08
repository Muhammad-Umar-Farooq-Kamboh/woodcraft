"use client";

import AdminReports from "@/components/custom/reports/AdminReports";
import ReportBottomSection from "@/components/custom/reports/ReportBottomSection";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfInvoice, setListOfInvoice] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/invoice/get-list-of-invoice");
      if (res.status === 200) {
        setListOfInvoice(res.data.data);
      }
      const resEmp = await axios.get("/api/employee/get-all-employee");
      if (resEmp.status === 200) {
        setListOfEmployee(resEmp.data.data);
      }
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      <AdminReports
        listOfInvoice={listOfInvoice}
        listOfEmployee={listOfEmployee}
      />
      <ReportBottomSection listOfInvoice={listOfInvoice} />
    </div>
  );
}
