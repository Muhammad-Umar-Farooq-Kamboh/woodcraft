import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const woodCategoriesItems = await prisma.material.findMany({
      where: { categorie: "Wood" },
      select: { name: true, unit_price: true },
    });
    if (!woodCategoriesItems) {
      throw new Error("Items not found");
    }
    return Response.json(
      { status: 200, data: woodCategoriesItems, message: "Wood Items find" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Wood categories not found" },
      { status: 500 },
    );
  }
}
