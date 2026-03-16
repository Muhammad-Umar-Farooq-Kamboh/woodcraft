import prisma from "@/lib/db";
import { enreypt } from "@/lib/encryption_decryption";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    if (!email || !name || !password) {
      throw new Error("Please Enter all entries");
    }
    const isEmailExist = await prisma.user.findFirst({ where: { email } });
    if (isEmailExist) {
      throw new Error("Email Already Exist");
    }
    const encryptedPassword = await enreypt(password);
    if (!encryptedPassword) {
      throw new Error("Password cannot be processed");
    }
    // Password encryption not exist till yet
    const createduser = await prisma.user.create({
      data: { email, name, password: encryptedPassword },
    });
    return Response.json(
      { status: 200, data: createduser, message: "User created successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "User created successfully" },
      { status: 400 },
    );
  }
}
