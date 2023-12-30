import { html } from '@/ui/tools/html-fn.ts'
import { mainMenu } from '@/ui/common/main-menu.ts';
import { getToken } from "@/controllers/account/get-token.ts";

export async function homePage(req: Request) {
  const tokenData = await getToken(req)

  return html`
    ${mainMenu(tokenData)}    

    <h2 class="home-title">Welcome to Haingard!</h2>

    <section class="home-menu">
      <a class="page-card" href="/characters">
        Characters
      </a>

      <a class="page-card" href="/expeditions">
        Expeditions
      </a>
    </section>
  `
}
