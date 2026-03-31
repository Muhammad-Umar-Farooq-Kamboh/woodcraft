"use client";

import Inventorytop from "@/components/custom/inventory/Inventorytop";
import InventoryList from "@/components/custom/inventory/InventoryList";

export default function Page() {
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      <Inventorytop />
      <InventoryList />
    </div>
  );
}
