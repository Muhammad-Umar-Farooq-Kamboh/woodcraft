import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Not Logged in");
    }
    const isAdmin = await prisma.user.findFirst({ where: { id: userId } });
    if (!isAdmin || isAdmin.role !== "admin") {
      throw new Error("Admin not Logged in");
    }
    const listOfCustomers = await prisma.user.findMany({
      where: { role: "customer" },
    });
    return Response.json(
      {
        status: 200,
        data: listOfCustomers,
        message: "List of customer",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 500, message: error.message || "Not get list of customers" },
      { status: 500 },
    );
  }
}
