import prisma from "@/lib/db";

export async function POST(req: Request) {
  const createduser = await prisma.user.create({ data: { id: Math.random() } });
  return Response.json(
    { status: 200, data: createduser, message: "User created successfully" },
    { status: 200 },
  );
}
