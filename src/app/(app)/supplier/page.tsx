"use client";

import SkeletonBottomSkeleton from "@/components/custom/supplier/SkeletonBottomSkeleton";
import SupplierDashboardBottom from "@/components/custom/supplier/SupplierDashboardBottom";
import SupplierDashboardTop from "@/components/custom/supplier/SupplierDashboardTop";
import SupplierTopSkeleton from "@/components/custom/supplier/SupplierTopSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfMaterials, setListOfMaterials] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/inventory/get-all-material");
      if (res.status === 200) {
        setListOfMaterials(res.data.data);
      }
      setIsPageLoading(false);
    })();
  }, []);

  const lowStockMaterial = listOfMaterials.filter(
    (m: any) => m.unit < m.low_stock_threshold,
  );
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {isPageLoading ? (
        <SupplierTopSkeleton />
      ) : (
        <SupplierDashboardTop
          listOfMaterials={listOfMaterials}
          lowStockMaterial={lowStockMaterial}
        />
      )}
      {isPageLoading ? (
        <SkeletonBottomSkeleton />
      ) : (
        <SupplierDashboardBottom lowStockMaterials={lowStockMaterial} />
      )}
    </div>
  );
}
