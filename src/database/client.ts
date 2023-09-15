import { Pool } from 'postgres'

export const client = new Pool(Deno.env.get('DATABASE_URL'), 20)

export async function initDatabase() {
  await sql`
    create table if not exists accounts (
      id varchar(255) primary key not null,
      username varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null
    );
  `
}

export async function sql(templateStrings: TemplateStringsArray, ...values: unknown[]) {
  const poolClient = await client.connect()

  try {
    return await poolClient.queryObject(templateStrings, ...values)
  } finally {
    poolClient.release()
  }
}
