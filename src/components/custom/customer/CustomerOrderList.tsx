import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerOrderList({ data }: any) {
  const navigate = useRouter();
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <Card className=" bg-[#F9F8F5]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[18px] text-[#3D2514] font-bol">
                My Recent Orders
              </CardTitle>
              <CardDescription>Your latest woodwork projects</CardDescription>
            </div>
            <Button
              className="bg-[#3D2514] hover:bg-[#492a14]"
              onClick={() => navigate.replace("/customer/new-orders")}
            >
              <Plus className="size-4 mr-2" />
              New Order
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((order: any, n: number) => (
                <div
                  key={n}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {order?.orderItem?.product_type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order?.orderItem?.product_discription}
                          </p>
                        </div>
                        <div
                          className={`
                        ${
                          order.order_status === "Pending"
                            ? "bg-black"
                            : order.order_status === "Delivered"
                              ? "bg-green-500"
                              : order.order_status === "In_Progress"
                                ? "bg-blue-500"
                                : order.order_status === "Completed"
                                  ? "bg-[#3D2514]"
                                  : "bg-amber-500"
                        } text-white p-1 px-2 rounded-full text-[12px]
                        `}
                        >
                          {order.order_status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Order ID:</span>
                          <div className="font-medium">ORD{n + 1}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Order Date:</span>
                          <div className="font-medium">
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Total Cost:</span>
                          <div className="font-medium">
                            {order.total_cost}/-
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
        <Card>
          <CardContent className=" flex flex-col gap-4 items-center justify-center md:py-10">
            <div className="p-5 bg-[#F3F4F6] w-fit rounded-full">
              {/* <Package color="#99A1AF" /> */}
              <Package color="#3D2514" size={35} />
            </div>
            <h4 className="text-2xl font-semibold text-[#3D2514]">
              No orders yet
            </h4>
            <p className="text-[#4A5565] w-1/2 text-center">
              You haven't placed any woodwork orders yet. Start by creating your
              first custom project and we'll bring your vision to life.
            </p>
            <Link href="/customer/new-orders">
              <Button className="bg-[#3D2514] hover:bg-[#4d2c13]">
                Create New Order
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
