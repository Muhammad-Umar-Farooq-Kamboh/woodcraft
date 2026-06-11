import prisma from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      throw new Error("Id not given");
    }
    const isOrderExist = await prisma.order.findFirst({ where: { id } });
    if (!isOrderExist) {
      throw new Error("Order not exist");
    }
    const updateStatus = await prisma.order.update({
      where: { id: isOrderExist.id },
      data: {
        payment_status: true,
        invoice: { update: { payment_status: true } },
      },
      include: { orderItem: true, invoice: true },
    });
    if (!updateStatus) {
      throw new Error("Payment status not updated");
    }
    return Response.json(
      {
        status: 200,
        data: updateStatus,
        message: "Payment collected successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { status: 500, message: error.message || "Payment not updatetd" },
      { status: 500 },
    );
  }
}
