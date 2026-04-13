import prisma from "@/lib/db";
import { enreypt } from "@/lib/encryption_decryption";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Admin must be loggedin for create new employee");
    }

    const { role, rate_per_hour, contact, address, email, name, password } =
      await req.json();
    if (
      !email ||
      !name ||
      !password ||
      !role ||
      !rate_per_hour ||
      !contact ||
      !address
    ) {
      throw new Error("Please Enter all entries");
    }

    const isadminLoggedIn = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (isadminLoggedIn?.role !== "admin") {
      throw new Error("Admin must be loggedin for create new employee");
    }

    const isEmailExist = await prisma.user.findFirst({ where: { email } });
    if (isEmailExist) {
      throw new Error("Email Already Exist");
    }

    const encryptedPassword = await enreypt(password);
    if (!encryptedPassword) {
      throw new Error("Password cannot be processed");
    }

    const createduser = await prisma.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
        role,
        profile: {
          create: {
            address,
            contact,
            rate_per_hour: Number(rate_per_hour),
          },
        },
      },
      omit: { password: true },
      include: { profile: true },
    });
    if (!createduser) {
      throw new Error("Employee not created successfully");
    }

    return Response.json(
      {
        status: 200,
        data: createduser,
        message: "Employee created successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "Employee not created" },
      { status: 400 },
    );
  }
}
