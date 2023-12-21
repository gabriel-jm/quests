import { HTMLTemplateString } from '@/ui/tools/html-fn.ts'

type ContentInfo = {
  status?: number
  headers?: Record<string, string>
}

export class Content {
  static html(data: string | HTMLTemplateString, info?: ContentInfo) {
    return new Response(String(data), {
      status: info?.status,
      headers: {
        ...info?.headers,
        'content-type': 'text/html'
      }
    })
  }

  static json(data: unknown, info?: ContentInfo) {
    return new Response(JSON.stringify(data), info)
  }

  static noContent(info?: ContentInfo) {
    return new Response(null, {
      ...info,
      status: 204
    })
  }

  static noContentRedirect(target: string) {
    return new Response(null, {
      status: 204,
      headers: {
        'hx-redirect': target
      }
    })
  }
}
