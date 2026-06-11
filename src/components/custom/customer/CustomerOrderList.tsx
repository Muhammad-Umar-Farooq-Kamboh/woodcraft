import { Button } from "@/components/ui/button";
import { Plus, Printer } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import CustomerNoOrderComp from "./CustomerNoOrderComp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import PaymentComp from "../payment/PaymentComp";

export default function CustomerOrderList({ data, setListOfOrders }: any) {
  const navigate = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [openDialog, setOpenDialog] = useState<{ [key: number]: boolean }>({});

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
                  <Dialog
                    open={openDialog[n] || false}
                    onOpenChange={(isOpen) =>
                      setOpenDialog((prev) => ({ ...prev, [n]: isOpen }))
                    }
                  >
                    <DialogTrigger className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Order ID:</span>
                            <div className="font-medium">
                              ORD{order.order_number}
                            </div>
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
                    </DialogTrigger>
                    {order.payment_status ? (
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

                          <div
                            ref={printRef}
                            className="bg-white p-8 space-y-6"
                          >
                            <div className="border-b pb-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h1 className="text-3xl font-bold text-amber-700">
                                    WOODCRAFT
                                  </h1>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Custom Woodwork Solutions
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Shop # 17
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    City palza, Lahore
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Phone: 0303-0498171
                                  </p>
                                </div>
                                <div className="text-right">
                                  <h2 className="text-2xl font-bold">
                                    INVOICE
                                  </h2>
                                  <p className="text-sm mt-2">
                                    <span className="font-medium">
                                      Invoice #: {order.invoice.invoice_number}
                                    </span>
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Date:</span>
                                    {new Date(
                                      order.invoice.created_at,
                                    ).toLocaleDateString()}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">
                                      Order #:
                                    </span>
                                    {order.order_number}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-b pb-6">
                              <h3 className="font-semibold mb-2">Bill To:</h3>
                              <p className="font-medium">
                                {session?.user.name}
                              </p>

                              <p className="text-sm text-gray-600 mt-4">
                                <span className="font-medium">Project: </span>
                                {order.orderItem.product_type}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.orderItem.product_discription}
                              </p>
                            </div>

                            <div>
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2">
                                      Description
                                    </th>
                                    <th className="text-right py-2">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b font-semibold">
                                    <td className="py-3">Total Amount</td>
                                    <td className="text-right">
                                      {order.invoice.total_amount.toFixed(2)}/-
                                    </td>
                                  </tr>
                                  <tr className="border-b font-semibold">
                                    <td className="py-3">Tax charges</td>
                                    <td className="text-right">
                                      {order.invoice.tax.toFixed(2)}/-
                                    </td>
                                  </tr>
                                  <tr className="border-b-2 border-black font-semibold">
                                    <td className="py-3">Sub total</td>
                                    <td className="text-right">
                                      {order.invoice.subtotal.toFixed(2)}/-
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 text-green-600">
                                      Paid Amount
                                    </td>
                                    <td className="text-right text-green-600">
                                      {order.invoice.payment_status
                                        ? `${order.invoice.subtotal.toFixed(2)}/-`
                                        : "0/-"}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="pt-6">
                              <div className="bg-gray-50 p-4 rounded">
                                <p className="font-semibold mb-2">
                                  Payment Status:
                                </p>
                                <span
                                  className={`px-2 border ${order.invoice.payment_status ? "bg-[#E2F1E7] text-[#22A89E]  border-[#22A89E] rounded-2xl" : "bg-[#FBF1DF] text-[#F29E2F] border-[#F29E2F] rounded-2xl"} `}
                                >
                                  {order.invoice.payment_status
                                    ? "Paid"
                                    : "Unpaid"}
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
                    ) : (
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="print:hidden">
                          <DialogTitle className="text-3xl font-bold text-amber-700">
                            Total Amount: {order.invoice.subtotal}
                          </DialogTitle>
                        </DialogHeader>
                        <PaymentComp
                          amount={order.invoice.subtotal}
                          setOpenDialog={setOpenDialog}
                          orderId={order.id}
                          setListOfOrders={setListOfOrders}
                        />
                      </DialogContent>
                    )}
                  </Dialog>
                  {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                          <div className="font-medium">
                            ORD{order.order_number}
                          </div>
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
                  </div> */}
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
