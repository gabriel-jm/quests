import { Pool } from 'postgres'
import postgres from 'postgresjs'
import { migrate } from 'postgres_migrations'
import { resolve } from 'std/path/mod.ts'

const connectionString = Deno.env.get('DATABASE_URL')
export const client = new Pool(connectionString, 20)

export async function runMigrations() {
  await migrate(postgres(String(connectionString)), {
    path: resolve('src', 'database', 'migrations')
  })
}

export async function sql<T = unknown>(
  templateStrings: TemplateStringsArray,
  ...values: unknown[]
) {
  const poolClient = await client.connect()

  try {
    const result = await poolClient.queryObject<T>(templateStrings, ...values)

    return result.rows
  } finally {
    poolClient.release()
  }
}
