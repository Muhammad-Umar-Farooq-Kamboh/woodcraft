import prisma from "@/lib/db";
import { enreypt } from "@/lib/encryption_decryption";
import getUserIdFromSession from "@/lib/verifyuser";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      throw new Error("Admin must be logged in");
    }
    const isAdmin = await prisma.user.findFirst({ where: { id: userId } });
    if (!isAdmin || isAdmin.role !== "admin") {
      throw new Error("Only admin can access all employes");
    }

    const { id, role, rate_per_hour, contact, address, email, name, password } =
      await req.json();
    if (
      !id ||
      !email ||
      !name ||
      !role ||
      !rate_per_hour ||
      !contact ||
      !address
    ) {
      throw new Error("Please Enter all entries");
    }

    const isEmployee = await prisma.user.findFirst({ where: { id } });
    if (!isEmployee) {
      throw new Error("Employee not found");
    }

    // const employeeData: any = { email, name, role };
    let encryptedPassword;
    if (password) {
      encryptedPassword = await enreypt(password);
    }

    const updateEmployee = await prisma.user.update({
      where: { id: isEmployee.id },
      data: {
        email,
        name,
        role,
        password: encryptedPassword ?? isEmployee.password,
        profile: {
          update: {
            address,
            contact,
            rate_per_hour: Number(rate_per_hour),
          },
        },
      },
      include: { profile: true },
      omit: { password: true },
    });
    if (!updateEmployee) {
      throw new Error("Employee not updated");
    }

    return Response.json(
      {
        status: 200,
        data: updateEmployee,
        message: "Employee updated successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 400, message: error.message || "Employee not updated" },
      { status: 400 },
    );
  }
}
