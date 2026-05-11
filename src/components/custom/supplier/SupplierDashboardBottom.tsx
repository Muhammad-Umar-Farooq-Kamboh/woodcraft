import { AlertTriangle } from "lucide-react";

export default function SupplierDashboardBottom({ lowStockMaterials }: any) {
  return (
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
  );
}
