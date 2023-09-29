import { html } from '@/ui/tools/html-fn.ts'

export function validationErrorMessage(record: Record<string, string[]>) {
  return html`
    <ul class="error-container">
      ${
        Object
          .entries(record)
          .map(([field, messages]) => {
            return html`
              <li>
                <span class="error-field">
                  ${field}
                </span>
                <ul class="error-field-list">
                  ${messages.map(msg => html`
                    <li>${msg}</li>
                  `)}
                </ul>
              </li>
            `
          })
      }
    </ul>
  `
}

export function errorMessage(message: string) {
  return html`
    <div class="error-message">
      ${message}
    </div>
  `
}
