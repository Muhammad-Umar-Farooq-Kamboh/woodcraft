import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not found");
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user?.role !== "admin") {
      throw new Error("User must be an admin");
    }
    const listOfOrders = await prisma.order.findMany({
      include: {
        orderItem: true,
        user: true,
        assigments: { include: { user: true } },
      },
    });
    return Response.json(
      {
        status: 200,
        data: listOfOrders,
        message: "Order created successfull",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      {
        status: 500,
        message: error.message || "List of orders cannot get properly",
      },
      { status: 500 },
    );
  }
}
