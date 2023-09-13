import { Router } from '../server/handler.ts'
import { loginPage } from '../ui/account/login-page.ts'
import { servePage } from '../ui/tools/serve-page.ts'

export function defineRoutes(router: Router) {
  router
    .set('get::/', servePage(loginPage))
    .set('post::/', () => new Response('Deu nisso'))
}
