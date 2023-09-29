import { parseCookies } from "@/controllers/tools/index.ts";
import { TokenService } from "@/services/crypto/index.ts";
import { sql } from "@/database/client.ts";
import { CharacterModel } from "@/types/index.ts";
import { html } from "@/ui/tools/html-fn.ts";
import { mainMenu } from "@/ui/common/index.ts";

export async function charactersPage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const characters = await sql<CharacterModel>/*sql*/`
    select * from characters
    where "accountId" = ${tokenData.id};
  `

  return html`
    ${mainMenu(tokenData.userName)}
    
    <h2>Characters</h2>

    ${Boolean(characters.length) && html`
      <ul>
        ${characters.map(char => {
          return html`
            <li>Name: ${char.name}</li>
          `
        })}
      </ul>
    `}

    ${!characters.length && html`
      <p>No characters created!</p>
    `}
  `
}
