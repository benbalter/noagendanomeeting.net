import { initClipboard } from "./clipboard";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initClipboard);
} else {
  initClipboard();
}
