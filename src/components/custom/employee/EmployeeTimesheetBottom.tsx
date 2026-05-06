import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeeTimesheetBottom({
  listOfOrders,
  perhourSalary,
}: any) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h3 className="font-semibold text-[20px] text-[#291D14]">
          Recent Time Entries
        </h3>
        <p className="text-[#745247] text-[14px]">Your logged work hours</p>
      </div>
      <div className="border-1 rounded-2xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FCF8F0] uppercase">
              <TableHead className="text-[#745247]">Date</TableHead>
              <TableHead className="text-[#745247]">Order ID</TableHead>
              <TableHead className="text-[#745247]">Task</TableHead>
              <TableHead className="text-[#745247]"> Hours</TableHead>
              <TableHead className="text-[#745247]">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          {listOfOrders.length > 0 ? (
            <TableBody>
              {listOfOrders.map((ass: any, n: number) => (
                <TableRow key={n}>
                  <TableCell className="flex items-center gap-2">
                    {new Date(ass?.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>ORD{ass?.order?.order_number}</TableCell>
                  <TableCell>{ass?.order?.orderItem?.product_type}</TableCell>
                  <TableCell>
                    {ass?.order?.order_status === "Completed" ||
                    ass?.order?.order_status === "Delivered"
                      ? `${ass?.hours}h`
                      : "0h"}
                  </TableCell>
                  <TableCell>
                    {ass?.order?.order_status === "Completed" ||
                    ass?.order?.order_status === "Delivered"
                      ? `${ass?.hours * perhourSalary}/-`
                      : "0/-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>No material avaliable</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
