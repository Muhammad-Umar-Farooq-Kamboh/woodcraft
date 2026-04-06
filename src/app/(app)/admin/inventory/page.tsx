"use client";

import Inventorytop from "@/components/custom/inventory/Inventorytop";
import InventoryList from "@/components/custom/inventory/InventoryList";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import InventorytopSkeleton from "@/components/custom/inventory/InventorytopSkeleton";
import InventoryListSkeleton from "@/components/custom/inventory/InventoryListSkeleton";

export default function Page() {
  const [listOfMaterials, setListOfMaterials] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/inventory/get-all-material");
        if (res.status === 200) {
          setListOfMaterials(res.data.data);
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data.message || "Issue in adding material",
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
        <Inventorytop
          listOfMaterials={listOfMaterials}
          setListOfMaterials={setListOfMaterials}
        />
      )}
      {isPageLoading ? (
        <InventoryListSkeleton />
      ) : (
        <InventoryList
          listOfMaterials={listOfMaterials}
          setListOfMaterials={setListOfMaterials}
        />
      )}
    </div>
  );
}
