import { html } from '@/ui/tools/html-fn.ts'
import { parseCookies } from '@/controllers/tools/index.ts'
import { sql } from "@/database/client.ts";
import { TokenService } from '@/services/crypto/token-service.ts';
import { AccountModel } from '@/types/index.ts';
import { mainMenu } from '@/ui/common/main-menu.ts';

export async function homePage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const [account] = await sql<AccountModel>/*sql*/`
    select * from accounts
    where id = ${tokenData.id};
  `

  return html`
    ${mainMenu(tokenData.userName)}    

    <h2>Hi, ${account.username}!</h2>

    <section class="home-menu">
      <a class="page-card" href="/characters">
        Characters
      </a>
    </section>
  `
}
