import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BanknoteArrowUp, ShoppingBag, TrendingUp, Truck } from "lucide-react";

export default function EmployeeDashboardTop({
  listOfOrders,
  username,
  perhourSalary,
}: any) {
  const diliveredOrders = listOfOrders.filter(
    (ass: any) => ass?.order.order_status === "Delivered",
  );

  const workingHours = listOfOrders.reduce((sum: number, item: any) => {
    if (
      item.order?.order_status === "Completed" ||
      item.order?.order_status === "Delivered"
    ) {
      return sum + (item.hours || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">
            Welcome back, {username}!
          </h3>
          <p className="text-[#745247] text-[14px]">
            Prepare your woodwork orders
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <ShoppingBag color="#3D2514" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {listOfOrders?.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Total Orders
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <Truck color="#6F4120" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {diliveredOrders.length || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Delivered
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <TrendingUp color="#1972E6" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {workingHours}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Working hours
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <BanknoteArrowUp color="#00C950" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {workingHours * perhourSalary}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Estimated Earnings
              </CardTitle>
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
