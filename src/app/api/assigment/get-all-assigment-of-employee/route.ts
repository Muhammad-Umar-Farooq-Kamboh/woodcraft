import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not Logged in");
    }
    const isEmployee = await prisma.user.findFirst({ where: { id: userId } });
    if (!isEmployee || isEmployee.role !== "employee") {
      throw new Error("User must be Employee");
    }
    const assigmentsOfEmployee = await prisma.assigment.findMany({
      where: { userId },
      include: { order: { include: { orderItem: true } } },
    });
    return Response.json(
      {
        status: 200,
        data: assigmentsOfEmployee,
        message: "List of assigments",
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
