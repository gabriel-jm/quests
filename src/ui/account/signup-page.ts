import { inputField } from '../common/input-field.ts';
import { html } from '../tools/html-fn.ts'

export function signupPage() {
  return html`
    <h1>Create Account</h1>

    <div id="error-message"></div>

    <form hx-post="/signup">
      ${[
        inputField({
          label: 'Name',
          name: 'username'
        }),

        inputField({
          label: 'E-Mail',
          name: 'email'
        }),

        inputField({
          label: 'Password',
          name: 'password',
          type: 'password'
        }),

        inputField({
          label: 'Password Confirmation',
          name: 'passwordConfirmation',
          type: 'password'
        })
      ]}

      <button>Create</button>
    </form>
  `
}
