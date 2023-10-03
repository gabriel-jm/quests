import { Payload, create, verify } from 'djwt'
import { resolve } from 'std/path/mod.ts'

const key = await getKey()

async function getKey() {
  const keyPath = resolve('key', 'private.key')

  try {
    const file = await Deno.readTextFile(keyPath)

    return await crypto.subtle.importKey(
      'jwk',
      JSON.parse(file) as JsonWebKey,
      { name: 'HMAC', hash: 'SHA-512' },
      true,
      ['sign', 'verify']
    )
  } catch {
    try {
      await Deno.mkdir(resolve('key'))
    } catch {
      null
    }

    const key = await crypto.subtle.generateKey(
      { name: 'HMAC', hash: 'SHA-512' },
      true,
      ['sign', 'verify']
    )

    const exported = await crypto.subtle.exportKey('jwk', key)

    await Deno.writeTextFile(keyPath, JSON.stringify(exported))

    return key
  }
}

export type TokenData = {
  id: string
  userName: string
}

export class TokenService {
  static async create(data: Payload) {
    return await create({ alg: 'HS512' }, data, key)
  }

  static async verify(token: string) {
    try {
      return await verify(token, key) as TokenData
    } catch {
      throw new InvalidToken()
    }
  }
}

export class InvalidToken extends Error {
  statusCode = 301
  headers = {
    location: '/logout',
    'hx-redirect': '/logout'
  }

  constructor() {
    super('Invalid Token')
  }
}
