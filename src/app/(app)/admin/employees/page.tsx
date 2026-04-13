"use client";

import EmployeeList from "@/components/custom/employee/EmployeeList";
import EmployeeListSkelition from "@/components/custom/employee/EmployeeListSkeleton";
import EmployeeTop from "@/components/custom/employee/EmployeeTop";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  useEffect(() => {
    (async function () {
      setIsPageLoading(true);
      try {
        const res = await axios.get("/api/employee/get-all-employee");
        if (res.status === 200) {
          setListOfEmployee(res.data.data);
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data.message || "Issue in getting list of employee",
        );
      } finally {
        setIsPageLoading(false);
      }
    })();
  }, []);

  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {isPageLoading ? (
        <InventorytopSkeleton />
      ) : (
        <EmployeeTop
          listOfEmployee={listOfEmployee}
          setListOfEmployee={setListOfEmployee}
        />
      )}
      {isPageLoading ? (
        <EmployeeListSkelition />
      ) : (
        <EmployeeList
          listOfEmployee={listOfEmployee}
          setListOfEmployee={setListOfEmployee}
        />
      )}
    </div>
  );
}
