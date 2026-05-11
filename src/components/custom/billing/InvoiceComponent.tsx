import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Printer } from "lucide-react";
import { useRef } from "react";

export default function InvoiceComponent({ invoice }: any) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "", "height=600,width=800");
      if (printWindow) {
        const styles = Array.from(document.styleSheets).map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n");
          } catch {
            return "";
          }
        });

        const html = `
          <html>
            <head>
              <style>
                ${styles}
                @media print {
                  body { margin: 0; padding: 0; }
                }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Eye size={18} />
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="print:hidden">
          <DialogTitle>Invoice Details</DialogTitle>
        </DialogHeader>

        <div>
          <div className="flex justify-end mb-4 print:hidden">
            <Button
              onClick={handlePrint}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Printer className="size-4 mr-2" />
              Print Invoice
            </Button>
          </div>

          <div ref={printRef} className="bg-white p-8 space-y-6">
            <div className="border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-amber-700">
                    WOODCRAFT
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Custom Woodwork Solutions
                  </p>
                  <p className="text-sm text-gray-600">Shop # 17</p>
                  <p className="text-sm text-gray-600">City palza, Lahore</p>
                  <p className="text-sm text-gray-600">Phone: 0303-0498171</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Invoice #:</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>
                    {new Date(invoice.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Order #:</span>
                    {invoice.order.order_number}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b pb-6">
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p className="font-medium">{invoice?.order?.user?.name}</p>

              <p className="text-sm text-gray-600 mt-4">
                <span className="font-medium">Project: </span>
                {invoice.order.orderItem.product_type}
              </p>
              <p className="text-sm text-gray-600">
                {invoice.order.orderItem.product_discription}
              </p>
            </div>

            <div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b font-semibold">
                    <td className="py-3">Total Amount</td>
                    <td className="text-right">
                      {invoice.total_amount.toFixed(2)}/-
                    </td>
                  </tr>
                  <tr className="border-b font-semibold">
                    <td className="py-3">Tax charges</td>
                    <td className="text-right">{invoice.tax.toFixed(2)}/-</td>
                  </tr>
                  <tr className="border-b-2 border-black font-semibold">
                    <td className="py-3">Sub total</td>
                    <td className="text-right">
                      {invoice.subtotal.toFixed(2)}/-
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 text-green-600">Paid Amount</td>
                    <td className="text-right text-green-600">
                      {invoice.payment_status
                        ? `${invoice.subtotal.toFixed(2)}/-`
                        : "0/-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-6">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">Payment Status:</p>
                <span
                  className={`px-2 border ${invoice.payment_status ? "bg-[#E2F1E7] text-[#22A89E]  border-[#22A89E] rounded-2xl" : "bg-[#FBF1DF] text-[#F29E2F] border-[#F29E2F] rounded-2xl"} `}
                >
                  {invoice.payment_status ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 pt-6 border-t">
              <p>Thank you for your order!</p>
              <p className="mt-1">
                For inquiries, contact us at woodcraft@gmail.com
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
