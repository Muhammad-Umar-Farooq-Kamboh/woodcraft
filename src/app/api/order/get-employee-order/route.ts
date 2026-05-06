import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not logeed in");
    }
    const isEmployee = await prisma.user.findFirst({ where: { id: userId } });
    if (!isEmployee || isEmployee.role !== "employee") {
      throw new Error("User must be employee");
    }
    const listOfOrders = await prisma.assigment.findMany({
      where: { userId },
      include: { order: { include: { orderItem: true, user: true } } },
    });
    return Response.json(
      {
        status: 200,
        data: listOfOrders,
        message: "Order found successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 500, message: error.message || "Issue in getting orders" },
      { status: 500 },
    );
  }
}
