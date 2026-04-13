import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeeListSkelition() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* <div>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((e, n) => (
            <Skeleton
              className="h-[30px] w-[100px] rounded-sm bg-gray-300"
              key={n}
            />
          ))}
        </div>
      </div> */}
      <div className="border-1 rounded-2xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FCF8F0] uppercase">
              <TableHead className="text-[#745247]">Name</TableHead>
              <TableHead className="text-[#745247]">Hourly Rate</TableHead>
              <TableHead className="text-[#745247]">Hours Worked</TableHead>
              <TableHead className="text-[#745247]">Active Orders</TableHead>
              <TableHead className="text-[#745247]">Action </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {[1, 2, 3, 4, 5].map((e: any, n: number) => (
              <TableRow key={n}>
                <TableCell className="flex items-center gap-2">
                  <Skeleton className="h-[30px] w-[30px] bg-gray-300" />

                  <span className="flex flex-col gap-2">
                    <span>
                      <Skeleton className="h-[15px] w-[70px] rounded-sm bg-gray-300" />
                    </span>
                    <span>
                      <Skeleton className="h-[10px] w-[50px] rounded-sm bg-gray-300" />
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
                <TableCell className="flex items-center px-0">
                  <Skeleton className="h-[20px] w-[70px] rounded-sm bg-gray-300" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
