"use client";

import AdminBottomSkeleton from "@/components/custom/admin/AdminBottomSkeleton";
import AdminDashboardBottom from "@/components/custom/admin/AdminDashboardBottom";
import AdminDashboardTop from "@/components/custom/admin/AdminDashboardTop";
import AdminTopSkeleton from "@/components/custom/admin/AdminTopSkeleton";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [listOfOrders, setListOfOrders] = useState([]);
  const [listOfMaterials, setListOfMaterial] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const resemp = await axios.get("/api/employee/get-all-employee");
      if (resemp.status === 200) {
        setListOfEmployee(resemp.data.data);
      }
      const resOrder = await axios.get("/api/order/get-all-orderlist");
      if (resOrder.status === 200) {
        setListOfOrders(resOrder.data.data);
      }
      const resMat = await axios.get("/api/inventory/get-all-material");
      if (resMat.status === 200) {
        setListOfMaterial(resMat.data.data);
      }
      setPageLoading(false);
    })();
  }, []);
  const lowStockMaterials = listOfMaterials.filter(
    (mat: any) => mat.unit < mat.low_stock_threshold,
  );
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {pageLoading ? (
        <AdminTopSkeleton />
      ) : (
        <AdminDashboardTop
          listOfEmployee={listOfEmployee}
          listOfOrders={listOfOrders}
          lowStockMaterials={lowStockMaterials}
        />
      )}
      {pageLoading ? (
        <AdminBottomSkeleton />
      ) : (
        <AdminDashboardBottom
          listOfOrders={listOfOrders}
          lowStockMaterials={lowStockMaterials}
        />
      )}
    </div>
  );
}
