export default function RevniueAndExpences({ listOfOrders }: any) {
  const totalRevinue = listOfOrders.reduce((sum: number, order: any) => {
    return sum + order.total_cost;
  }, 0);
  const toatalMaterialCost = listOfOrders.reduce((sum: number, order: any) => {
    return sum + order.material_cost;
  }, 0);
  const totalLabourCost = listOfOrders.reduce((sum: number, order: any) => {
    return sum + order.labour_cost;
  }, 0);
  const totalExpensie = toatalMaterialCost + totalLabourCost;
  const profit = totalRevinue - totalExpensie;
  return (
    <div className="col-span-3">
      <div className="bg-card rounded-xl shadow-card border border-border p-5">
        <h2 className="font-display font-semibold text-foreground mb-4">
          Revenue vs Expenses
        </h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body text-muted-foreground">
                Revenue
              </span>
              <span className="text-sm font-semibold font-body text-foreground">
                {totalRevinue.toLocaleString()}/-
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
                Estimated Expenses
              </span>
              <span className="text-sm font-semibold font-body text-foreground">
                {totalExpensie.toLocaleString()}/-
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1972E6]"
                style={{
                  width: `${(totalExpensie / totalRevinue) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body text-muted-foreground">
                Estimated Profit
              </span>
              <span className="text-sm font-semibold font-body text-[#22A050]">
                {profit.toLocaleString()}/-
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#22A050]"
                style={{ width: `${(profit / totalRevinue) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
