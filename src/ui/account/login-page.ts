import { inputField } from '../common/input-field.ts';
import { html } from '../tools/html-fn.ts'

export function loginPage() {
  return html`
    <div class="login">
      <h1>Login</h1>

      <div id="error-message"></div>

      <form hx-post="/">
        ${[
          inputField({
            label: 'E-Mail',
            name: 'email',
            optional: true
          }),

          inputField({
            label: 'Password',
            name: 'password',
            optional: true
          })
        ]}
        <button>Login</button>
      </form>

      <a href="/signup">Create Account</a>
    </div>
  `
}
