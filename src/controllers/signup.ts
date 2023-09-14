export async function signup(req: Request) {
  const body = await req.formData()
  const username = body.get('username')
  const email = body.get('email')
  const password = body.get('password')
  const passwordConfirmation = body.get('passwordConfirmation')

  return new Response(JSON.stringify({
    username,
    email,
    password,
    passwordConfirmation
  }))
}
