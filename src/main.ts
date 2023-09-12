import './html-fn.ts'
import { defineRoutes } from './routes.ts';
import { router, serverHandler } from './server/handler.ts'

defineRoutes(router)

Deno.serve(serverHandler)
