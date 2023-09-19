import { HTMLTemplateString, htmlBase } from '@/ui/tools/html-fn.ts'

export type PageFunction = (req: Request) => (
  Promise<HTMLTemplateString | string>
  | HTMLTemplateString
  | string
)

export function servePage(pageFn: PageFunction) {
  return async (req: Request) => {
    const content = await pageFn(req)

    return new Response(htmlBase(content), {
      headers: {
        'content-type': 'text/html'
      }
    })
  }
}
