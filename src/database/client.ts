import { Client } from 'postgres'

export const client = new Client(Deno.env.get('DATABASE_URL'))
