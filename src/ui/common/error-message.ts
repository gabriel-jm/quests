import { html } from '../tools/html-fn.ts'

export const errorMessage = (message: string) => html`
  <div>${message}</div>
`

