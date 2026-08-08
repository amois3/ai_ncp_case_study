import assert from "node:assert/strict";
import test from "node:test";
import { appendCorrection, canRead, groundedResponse, retrieve } from "../src/permission_grounding_core.ts";

const actor = { id: "u1", roomIds: ["engineering"] };
const sources = [
  { id: "private", roomId: "board", text: "Acquisition plan and runway" },
  { id: "team", roomId: "engineering", text: "The deployment runbook uses staged rollout" },
  { id: "public", visibility: "public" as const, text: "The product has a community handbook" },
];

test("a room member can read that room", () => assert.equal(canRead(sources[1], actor), true));
test("a non-member cannot read a private room", () => assert.equal(canRead(sources[0], actor), false));
test("public material is readable", () => assert.equal(canRead(sources[2], actor), true));
test("permission filtering happens before lexical retrieval", () => assert.deepEqual(retrieve(sources, actor, "runway plan"), []));
test("accessible evidence is returned with provenance", () => {
  const response = groundedResponse(retrieve(sources, actor, "deployment runbook"));
  assert.equal(response.kind, "answer");
  if (response.kind === "answer") assert.deepEqual(response.citations, [{ sourceId: "team", roomId: "engineering" }]);
});
test("no accessible evidence becomes an explicit refusal", () => assert.equal(groundedResponse([]).kind, "refusal"));
test("corrections append rather than overwrite history", () => {
  const original = { corrections: [] };
  const revised = appendCorrection(original, { id: "c1", sourceId: "team", text: "Use canary rollout." });
  assert.equal(original.corrections.length, 0);
  assert.equal(revised.corrections.length, 1);
});
test("replayed corrections are idempotent", () => {
  const memory = { corrections: [{ id: "c1", sourceId: "team", text: "Use canary rollout." }] };
  assert.equal(appendCorrection(memory, memory.corrections[0]), memory);
});
test("a malformed correction is rejected", () => assert.throws(() => appendCorrection({ corrections: [] }, { id: "", sourceId: "team", text: "x" })));
