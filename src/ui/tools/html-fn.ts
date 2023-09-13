import { resolve } from 'std/path/resolve.ts'

export function html(templateString: TemplateStringsArray, ...values: unknown[]) {
  return templateString.reduce((acc, str, index) => {
    const currentHTML = acc + str
    let value = values[index] ?? ''

    if (Array.isArray(value)) {
      value = value.map(sanitizeHTML).join('')
    }

    return currentHTML + sanitizeHTML(String(value))
  }, '')
}

function sanitizeHTML(rawHTML: string) {
  return rawHTML
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/javascript:\/\//, 'javascript:&sol;&sol;')
}

const indexHTML = await Deno.readTextFile(resolve('public', 'index.html'))

export function htmlBase(content: string) {
  return indexHTML.replace('<!-- app -->', content)
}
