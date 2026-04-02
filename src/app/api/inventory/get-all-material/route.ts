import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Login need for this request");
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new Error("Requested user not exist");
    }
    if (user.role === "customer" || user.role === "employee") {
      throw new Error("Admin and suppplier can access that information");
    }
    const listOfMaterial = await prisma.material.findMany();
    return Response.json(
      {
        status: 200,
        data: listOfMaterial,
        message: "List of materials are given",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Material not exist" },
      { status: 500 },
    );
  }
}
