import { html, htmlBase } from '../html-fn.ts'

export function login() {
  return new Response(htmlBase(loginPage()), {
    headers: {
      'content-type': 'text/html'
    }
  })
}

function loginPage() {
  return html`
    <h1>Login</h1>

    <form method="post">
      <input placeholder="email" type="text" name="email">
      <button>Login</button>
    </form>
  `
}
