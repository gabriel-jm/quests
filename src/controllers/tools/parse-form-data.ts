import { formData } from 'zod-form-data'

type FormDataType = ReturnType<typeof formData>

export async function parseFormData(req: Request, validationSchema: FormDataType) {
  return validationSchema.safeParse(await req.formData())
}
