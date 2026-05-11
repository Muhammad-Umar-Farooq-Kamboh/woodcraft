import prisma from "@/lib/db";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    const { name, email, address, contact } = await req.json();
    if ([name, email, address, contact].some((e) => e.trim() === "")) {
      throw new Error("Please enter all entities");
    }
    if (!userId) {
      throw new Error("User must be loggedin");
    }
    const isUserExist = await prisma.user.findFirst({ where: { id: userId } });
    if (!isUserExist) {
      throw new Error("User not exist");
    }
    const isProfileExist = await prisma.profile.findFirst({
      where: { userId },
    });
    if (!isProfileExist) {
      const createProfile = await prisma.user.update({
        where: { id: isUserExist.id },
        data: {
          name,
          email,
          profile: {
            create: {
              address,
              contact,
            },
          },
        },
        include: { profile: true },
      });
      if (!createProfile) throw new Error("User profile is not created");
      return Response.json({
        status: 200,
        data: createProfile,
        message: "Profile created successfully",
      });
    }
    const updateProfile = await prisma.user.update({
      where: { id: isUserExist.id },
      data: {
        name,
        email,
        profile: {
          update: {
            address,
            contact,
          },
        },
      },
      include: { profile: true },
    });
    if (!updateProfile) throw new Error("User profile is not created");
    return Response.json({
      status: 200,
      data: updateProfile,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "User not updated" },
      { status: 400 },
    );
  }
}
