import { html } from "../tools/html-fn.ts";

export function loginPage() {
  return html`
    <h1>Login</h1>

    <form method="post">
      <input placeholder="email" type="text" name="email">
      <button>Login</button>
    </form>
  `
}
