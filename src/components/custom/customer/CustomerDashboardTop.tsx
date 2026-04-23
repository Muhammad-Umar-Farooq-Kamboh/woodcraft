import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Box, Clock, ShoppingBag, TrendingUp, Truck } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CustomerDashboardTop({ data }: any) {
  const { data: session } = useSession();
  const pendingOrders = data.filter(
    (order: any) => order.order_status === "Pending",
  );
  const inprogressOrders = data.filter(
    (order: any) => order.order_status === "In_Progress",
  );
  const deliveredOrders = data.filter(
    (order: any) => order.order_status === "Delivered",
  );

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">
            Welcome back, {session?.user.name}!
          </h3>
          <p className="text-[#745247] text-[14px]">
            Track your woodwork orders
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <ShoppingBag color="#3D2514" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {data?.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Total Orders
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <Clock color="#F29E0D" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {pendingOrders?.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Pending Orders
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <TrendingUp color="#1972E6" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {inprogressOrders?.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                In Progress
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <Truck color="#6F4120" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {deliveredOrders?.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Delivered
              </CardTitle>
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
