import { login, logout, signup } from "@/controllers/account/index.ts";
import { Router } from '../server/handler.ts'
import { loginPage } from '../ui/account/login-page.ts'
import { signupPage } from '../ui/account/signup-page.ts';
import { servePage } from '../ui/tools/serve-page.ts'
import { homePage } from "@/ui/home/index.ts";

export function defineRoutes(router: Router) {
  router
    .set('get::/', servePage(loginPage, 'login.css'))
    .set('post::/', login)
    .set('get::/signup', servePage(signupPage))
    .set('post::/signup', signup)
    .set('post::/logout', logout)
    .set('get::/home', servePage(homePage))
}
