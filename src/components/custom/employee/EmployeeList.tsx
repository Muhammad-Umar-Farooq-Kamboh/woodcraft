import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditEmployee from "./EditEmployee";

export default function EmployeeList({
  listOfEmployee,
  setListOfEmployee,
}: any) {
  return (
    <div>
      <div className="border-1 rounded-2xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FCF8F0] uppercase">
              <TableHead className="text-[#745247]">Name</TableHead>
              <TableHead className="text-[#745247]">Role</TableHead>
              <TableHead className="text-[#745247]">Hourly Rate</TableHead>
              <TableHead className="text-[#745247]">Hours Worked</TableHead>
              <TableHead className="text-[#745247]">Total Earnimg</TableHead>
              <TableHead className="text-[#745247]">Active Orders</TableHead>
              <TableHead className="text-[#745247]">Action </TableHead>
            </TableRow>
          </TableHeader>
          {listOfEmployee.length > 0 ? (
            <TableBody>
              {listOfEmployee.map((e: any, n: number) => (
                <TableRow key={n}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell>{e?.profile?.rate_per_hour || 1000}/-</TableCell>
                  <TableCell>
                    {e.assigment.reduce((sum: number, elem: any) => {
                      return sum + elem.hours;
                    }, 0)}
                  </TableCell>
                  <TableCell>
                    {e?.profile?.rate_per_hour *
                      e.assigment.reduce((sum: number, elem: any) => {
                        return sum + elem.hours;
                      }, 0)}
                    /-
                  </TableCell>
                  <TableCell>{e?.assigment.length}</TableCell>
                  <TableCell>
                    <EditEmployee
                      data={e}
                      setListOfEmployee={setListOfEmployee}
                    />
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
