import { html } from "@/ui/tools/html-fn.ts";
import { coinsIcon, homeIcon, logoutIcon } from "@/ui/common/icons/index.ts";
import { TokenData } from "@/services/crypto/index.ts";

export function mainMenu({ gold }: TokenData) {
  return html`
    <div class="main-menu">
      <h1>
        <a class="home-link" href="/home" data-tooltip="Home">
          ${homeIcon()}
        </a>
      </h1>
      
      <div class="account-display">
        <p data-tooltip="Gold">${coinsIcon()} ${gold}</p>

        <div
          class="logout-icon"
          data-tooltip="Log Out"
          onclick="window.cookie = ''"
        >
          <a href="/logout">
            ${logoutIcon()}
          </a>
        </div>
      </div>
    </div>
  `
}
