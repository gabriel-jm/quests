import { serveFile } from 'std/http/file_server.ts'
import { resolve } from 'std/path/resolve.ts'
import { Router } from "@/server/router.ts";

export const router = new Router()

export async function serverHandler(req: Request) {
  const { pathname } = new URL(req.url)
  const response = await router.handleRoute(req)

  if (response) {
    return response
  }

  return await serveFile(req, resolve('public', ...pathname.split('/')))
}
