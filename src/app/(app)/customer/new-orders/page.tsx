"use client";

import CreateOrderComp from "@/components/custom/order/CreateOrderComp";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfWoodCategorie, setListOfWoodCategorie] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/inventory/get-wood-material");
      setListOfWoodCategorie(res.data.data);
    })();
  }, []);

  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-bold text-[#291D14]">Request New Order</h3>
        <p className="text-[#745247] text-[14px]">
          Submit your custom woodwork project requirements
        </p>
      </div>
      <CreateOrderComp listOfWoodCategorie={listOfWoodCategorie} />
    </div>
  );
}
