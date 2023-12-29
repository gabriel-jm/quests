import { html } from '@/ui/tools/html-fn.ts'
import { parseCookies } from '@/controllers/tools/index.ts'
import { TokenService } from '@/services/crypto/token-service.ts';
import { mainMenu } from '@/ui/common/main-menu.ts';

export async function homePage(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)

  return html`
    ${mainMenu(tokenData.gold, tokenData.userName)}    

    <h2 class="home-title">Welcome to Haingard!</h2>

    <section class="home-menu">
      <a class="page-card" href="/characters">
        Characters
      </a>
    </section>
  `
}
