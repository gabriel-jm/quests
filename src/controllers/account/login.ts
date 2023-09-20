import { formData, text } from 'zod-form-data';
import { Content, cookies, makeErrorMessage } from "@/controllers/tools/index.ts";
import { string } from "zod";
import { sql } from "@/database/client.ts";
import { TokenService } from "@/services/crypto/index.ts";
import { AccountModel } from "@/types/index.ts";

const loginSchema = formData({
  email: text(string().email()),
  password: text()
})

export async function login(req: Request) {
  const loginData = await req.formData()
  const validationResult = loginSchema.safeParse(loginData)

  if (!validationResult.success) {
    return makeErrorMessage(validationResult)
  }

  const { email } = validationResult.data

  const [account] = await sql<AccountModel>/*sql*/`
    select * from accounts
    where email = ${email};
  `
  const token = await TokenService.create({ id: account.id })

  return Content.noContent({
    headers: {
      'set-cookie': cookies({ token }),
      'hx-redirect': '/home'
    }
  })
}
