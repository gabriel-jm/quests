import 'std/dotenv/load.ts'
import './ui/tools/html-fn.ts'
import { defineRoutes } from './server/routes.ts';
import { router, serverHandler } from './server/handler.ts'
import { runMigrations } from '@/database/client.ts';
import { htmlBase } from "@/ui/tools/html-fn.ts";

try {
  await runMigrations()

  defineRoutes(router)
  Deno.serve(async req => {
    try {
      return await serverHandler(req)
    } catch(error) {
      return new Response(htmlBase(), {
        status: error.statusCode,
        headers: {
          ...error.headers,
          'content-type': 'text/html'
        }
      })
    }
  })
} catch(error) {
  console.error('aqui', error)
}
