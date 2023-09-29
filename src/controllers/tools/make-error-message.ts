import { SafeParseError } from 'zod'
import { errorMessage, validationErrorMessage } from "@/ui/common/index.ts";
import { Content } from "@/controllers/tools/index.ts";

export function makeValidationErrorMessage(validationResult: SafeParseError<FormData>) {
  const { issues } = validationResult.error

  const errors = Object.fromEntries(issues.map(issue => {
    return [issue.path[0], [issue.message]]
  }))

  return Content.html(validationErrorMessage(errors), {
    headers: {
      'hx-retarget': '#error-message'
    }
  })
}

export function makeErrorMessage(message: string) {
  return Content.html(errorMessage(message), {
    headers: {
      'hx-retarget': '#error-message'
    }
  })
}
