import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Box, Dot } from "lucide-react";

export default function InventoryList() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-transparent hover:border-[#3d25148e]"
          >
            All{" "}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:border-[#3d25148e]"
          >
            Wood{" "}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:border-[#3d25148e]"
          >
            Hardware{" "}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:border-[#3d25148e]"
          >
            Adhesives{" "}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:border-[#3d25148e]"
          >
            Finishing{" "}
          </Button>
        </div>
      </div>
      <div className="border-1 rounded-2xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FCF8F0] uppercase">
              <TableHead className="text-[#745247]">Material</TableHead>
              <TableHead className="text-[#745247]">Category</TableHead>
              <TableHead className="text-[#745247]"> Unit Price</TableHead>
              <TableHead className="text-[#745247]">Status</TableHead>
              <TableHead className="text-[#745247]">Action </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                {" "}
                <span className="bg-[#F1ECE4] p-2 rounded-sm">
                  <Box size={15} color="#6F4120" />
                </span>
                <span className="flex flex-col">
                  <span>Oak Wood</span>
                  <span className="text-[12px] text-[#6F4120]">MAT-001</span>
                </span>
              </TableCell>
              <TableCell>
                <span className="bg-[#F1ECE4] py-0 px-2 text-[#6F4120]">
                  Wood
                </span>
              </TableCell>
              <TableCell>$8.50</TableCell>
              <TableCell className="flex items-center px-0">
                {" "}
                <Dot color="#22A050" />{" "}
                <span className="text-[#22A050] font-semibold">In Stock</span>
              </TableCell>
              <TableCell>No action </TableCell>
            </TableRow>
            <TableRow className="bg-[#FCF8F0]">
              <TableCell className="flex items-center gap-2">
                {" "}
                <span className="bg-[#F1ECE4] p-2 rounded-sm">
                  <Box size={15} color="#6F4120" />
                </span>
                <span className="flex flex-col">
                  <span>Walnut Wood</span>
                  <span className="text-[12px] text-[#6F4120]">MAT-001</span>
                </span>
              </TableCell>
              <TableCell>
                <span className="bg-[#F1ECE4] py-0 px-2 text-[#6F4120]">
                  Wood
                </span>
              </TableCell>
              <TableCell>$10.50</TableCell>
              <TableCell className="flex items-center px-0">
                {" "}
                <Dot color="#22A050" />{" "}
                <span className="text-[#22A050] font-semibold">In Stock</span>
              </TableCell>
              <TableCell>No action </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
