import { html } from '../tools/html-fn.ts'

export function loginPage() {
  return html`
    <h1>Login</h1>

    <form method="post">
      <input type="text" name="email" placeholder="E-Mail" />
      <input type="text" name="password" placeholder="Password" />
      <button>Login</button>
    </form>

    <a href="/signup">Create Account</a>
  `
}
