import { html } from '@/ui/tools/html-fn.ts'
import { parseCookies } from '@/controllers/tools/index.ts'
import { sql } from "@/database/client.ts";
import { TokenService } from '@/services/crypto/token-service.ts';
import { AccountModel } from '@/types/index.ts';

export async function homePage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const [account] = await sql<AccountModel>/*sql*/`
    select * from accounts
    where id = ${tokenData.id};
  `

  return html`
    <header>
      <h1>Quests</h1>
      <div>
        <p>${account.username}</p>

        <button hx-post="/logout">Log Out</button>
      </div>
    </header>

    <h1>Hi, ${account.username}!</h1>
  `
}
