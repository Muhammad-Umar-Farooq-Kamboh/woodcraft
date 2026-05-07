import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, FileText, TrendingUp } from "lucide-react";

export default function AdminBillingTop({ listOfInvoice }: any) {
  const paidInvoice = listOfInvoice.filter(
    (inv: any) => inv.payment_status === true,
  );
  const unPaidInvoice = listOfInvoice.filter(
    (inv: any) => inv.payment_status === false,
  );
  const totalPaidPayment = listOfInvoice.reduce((sum: number, inv: any) => {
    if (inv.payment_status) {
      return sum + (inv.subtotal || 0);
    }
    return sum;
  }, 0);
  const totalUnPaidPayment = listOfInvoice.reduce((sum: number, inv: any) => {
    if (!inv.payment_status) {
      return sum + (inv.subtotal || 0);
    }
    return sum;
  }, 0);
  const data: any = [];
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#291D14]">
            Billing & Invoices
          </h3>
          <p className="text-[#745247] text-[14px]">
            {listOfInvoice.length} invoices total
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          size="sm"
          className="mx-auto w-full max-w-sm h-fit py-5 bg-[#7C4C22] text-white"
        >
          <CardContent>
            <CardTitle className=" text-[14px] font-normal uppercase">
              Collected Payments
            </CardTitle>
            <CardAction className="bg-[#9D7243] p-1 rounded-sm">
              <DollarSign size="18" />
            </CardAction>
            <p className="font-bold text-2xl">{totalPaidPayment + " PKR"}</p>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-5">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Pending Payments
            </CardTitle>
            <CardAction className="bg-[#FBF3E3] p-1 rounded-sm">
              <Clock color="#F29E0D" size="18" />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {totalUnPaidPayment + " PKR"}
            </p>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-5">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Paid Invoices
            </CardTitle>
            <CardAction className="bg-[#F1ECE4] p-1 rounded-sm">
              <TrendingUp color="#6F4120" size={18} />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {paidInvoice.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm h-fit py-5">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Pending Invoices
            </CardTitle>
            <CardAction className="bg-[#F1ECE4] p-1 rounded-sm">
              <FileText color="#6F4120" size={18} />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {unPaidInvoice.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
