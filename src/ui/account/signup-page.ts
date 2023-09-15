import { inputField } from '../common/input-field.ts';
import { html } from '../tools/html-fn.ts'

type SignupFormProps = Partial<Record<
  'username'|'email'|'password'|'passwordConfirmation',
  { value: string, error?: string }
>>

export function signupForm(props: SignupFormProps = {}) {
  const { username, email, password, passwordConfirmation } = props
  
  return html`
    <form hx-post="/signup">
      ${[
        inputField({
          ...username,
          label: 'Name',
          name: 'username',
        }),

        inputField({
          ...email,
          label: 'E-Mail',
          name: 'email',
          type: 'email'
        }),

        inputField({
          ...password,
          label: 'Password',
          name: 'password',
          type: 'password',
        }),

        inputField({
          ...passwordConfirmation,
          label: 'Password Confirmation',
          name: 'passwordConfirmation',
          type: 'password'
        })
      ]}

      <button>Create</button>
    </form>
  `
}

export function signupPage() {
  return html`
    <h1>Create Account</h1>

    <div id="error-message"></div>

    ${signupForm()}
  `
}
