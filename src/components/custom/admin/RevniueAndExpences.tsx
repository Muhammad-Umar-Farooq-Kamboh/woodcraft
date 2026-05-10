export default function RevniueAndExpences() {
  return (
    <div className="md:col-span-3">
      <div className="bg-card rounded-xl shadow-card border border-border p-5">
        <h2 className="font-display font-semibold text-foreground mb-4">
          Revenue vs Expenses — February 2026
        </h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body text-muted-foreground">
                Revenue
              </span>
              <span className="text-sm font-semibold font-body text-foreground">
                {/* ${monthlyStats.revenue.toLocaleString()} */} 50000/-
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#804F23]"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body text-muted-foreground">
                Expenses
              </span>
              <span className="text-sm font-semibold font-body text-foreground">
                {/* ${monthlyStats.expenses.toLocaleString()} */}2500/-
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1972E6]"
                style={{
                  width: `${(2500 / 5000) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body text-muted-foreground">
                Profit
              </span>
              <span className="text-sm font-semibold font-body text-[#22A050]">
                {/* ${profit.toLocaleString()} */} 2500/-
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#22A050]"
                style={{ width: `${(2500 / 5000) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
