import { signup } from "@/controllers/account/index.ts";
import { Router } from '../server/handler.ts'
import { loginPage } from '../ui/account/login-page.ts'
import { signupPage } from '../ui/account/signup-page.ts';
import { servePage } from '../ui/tools/serve-page.ts'
import { home } from "@/controllers/home/index.ts";

export function defineRoutes(router: Router) {
  router
    .set('get::/', servePage(loginPage))
    .set('post::/', () => new Response('Deu nisso'))
    .set('get::/signup', servePage(signupPage))
    .set('post::/signup', signup)
    .set('get::/home', servePage(home))
}
