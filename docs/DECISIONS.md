# Design decisions

## Enforce policy before recall

Filtering a generated answer is too late. The retrieval function first derives the allowed corpus from room membership, explicit membership or public visibility; ranking operates only on that corpus.

## Require provenance for a successful answer

A response is useful only if a person can inspect the supporting source. The reference core returns a citation object with the source identity, or a refusal with an explicit reason.

## Corrections are events, not mutation

Human review must remain inspectable. A correction is appended to history and has its own idempotency key; it is not an overwrite of the prior fact or source.

## Keep the policy independent of the provider

Access rules belong to the system, not the language-model provider. A provider may be unavailable or replaced without changing who is permitted to see an item.
