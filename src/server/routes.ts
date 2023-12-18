import { login, logout, signup } from "@/controllers/account/index.ts";
import { Router } from '../server/handler.ts'
import { loginPage } from '../ui/account/login-page.ts'
import { signupPage } from '../ui/account/signup-page.ts';
import { servePage } from '../ui/tools/serve-page.ts'
import { homePage } from "@/ui/home/index.ts";
import { charactersPage } from "@/ui/characters/index.ts";
import { createCharacter } from "@/controllers/characters/index.ts";

export function defineRoutes(router: Router) {
  router
    .set('get::/', servePage(loginPage, 'login.css'))
    .set('post::/', login)
    .set('get::/signup', servePage(signupPage, 'signup.css'))
    .set('post::/signup', signup)
    .set('get::/logout', logout)
    .set('post::/logout', logout)
    .set('get::/home', servePage(homePage, 'home.css'))
    .set('get::/characters', servePage(charactersPage, 'characters.css'))
    .set('post::/characters', createCharacter)
}
