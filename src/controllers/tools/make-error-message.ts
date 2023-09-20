import { SafeParseError } from 'zod'
import { errorMessage } from "@/ui/common/index.ts";
import { Content } from "@/controllers/tools/index.ts";

export function makeErrorMessage(validationResult: SafeParseError<FormData>) {
  const { issues } = validationResult.error

  const errors = Object.fromEntries(issues.map(issue => {
    return [issue.path[0], [issue.message]]
  }))

  return Content.html(errorMessage(errors), {
    headers: {
      'hx-retarget': '#error-message'
    }
  })
}
