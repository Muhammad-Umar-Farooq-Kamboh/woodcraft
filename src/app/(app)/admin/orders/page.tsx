"use client";

import AdminCreateOrder from "@/components/custom/order/admin/AdminCreateOrder";
import OrderLIstForAdmin from "@/components/custom/order/admin/OrderLIstForAdmin";
import OrderListSkeleton from "@/components/custom/order/admin/OrderListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [listOfWoodCategorie, setListOfWoodCategorie] = useState([]);
  const [listOfCustomers, setListOfCustomers] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/order/get-all-orderlist");
      setListOfOrders(res.data.data);
      const resemp = await axios.get("/api/employee/get-all-employee-only");
      setListOfEmployee(resemp.data.data);
      const resWoodCat = await axios.get("/api/inventory/get-wood-material");
      setListOfWoodCategorie(resWoodCat.data.data);
      const resCustomer = await axios.get(
        "/api/customer/get-list-of-customer-name",
      );
      setListOfCustomers(resCustomer.data.data);
      setIsPageLoading(false);
    })();
  }, []);
  return (
    <div className="px-5 py-7 w-full flex flex-col gap-8">
      {isPageLoading ? (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-[30px] w-[150px] rounded-sm bg-gray-300" />
            <Skeleton className="h-[15px] w-[100px] rounded-sm bg-gray-300" />
          </div>
          <Skeleton className="h-[40px] w-[150px] rounded-sm bg-gray-300" />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-[#291D14]">Orders</h3>
            <p className="text-[#745247] text-[14px]">
              {listOfOrders.length} total orders
            </p>
          </div>
          <AdminCreateOrder
            listOfWoodCategorie={listOfWoodCategorie}
            listOfCustomers={listOfCustomers}
            setListOfOrders={setListOfOrders}
          />
        </div>
      )}
      {isPageLoading ? (
        <OrderListSkeleton />
      ) : (
        <OrderLIstForAdmin
          data={listOfOrders}
          employee={listOfEmployee}
          setListOfOrders={setListOfOrders}
        />
      )}
    </div>
  );
}
