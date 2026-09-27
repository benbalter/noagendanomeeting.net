import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createCopyHandler, initClipboard, RESET_DELAY_MS } from "../src/clipboard";

describe("createCopyHandler", () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    button = document.createElement("button");
    button.innerHTML = 'noagendanomeeting.net <span class="ml-1.5 text-gray-400">📋</span>';
    document.body.appendChild(button);

    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("should copy the URL to clipboard when called", async () => {
    const handler = createCopyHandler(button, "https://noagendanomeeting.net");
    await handler();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://noagendanomeeting.net");
  });

  it("should show Copied! text after copying", async () => {
    const handler = createCopyHandler(button, "https://noagendanomeeting.net");
    await handler();
    expect(button.textContent).toBe("Copied!");
  });

  it("should restore original content after 2 seconds", async () => {
    vi.useFakeTimers();
    const handler = createCopyHandler(button, "https://noagendanomeeting.net");
    await handler();
    expect(button.textContent).toBe("Copied!");

    vi.advanceTimersByTime(RESET_DELAY_MS);
    expect(button.innerHTML).toContain("noagendanomeeting.net");
    expect(button.innerHTML).toContain("📋");
    vi.useRealTimers();
  });

  it("should fall back to execCommand when clipboard API fails", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Not allowed")) },
    });
    // jsdom doesn't define execCommand, so we add it as a mock
    document.execCommand = vi.fn().mockReturnValue(true);

    const handler = createCopyHandler(button, "https://noagendanomeeting.net");
    await handler();

    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(button.textContent).toBe("Copied!");
  });

  it("should report failure when both copy methods fail", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Not allowed")) },
    });
    document.execCommand = vi.fn().mockReturnValue(false);
    const status = document.createElement("span");

    const handler = createCopyHandler(button, "https://noagendanomeeting.net", status);
    await handler();

    expect(button.textContent).toBe("Copy failed");
    expect(status.textContent).toContain("https://noagendanomeeting.net");
  });

  it("should treat a throwing execCommand as a failure", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Not allowed")) },
    });
    document.execCommand = vi.fn().mockImplementation(() => {
      throw new Error("unsupported");
    });

    const handler = createCopyHandler(button, "https://noagendanomeeting.net");
    await handler();

    expect(button.textContent).toBe("Copy failed");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("should announce success in the status region and clear it on reset", async () => {
    vi.useFakeTimers();
    const status = document.createElement("span");
    const handler = createCopyHandler(button, "https://noagendanomeeting.net", status);

    await handler();
    expect(status.textContent).toBe("Link copied to clipboard.");

    vi.advanceTimersByTime(RESET_DELAY_MS);
    expect(status.textContent).toBe("");
    vi.useRealTimers();
  });

  it("should restart the reset timer on repeat clicks", async () => {
    vi.useFakeTimers();
    const handler = createCopyHandler(button, "https://noagendanomeeting.net");

    await handler();
    vi.advanceTimersByTime(RESET_DELAY_MS - 500);
    await handler();
    vi.advanceTimersByTime(1000);
    expect(button.textContent).toBe("Copied!");

    vi.advanceTimersByTime(RESET_DELAY_MS);
    expect(button.innerHTML).toContain("📋");
    vi.useRealTimers();
  });

  it("should handle multiple rapid clicks gracefully", async () => {
    const handler = createCopyHandler(button, "https://noagendanomeeting.net");
    await handler();
    await handler();
    expect(button.textContent).toBe("Copied!");
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
  });
});

describe("initClipboard", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should attach click handlers to all [data-copy-url] buttons", () => {
    const button = document.createElement("button");
    button.setAttribute("data-copy-url", "https://example.com");
    button.textContent = "Copy";
    document.body.appendChild(button);

    const spy = vi.spyOn(button, "addEventListener");
    initClipboard();
    expect(spy).toHaveBeenCalledWith("click", expect.any(Function));
  });

  it("should handle multiple buttons", () => {
    const btn1 = document.createElement("button");
    btn1.setAttribute("data-copy-url", "https://a.com");
    const btn2 = document.createElement("button");
    btn2.setAttribute("data-copy-url", "https://b.com");
    document.body.appendChild(btn1);
    document.body.appendChild(btn2);

    const spy1 = vi.spyOn(btn1, "addEventListener");
    const spy2 = vi.spyOn(btn2, "addEventListener");
    initClipboard();

    expect(spy1).toHaveBeenCalledWith("click", expect.any(Function));
    expect(spy2).toHaveBeenCalledWith("click", expect.any(Function));
  });

  it("should do nothing if no [data-copy-url] elements exist", () => {
    expect(() => initClipboard()).not.toThrow();
  });

  it("should wire buttons to the [data-copy-status] live region", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const button = document.createElement("button");
    button.setAttribute("data-copy-url", "https://example.com");
    const status = document.createElement("span");
    status.setAttribute("data-copy-status", "");
    document.body.append(button, status);

    initClipboard();
    button.click();
    await vi.waitFor(() => expect(status.textContent).toBe("Link copied to clipboard."));
  });

  it("should use the data-copy-url attribute value as the URL", () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    const button = document.createElement("button");
    button.setAttribute("data-copy-url", "https://custom-url.test");
    button.textContent = "Copy";
    document.body.appendChild(button);

    initClipboard();
    button.click();

    // The click triggers an async handler, but the clipboard mock captures the call
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://custom-url.test");
  });
});
