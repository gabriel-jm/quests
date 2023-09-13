import { loginPage } from '../ui/account/login-page.ts'
import { htmlBase } from '../ui/tools/html-fn.ts'

export function login() {
  return new Response(htmlBase(loginPage()), {
    headers: {
      'content-type': 'text/html'
    }
  })
}
