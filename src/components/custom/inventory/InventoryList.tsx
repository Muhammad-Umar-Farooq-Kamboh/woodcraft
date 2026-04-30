import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Box, Dot, TriangleAlert } from "lucide-react";
import { useState } from "react";
import EditInventory from "./EditInventory";

export default function InventoryList({
  listOfMaterials,
  setListOfMaterials,
}: any) {
  const [categorie, setCategorie] = useState("All");
  const filtered = listOfMaterials.filter((e) => e.categorie === categorie);
  const data = categorie === "All" ? listOfMaterials : filtered;
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className={`hover:border-[#3d25148e] ${categorie === "All" ? "bg-[#3D2514] hover:bg-[#3D2514] hover:text-white text-white" : "bg-transparent text-[#3D2514] hover:border-[#3d25148e]"}`}
            onClick={() => setCategorie("All")}
          >
            All{" "}
          </Button>
          <Button
            variant="outline"
            className={`hover:border-[#3d25148e] ${categorie === "Wood" ? "bg-[#3D2514] hover:bg-[#3D2514] hover:text-white text-white" : "bg-transparent text-[#3D2514] hover:border-[#3d25148e]"}`}
            onClick={() => setCategorie("Wood")}
          >
            Wood{" "}
          </Button>
          <Button
            variant="outline"
            className={`hover:border-[#3d25148e] ${categorie === "Hardware" ? "bg-[#3D2514] hover:bg-[#3D2514] hover:text-white text-white" : "bg-transparent text-[#3D2514] hover:border-[#3d25148e]"}`}
            onClick={() => setCategorie("Hardware")}
          >
            Hardware{" "}
          </Button>
          <Button
            variant="outline"
            className={`hover:border-[#3d25148e] ${categorie === "Adhesivers" ? "bg-[#3D2514] hover:bg-[#3D2514] hover:text-white text-white" : "bg-transparent text-[#3D2514] hover:border-[#3d25148e]"}`}
            onClick={() => setCategorie("Accessories")}
          >
            Accessories{" "}
          </Button>
          <Button
            variant="outline"
            className={`${categorie === "Finishing" ? "bg-[#3D2514] hover:bg-[#3D2514] hover:text-white text-white" : "bg-transparent text-[#3D2514] hover:border-[#3d25148e]"}`}
            onClick={() => setCategorie("Finishing")}
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
              <TableHead className="text-[#745247]">Stock Level</TableHead>
              <TableHead className="text-[#745247]"> Unit Price</TableHead>
              <TableHead className="text-[#745247]">Status</TableHead>
              <TableHead className="text-[#745247]">Action </TableHead>
            </TableRow>
          </TableHeader>
          {data.length > 0 ? (
            <TableBody>
              {data.map((e: any, n: number) => (
                <TableRow key={n}>
                  <TableCell className="flex items-center gap-2">
                    <span className="bg-[#F1ECE4] p-2 rounded-sm">
                      <Box size={15} color="#6F4120" />
                    </span>
                    <span className="flex flex-col">
                      <span>{e.name}</span>
                      <span className="text-[12px] text-[#6F4120]">
                        MAT-00{n + 1}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-[#F1ECE4] py-0 px-2 text-[#6F4120]">
                      {e.categorie}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-2xl font-semibold ${e.unit < e.low_stock_threshold ? "text-red-500" : "text-[#6F4120]"}`}
                    >
                      {e.unit}
                    </span>
                    <span className="text-gray-600">
                      /{e.low_stock_threshold}
                    </span>
                  </TableCell>
                  <TableCell>{e.unit_price}/-</TableCell>
                  {e.unit < e.low_stock_threshold ? (
                    <TableCell className="flex items-center gap-2 px-0">
                      <TriangleAlert color="#F29E0D" size={15} />
                      <span className="text-[#F29E0D] font-semibold">
                        Low Stock
                      </span>
                    </TableCell>
                  ) : (
                    <TableCell className="flex items-center px-0">
                      <Dot color="#22A050" />
                      <span className="text-[#22A050] font-semibold">
                        In Stock
                      </span>
                    </TableCell>
                  )}
                  <TableCell>
                    <EditInventory data={e} setdata={setListOfMaterials} />{" "}
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
