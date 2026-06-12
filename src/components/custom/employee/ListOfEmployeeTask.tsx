import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";
import ChangeStatusOfOrder from "./ChangeStatusOfOrder";

export default function ListOfEmployeeTask({
  listOfOrders,
  setListOfOrders,
}: any) {
  // console.log(listOfOrders);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredOrders = useMemo(() => {
    return listOfOrders.filter((item: any) => {
      const matchedSearch =
        item.order.orderItem.product_type.toLowerCase().includes(searchQuery) ||
        String(item.order.order_number).includes(searchQuery) ||
        item?.order.assigments?.user.name.toLowerCase().includes(searchQuery);
      const matchedStatus =
        statusFilter === "all" || item.order.order_status === statusFilter;

      return matchedStatus && matchedSearch;
    });
  }, [listOfOrders, searchQuery, statusFilter, setListOfOrders]);

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
      {filteredOrders.length <= 0 ? (
        <div className="text-2xl font-bold text-[#291D14]">
          No order is assigned to you
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders?.map((item: any, n: number) => (
            <Collapsible
              key={n}
              className="bg-transparent border-1 p-5 rounded-2xl"
            >
              <CollapsibleTrigger asChild className="cursor-pointer">
                <div className="w-full text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item?.order?.orderItem?.product_type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item?.order?.orderItem?.product_discription}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div
                            className={`
                        ${
                          item.order?.order_status === "Pending"
                            ? "bg-black"
                            : item.order?.order_status === "Delivered"
                              ? "bg-green-500"
                              : item.order?.order_status === "In_Progress"
                                ? "bg-blue-500"
                                : item.order?.order_status === "Completed"
                                  ? "bg-[#3D2514]"
                                  : "bg-amber-500"
                        } text-white p-1 px-2 rounded-full text-[12px]
                        `}
                          >
                            {item?.order?.order_status}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Order ID:</span>
                          <div className="font-medium">
                            ORD{item?.order?.order_number}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Order Date:</span>
                          <div className="font-medium">
                            {new Date(
                              item.order?.created_at,
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Manage Status:</span>
                          <div className="font-medium">
                            <ChangeStatusOfOrder
                              assigmentId={item.id}
                              orderStatus={item?.order.order_status}
                              setListOfOrders={setListOfOrders}
                            />
                          </div>
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
                      {item.order?.orderItem?.product_wood_type}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Finishing Prefrence:</span>
                    <div className="font-medium">
                      {item.order?.orderItem?.finishing_touch}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Number of Products:</span>
                    <div className="font-medium">
                      {item.order?.orderItem?.product_quantity}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Working hours:</span>
                    <div className="font-medium">
                      {item.order?.orderItem?.hours_of_construction}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm w-full">
                  <div>
                    <span className="text-gray-500">Customer Name:</span>
                    <div className="font-medium">{item?.order?.user.name}</div>
                  </div>
                  {item.order?.orderItem?.aditional_info && (
                    <div>
                      <span className="text-gray-500">Additional Note:</span>
                      <div className="font-medium">
                        {item.order?.orderItem?.aditional_info}
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
