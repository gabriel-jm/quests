import { signupForm } from '@/ui/account/signup-page.ts'
import { Content } from '@/controllers/tools/index.ts'
import { genSalt, hash } from 'bcrypt'
import { sql } from '@/database/client.ts'
import { formData, text } from 'zod-form-data'
import { z } from 'zod'

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
    const form = signupForm(
      Object.fromEntries(
        Object
          .entries(validationResult.error.format())
          .map(([errorName, details]) => {
            console.log(details)
            const errorMessage = Array.isArray(details) && details[0]
            return [errorName, { error: errorMessage }]
          })
      )
    )

    return Content.html(form)
  }

  const { password, username, email, passwordConfirmation } = validationResult.data
  const salt = await genSalt(12)
  const encryptedPassword = await hash(password, salt)

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
