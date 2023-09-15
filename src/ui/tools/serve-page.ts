import { HTMLTemplateString, htmlBase } from '@/ui/tools/html-fn.ts'

export type PageFunction = (...args: unknown[]) => HTMLTemplateString | string

export function servePage(pageFn: PageFunction) {
  return () => new Response(htmlBase(pageFn()), {
    headers: {
      'content-type': 'text/html'
    }
  })
}
