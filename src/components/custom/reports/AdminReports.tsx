import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Box, ClockCheck, DollarSign, IdCardLanyard } from "lucide-react";

export default function AdminReports({ listOfInvoice, listOfEmployee }: any) {
  const totalRevenue = listOfInvoice.reduce((sum: number, inv: any) => {
    return sum + (inv.subtotal || 0);
  }, 0);
  const totalWorkingHours = listOfInvoice.reduce((sum: number, inv: any) => {
    return sum + (inv.order.orderItem.hours_of_construction || 0);
    // if (inv.order.order_status === "Delivered") {
    // }
    // return sum;
  }, 0);
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-bold text-[#291D14]">
          Reports & Analytics
        </h3>
        <p className="text-[#745247] text-[14px]">Year 2026 Overview</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          size="sm"
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
        <Card className="mx-auto w-full max-w-sm h-fit py-5">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total Orders
            </CardTitle>
            <CardAction className="bg-[#FBF3E3] p-1 rounded-sm">
              <Box color="#F29E0D" size="18" />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {listOfInvoice.length}
            </p>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-5">
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
        <Card className="mx-auto w-full max-w-sm h-fit py-5">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total Working Hours
            </CardTitle>
            <CardAction className="bg-[#F1ECE4] p-1 rounded-sm">
              <ClockCheck color="#6F4120" size={18} />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {totalWorkingHours || 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
