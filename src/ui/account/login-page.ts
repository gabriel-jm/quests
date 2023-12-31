import { parseCookies } from "@/controllers/tools/index.ts";
import { inputField } from '../common/input-field.ts';
import { html } from '../tools/html-fn.ts'

export function loginPage(req: Request) {
  const parsedCookies = parseCookies<{ token: string }>(req)

  if (parsedCookies.token && parsedCookies.token !== 'deleted') {
    return html`
      <head>
        <meta http-equiv="refresh" content="0;URL='/home'" />
      </head>
    `
  }

  return html`
    <section class="login">
      <h1>Login</h1>

      <div id="error-message"></div>

      <form hx-post="/">
        ${[
          inputField({
            label: 'E-Mail',
            name: 'email',
            type: 'email'
          }),

          inputField({
            label: 'Password',
            name: 'password',
            type: 'password'
          })
        ]}
        <button>Login</button>
      </form>

      <a href="/signup">Create Account</a>
    </section>
  `
}
