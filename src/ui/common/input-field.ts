import { attrs } from "@/ui/tools/attributes.ts"
import { html } from "@/ui/tools/html-fn.ts"

type InputFieldProps = {
  label?: string
  name: string
  type?: string
  value?: string
  error?: string
}

export function inputField({
  label,
  name,
  value,
  type = 'text',
  error
}: InputFieldProps) {
  return html`
    <label class="form-control">
      ${label && html`<span>${label}</span>`}

      <input
        class="${error && html`error`}"
        ${attrs({ name, type, value })}
      />
      
      ${error && html`<sub class="error">${error}</sub>`}
    </label>
  `
}
