import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import OrderAssignToEmployee from "./OrderAssignToEmployee";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { toast } from "sonner";

export default function OrderLIstForAdmin({
  data,
  employee,
  setListOfOrders,
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const filteredOrders = useMemo(() => {
    return data.filter((order: any) => {
      const matchedSearch =
        order.orderItem.product_type.toLowerCase().includes(searchQuery) ||
        String(order.order_number).includes(searchQuery) ||
        order?.assigments?.user.name.toLowerCase().includes(searchQuery);
      const matchedStatus =
        statusFilter === "all" || order.order_status === statusFilter;

      return matchedStatus && matchedSearch;
    });
  }, [data, searchQuery, statusFilter, setListOfOrders]);

  const changeOrderStatusToDelivered = async (orderId: string) => {
    setIsLoading(true);
    try {
      console.log("Dilivered");
      const res = await axios.post("/api/order/change-order-status", {
        orderStatus: "Delivered",
        orderId,
      });
      if (res.status === 200) {
        toast.success(res.data.message || "Status changed successfully");
        setListOfOrders((prev: any) =>
          prev.map((e: any) => (e.id === res.data.data.id ? res.data.data : e)),
        );
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Status not updated");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <Input
          placeholder="Search orders by customer, project type, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Button
          variant="outline"
          className={`hover:bg-[#3D2514] hover:text-white ${statusFilter === "all" ? "bg-[#3D2514] text-white" : "bg-transparent text-[#3D2514] "}`}
          onClick={() => {
            setStatusFilter("all");
          }}
        >
          All
        </Button>
        <Button
          variant="outline"
          className={`hover:bg-[#3D2514] hover:text-white ${statusFilter === "Pending" ? "bg-[#3D2514] text-white" : "bg-transparent text-[#3D2514]"}`}
          onClick={() => {
            setStatusFilter("Pending");
          }}
        >
          Pending
        </Button>
        <Button
          variant="outline"
          className={`hover:bg-[#3D2514] hover:text-white ${statusFilter === "In_Progress" ? "bg-[#3D2514] text-white" : "bg-transparent text-[#3D2514]"}`}
          onClick={() => {
            setStatusFilter("In_Progress");
          }}
        >
          In progress
        </Button>
        <Button
          variant="outline"
          className={`hover:bg-[#3D2514] hover:text-white ${statusFilter === "Completed" ? "bg-[#3D2514] text-white" : "bg-transparent text-[#3D2514]"}`}
          onClick={() => {
            setStatusFilter("Completed");
          }}
        >
          Completed
        </Button>
        <Button
          variant="outline"
          className={`hover:bg-[#3D2514] hover:text-white ${statusFilter === "delivered" ? "bg-[#3D2514] text-white" : "bg-transparent text-[#3D2514]"}`}
          onClick={() => {
            setStatusFilter("Delivered");
          }}
        >
          Delivered
        </Button>
      </div>
      {filteredOrders.length < 1 ? (
        <h3 className="text-[#3D2514] text-2xl font-semibold text-center">
          No order exist in this categorie
        </h3>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((item: any, n: number) => (
            <Collapsible
              key={n}
              className="bg-transparent border-1 p-5 rounded-2xl"
            >
              <CollapsibleTrigger asChild>
                <div className="w-full text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item?.orderItem?.product_type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item?.orderItem?.product_discription}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <div
                            className={`px-2 border ${item.payment_status ? "bg-[#E2F1E7] text-[#00c950]  border-[#00C950] rounded-2xl" : "bg-[#FBF1DF] text-[#F29E2F] border-[#F29E2F] rounded-2xl"} `}
                          >
                            {item.payment_status ? "Paid" : "Unpaid"}
                          </div>
                          <div className="flex gap-2 items-center">
                            {item.order_status === "Completed" && (
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  changeOrderStatusToDelivered(item.id)
                                }
                                disabled={isLoading}
                                className="cursor-pointer"
                              >
                                Delivered
                              </Button>
                            )}
                            <div
                              className={`
                        ${
                          item.order_status === "Pending"
                            ? "bg-black"
                            : item.order_status === "Delivered"
                              ? "bg-green-500"
                              : item.order_status === "In_Progress"
                                ? "bg-blue-500"
                                : item.order_status === "Completed"
                                  ? "bg-[#3D2514]"
                                  : "bg-amber-500"
                        } text-white p-1 px-2 rounded-full text-[12px]
                        `}
                            >
                              {item.order_status}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Order ID:</span>
                          <div className="font-medium">
                            ORD{item.order_number}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Order Date:</span>
                          <div className="font-medium">
                            {new Date(item.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Total Cost:</span>
                          <div className="font-medium">{item.total_cost}/-</div>
                        </div>
                        <div>
                          {!item.assigments ? (
                            <OrderAssignToEmployee
                              employee={employee}
                              oderId={item.id}
                              setListOfOrders={setListOfOrders}
                            />
                          ) : (
                            <div>
                              <span className="text-gray-500">
                                Assigned to:
                              </span>
                              <div className="font-medium">
                                {item.assigments.user.name}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-5 flex flex-col gap-5">
                <Separator />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm w-full">
                  <div>
                    <span className="text-gray-500">Wood Type:</span>
                    <div className="font-medium">
                      {item.orderItem?.product_wood_type}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Finishing Prefrence:</span>
                    <div className="font-medium">
                      {item.orderItem?.finishing_touch}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Number of Products:</span>
                    <div className="font-medium">
                      {item.orderItem?.product_quantity}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Contact Number:</span>
                    <div className="font-medium">{item.contact}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm w-full">
                  <div>
                    <span className="text-gray-500">Customer Name:</span>
                    <div className="font-medium">{item?.user.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Delivery Address:</span>
                    <div className="font-medium">{item.address}</div>
                  </div>
                  {item.orderItem?.aditional_info && (
                    <div>
                      <span className="text-gray-500">Additional Note:</span>
                      <div className="font-medium">
                        {item.orderItem?.aditional_info}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}
