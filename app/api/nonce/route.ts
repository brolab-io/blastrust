import { generateNonce } from "siwe";
export async function GET(req: Request, res: Response) {
  //   req.session.nonce = generateNonce();
  //   await req.session.save();
  //   res.setHeader("Content-Type", "text/plain");
  //   res.send(req.session.nonce);
  // set session nonce
  const nonce = generateNonce();
  return Response.json({ nonce });
}
