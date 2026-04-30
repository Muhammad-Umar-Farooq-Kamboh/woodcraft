import { taxPercetage } from "@/data/InventoryData";
import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    // Verify user is logged in
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not found");
    }

    // Get data from frountend
    const {
      address,
      contact,
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
      amountOfPaint,
    } = await req.json();
    if (
      !address ||
      !contact ||
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
      !hours_of_construction ||
      !amountOfPaint
    ) {
      throw new Error("Please enter all entities");
    }

    // Cheak every product is available
    const woodType = await prisma.material.findFirst({
      where: { name: product_wood_type },
    });
    if (!woodType || woodType.unit.toNumber() <= 0) {
      throw new Error("This wood is out of stock");
    }
    const skrewUsed = await prisma.material.findFirst({
      where: { name: "Wood Screws" },
    });
    if (!skrewUsed || skrewUsed.unit.toNumber() <= 0.4) {
      throw new Error("Hardware is out of stock");
    }
    const glueUsed = await prisma.material.findFirst({
      where: { name: "Wood Glue" },
    });
    if (!glueUsed || glueUsed.unit.toNumber() <= 3) {
      throw new Error("Accessories is out of stock");
    }
    const sandPaperUsed = await prisma.material.findFirst({
      where: { name: "Sandpaper Set" },
    });
    if (!sandPaperUsed || sandPaperUsed.unit.toNumber() <= 0.5) {
      throw new Error("Accessories is out of stock");
    }
    const finishingUsed = await prisma.material.findFirst({
      where: { name: finishing_touch },
    });

    // Create Order
    const createOrder = await prisma.order.create({
      data: {
        total_cost: Number(price_without_tax * 1.1),
        address,
        contact,
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

    // Update Materials
    if (finishingUsed) {
      const updatePaint = await prisma.material.update({
        where: { id: finishingUsed.id },
        data: {
          unit: finishingUsed.unit.toNumber() - amountOfPaint,
        },
      });
      if (!updatePaint) {
        throw new Error("Order created but material not updated");
      }
    }
    const updateWood = await prisma.material.update({
      where: { id: woodType.id },
      data: {
        unit: woodType.unit.toNumber() - quantityOfWood,
      },
    });
    const updateSkrews = await prisma.material.update({
      where: { id: skrewUsed.id },
      data: { unit: skrewUsed.unit.toNumber() - amountOfSkrews },
    });
    const updateGlue = await prisma.material.update({
      where: { id: glueUsed.id },
      data: { unit: glueUsed.unit.toNumber() - amountOfGlue },
    });
    const updateSandPapers = await prisma.material.update({
      where: { id: sandPaperUsed.id },
      data: { unit: sandPaperUsed.unit.toNumber() - amountOfSandPapers },
    });
    if (!updateWood || !updateSkrews || !updateGlue || !updateSandPapers) {
      throw new Error("Order created but material not updated");
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
