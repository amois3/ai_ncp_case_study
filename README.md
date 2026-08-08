# AI NCP — the permission and grounding core, isolated

[![CI](https://github.com/amois3/ai_ncp_case_study/actions/workflows/ci.yml/badge.svg)](https://github.com/amois3/ai_ncp_case_study/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/Node-20%2B-339933?logo=node.js&logoColor=white)
![Runtime dependencies](https://img.shields.io/badge/runtime%20dependencies-0-2ea44f)
[![License](https://img.shields.io/badge/license-review--only-6f42c1)](LICENSE)

AI NCP is an AI-native community operating system for invite-only professional communities. It treats people, rooms, threads, events, permissions and memory as first-class system objects. The private product is a TypeScript monorepo spanning web, services, workers, mobile and data infrastructure. This public repository is a runnable reference core for the constraint that matters most: an AI system must only retrieve and answer from evidence the current person is entitled to access.

```bash
npm test
# 9 tests, no install, account, network, API key, model, or database required
```

## What is here

| Component | Responsibility | Test focus |
| --- | --- | --- |
| `src/permission_grounding_core.mjs` | Access policy, permission-first retrieval, source-linked answers and correction history | isolation, refusal and provenance |
| `test/` | Executable security invariants | private-room leakage and replay behaviour |
| `docs/` | Architecture, decisions and threat model | why filtering output is too late |

## The failure modes this core makes impossible by construction

**Search first, filter later leaks private knowledge.** An inaccessible document can affect ranking, snippets or model context before an output filter catches it. `retrieve()` authorizes each source before it scores a single term.

**An answer without a source cannot be reviewed.** `groundedResponse()` either returns an accessible source ID alongside the answer or refuses. There is no success-shaped empty answer.

**A correction must not erase the record it corrects.** `appendCorrection()` preserves an append-only correction history and treats a retried correction as harmless.

## The boundary in four steps

1. Resolve the actor’s membership and explicit access.
2. Exclude inaccessible sources before semantic or lexical retrieval.
3. Rank only the permitted candidate set.
4. Return a source-linked answer, or an explicit refusal when no accessible evidence supports one.

The production system extends this boundary with semantic and lexical recall, pgvector, room and cabinet isolation, provider execution policies, review/correction workflows, audit events and service-level authorization. This case study keeps the invariant readable without publishing private community data, product source, prompts, infrastructure or credentials.

## System context

AI NCP is designed as a memory-first social system rather than a chatbot bolted onto a feed: spaces contain people, roles, rooms, threads, presence, permissions, events and shared memory. The private repository reports 20/20 grounding/refusal evaluations and 110/110 permission-matrix checks; this public core does not represent an independent certification of those figures.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Design decisions](docs/DECISIONS.md)
- [Threat model](docs/THREAT_MODEL.md)
- [Trust and safety](docs/TRUST_AND_SAFETY.md)
- [Memory design](docs/MEMORY_DESIGN.md)

## Scope and license

This is a public technical case study and reference core, not a distribution of the private AI NCP product. It is published for review and discussion only; see [LICENSE](LICENSE).

