import { Pool } from 'postgres'

const connectionString = Deno.env.get('DATABASE_URL')
export const client = new Pool(Deno.env.get('DATABASE_URL'), 20)

export async function initDatabase() {
  
}

export async function sql(templateStrings: TemplateStringsArray, ...values: unknown[]) {
  const poolClient = await client.connect()

  try {
    return await poolClient.queryObject(templateStrings, ...values)
  } finally {
    poolClient.release()
  }
}
