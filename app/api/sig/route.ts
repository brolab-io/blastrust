import { verifyMessage } from "viem";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { address, message, signature } = body;

  // Verify the signature
  const isValid = await verifyMessage({
    address,
    message,
    signature,
  });
  return Response.json({ isValid });
}
