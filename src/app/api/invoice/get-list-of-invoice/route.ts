import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User must be logged in");
    }
    const isAdmin = await prisma.user.findFirst({ where: { id: userId } });
    if (!isAdmin || isAdmin.role !== "admin") {
      throw new Error("User must be admin");
    }
    const listOfInvoice = await prisma.invoice.findMany({
      include: {
        order: { include: { user: true, orderItem: true, assigments: true } },
      },
    });
    return Response.json(
      {
        status: 200,
        data: listOfInvoice,
        message: "List of invoice is found",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 500, message: error.message || "List of invoice not found" },
      { status: 500 },
    );
  }
}
