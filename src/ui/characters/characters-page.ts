import { parseCookies } from "@/controllers/tools/index.ts";
import { TokenService } from "@/services/crypto/index.ts";
import { sql } from "@/database/client.ts";
import { CharacterModel } from "@/types/index.ts";
import { html } from "@/ui/tools/html-fn.ts";
import { mainMenu } from "@/ui/common/index.ts";
import { plusIcon } from "@/ui/common/icons/index.ts";

export async function charactersPage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const characters = await sql<CharacterModel>/*sql*/`
    select * from characters
    where "accountId" = ${tokenData.id};
  `

  return html`
    ${mainMenu(tokenData.userName)}
    
    <h2 class="page-title">Characters</h2>

    <ul>
      ${characters.map(char => html`
        <li>Name: ${char.name}</li>
      `)}
      <li>
        <a class="add-characters" href="/characters?add=true">
          ${plusIcon()}
        </a>
      </li>
    </ul>
  `
}
