export async function POST(req: Request) {
  const data = await req.json();

  return Response.json(
    { status: 200, data, message: "request got successfull" },
    { status: 200 },
  );
}
