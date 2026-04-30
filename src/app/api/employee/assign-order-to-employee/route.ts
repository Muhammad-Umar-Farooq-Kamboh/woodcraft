import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not logged in");
    }
    const admin = await prisma.user.findFirst({ where: { id: userId } });
    if (admin?.role !== "admin") {
      throw new Error("Admin is not logged in");
    }
    const { oderId, assignEmployee } = await req.json();
    if (!oderId || !assignEmployee) {
      throw new Error("Issue is getting order is");
    }
    const isAssigmentExist = await prisma.assigment.findFirst({
      where: {
        orderId: oderId,
      },
    });
    if (isAssigmentExist) {
      throw new Error("Order already assigned");
    }
    const isOrderExist = await prisma.order.findFirst({
      where: { id: oderId },
    });
    const isOrderDetailsExist = await prisma.order_Item.findFirst({
      where: { orderId: isOrderExist?.id },
    });
    if (!isOrderExist || !isOrderDetailsExist) {
      throw new Error("Not the correct order number");
    }
    const isEmployeeExist = await prisma.user.findFirst({
      where: { id: assignEmployee },
    });
    if (!isEmployeeExist) {
      throw new Error("Employee not exist");
    }
    const assignOrder = await prisma.order.update({
      where: { id: isOrderExist.id },
      data: {
        assigments: {
          create: {
            userId: assignEmployee,
            hours: isOrderDetailsExist.hours_of_construction,
          },
        },
      },
      include: {
        orderItem: true,
        user: true,
        assigments: { include: { user: true } },
      },
    });
    if (!assignOrder) {
      throw new Error("Order not assigned");
    }
    return Response.json({
      status: 200,
      data: assignOrder,
      message: "Order assigned successfully",
    });
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "Not Assigned" },
      { status: 400 },
    );
  }
}
