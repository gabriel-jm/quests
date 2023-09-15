import { loginPage } from '../../ui/account/login-page.ts'
import { htmlBase } from '../../ui/tools/html-fn.ts'
import { Content } from "@/controllers/tools/index.ts";

export function login() {
  return Content.html(htmlBase(loginPage()))
}
