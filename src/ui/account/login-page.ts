import { inputField } from '../common/input-field.ts';
import { html } from '../tools/html-fn.ts'

export function loginPage() {
  return html`
    <div class="login">
      <h1>Login</h1>

      <form method="post">
        ${[
          inputField({
            label: 'E-Mail',
            name: 'email'
          }),

          inputField({
            label: 'Password',
            name: 'password'
          })
        ]}
        <button>Login</button>
      </form>

      <a href="/signup">Create Account</a>
    </div>
  `
}
