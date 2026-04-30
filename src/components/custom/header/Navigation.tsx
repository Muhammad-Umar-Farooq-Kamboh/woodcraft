import Link from "next/link";
import {
  Box,
  ChartColumn,
  Clock4,
  Handbag,
  LayoutDashboard,
  ListChecks,
  Plus,
  StickyNote,
  Users,
  Warehouse,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

const adminNavItems = [
  {
    icon: <LayoutDashboard size={16} />,
    text: "Dashboard",
    slug: "/admin",
  },
  { icon: <Handbag size={16} />, text: "Orders", slug: "/admin/orders" },
  { icon: <Box size={16} />, text: "Inventory", slug: "/admin/inventory" },
  { icon: <Users size={16} />, text: "Employees", slug: "/admin/employees" },
  { icon: <StickyNote size={16} />, text: "Billing", slug: "/admin/billing" },
  { icon: <ChartColumn size={16} />, text: "Reports", slug: "/admin/reports" },
];

const customerNavItems = [
  {
    icon: <LayoutDashboard size={16} />,
    text: "Dashboard",
    slug: "/customer",
  },
  {
    icon: <Plus size={16} />,
    text: "New Orders",
    slug: "/customer/new-orders",
  },
];

const employeeNavItems = [
  {
    icon: <LayoutDashboard size={16} />,
    text: "Dashboard",
    slug: "/employee",
  },
  {
    icon: <ListChecks size={16} />,
    text: "My Assigments",
    slug: "/employee/tasks",
  },
  {
    icon: <Clock4 size={16} />,
    text: "Timesheet",
    slug: "/employee/timesheet",
  },
];

const supplierNavItems = [
  {
    icon: <LayoutDashboard size={16} />,
    text: "Dashboard",
    slug: "/supplier",
  },
  {
    icon: <Warehouse size={16} />,
    text: "Inventory",
    slug: "/supplier/inventory",
  },
  {
    icon: <Handbag size={16} />,
    text: "Orders",
    slug: "/supplier/orders",
  },
];
export default function Navigation({
  role,
  setcloseDraw,
  classname,
}: {
  role?: string;
  setcloseDraw?: any;
  classname?: string;
}) {
  const pathname = usePathname();
  return (
    <div className={classname}>
      {" "}
      {role === "admin" && (
        <nav className="flex flex-col gap-2 mx-2">
          {adminNavItems.map((e: any, n: number) => (
            //   <div key={n}>{e.text}</div>
            <Link
              href={e.slug}
              key={n}
              className={`text-[#B7AA9C] flex items-center gap-2 px-3 py-1 rounded-sm hover:bg-[#E89230] hover:text-black ${pathname === e.slug && "bg-[#E89230] text-black"}`}
              onClick={() => setcloseDraw(false)}
            >
              {e.icon}
              {e.text}
            </Link>
          ))}
        </nav>
      )}
      {role === "customer" && (
        <nav className="flex flex-col gap-2 mx-2">
          {customerNavItems.map((e: any, n: number) => (
            //   <div key={n}>{e.text}</div>
            <Link
              href={e.slug}
              key={n}
              className={`text-[#B7AA9C] flex items-center gap-2 px-3 py-1 rounded-sm hover:bg-[#E89230] hover:text-black ${pathname === e.slug && "bg-[#E89230] text-black"}`}
              onClick={() => setcloseDraw(false)}
            >
              {e.icon}
              {e.text}
            </Link>
          ))}
        </nav>
      )}
      {role === "employee" && (
        <nav className="flex flex-col gap-2 mx-2">
          {employeeNavItems.map((e: any, n: number) => (
            //   <div key={n}>{e.text}</div>
            <Link
              href={e.slug}
              key={n}
              className={`text-[#B7AA9C] flex items-center gap-2 px-3 py-1 rounded-sm hover:bg-[#E89230] hover:text-black ${pathname === e.slug && "bg-[#E89230] text-black"}`}
              onClick={() => setcloseDraw(false)}
            >
              {e.icon}
              {e.text}
            </Link>
          ))}
        </nav>
      )}
      {role === "supplier" && (
        <nav className="flex flex-col gap-2 mx-2">
          {supplierNavItems.map((e: any, n: number) => (
            //   <div key={n}>{e.text}</div>
            <Link
              href={e.slug}
              key={n}
              className={`text-[#B7AA9C] flex items-center gap-2 px-3 py-1 rounded-sm hover:bg-[#E89230] hover:text-black ${pathname === e.slug && "bg-[#E89230] text-black"}`}
              onClick={() => setcloseDraw(false)}
            >
              {e.icon}
              {e.text}
            </Link>
          ))}
        </nav>
      )}
      {role !== "admin" &&
        role !== "customer" &&
        role !== "employee" &&
        role !== "supplier" && (
          <div>
            <nav className="flex flex-col gap-4 mx-2">
              {adminNavItems.map((e: any, n: number) => (
                //   <div key={n}>{e.text}</div>
                <Skeleton
                  className="h-[25px] w-full rounded-sm bg-[#E89230]"
                  key={n}
                />
              ))}
            </nav>
          </div>
        )}
    </div>
  );
}
