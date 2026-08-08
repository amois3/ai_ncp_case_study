# Memory design

AI NCP models community memory as owned, scoped and revisable. A useful memory item has a source, visibility boundary, confidence context and a correction history; it is not an unqualified text fragment in a shared vector index.

Corrections are append-only events. This preserves the original source and lets a reviewer see what changed, why, and by whom. Inaccessible history remains inaccessible even when a later correction mentions similar language.

The production system combines lexical and semantic recall behind this same boundary. The reference core uses lexical scoring only because the architectural point is the order of operations, not a particular embedding provider.
