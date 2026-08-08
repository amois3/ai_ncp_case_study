export type Actor = { id: string; roomIds: string[] };
export type Source = { id: string; text: string; visibility?: "public"; roomId?: string; memberIds?: string[] };
export type SearchResult = { source: Source; score: number };
export type Memory = { corrections: Correction[] };
export type Correction = { id: string; sourceId: string; text: string };

function terms(value: string): Set<string> {
  return new Set(value.toLowerCase().match(/[\p{L}\p{N}_-]+/gu) ?? []);
}

export function canRead(source: Source, actor: Actor): boolean {
  return source.visibility === "public" ||
    (source.roomId !== undefined && actor.roomIds.includes(source.roomId)) ||
    source.memberIds?.includes(actor.id) === true;
}

export function retrieve(sources: Source[], actor: Actor, query: string): SearchResult[] {
  const queryTerms = terms(query);
  return sources.filter((source) => canRead(source, actor))
    .map((source) => ({ source, score: [...queryTerms].filter((term) => terms(source.text).has(term)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.source.id.localeCompare(b.source.id));
}

export function groundedResponse(results: SearchResult[]) {
  const first = results[0];
  if (!first || !first.source.id || !first.source.text.trim()) {
    return { kind: "refusal" as const, reason: "No accessible source supports an answer." };
  }
  return { kind: "answer" as const, text: first.source.text, citations: [{ sourceId: first.source.id, roomId: first.source.roomId ?? null }] };
}

export function appendCorrection(memory: Memory, correction: Correction): Memory {
  if (!correction.id || !correction.sourceId || !correction.text.trim()) throw new Error("correction requires an id, sourceId and text");
  if (memory.corrections.some((entry) => entry.id === correction.id)) return memory;
  return { ...memory, corrections: [...memory.corrections, { ...correction }] };
}
