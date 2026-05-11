import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Box, Eye, FileText, TriangleAlert } from "lucide-react";
import React from "react";
import InvoiceComponent from "./InvoiceComponent";

export default function AdminBillingBottom({ listOfInvoice }: any) {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="border-1 rounded-2xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>All Invoices</TableHead>
            </TableRow>
            <TableRow className="bg-[#FCF8F0] uppercase">
              <TableHead className="text-[#745247]">Invoice</TableHead>
              <TableHead className="text-[#745247]">Order</TableHead>
              <TableHead className="text-[#745247]">Customer</TableHead>
              <TableHead className="text-[#745247]">Amount</TableHead>
              <TableHead className="text-[#745247]">Order Date</TableHead>
              <TableHead className="text-[#745247]">Status</TableHead>
            </TableRow>
          </TableHeader>
          {listOfInvoice.length < 1 ? (
            <TableBody>
              <TableRow>
                <TableCell>No invoice exist</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {listOfInvoice.map((inv: any, n: number) => (
                <TableRow key={n}>
                  <TableCell className="flex items-center gap-2">
                    <span className="p-1 bg-[#F1ECE4] rounded-sm">
                      <FileText color="#6F4120" size={15} />
                    </span>
                    INV-00{inv.invoice_number}
                  </TableCell>
                  <TableCell>ORD-{inv.order.order_number}</TableCell>
                  <TableCell>{inv.order.user.name}</TableCell>
                  <TableCell>{inv.subtotal}/-</TableCell>
                  <TableCell>
                    {new Date(inv.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 border ${inv.payment_status ? "bg-[#E2F1E7] text-[#22A89E]  border-[#22A89E] rounded-2xl" : "bg-[#FBF1DF] text-[#F29E2F] border-[#F29E2F] rounded-2xl"} `}
                    >
                      {inv.payment_status ? "Paid" : "Unpaid"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <InvoiceComponent invoice={inv} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
