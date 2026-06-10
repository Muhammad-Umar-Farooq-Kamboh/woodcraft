import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not logged in");
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new Error("User not exist");
    }
    const getAllOrdersOfUser = await prisma.order.findMany({
      where: { userId },
      include: { orderItem: true, invoice: true },
    });
    return Response.json(
      {
        status: 200,
        data: getAllOrdersOfUser,
        message: "All orders are listed here",
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
