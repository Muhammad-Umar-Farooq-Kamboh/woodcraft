import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User not logged in");
    }
    const isEmployee = await prisma.user.findFirst({ where: { id: userId } });
    if (!isEmployee || isEmployee.role !== "employee") {
      throw new Error("User must be admin");
    }
    const employeeSalary = await prisma.profile.findFirst({
      where: { userId },
      select: { rate_per_hour: true },
    });
    return Response.json(
      {
        status: 200,
        data: employeeSalary,
        message: "Employee salary",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 500, message: error.message || "Issue in getting salary" },
      { status: 500 },
    );
  }
}
