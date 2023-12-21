import { Content, parseCookies } from "@/controllers/tools/index.ts";
import { TokenService } from "@/services/crypto/index.ts";
import { sql } from "@/database/client.ts";

export async function deleteCharacter(req: Request) {
  const cookies = parseCookies<{ token: string }>(req)
  const tokenData = await TokenService.verify(cookies.token)
  
  const { searchParams } = new URL(req.url)
  const characterID = searchParams.get('id')

  await sql`
    delete from characters
    where id = ${characterID}
      and "accountId" = ${tokenData.id};
  `

  return Content.noContentRedirect('/characters')
}
