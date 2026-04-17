import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not found");
    }
    const {
      address,
      aditional_info,
      amountOfGlue,
      amountOfSandPapers,
      amountOfSkrews,
      finishing_touch,
      price_without_tax,
      product_discription,
      product_quantity,
      product_type,
      product_wood_type,
      quantityOfWood,
      hours_of_construction,
    } = await req.json();
    if (
      !address ||
      !amountOfGlue ||
      !amountOfSandPapers ||
      !amountOfSkrews ||
      !finishing_touch ||
      !price_without_tax ||
      !product_discription ||
      !product_quantity ||
      !product_type ||
      !product_wood_type ||
      !quantityOfWood ||
      !hours_of_construction
    ) {
      throw new Error("Please enter all entities");
    }
    const woodType = await prisma.material.findFirst({
      where: { name: product_wood_type },
    });
    if (!woodType || woodType.unit <= 0) {
      throw new Error("This wood is out of stock");
    }
    const skrewUsed = await prisma.material.findFirst({
      where: { name: "Wood Screws" },
    });
    if (!skrewUsed || skrewUsed.unit <= 0.4) {
      throw new Error("Hardware is out of stock");
    }
    const glueUsed = await prisma.material.findFirst({
      where: { name: "Wood Glue" },
    });
    if (!glueUsed || glueUsed.unit <= 3) {
      throw new Error("Accessories is out of stock");
    }
    const sandPaperUsed = await prisma.material.findFirst({
      where: { name: "Sandpaper Set" },
    });
    if (!sandPaperUsed || sandPaperUsed.unit <= 0.5) {
      throw new Error("Accessories is out of stock");
    }
    const finishingUsed = await prisma.material.findFirst({
      where: { name: finishing_touch },
    });
    const createOrder = await prisma.order.create({
      data: {
        total_cost: Number(price_without_tax),
        address,
        contact: address,
        userId,
        orderItem: {
          create: {
            product_type,
            product_wood_type,
            product_quantity,
            finishing_touch,
            product_discription,
            aditional_info: aditional_info || null,
            hours_of_construction,
          },
        },
      },
      include: { orderItem: true },
    });
    if (!createOrder) {
      throw new Error("Order not created");
    }
    return Response.json(
      {
        status: 200,
        data: createOrder,
        message: "Order created successfull",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 500, message: error.message || "request got successfull" },
      { status: 500 },
    );
  }
}
