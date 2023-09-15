import { errorMessage } from '../ui/common/error-message.ts'

export async function signup(req: Request) {
  const body = await req.formData()
  const username = body.get('username')
  const email = body.get('email')
  const password = body.get('password')
  const passwordConfirmation = body.get('passwordConfirmation')

  if (password !== passwordConfirmation) {
    
    return new Response(errorMessage('Password confirmation must be equal to password').toString(), {
      headers: {
        'content-type': 'text/html',
        'hx-retarget': '#error-message'
      }
    })
  }

  return new Response(JSON.stringify({
    username,
    email,
    password,
    passwordConfirmation
  }))
}
