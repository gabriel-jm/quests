import { attrs } from '../tools/attributes.ts'
import { html } from '../tools/html-fn.ts'

type InputFieldProps = {
  label?: string
  name: string
  type?: string
}

export function inputField({
  label,
  name,
  type = 'text'
}: InputFieldProps) {
  return html`
    <label>
      ${label && html`<span>${label}</span>`}
      <input ${attrs({ name, type })} />
    </label>
  `
}
