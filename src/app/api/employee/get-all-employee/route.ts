import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Admin not logged in");
    }
    const isAdmin = await prisma.user.findFirst({ where: { id: userId } });
    if (!isAdmin || isAdmin.role !== "admin") {
      throw new Error("Only admin can access all employes");
    }
    const listOfEmployee = await prisma.user.findMany({
      where: { OR: [{ role: "employee" }, { role: "supplier" }] },
      include: { profile: true },
      omit: { password: true },
    });
    return Response.json(
      {
        status: 200,
        data: listOfEmployee,
        message: "List of employee is found",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "Employee not found" },
      { status: 400 },
    );
  }
}
