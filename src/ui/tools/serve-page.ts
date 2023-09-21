import { HTMLTemplateString, htmlBase } from '@/ui/tools/html-fn.ts'

export type PageFunction = (req: Request) => (
  Promise<HTMLTemplateString | string>
  | HTMLTemplateString
  | string
  | Response
)

export function servePage(pageFn: PageFunction, cssFile?: string) {
  return async (req: Request) => {
    const content = await pageFn(req)

    if (content instanceof Response) {
      return content
    }

    return new Response(htmlBase(content, cssFile), {
      headers: {
        'content-type': 'text/html'
      }
    })
  }
}
