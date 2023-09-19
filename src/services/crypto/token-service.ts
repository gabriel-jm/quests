import { Payload, create, verify } from 'djwt'

const key = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify']
)

export class TokenService {
  static async create(data: Payload) {
    return await create({ alg: 'HS512' }, data, key)
  }

  static async verify(token: string) {
    return await verify(token, key)
  }
}
