export const RESET_DELAY_MS = 2000;

// `label` names what was copied in status messages ("Link copied to clipboard.").
export function createCopyHandler(
  button: HTMLButtonElement,
  text: string,
  status?: HTMLElement | null,
  label = "Link",
): () => Promise<void> {
  const originalHTML = button.innerHTML;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  return async () => {
    const copied = await copyText(text);

    button.textContent = copied ? "Copied!" : "Copy failed";
    if (status) {
      status.textContent = copied
        ? `${label} copied to clipboard.`
        : `Couldn't copy automatically. The ${label.toLowerCase()} is: ${text}`;
    }

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      button.innerHTML = originalHTML;
      if (status) status.textContent = "";
    }, RESET_DELAY_MS);
  };
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return fallbackCopy(text);
  }
}

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

// Each button announces through the [data-copy-status] region that shares its
// parent, so several copy buttons can live on one page.
export function initClipboard(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy-text]").forEach((button) => {
    const text = button.getAttribute("data-copy-text") ?? "";
    const label = button.getAttribute("data-copy-label") ?? undefined;
    const status = button.parentElement?.querySelector<HTMLElement>("[data-copy-status]");
    button.addEventListener("click", createCopyHandler(button, text, status, label));
  });
}
