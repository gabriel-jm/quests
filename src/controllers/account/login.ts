import { formData, text } from 'zod-form-data';
import { compare } from 'bcrypt';
import { string } from "zod";
import { Content, cookies, makeValidationErrorMessage } from "@/controllers/tools/index.ts";
import { sql } from "@/database/client.ts";
import { TokenService } from "@/services/crypto/index.ts";
import { AccountModel } from "@/types/index.ts";
import { makeErrorMessage } from '@/controllers/tools/make-error-message.ts';

const loginSchema = formData({
  email: text(string().email()),
  password: text()
})

export async function login(req: Request) {
  const loginData = await req.formData()
  const validationResult = loginSchema.safeParse(loginData)

  if (!validationResult.success) {
    return makeValidationErrorMessage(validationResult)
  }

  const { email, password } = validationResult.data

  const [account] = await sql<AccountModel | null>/*sql*/`
    select * from accounts
    where email = ${email};
  `

  const equalPassword = await compare(password, account?.password ?? '')

  if (!account || !equalPassword) {
    return makeErrorMessage('E-Mail or Password incorrect!')
  }

  const token = await TokenService.create({
    id: account.id,
    userName: account.username
  })

  return Content.noContent({
    headers: {
      'set-cookie': cookies({ token }),
      'hx-redirect': '/home'
    }
  })
}
