import { formData, text } from 'zod-form-data';
import { html } from '../../ui/tools/html-fn.ts'
import { Content, cookies } from "@/controllers/tools/index.ts";
import { string } from "zod";
import { sql } from "@/database/client.ts";
import { TokenService } from "@/services/crypto/index.ts";

const loginSchema = formData({
  email: text(string().email()),
  password: text()
})

export async function login(req: Request) {
  const loginData = await req.formData()
  const validationResult = loginSchema.safeParse(loginData)

  if (!validationResult.success) {
    return Content.html(html`
      Error
    `)
  }

  const { email } = validationResult.data

  type tmp = { id: string }

  const [account] = await sql<tmp>/*sql*/`
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
