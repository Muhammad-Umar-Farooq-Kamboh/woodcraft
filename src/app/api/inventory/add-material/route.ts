import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw Error("User not found");
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role == "employee" || user.role == "customer") {
      throw new Error("Customer and Employee cannot add material");
    }
    const {
      name,
      categorie,
      unit_price,
      numberOfProduct,
      low_stock_threshold,
    } = await req.json();
    if (
      [name, categorie, unit_price, numberOfProduct, low_stock_threshold].some(
        (e) => e.trim() === "",
      )
    ) {
      throw new Error("Please enter all entries");
    }
    const previousMaterial = await prisma.material.findFirst({
      where: { name },
    });
    if (previousMaterial) {
      throw new Error("This Material added previously");
    }
    const newMaterial = await prisma.material.create({
      data: {
        name,
        categorie,
        unit_price: Number(unit_price),
        unit: Number(numberOfProduct),
        low_stock_threshold: Number(low_stock_threshold),
        userId,
      },
    });
    if (!newMaterial) {
      throw new Error("New material not added");
    }
    return Response.json(
      {
        status: 200,
        data: newMaterial,
        message: "Materail added successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Issue in adding material" },
      { status: 500 },
    );
  }
}
