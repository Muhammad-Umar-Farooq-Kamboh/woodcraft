import { AlertTriangle } from "lucide-react";
import RevniueAndExpences from "./RevniueAndExpences";

export default function AdminDashboardBottom({
  listOfOrders,
  lowStockMaterials,
}: any) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">
            Recent Orders
          </h2>
        </div>
        <div className="divide-y divide-border">
          {listOfOrders.map((order: any, n: number) => (
            <div
              key={n}
              className="px-5 py-3.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-body font-medium">
                    {"ORD-" + order.order_number}
                  </span>
                  <span className="text-xs text-border">·</span>
                  <span className="text-xs text-muted-foreground font-body">
                    {order.orderItem.product_type}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground font-body mt-0.5 truncate">
                  {order.orderItem.product_discription}
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  {order.user.name}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className="text-sm font-semibold text-foreground font-body">
                  {order.total_cost + " PKR"}
                </span>
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
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <AlertTriangle size={16} className="text-status-pending" />
          <h2 className="font-display font-semibold text-foreground">
            Low Stock Alerts
          </h2>
        </div>
        {lowStockMaterials.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground font-body text-sm">
            All stock levels are healthy
          </div>
        ) : (
          <div className="divide-y divide-border">
            {lowStockMaterials.map((mat: any) => (
              <div key={mat.id} className="px-5 py-3.5">
                <p className="text-sm font-medium text-foreground font-body">
                  {mat.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#F29E0D] font-body font-medium">
                    {mat.unit} items left
                  </span>
                  <span className="text-xs text-muted-foreground font-body">
                    {"Min: " + mat.low_stock_threshold}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F29E0D] rounded-full"
                    style={{
                      width: `${Math.min((mat.unit / mat.low_stock_threshold) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <RevniueAndExpences /> */}
    </div>
  );
}
