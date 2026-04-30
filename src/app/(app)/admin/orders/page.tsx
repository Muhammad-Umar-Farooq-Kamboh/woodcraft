"use client";

import OrderLIstForAdmin from "@/components/custom/order/admin/OrderLIstForAdmin";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/order/get-all-orderlist");
      setListOfOrders(res.data.data);
      const resemp = await axios.get("/api/employee/get-all-employee-only");
      setListOfEmployee(resemp.data.data);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">Orders</h3>
          <p className="text-[#745247] text-[14px]">
            {listOfOrders.length} total orders
          </p>
        </div>
        Add New Order
      </div>
      <OrderLIstForAdmin
        data={listOfOrders}
        employee={listOfEmployee}
        setListOfOrders={setListOfOrders}
      />
    </div>
  );
}
