import { parseCookies } from "@/controllers/tools/index.ts";
import { TokenService } from "@/services/crypto/index.ts";
import { sql } from "@/database/client.ts";
import { CharacterModel } from "@/types/index.ts";
import { html } from "@/ui/tools/html-fn.ts";
import { mainMenu } from "@/ui/common/index.ts";
import { plusIcon } from "@/ui/common/icons/index.ts";
import { characterModal } from "@/ui/characters/character-modal.ts";

export async function charactersPage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  const characters = await sql<CharacterModel>/*sql*/`
    select * from characters
    where "accountId" = ${tokenData.id};
  `

  return html`
    ${mainMenu(tokenData.userName)}

    <header class="character-header">
      <h2 class="page-title">Characters</h2>
    </header>

    <ul class="characters-list">
      ${characters.map(char => html`
        <li>Name: ${char.name}</li>
      `)}
      <li>
        <div class="character-card">
          <div class="character-image">
            <div class="char-sprite"></div>
          </div>
          <div class="character-info">
            <div class="char-name-display">
              <span class="char-name">Warrior</span>
              <span class="char-level">Lv. 3</span>
            </div>

            <ul class="char-attrs">
              <li>VIT 2</li>
              <li>STR 1</li>
              <li>DEX 1</li>
              <li>INT 1</li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <button
          class="add-characters"
          onclick="characterModal.showModal()"
        >
          ${plusIcon()}
        </button>
      </li>
    </ul>

    ${characterModal()}
  `
}
