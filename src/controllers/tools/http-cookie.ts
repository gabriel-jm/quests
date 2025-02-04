export function cookies(record: Record<string, unknown>) {
  return Object.entries({
    ...record,
    'SameSite': 'Strict',
    'HTTPOnly': true
  })
    .map(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        return key
      }

      return `${key}=${value}`
    })
    .join(';')
}

export function parseCookies<T = Record<string, string>>(req: Request) {
  const rawHeader = req.headers.get('cookie') ?? ''

  const cookies = Object.fromEntries(
    rawHeader
      .split(';')
      .map(item => item
        .trim()
        .split('=')
        .map(key => key?.replace(/^quests-/, ''))
      )
  ) as T

  return cookies
}
