import { html } from "@/ui/tools/html-fn.ts";
import { getToken } from "@/controllers/account/get-token.ts";
import { mainMenu } from "@/ui/common/index.ts";
import { xIcon, chevronDownIcon } from "@/ui/common/icons/index.ts";

export async function expeditionsPage(req: Request) {
  const tokenData = await getToken(req)

  return html`
    ${mainMenu(tokenData)}

    <h2 class="expeditions-title">Expeditions</h2>

    <section class="locations-list">
      ${[
        locationCard(),
        locationCard()
      ]}
    </section>

    ${combatModal()}
  `
}

function locationCard() {
  const imageLink = 'https://img.itch.zone/aW1hZ2UvMjA0NDE5OC8xMjAyNzg5Ni5qcGc=/original/%2FgGzz4.jpg'

  return html`
    <div class="location-card">
      <div class="location-image">
        <img src="${imageLink}" alt="Location Image" />
      </div>
      <div class="location-description">
        <details>
          <summary>
            <div>
              <h3>Miridian Forest</h3>
              <span class="location-type">Dungeon</span>
            </div>
            <div class="open-icon">
              ${chevronDownIcon()}
            </div>
          </summary>

          <div class="location-rewards">
            <h4>Rewards</h4>

            <ul>
              <li>- Common Wood</li>
            </ul>
          </div>

          <button onclick="combatModal.showModal()">
            Enter
          </button>
        </details>
      </div>
    </div>
  `
}

function combatModal() {
  return html`
    <dialog id="combatModal">
      <div class="combat-modal">
        <div class="combat-bg">
          <div class="close-btn" onclick="combatModal.close()">
            ${xIcon()}
          </div>
        </div>
        <div class="combat-painel">
          <p>text</p>
          <p>text</p>
          <p>text</p>
        </div>
      </div>
    </dialog>
  `
}
