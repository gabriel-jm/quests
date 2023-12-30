import { parseCookies } from "@/controllers/tools/index.ts";
import { TokenService } from "@/services/crypto/index.ts";

export async function getToken(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  return await TokenService.verify(cookies.token)
}
