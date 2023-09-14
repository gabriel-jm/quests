import 'std/dotenv/load.ts'
import './ui/tools/html-fn.ts'
import { defineRoutes } from './server/routes.ts';
import { router, serverHandler } from './server/handler.ts'
import { initDatabase } from './database/client.ts';

try {
  await initDatabase()
  
  defineRoutes(router)
  Deno.serve(serverHandler)
} catch(error) {
  console.error(error)
}
