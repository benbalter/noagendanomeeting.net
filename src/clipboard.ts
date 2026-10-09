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

    // Hold the button's width so the shorter status text doesn't shift the layout.
    button.style.minWidth = `${button.offsetWidth}px`;
    button.textContent = copied ? "Copied!" : "Copy failed";
    if (status) {
      status.textContent = copied
        ? `${label} copied to clipboard.`
        : `Couldn't copy automatically. The ${label.toLowerCase()} is: ${text}`;
    }

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.minWidth = "";
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

// Phones get the native share sheet; elsewhere navigator.share either doesn't
// exist or opens a desktop dialog that's clumsier than copying the link.
export function canNativeShare(): boolean {
  return (
    typeof navigator.share === "function" &&
    window.matchMedia?.("(pointer: coarse)").matches === true
  );
}

export function createShareHandler(
  url: string,
  fallback: () => Promise<void>,
): () => Promise<void> {
  return async () => {
    if (!canNativeShare()) return fallback();
    try {
      await navigator.share({ title: document.title, url });
    } catch (error) {
      // AbortError means the person closed the share sheet; don't copy behind their back.
      if ((error as DOMException | undefined)?.name !== "AbortError") await fallback();
    }
  };
}

// Buttons with data-share try the native share sheet first.
// Each button announces through the [data-copy-status] region that shares its
// parent, so several copy buttons can live on one page.
export function initClipboard(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy-text]").forEach((button) => {
    const text = button.getAttribute("data-copy-text") ?? "";
    const label = button.getAttribute("data-copy-label") ?? undefined;
    const status = button.parentElement?.querySelector<HTMLElement>("[data-copy-status]");
    const copy = createCopyHandler(button, text, status, label);
    const handler = button.hasAttribute("data-share") ? createShareHandler(text, copy) : copy;
    button.addEventListener("click", handler);
  });
}
