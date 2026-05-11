import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Status not given");
    }
    const isAdmin = await prisma.user.findFirst({ where: { id: userId } });
    if (isAdmin?.role !== "admin" && isAdmin?.role !== "employee") {
      throw new Error("Just admin and employee can change status of order");
    }
    const { orderStatus, orderId } = await req.json();
    if (!orderStatus || !orderId) {
      throw new Error("Status not given");
    }
    const isOrderExist = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!isOrderExist) {
      throw new Error("Status not given");
    }
    const updateStatusOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        order_status: orderStatus,
        payment_status: true,
        invoice: {
          update: {
            payment_status: true,
          },
        },
      },
      include: {
        orderItem: true,
        user: true,
        assigments: { include: { user: true } },
      },
    });
    if (!updateStatusOrder) {
      throw new Error("Status not given");
    }
    return Response.json({
      status: 200,
      data: updateStatusOrder,
      message: "Status of order updated",
    });
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "Status not updated" },
      { status: 400 },
    );
  }
}
