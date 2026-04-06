import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Login need for this request");
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new Error("Requested user not exist");
    }
    if (user.role === "customer" || user.role === "employee") {
      throw new Error("Admin and suppplier can access that information");
    }

    // const listOfMaterial = await prisma.material.findMany();
    const {
      id,
      name,
      categorie,
      unit_price,
      numberOfProduct,
      low_stock_threshold,
    } = await req.json();
    if (
      [id, name, categorie].some((e) => e.trim() === "") &&
      //   !id &&
      //   !name &&
      //   !categorie &&
      !unit_price &&
      !numberOfProduct &&
      !low_stock_threshold
    ) {
      throw new Error("Please enter all entries");
    }

    const selectedMaterial = await prisma.material.findUnique({
      where: { id },
    });
    if (!selectedMaterial) {
      throw new Error("Item not found");
    }

    const updatedUnitPrice = Math.ceil(
      (selectedMaterial.unit * selectedMaterial.unit_price +
        Number(unit_price) * Number(numberOfProduct)) /
        (selectedMaterial.unit + Number(numberOfProduct)),
    );
    // (selectedMaterial.unit_price + Number(unit_price)) / 2;
    const updatedUnits = selectedMaterial.unit + Number(numberOfProduct);

    const updateMaterial = await prisma.material.update({
      where: { id: selectedMaterial.id },
      data: {
        name,
        categorie,
        unit_price: Number(updatedUnitPrice),
        unit: Number(updatedUnits),
        low_stock_threshold: Number(low_stock_threshold),
        userId,
      },
    });
    if (!updateMaterial) {
      throw new Error("Material not updated");
    }

    return Response.json(
      {
        status: 200,
        data: updateMaterial,
        message: "Selected material is updated",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Selected material not updated" },
      { status: 500 },
    );
  }
}
