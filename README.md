# AI NCP

## AI-native community operating system

> Public case study. The original product remains private. This repository documents the system model, architecture, security boundaries, and verification approach without publishing implementation code, private community data, credentials, or operational configuration.

AI NCP is a memory-first social platform for invite-only professional communities. It is not a chatbot layered over a feed, a Discord clone, or a generic RAG service.

Its core object is a living **Space**: people, rooms, threads, presence, permissions, events, memory, and AI-native navigation.

## The problem

A community accumulates information in fragments: conversations, decisions, documents, relationships, recurring questions, corrections, and context that changes over time. Ordinary search retrieves words. A naive AI summary may retrieve the wrong source, cross a privacy boundary, or present a stale statement with confidence.

AI NCP is designed around a harder requirement:

> Community intelligence must remain grounded in the sources a person is allowed to access, while preserving history, correction, and context.

## Product model

### Spaces are bounded communities

A Space is an invite-only environment with membership, roles, rooms, threads, presence, events, private cabinets, host operations, and a distinct social graph. It is the unit that determines both collaboration and authority.

### Memory is a first-class product object

Memory is not an opaque embedding index. A memory item carries:

- scope and visibility;
- source and provenance;
- confidence;
- correction history;
- room and membership boundaries;
- auditability.

This allows the system to express the difference between a source, a retrieved memory, a correction, and an answer.

### AI is product-bounded

The AI layer is constrained before it generates:

1. determine the member and current context;
2. resolve the sources that member may access;
3. retrieve semantically and lexically within that permission boundary;
4. generate a source-linked answer or refuse when the evidence or authority is insufficient;
5. preserve the event and correction trail.

The result is not simply “an AI that knows the community.” It is an AI that can explain where an answer came from and what it was allowed to see.

## System architecture

AI NCP is a TypeScript monorepo built around explicit domain boundaries.

| Layer | Responsibility |
|---|---|
| Next.js web application | Community workspace, host operations, realtime interaction, PWA surface |
| NestJS API | Domain operations, identity/authorization boundaries, application APIs |
| Background workers | Event-driven ingestion, AI execution, asynchronous processing |
| Expo mobile foundation | Native/mobile delivery path for the community product |
| PostgreSQL + pgvector | Relational source of truth and vector retrieval |
| Redis | Coordination and short-lived operational state |
| Shared packages | Domain models, policies, contracts, and application primitives |

The architecture supports Spaces, rooms, threads, presence, members, private cabinets, events, social/interest intelligence, semantic and lexical retrieval, source validation, and host tooling without treating any of those as an afterthought.

## Permission-aware collective memory

The central design decision is ordering:

```
permissions -> candidate sources -> retrieval -> generation -> answer
```

Not:

```
retrieval -> generation -> filter it later
```

This matters because a response cannot be made safe merely by deleting a sentence after the model has already seen a private source. The boundary belongs in retrieval and execution policy, not in a final wording check.

## Grounding and correction

AI NCP treats grounded generation as a product behaviour, not a prompt preference.

- Answers are source-linked.
- Unsupported generation should refuse rather than fill gaps confidently.
- Human review and correction are part of the memory lifecycle.
- Private-room isolation remains intact.
- Providers are governed by execution policy.
- Events and changes have durable audit trails.

The repository documents a local-alpha foundation with production-readiness hardening still ahead. It does not claim that an unfinished system is a public production network.

## Verification approach

The project uses deterministic and end-to-end verification flows for the behaviours that matter most:

- grounding and refusal evaluation;
- permission-matrix evaluation;
- private-room isolation;
- source validation;
- local full-flow and vertical-slice checks.

The private project README reports 20/20 grounding/refusal and 110/110 permission-matrix evaluation results. These are repository verification results, not external certification or a universal benchmark.

## What is deliberately not public

This case study does not contain:

- original source code;
- private room content, member data, or database extracts;
- provider credentials or operational secrets;
- product configuration that would weaken a real deployment;
- invented screenshots or claims beyond the verified scope.

The purpose is to let an employer, collaborator, or technical reviewer evaluate the thinking: product model, system boundaries, safety posture, and delivery discipline.

## Why this system is different

Many products add AI after the community exists. AI NCP begins from the opposite direction: a community is a memory and permission system before it is a feed.

That changes the implementation questions:

- What is a source?
- Who may retrieve it?
- What changes when the community corrects itself?
- How is an answer traced?
- What may a provider receive?
- What does the system do when evidence is missing?

Those are the questions the architecture is built to answer.

## Scope and disclosure

- AI NCP is an independent product, not a TITAN component.
- The public repository is documentation only; the original source remains private.
- The project is positioned honestly as a usable local alpha with further production-readiness work planned.

---

Built by [Aleksejs Moisejevs](https://github.com/amois3) · AI Systems Architect & Agentic Product Builder
