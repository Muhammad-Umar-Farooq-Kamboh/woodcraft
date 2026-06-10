import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Box, TreePine, TriangleAlert } from "lucide-react";

export default function SupplierDashboardTop({
  listOfMaterials,
  lowStockMaterial,
}: any) {
  const woodItems = listOfMaterials.filter((w: any) => w.categorie == "Wood");
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-bold text-[#291D14]">Welcome back!</h3>
        <p className="text-[#745247] text-[14px]">
          Manage your materials and update inventory
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Total
            </CardTitle>
            <CardAction className="p-1 bg-[#F1ECE4] rounded-sm">
              <Box color="#3D2514" />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {listOfMaterials.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              low stock
            </CardTitle>
            <CardAction className="p-1 bg-[#FBF3E3] rounded-sm">
              <TriangleAlert color="#F29F10" />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {lowStockMaterial.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="mx-auto w-full max-w-sm h-fit py-3">
          <CardContent>
            <CardTitle className="text-[#745247] text-[14px] font-normal uppercase">
              Wood
            </CardTitle>
            <CardAction className="p-1 bg-[#F1ECE4] rounded-sm">
              <TreePine color="#3D2514" />
            </CardAction>
            <p className="font-bold text-[#291D14] text-2xl">
              {woodItems.length || 0}
            </p>
            <CardDescription className="text-[#745247] text-[14px] font-normal">
              items
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
