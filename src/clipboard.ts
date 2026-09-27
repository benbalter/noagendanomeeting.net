export const RESET_DELAY_MS = 2000;

export function createCopyHandler(
  button: HTMLButtonElement,
  url: string,
  status?: HTMLElement | null,
): () => Promise<void> {
  const originalHTML = button.innerHTML;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  return async () => {
    const copied = await copyText(url);

    button.textContent = copied ? "Copied!" : "Copy failed";
    if (status) {
      status.textContent = copied
        ? "Link copied to clipboard."
        : `Couldn't copy automatically. The link is ${url}`;
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

export function initClipboard(): void {
  const status = document.querySelector<HTMLElement>("[data-copy-status]");
  document.querySelectorAll<HTMLButtonElement>("[data-copy-url]").forEach((button) => {
    const url = button.getAttribute("data-copy-url") ?? "";
    button.addEventListener("click", createCopyHandler(button, url, status));
  });
}
