import { Content } from "@/controllers/tools/index.ts";
import { html } from "@/ui/tools/html-fn.ts";

export function logout() {
  const content = html`
    <div onload="document.cookie = ''"></div>
    <head>
      <meta http-equiv="refresh" content="0;URL='/'" />
    </head>
  `

  return Content.html(content, {
    headers: {
      'set-cookie': 'quests-token=deleted; max-age=0'
    }
  })
}
