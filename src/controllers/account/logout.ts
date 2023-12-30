export function logout() {
  return new Response(null, {
    status: 301,
    headers: {
      location: '/',
      'set-cookie': 'quests-token=deleted; Max-Age=0',
      'hx-redirect': '/'
    }
  })
}
