import { html } from "@/ui/tools/html-fn.ts";
import { logoutIcon } from "@/ui/common/icons/index.ts";

export function mainMenu(userName: string) {
  return html`
    <div class="main-menu">
      <h1>
        <a href="/home">Quests</a>
      </h1>
      
      <div class="account-display">
        <p>${userName}</p>

        <div
          class="logout-icon"
          title="Log Out"
          hx-post="/logout"
        >
          ${logoutIcon()}
        </div>
      </div>
    </div>
  `
}
