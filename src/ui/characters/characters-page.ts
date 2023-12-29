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
    ${mainMenu(tokenData.gold, tokenData.userName)}

    <header class="character-header">
      <h2 class="page-title">Characters</h2>
    </header>

    <ul class="characters-list">
      ${characters.map(char => html`
        <li>${characterCard(char)}</li>
      `)}
      <li data-tooltip="Create New">
        <button
          class="add-characters"
          onclick="characterModal.showModal()"
        >
          ${plusIcon()}
        </button>
      </li>
    </ul>

    ${characterModal()}

    <dialog id="confirmDeleteDialog">
      <p>Are you sure?</p>
      <button
        hx-delete=""
        hx-on="htmx:configRequest: event.detail.path = '/characters?id=' + confirmDeleteDialog.targetID"
      >Yes</button>
      <button>No</button>
    </dialog>
  `
}

function characterCard(char: CharacterModel) {
  return html`
    <div class="character-card">
      <div class="character-image">
        <div class="char-sprite"></div>
      </div>
      <div class="character-info">
        <div class="char-name-display">
          <span class="char-name">${char.name}</span>
          <span class="char-level">Lv. ${char.level}</span>
        </div>

        <ul class="char-attrs">
          <li>VIT ${char.vitality}</li>
          <li>STR ${char.strength}</li>
          <li>DEX ${char.dexterity}</li>
          <li>INT ${char.intelligence}</li>
        </ul>

        <button
          onclick="
            confirmDeleteDialog.targetID = '${char.id}';
            confirmDeleteDialog.showModal()
          "
        >Delete</button>
      </div>
    </div>
  `
}
