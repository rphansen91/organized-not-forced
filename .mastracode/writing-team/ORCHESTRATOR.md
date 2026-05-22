# Writing Team Orchestrator

> **Purpose**: Master instructions for the writing pipeline. Read this first when starting or continuing work on any chapter.

---

## Book Length Targets

Based on Bestseller Publishing research on self-help books:

| Metric | Industry Standard | Our Target |
|--------|------------------|------------|
| **Book Total** | 30,000–70,000 words | **30,000–40,000 words** |
| **Chapter Average** | 1,500–4,000 words | **2,500–3,500 words** |
| **Number of Chapters** | 7–20 chapters | **12 chapters** |

### Word Count Targets by Chapter Type

| Chapter Type | Target Words | Sections |
|--------------|-------------|----------|
| **Prologue** | 1,500–2,000 | Hook + setup + transition |
| **Skill Chapters** (3–7) | 2,500–3,500 | Full 5-beat arc with depth |
| **Principle Chapters** (8–10) | 2,000–3,000 | Concept + multiple examples |
| **Integration Chapters** (11–12) | 2,500–3,500 | Multiple domains + synthesis |
| **Framework Chapters** (1–2) | 2,000–2,500 | Origin + context |

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
| **3: The Struggle** | Ch 4: Muscle-Up, Ch 10: Joints | Creates stakes + warmup discovery |
| **4: Framework** | Ch 1: Goals, Ch 2: The Old Way | Origin story + context |
| **5: Fill In** | Ch 5, Ch 6, Ch 8-9, Ch 11-12 | As skills are achieved through 2026 |

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
| Researcher → Architect | Has 8-12 messages extracted, breakthrough/struggle/shift/carryover quotes |
| Architect → Drafter | All 5 beats mapped with source material, "open loop" structure defined |
| Drafter → Editor | Opens with sensation, stays in experience, **meets word target (2,000+ min)** |
| Editor → Fact-Checker | No gaudy language, pacing breathes, **depth check passed**, voice matches prologue |
| Fact-Checker → Complete | All claims verified ✓ or corrected, cross-chapter redundancy checked |

### Word Count Minimums by Section

```
MINIMUM WORD COUNTS BY SECTION:
- Breakthrough opening: 300-500 words
- Flashback/setup: 400-600 words  
- Struggle: 600-1,000 words (this needs the most depth — multiple failed attempts)
- Shift: 400-600 words
- Carryover: 300-500 words

TOTAL CHAPTER MINIMUM: 2,000 words
TARGET: 2,500-3,500 words
```

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

## Open Loop Structure

From Bestseller Publishing: Each chapter should use the "open loop" technique:

```
1. OPEN THE LOOP — Start with breakthrough moment
   - Don't fully explain what changed yet
   - Create curiosity: "Something clicked that day..."

2. BUILD — Flashback through struggle
   - Multiple failed attempts (this is where depth lives)
   - Specific sessions, reps, sensations
   - The grind before the breakthrough

3. CLOSE THE LOOP — Return to breakthrough with earned understanding
   - Now the reader knows WHY it clicked
   - The payoff lands harder because they've lived the struggle
   - Carryover proves it wasn't a fluke
```

This keeps readers turning pages through the technical content.

---

## Resource Callouts (Every 2-3 Chapters)

From Bestseller Publishing: *"Every 2-3 chapters should have a resource/lead magnet—NOT just website links—actual valuable content."*

### Resource Placement Plan

| After Chapter | Resource Type | Idea |
|---------------|---------------|------|
| **Ch 3 (Pistol)** | Checklist | "5 Warm-Up Questions I Ask Every Session" |
| **Ch 6 (HSPU)** | Video | "The 3 Overhead Tests" |
| **Ch 9 (Principles)** | Blueprint | "Force Transfer Self-Test" |
| **Ch 12 (Return)** | Full Guide | "The Complete Alignment Checklist" |

### Resource Format in Chapter

```markdown
---

**Go Deeper:** [Resource name and 1-sentence description]

→ [Link or "Available at [website]"]

---
```

### Checklist for Fact-Checker

- [ ] Does this chapter need a resource? (Check if 2-3 chapters have passed without one)
- [ ] If yes, is it defined in the Carryover section?
- [ ] Is the resource genuinely valuable (not just a website link)?

---

## Current Status

→ See `progress/STATUS.md` for live state
