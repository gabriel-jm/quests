import { htmlBase } from './html-fn.ts'

export type PageFunction = (...args: unknown[]) => string

export function servePage(pageFn: PageFunction) {
  return () => new Response(htmlBase(pageFn()), {
    headers: {
      'content-type': 'text/html'
    }
  })
}
