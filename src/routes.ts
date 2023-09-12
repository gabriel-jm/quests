import { login } from "./controllers/login.ts";
import { Router } from "./server/handler.ts";

export function defineRoutes(router: Router) {
  router
    .set('get::/', login)
    .set('post::/', () => new Response('Deu nisso'))
}
