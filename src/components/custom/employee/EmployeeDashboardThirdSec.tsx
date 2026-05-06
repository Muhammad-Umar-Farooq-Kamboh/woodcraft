import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
export default function EmployeeDashboardThirdSec({
  listOfOrders,
  perhourSalary,
}: any) {
  const navigate = useRouter();
  return (
    <div>
      <Card className=" bg-[#F9F8F5]">
        <CardHeader>
          <CardTitle className="text-[18px] text-[#3D2514] font-bold">
            Recent Time Entries
          </CardTitle>
          <CardDescription>Your logged work hours</CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => navigate.replace("/employee/timesheet")}
            >
              show more
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="border-1 rounded-2xl overflow-hidden hover:shadow">
            <Table>
              <TableHeader>
                <TableRow className=" uppercase">
                  <TableHead className="text-[#745247]">Date</TableHead>
                  <TableHead className="text-[#745247]">Order ID</TableHead>
                  <TableHead className="text-[#745247]">Task</TableHead>
                  <TableHead className="text-[#745247]"> Hours</TableHead>
                  <TableHead className="text-[#745247]">Earnings</TableHead>
                </TableRow>
              </TableHeader>
              {listOfOrders.length > 0 ? (
                <TableBody>
                  {listOfOrders.slice(0, 2).map((ass: any, n: number) => (
                    <TableRow key={n}>
                      <TableCell className="flex items-center gap-2">
                        {new Date(ass?.start_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>ORD{ass?.order?.order_number}</TableCell>
                      <TableCell>
                        {ass?.order?.orderItem?.product_type}
                      </TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
}
