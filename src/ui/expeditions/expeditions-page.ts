import { html } from "@/ui/tools/html-fn.ts";
import { getToken } from "@/controllers/account/get-token.ts";
import { mainMenu } from "@/ui/common/index.ts";

export async function expeditionsPage(req: Request) {
  const tokenData = await getToken(req)

  return html`
    ${mainMenu(tokenData)}

    <h2>Expeditions</h2>
  `
}
