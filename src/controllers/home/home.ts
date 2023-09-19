import { html } from '@/ui/tools/html-fn.ts'
import { parseCookies } from '@/controllers/tools/index.ts'
import { sql } from "@/database/client.ts";
import { TokenService } from '@/services/crypto/token-service.ts';

export async function home(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const [account] = await sql<{ username: string }>`
    select * from accounts
    where id = ${tokenData.id}
  `

  return html`<h1>Hi, ${account.username}!</h1>`
}
