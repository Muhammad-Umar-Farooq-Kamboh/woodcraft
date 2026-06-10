import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import {
  Box,
  CircleCheck,
  Clock,
  DollarSign,
  IdCardLanyard,
  TrendingUp,
  TriangleAlert,
  Truck,
} from "lucide-react";

export default function AdminDashboardTop({
  listOfEmployee,
  listOfOrders,
  lowStockMaterials,
}: any) {
  const totalRevenue = listOfOrders.reduce((sum: number, order: any) => {
    return sum + order.total_cost;
  }, 0);
  const pendingOrders = listOfOrders.filter(
    (order: any) => order.order_status === "Pending",
  );
  const inProgressOrders = listOfOrders.filter(
    (order: any) => order.order_status === "In_Progress",
  );
  const completedOrders = listOfOrders.filter(
    (order: any) => order.order_status === "Completed",
  );
  const deliveredOrders = listOfOrders.filter(
    (order: any) => order.order_status === "Delivered",
  );

  const newDate = new Date();
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-bold text-[#291D14]">Dashboard</h3>
        <p className="text-[#745247] text-[14px]">
          Welcome back —{" "}
          {newDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-5 bg-[#7C4C22] text-white"
        >
          <CardContent>
            <CardTitle className=" text-[14px] font-normal uppercase">
              Total Revenue
            </CardTitle>
            <CardAction className="bg-[#9D7243] p-1 rounded-sm">
              <DollarSign size="18" />
            </CardAction>
            <p className="font-bold text-2xl">{totalRevenue + " PKR"}</p>
          </CardContent>
        </Card>
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-5"
        >
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total Orders
            </CardTitle>
            <CardAction className="bg-[#FBF3E3] p-1 rounded-sm">
              <Box color="#F29E0D" size="18" />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {listOfOrders.length}
            </p>
          </CardContent>
        </Card>
        <Card
          //  size="sm"
          className="mx-auto w-full max-w-sm h-fit py-5"
        >
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total Employee
            </CardTitle>
            <CardAction className="bg-[#F1ECE4] p-1 rounded-sm">
              <IdCardLanyard color="#6F4120" size={18} />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {listOfEmployee.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-5"
        >
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Low Stock Alerts
            </CardTitle>
            <CardAction className="bg-[#F1ECE4] p-1 rounded-sm">
              <TriangleAlert color="#6F4120" size={18} />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {lowStockMaterials.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-3"
        >
          <CardContent className="flex items-center gap-4">
            <Clock color="#F29E0D" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {pendingOrders?.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Pending
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-3"
        >
          <CardContent className="flex items-center gap-4">
            <TrendingUp color="#1972E6" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {inProgressOrders.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                In Progress
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-3"
        >
          <CardContent className="flex items-center gap-4">
            <CircleCheck color="#22A050" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {completedOrders.length}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Completed
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card
          // size="sm"
          className="mx-auto w-full max-w-sm h-fit py-3"
        >
          <CardContent className="flex items-center gap-4">
            <Truck color="#6F4120" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {deliveredOrders.length}
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
