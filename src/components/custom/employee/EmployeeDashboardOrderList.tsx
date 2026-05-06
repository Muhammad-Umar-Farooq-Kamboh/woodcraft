import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import CustomerNoOrderComp from "../customer/CustomerNoOrderComp";
import { useRouter } from "next/navigation";

export default function EmployeeDashboardOrderList({ listOfOrders }: any) {
  const navigate = useRouter();
  return (
    <div className="w-full">
      {listOfOrders.length > 0 ? (
        <Card className=" bg-[#F9F8F5]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[18px] text-[#3D2514] font-bol">
                My Recent Orders
              </CardTitle>
              <CardDescription>Your latest woodwork projects</CardDescription>
            </div>
            <Button
              variant="link"
              onClick={() => navigate.replace("/employee/tasks")}
            >
              show more
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listOfOrders.slice(0, 2).map((assig: any, n: number) => (
                <div
                  key={n}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {assig.order?.orderItem?.product_type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {assig.order?.orderItem?.product_discription}
                          </p>
                        </div>
                        <div
                          className={`
                        ${
                          assig.order.order_status === "Pending"
                            ? "bg-black"
                            : assig.order.order_status === "Delivered"
                              ? "bg-green-500"
                              : assig.order.order_status === "In_Progress"
                                ? "bg-blue-500"
                                : assig.order.order_status === "Completed"
                                  ? "bg-[#3D2514]"
                                  : "bg-amber-500"
                        } text-white p-1 px-2 rounded-full text-[12px]
                        `}
                        >
                          {assig.order.order_status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Order ID:</span>
                          <div className="font-medium">
                            ORD{assig.order.order_number}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Order Date:</span>
                          <div className="font-medium">
                            {new Date(
                              assig.order.created_at,
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Total Cost:</span>
                          <div className="font-medium">
                            {assig.order.total_cost}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <CustomerNoOrderComp />
      )}
    </div>
  );
}
