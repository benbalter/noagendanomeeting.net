import { describe, it, expect, beforeAll } from "vitest";
import { loadDocument } from "./setup";

describe("Calendar Invite Examples", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have exactly two calendar invite headers", () => {
    const allDivs = Array.from(document.querySelectorAll("div"));
    const inviteHeaders = allDivs.filter((el) => el.textContent?.trim() === "Calendar Invite");
    expect(inviteHeaders).toHaveLength(2);
  });

  it("should show Quick sync as the bad example subject", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("Quick sync");
  });

  it("should show (none) for the missing goal, agenda, and read-ahead", () => {
    const noneElements = Array.from(document.querySelectorAll("span")).filter(
      (el) => el.textContent?.trim() === "(none)",
    );
    expect(noneElements.length).toBeGreaterThanOrEqual(3);
  });

  it("should show Q3 launch: go/no-go decision as the good example subject", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("Q3 launch: go/no-go decision");
  });

  it("should have a numbered agenda in the good example", () => {
    const ol = document.querySelector("ol");
    expect(ol).not.toBeNull();
    const items = ol?.querySelectorAll("li");
    expect(items?.length).toBe(3);
  });

  it("should include time allocations in every agenda item", () => {
    const items = Array.from(document.querySelectorAll("ol li"));
    items.forEach((item) => {
      expect(item.textContent).toMatch(/\d+ min/);
    });
  });

  it("should have a read-ahead mention in the good example", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("Read-ahead");
  });

  it("should have reaction text for both invite examples", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("Am I in trouble?");
    expect(text).toContain("Everyone arrives prepared.");
  });
});
