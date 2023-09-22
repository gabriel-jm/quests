import { html } from '@/ui/tools/html-fn.ts'
import { parseCookies } from '@/controllers/tools/index.ts'
import { sql } from "@/database/client.ts";
import { TokenService } from '@/services/crypto/token-service.ts';
import { AccountModel } from '@/types/index.ts';
import { logoutIcon } from '@/ui/common/icons/logout-icon.ts';

export async function homePage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const [account] = await sql<AccountModel>/*sql*/`
    select * from accounts
    where id = ${tokenData.id};
  `

  return html`
    <div class="main-menu">
      <h1>Quests</h1>
      <div class="account-display">
        <p>${account.username}</p>

        <div
          class="logout-icon"
          title="Log Out"
          hx-post="/logout"
        >
          ${logoutIcon()}
        </div>
      </div>
    </div>

    <h2>Hi, ${account.username}!</h2>

    <div class="page-card">
      Characters
    </div>
  `
}
