"use client";

import EmployeeTimesheetBottom from "@/components/custom/employee/EmployeeTimesheetBottom";
import EmployeeTimeSheetBottomSkeleton from "@/components/custom/employee/EmployeeTimeSheetBottomSkeleton";
import EmployeeTimeSheetTop from "@/components/custom/employee/EmployeeTimeSheetTop";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [perhourSalary, setPerHourSalary] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
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
        <EmployeeTimeSheetTop
          listOfOrders={listOfOrders}
          perhourSalary={perhourSalary}
        />
      )}
      {pageLoading ? (
        <EmployeeTimeSheetBottomSkeleton />
      ) : (
        <EmployeeTimesheetBottom
          listOfOrders={listOfOrders}
          perhourSalary={perhourSalary}
        />
      )}
    </div>
  );
}
