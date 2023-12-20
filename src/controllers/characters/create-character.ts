import { Content } from "@/controllers/tools/response-content.ts";
import { formData, text } from "zod-form-data";
import { string } from "zod";
import { makeValidationErrorMessage, parseCookies } from "@/controllers/tools/index.ts";
import { sql } from "@/database/client.ts";
import { TokenService } from "@/services/crypto/index.ts";

export async function createCharacter(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)
  
  const characterSchema = formData({
    name: text(string().min(2).max(60).nonempty())
  })
  const validationResult = characterSchema.safeParse(await req.formData())
  
  if (!validationResult.success) {
    return makeValidationErrorMessage(validationResult)
  }

  const level = 1
  const exp = 0
  const vitality = 1
  const strength = 1
  const dexterity = 1
  const intelligence = 1
  const hp = 10 + vitality

  const id = crypto.randomUUID()
  await sql`
    insert into characters values (
      ${id},
      ${validationResult.data.name},
      ${level},
      ${exp},
      ${hp},
      ${vitality},
      ${strength},
      ${dexterity},
      ${intelligence},
      ${tokenData.id}
    )
  `

  return Content.noContent({
    headers: { 'hx-redirect': '/characters' }
  })
}
