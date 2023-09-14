import { Client } from 'postgres'

export const client = new Client(Deno.env.get('DATABASE_URL'))

export async function initDatabase() {
  await client.connect()

  await client.queryObject/*sql*/`
    create table if not exists accounts (
      id varchar(255) primary key not null,
      username varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null
    );
  `
}
