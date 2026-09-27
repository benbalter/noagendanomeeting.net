import { describe, it, expect } from "vitest";
import { homeGraph } from "../src/jsonld";
import { SITE_URL } from "../src/consts";

type Node = Record<string, unknown>;

function collectRefs(value: unknown, refs: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => collectRefs(v, refs));
  else if (value && typeof value === "object") {
    const node = value as Node;
    if (Object.keys(node).length === 1 && typeof node["@id"] === "string") {
      refs.push(node["@id"]);
    }
    Object.values(node).forEach((v) => collectRefs(v, refs));
  }
  return refs;
}

describe("homeGraph", () => {
  const nodes = (homeGraph as unknown as { "@graph": Node[] })["@graph"];
  const ids = nodes.map((n) => n["@id"]);

  it("should give every node a unique @id", () => {
    expect(new Set(ids).size).toBe(nodes.length);
  });

  it("should resolve every same-site @id reference to a node in the graph", () => {
    const refs = collectRefs(nodes).filter((id) => id.startsWith(SITE_URL));
    for (const ref of refs) {
      expect(ids).toContain(ref);
    }
  });
});
