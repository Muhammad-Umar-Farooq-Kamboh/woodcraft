import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("User must be logged in");
    }
    const isUserExist = await prisma.user.findFirst({
      where: { id: userId },
      include: { profile: true },
    });
    return Response.json({
      status: 200,
      data: isUserExist,
      message: "User found successfully",
    });
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "User not found" },
      { status: 400 },
    );
  }
}
