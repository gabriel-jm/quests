import { Content, makeValidationErrorMessage } from '@/controllers/tools/index.ts'
import { genSalt, hash } from 'bcrypt'
import { sql } from '@/database/client.ts'
import { formData, text } from 'zod-form-data'
import { z } from 'zod'
import { TokenService } from '@/services/crypto/token-service.ts';
import { cookies } from '@/controllers/tools/http-cookie.ts';

const signupSchema = formData({
  username: text(),
  email: text(z.string().email()),
  password: text(),
  passwordConfirmation: text()
})
.refine(
  schema => schema.password === schema.passwordConfirmation,
  {
    path: ['passwordConfirmation'],
    message: 'Password Confirmation must be equal to the password'
  }
)

export async function signup(req: Request) {
  const formData = await req.formData()
  const validationResult = signupSchema.safeParse(formData)

  if (!validationResult.success) {
    return makeValidationErrorMessage(validationResult)
  }

  const { password, username, email } = validationResult.data
  const salt = await genSalt(12)
  const encryptedPassword = await hash(password, salt)

  const id = crypto.randomUUID()

  await sql`
    insert into accounts
    values (${id}, ${username}, ${email}, ${encryptedPassword});
  `

  const token = await TokenService.create({
    id,
    userName: username
  })

  return Content.noContent({
    headers: {
      'set-cookie': cookies({ token }),
      'hx-redirect': '/home'
    }
  })
}
