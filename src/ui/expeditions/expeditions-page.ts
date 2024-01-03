import { html } from "@/ui/tools/html-fn.ts";
import { getToken } from "@/controllers/account/get-token.ts";
import { mainMenu } from "@/ui/common/index.ts";

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
        <h3>Miridian Forest</h3>

        <small>3 Spans to Complete</small>
<!-- 
        <ul>
          <li>Bloodstarving Wolves</li>
          <li>Bat Hordes</li>
        </ul> -->
      </div>
    </div>
  `
}
