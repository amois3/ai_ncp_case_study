# Architecture

AI NCP is memory-first: access-aware shared memory is a system primitive, not a post-processing feature on a chatbot response.

```
actor + memberships -> authorization -> permitted source set -> retrieval -> grounded answer or refusal
                                                           -> correction history -> audit trail
```

The reference core models this narrow but load-bearing line. The larger product adds spaces, rooms, threads, social and interest intelligence, host operations, provider execution policy, semantic/lexical retrieval, workers, PostgreSQL/pgvector and client applications.

The ordering is invariant: authorization precedes retrieval. An inaccessible source never enters the candidate set and therefore cannot influence ranking, snippets, prompts, or output.
