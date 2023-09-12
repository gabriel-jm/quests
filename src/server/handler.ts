import { serveFile } from 'std/http/file_server.ts'
import { resolve } from 'std/path/resolve.ts'

export type RouteFunction = (request: Request) => Promise<Response> | Response

export type Router = Map<string, RouteFunction>

export const router = new Map<string, RouteFunction>()

export async function serverHandler(req: Request) {
  const { pathname } = new URL(req.url)

  const handler = router.get(`${req.method.toLowerCase()}::${pathname}`)

  if (handler) {
    return await handler(req)
  }

  return await serveFile(req, resolve('public', ...pathname.split('/')))
}
