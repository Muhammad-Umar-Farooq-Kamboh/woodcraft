import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Status not given");
    }
    const isEmployee = await prisma.user.findFirst({ where: { id: userId } });
    if (isEmployee?.role !== "employee") {
      throw new Error("Just admin and employee can change status of order");
    }
    const { orderStatus, assigmentId } = await req.json();
    if (!orderStatus || !assigmentId) {
      throw new Error("Status not given");
    }
    const isAssigmentExist = await prisma.assigment.findFirst({
      where: { id: assigmentId },
    });
    if (!isAssigmentExist) {
      throw new Error("Status not given");
    }
    const updateAssigmentStatusOrder = await prisma.assigment.update({
      where: { id: assigmentId },
      data: {
        order: {
          update: { order_status: orderStatus },
        },
      },
      include: { order: { include: { orderItem: true, user: true } } },
    });
    if (!updateAssigmentStatusOrder) {
      throw new Error("Status not given");
    }
    return Response.json({
      status: 200,
      data: updateAssigmentStatusOrder,
      message: "Status of order updated",
    });
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "Status not updated" },
      { status: 400 },
    );
  }
}
