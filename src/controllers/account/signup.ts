import { signupForm } from '@/ui/account/signup-page.ts'
import { Content } from '@/controllers/tools/index.ts'
import { genSalt, hash } from 'bcrypt'
import { sql } from '@/database/client.ts'

export async function signup(req: Request) {
  const body = await req.formData()
  const username = body.get('username')
  const email = body.get('email')
  const password = body.get('password')
  const passwordConfirmation = body.get('passwordConfirmation')

  if (password !== passwordConfirmation) {
    const form = signupForm({
      username: { value: String(username) },
      email: { value: String(email) },
      password: { value: String(password) },
      passwordConfirmation: {
        value: String(passwordConfirmation),
        error: 'Password Confirmation must be equal to password.'
      }
    })

    return Content.html(form)
  }

  const salt = await genSalt(12)
  const encryptedPassword = await hash(String(password), salt)

  const id = crypto.randomUUID()

  await sql`
    insert into accounts
    values (${id}, ${username}, ${email}, ${encryptedPassword});
  `

  return Content.json({
    username,
    email,
    password,
    passwordConfirmation
  })
}
