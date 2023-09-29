import { Payload, create, verify } from 'djwt'

const key = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify']
)

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
    location: '/logout'
  }

  constructor() {
    super('Invalid Token')
  }
}
