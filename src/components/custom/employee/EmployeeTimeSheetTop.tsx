import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Banknote, BanknoteArrowUp, Clock9, ShoppingBag } from "lucide-react";

export default function EmployeeTimeSheetTop({
  listOfOrders,
  perhourSalary,
}: any) {
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
      <div>
        <h3 className="text-2xl font-bold text-[#291D14]">Timesheet</h3>
        <p className="text-[#745247] text-[14px]">
          Log and track your work hours
        </p>
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
                Assigned Orders
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <Clock9 color="#f90101" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {workingHours || 0}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Total Hours
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <Banknote color="#1972E6" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {perhourSalary + " PKR"}
              </p>
              <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
                Hourly Rate
              </CardTitle>
            </span>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent className="flex items-center gap-4">
            <BanknoteArrowUp color="#00C950" />
            <span>
              <p className="font-bold text-[#291D14] text-2xl">
                {workingHours * perhourSalary + " PKR"}
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
