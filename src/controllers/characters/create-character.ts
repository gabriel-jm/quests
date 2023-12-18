import { Content } from "@/controllers/tools/response-content.ts";
import { formData, text } from "zod-form-data";
import { string } from "zod";

export async function createCharacter(req: Request) {
  const characterSchema = formData({
    name: text(string().min(2).max(60).nonempty())
  })
  const validationResult = characterSchema.safeParse(await req.formData())
  console.log('Create Character:', validationResult.success && validationResult.data)

  return Content.noContent({
    headers: { 'hx-redirect': '/characters' }
  })
}
