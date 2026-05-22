# Writing Team Orchestrator

> **Purpose**: Master instructions for the writing pipeline. Read this first when starting or continuing work on any chapter.

---

## Quick Start

```
"Continue writing" → Read STATUS.md → Run next expert phase
"Start Chapter X"  → Create working dir → Run Researcher
"Show current draft" → Read from working/[chapter]/
```

---

## The Writing Order

From BOOK_STRUCTURE.md — chapters in order of priority:

| Phase | Chapters | Why This Order |
|-------|----------|----------------|
| **1: Hook** | ✅ Prologue | Already complete — pike breakthrough |
| **2: Richest Material** | Ch 3: Pistol Squat, Ch 7: Planche | Most breakthrough material, write while vivid |
| **3: The Struggle** | Ch 4: Muscle-Up, Ch 2: The Old Way | Creates stakes |
| **4: Integration** | Ch 10: Carryover, Ch 11: Transformation | The payoff |
| **5: Fill In** | Ch 1, Ch 5, Ch 6, Ch 8-9 | As skills are achieved through 2026 |

---

## The Expert Pipeline

Each chapter passes through 5 experts in sequence:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ RESEARCHER  │ →  │  ARCHITECT  │ →  │   DRAFTER   │ →  │   EDITOR    │ →  │ FACT-CHECKER│
│             │    │             │    │             │    │             │    │             │
│ Extracts    │    │ Structures  │    │ Writes v1   │    │ Polishes v2 │    │ Verifies    │
│ raw quotes  │    │ the arc     │    │ in voice    │    │ tightens    │    │ accuracy    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      ↓                  ↓                  ↓                  ↓                  ↓
 research-notes.md  chapter-outline.md  draft-v1.md      draft-v2.md       fact-check.md
```

### Quality Gates

Before advancing to next expert, verify:

| From → To | Gate |
|-----------|------|
| Researcher → Architect | Has breakthrough quote, struggle quote, shift quote, carryover proof |
| Architect → Drafter | All 5 beats mapped with source material assigned |
| Drafter → Editor | Opens with sensation, stays in experience, ~1500-2500 words |
| Editor → Fact-Checker | No gaudy language, pacing breathes, voice matches prologue |
| Fact-Checker → Complete | All claims verified ✓ or corrected |

---

## Reference Materials

| File | What It Contains | When To Use |
|------|------------------|-------------|
| `conversation_chronological.md` | Full journey transcript (304 messages) | Researcher: extract quotes |
| `BOOK_STRUCTURE.md` | Chapter specs, message mappings, arc structure | Architect: structure chapter |
| `book-vision.md` | Tone, positioning, thesis | Drafter: voice guidance |
| `research/fitness-book-research.md` | Market context, unique contributions | Drafter: differentiation |
| `chapters/00-prologue.md` | Completed prologue | Drafter/Editor: voice reference |

---

## Chapter → Message Mapping (Quick Reference)

| Chapter | Key Messages | Breakthrough Opens With |
|---------|--------------|------------------------|
| **Ch 3: Pistol Squat** | 120, 142, 187, 189 | First unassisted rep on the left |
| **Ch 7: Planche** | 294, 302, 303 | Pike breakthrough — gravity organizing scap |
| **Ch 4: Muscle-Up** | 26, 30, 56, 182 | Rhythm emerging, bar reaching chest |
| **Ch 2: The Old Way** | 26, 30, 45 | Shoulders giving out at transition |
| **Ch 10: Carryover** | 187, 225, 227 | Catching waves after 3 weeks off |
| **Ch 11: Transformation** | 302, 303, 304 | Return to pike moment |
| **Ch 1: Goals** | 1–10 | Writing down 5 impossible goals |
| **Ch 5: HSPU** | 225, 227 | Scorpion insight |
| **Ch 6: Front Lever** | 142, 250, 283, 294 | Hollow body coming online |
| **Ch 8-9: Principles** | 294, 295, synthesized | Depression reframe |

---

## Invoking Experts

To run an expert phase, read their instruction file and follow it:

```
experts/01-researcher.md  → Extract material from conversation
experts/02-architect.md   → Structure into 5-beat arc
experts/03-drafter.md     → Write first draft
experts/04-editor.md      → Polish and tighten
experts/05-fact-checker.md → Verify against source
```

Each expert file contains:
- Role description
- Input requirements
- Process steps
- Output format
- Quality criteria

---

## Working Directory Structure

For each chapter in progress:

```
working/
└── ch03-pistol-squat/
    ├── research-notes.md    ← Researcher output
    ├── chapter-outline.md   ← Architect output
    ├── draft-v1.md          ← Drafter output
    ├── draft-v2.md          ← Editor output
    └── fact-check.md        ← Fact-Checker output
```

---

## The Loop

```
1. Read progress/STATUS.md to get current state
2. If starting new chapter:
   - Create working/[chapter-name]/ directory
   - Run Researcher expert
3. If continuing:
   - Read current phase from STATUS.md
   - Run next expert in sequence
4. After each expert:
   - Update STATUS.md with new phase
   - Check quality gate before advancing
5. When fact-check complete:
   - Move final draft to chapters/[XX]-[name].md
   - Mark chapter complete in STATUS.md
```

---

## Voice Reminders (From Prologue)

When drafting, maintain this voice:

- **Feel it → Name it**: Raw sensation first, then the technical insight
- **Stay in the body**: "My ribs settled" not "The ribs should settle"
- **No lectures**: Discovery, not instruction
- **Short punchy lines**: "Effortless. But strong."
- **Let insights land**: Bold the core principle, then move on

**Avoid**:
- Overwrought metaphors ("like sandbags against a flood")
- Clichés ("different species")
- Meta-commentary ("But I'm getting ahead of myself")
- Reaching similes ("like they'd found a shelf they'd been searching for")

---

## Current Status

→ See `progress/STATUS.md` for live state
