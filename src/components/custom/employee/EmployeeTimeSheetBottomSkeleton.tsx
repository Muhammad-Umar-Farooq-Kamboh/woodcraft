import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeeTimeSheetBottomSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[30px] w-[100px] rounded-sm bg-gray-300" />
        <Skeleton className="h-[10px] w-[100px] rounded-sm bg-gray-300" />
      </div>
      <div>
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

          <TableBody>
            {[1, 2, 3, 4, 5].map((ass: any, n: number) => (
              <TableRow key={n}>
                <TableCell className="flex items-center gap-2">
                  <Skeleton className="h-[15px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell>
                  {" "}
                  <Skeleton className="h-[15px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell>
                  {" "}
                  <Skeleton className="h-[15px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[15px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[15px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
