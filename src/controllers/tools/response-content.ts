import { HTMLTemplateString } from '@/ui/tools/html-fn.ts'

type ContentInfo = {
  status?: number
  headers?: Record<string, string>
}

export class Content {
  static html(data: string | HTMLTemplateString, info?: ContentInfo) {
    return new Response(String(data), info)
  }

  static json(data: unknown, info?: ContentInfo) {
    return new Response(JSON.stringify(data), info)
  }
}
