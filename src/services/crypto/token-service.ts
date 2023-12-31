import { Payload, create, verify } from 'djwt'

export type TokenData = {
  id: string
  userName: string
  gold: number
}

export class TokenService {
  static #key: CryptoKey

  static {
    TokenService.#getKey()
      .then(key => {
        TokenService.#key = key
      })
  }

  static async create(data: Payload) {
    return await create({ alg: 'HS512' }, data, TokenService.#key)
  }

  static async verify(token: string) {
    try {
      return await verify(token, TokenService.#key) as TokenData
    } catch {
      throw new InvalidToken()
    }
  }

  static async #getKey() {
    const kv = await Deno.openKv()
    const key = (await kv.get<string>(['private_key'])).value

    if (!key) {
      const generatedKey = await crypto.subtle.generateKey(
        { name: 'HMAC', hash: 'SHA-512' },
        true,
        ['sign', 'verify']
      )
      const exported = await crypto.subtle.exportKey('jwk', generatedKey)

      await kv.set(['private_key'], JSON.stringify(exported))

      return generatedKey
    }

    return await crypto.subtle.importKey(
      'jwk',
      JSON.parse(key) as JsonWebKey,
      { name: 'HMAC', hash: 'SHA-512' },
      true,
      ['sign', 'verify']
    )
  }
}

export class InvalidToken extends Error {
  statusCode = 308
  headers = {
    location: '/logout',
    'hx-redirect': '/logout'
  }

  constructor() {
    super('Invalid Token')
  }
}
