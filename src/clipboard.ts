export function createCopyHandler(button: HTMLButtonElement, url: string): () => Promise<void> {
  const originalHTML = button.innerHTML;

  return async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      fallbackCopy(url);
    }

    button.textContent = "Copied!";
    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2000);
  };
}

function fallbackCopy(text: string): void {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function initClipboard(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy-url]").forEach((button) => {
    const url = button.getAttribute("data-copy-url") ?? "";
    button.addEventListener("click", createCopyHandler(button, url));
  });
}
