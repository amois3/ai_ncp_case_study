# Threat model

The primary asset is private community knowledge: source contents, room membership, relationships and correction history.

| Threat | Boundary in this core |
| --- | --- |
| Cross-room retrieval | membership is checked before a source becomes a candidate |
| Private source influences a model | inaccessible sources are excluded before ranking or answer construction |
| Unsupported answer appears confident | absence of accessible evidence yields an explicit refusal |
| Retry corrupts correction history | correction IDs make replay idempotent |

The private product adds service authentication, database policy, event auditing, infrastructure controls and operational monitoring. This public reference core intentionally does not claim to replace those layers.
