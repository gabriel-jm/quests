import { resolve } from 'std/path/resolve.ts'

export class HTMLTemplateString extends String {}

export function html(templateString: TemplateStringsArray, ...values: unknown[]) {
  const text = templateString.reduce((acc, str, index) => {
    const currentHTML = acc + str
    const value = resolveValue(values[index] ?? '')

    return currentHTML + value
  }, '')

  return new HTMLTemplateString(text)
}

function resolveValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(resolveValue).join('')
  }

  if (value instanceof HTMLTemplateString) {
    return value as string
  }

  return sanitizeHTML(String(value))
}

function sanitizeHTML(rawHTML: string) {
  return rawHTML
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/javascript:\/\//, 'javascript:&sol;&sol;')
}

const indexHTML = await Deno.readTextFile(resolve('public', 'index.html'))

export function htmlBase(content: string | HTMLTemplateString) {
  return indexHTML.replace('<!-- app -->', content as string)
}
