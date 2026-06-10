import { projectTypes } from "@/data/InventoryData";
import RevniueAndExpences from "../admin/RevniueAndExpences";

export default function ReportBottomSection({ listOfInvoice }: any) {
  const listOfOrders = listOfInvoice.map((order: any) => order.order);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
      <div className="bg-card rounded-xl shadow-card border border-border p-5">
        <h2 className="font-display font-semibold text-foreground mb-4">
          Orders by Type
        </h2>
        <div className="space-y-3">
          {projectTypes.map((type, n) => {
            const count = listOfInvoice.filter(
              (o: any) => o.order.orderItem.product_type === type.name,
            ).length;
            const pct = (count / listOfInvoice.length) * 100;
            return (
              <div key={n}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-body text-foreground">
                    {type.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-body">
                      {count} orders
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#3D2514]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-card rounded-xl shadow-card border border-border p-5 h-fit">
        <h2 className="font-display font-semibold text-foreground mb-4">
          Order Status Distribution
        </h2>
        <div className="space-y-3">
          {[
            {
              status: "Pending",
              count: listOfInvoice.filter(
                (o: any) => o.order.order_status === "Pending",
              ).length,
              color: "bg-yellow-500",
            },
            {
              status: "In Progress",
              count: listOfInvoice.filter(
                (o: any) => o.order.order_status === "In_Progress",
              ).length,
              color: "bg-blue-500",
            },
            {
              status: "Completed",
              count: listOfInvoice.filter(
                (o: any) => o.order.order_status === "Completed",
              ).length,
              color: "bg-green-500",
            },
            {
              status: "Delivered",
              count: listOfInvoice.filter(
                (o: any) => o.order.order_status === "Delivered",
              ).length,
              color: "bg-amber-900",
            },
          ].map(({ status, count, color }) => {
            const pct = (count / listOfInvoice.length) * 100;
            return (
              <div key={status}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-body text-foreground">
                    {status}
                  </span>
                  <span className="text-sm font-semibold font-body text-foreground">
                    {count} orders
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RevniueAndExpences listOfOrders={listOfOrders} />
    </div>
  );
}
