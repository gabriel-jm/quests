import { attrs } from "@/ui/tools/attributes.ts"
import { html } from "@/ui/tools/html-fn.ts"

type InputFieldProps = {
  label?: string
  name: string
  type?: string
  value?: string
  optional?: boolean
  minLength?: number
  maxLength?: number
}

export function inputField({
  label,
  name,
  value,
  type = 'text',
  optional
}: InputFieldProps) {
  return html`
    <label class="form-control">
      ${label && html`<span>${label}</span>`}

      <input
        ${attrs({ name, type, value })}
        ${optional ? null : 'required'}
      />      
    </label>
  `
}
