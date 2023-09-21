import { Content } from "@/controllers/tools/index.ts";

export function logout() {
  return Content.noContent({
    headers: {
      location: '/',
      'hx-redirect': '/',
      'hx-refresh': 'true',
      'set-cookie': 'token=deleted; Max-Age=0'
    }
  })
}
