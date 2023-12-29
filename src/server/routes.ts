import { login, logout, signup } from "@/controllers/account/index.ts";
import { loginPage } from '../ui/account/login-page.ts'
import { signupPage } from '../ui/account/signup-page.ts';
import { servePage } from '../ui/tools/serve-page.ts'
import { homePage } from "@/ui/home/index.ts";
import { charactersPage } from "@/ui/characters/index.ts";
import { createCharacter, deleteCharacter } from "@/controllers/characters/index.ts";
import { Router } from "@/server/router.ts";

export function defineRoutes(router: Router) {
  router
    .get('/', servePage(loginPage, 'login.css'))
    .post('/', login)
    .get('/signup', servePage(signupPage, 'signup.css'))
    .post('/signup', signup)
    .get('/logout', logout)
    .post('/logout', logout)
    .get('/home', servePage(homePage, 'home.css'))
    .get('/characters', servePage(charactersPage, 'characters.css'))
    .post('/characters', createCharacter)
    .delete('/characters', deleteCharacter)
}
