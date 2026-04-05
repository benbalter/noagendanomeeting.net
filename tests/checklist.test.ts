import { describe, it, expect, beforeAll } from "vitest";
import { loadDocument } from "./setup";

describe("Checklist Sections", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have unordered lists for checklist items", () => {
    const lists = document.querySelectorAll("ul");
    expect(lists.length).toBeGreaterThanOrEqual(2);
  });

  it("should have at least 4 items in the hidden costs checklist", () => {
    const lists = document.querySelectorAll("ul");
    const costsList = lists[0];
    expect(costsList?.querySelectorAll("li").length).toBeGreaterThanOrEqual(4);
  });

  it("should have at least 4 items in the what to do checklist", () => {
    const lists = document.querySelectorAll("ul");
    const actionsList = lists[1];
    expect(actionsList?.querySelectorAll("li").length).toBeGreaterThanOrEqual(4);
  });

  it("should have bold text for key action items", () => {
    const lists = document.querySelectorAll("ul");
    const actionsList = lists[1];
    const boldItems = actionsList?.querySelectorAll("strong");
    expect(boldItems?.length).toBeGreaterThanOrEqual(4);
  });

  it("should contain key advice phrases", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("Decline politely");
    expect(text).toContain("Write first, meet second");
    expect(text).toContain("Include clear goals");
    expect(text).toContain("Attach a read-ahead");
  });

  it("should mention async/written alternatives to meetings", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("document");
    expect(text).toContain("Writing scales");
  });
});
