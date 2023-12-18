import { html } from "@/ui/tools/html-fn.ts";
import { inputField } from "@/ui/common/input-field.ts";

export function characterModal() {
  return html`
    <dialog id="characterModal">
      <h3>New Character</h3>

      <form hx-post="/characters">
        ${inputField({
          name: 'name',
          label: 'Name',
          minLength: 2,
          maxLength: 60
        })}

        <button>Create</button>
        <button
          type="button"
          class="secondary"
          onclick="characterModal.close()"
        >
          Cancel
        </button>
      </form>
    </dialog>
  `
}
