# Persona Feedback Process

## Overview

This document defines how persona feedback flows through the writing team to produce validated improvements. The goal is to **extract signal from noise** — not to please every persona, but to identify changes that strengthen the book for the core reader.

---

## The Feedback Loop

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   1. COLLECT          2. SYNTHESIZE         3. DECIDE              │
│   ─────────────       ─────────────         ─────────              │
│   Personas read       Extract patterns      Filter through         │
│   chapter             across personas       writing principles     │
│                                                                     │
│         ↓                   ↓                     ↓                 │
│                                                                     │
│   4. DRAFT            5. VALIDATE           6. COMMIT              │
│   ─────────────       ─────────────         ─────────              │
│   Write revision      Re-run personas       Accept or iterate      │
│   proposals           on new version                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Collect Feedback

Each persona reads the chapter and produces:
- **Overall rating** (1-10)
- **What landed** (quotes that worked)
- **What felt like bullshit** (red flags)
- **Questions left unanswered**
- **Where they almost put it down**
- **What would keep them reading**

Output: One markdown file per persona in `personas/feedback/{chapter}/`

---

## Step 2: Synthesize into Action Items

After all personas have reviewed, create a **synthesis document** that extracts:

### Pattern Categories

| Category | Description | Weight |
|----------|-------------|--------|
| **Consensus Issues** | 3+ personas flag the same problem | HIGH — likely needs change |
| **Polarizing Points** | Some love it, some hate it | MEDIUM — consider if it serves core reader |
| **Single-Persona Concerns** | Only one persona flags it | LOW — usually skip unless it's the core reader |
| **Requests Outside Scope** | Asks for content the book isn't meant to provide | IGNORE — note for FAQ/future work |

### Action Item Template

```markdown
## [ACTION-ID]: Brief description

**Pattern:** Consensus / Polarizing / Single-Persona
**Flagged by:** Marcus, Elena, Derek (3/5)
**Category:** Clarity / Specificity / Tone / Structure / Scope

### The Problem
What personas are reacting to (with quotes from their feedback)

### Root Cause Analysis
Why this is happening in the text (not just what they said)

### Proposed Change
Specific edit or addition

### Risk Assessment
- What we might lose by changing this
- Which personas might react negatively to the change

### Decision: ACCEPT / REJECT / MODIFY / DEFER
Reasoning for the decision
```

Output: `personas/feedback/{chapter}/SYNTHESIS.md`

---

## Step 3: Filter Through Writing Principles

Not every valid complaint deserves a change. Filter action items through these questions:

### The Filter Questions

1. **Does this serve the core reader?**
   - Our core reader is Marcus (frustrated practitioner) — if a change helps him but alienates Rachel, we might still make it
   - If a change only helps Rachel but weakens it for Marcus, probably skip

2. **Does this align with the book's voice?**
   - The book is experiential, not academic (Elena might want more rigor than we'll provide)
   - The book is honest about struggle, not toxically positive (Rachel's concern is valid)

3. **Is this a feature, not a bug?**
   - Some polarization is intentional (the surfing thread either resonates or it doesn't)
   - Not every reader needs to love every section

4. **Is this the right place to address it?**
   - Some concerns get addressed in later chapters (Jordan's beginner questions)
   - Don't front-load everything into the prologue

5. **Does the change improve clarity without losing voice?**
   - Specificity is good; clinical detachment is bad
   - We can explain "scapular depression" without becoming a textbook

### Decision Framework

| Consensus Level | Core Reader Impact | Decision |
|-----------------|-------------------|----------|
| 3+ personas | Helps Marcus | **ACCEPT** |
| 3+ personas | Neutral for Marcus | **CONSIDER** |
| 3+ personas | Hurts Marcus | **REJECT** (or find different solution) |
| 1-2 personas | Helps Marcus | **ACCEPT** |
| 1-2 personas | Neutral/Hurts Marcus | **REJECT** |

Output: Updated `SYNTHESIS.md` with decisions

---

## Step 4: Draft Revisions

For each ACCEPTED action item, draft specific text changes:

```markdown
## Revision for [ACTION-ID]

### Original Text
> [exact quote from chapter]

### Revised Text
> [proposed new version]

### Rationale
Why this change addresses the feedback without losing what worked
```

Output: `personas/feedback/{chapter}/REVISIONS.md`

---

## Step 5: Voice Preservation Check (BEFORE Persona Validation)

Before testing revisions with personas, the **writer/editor must answer:**

### The Eloquence Gate

1. **Does the revision preserve the rhythm?**
   - Read both versions aloud. Does the new one still have music?
   - Short sentences should stay short. Punchy lines should stay punchy.

2. **Does the revision maintain mystery where appropriate?**
   - Not everything needs to be explained immediately
   - "Something clicked" creates tension. "I felt my ribcage drop and my shoulder blades pressed into my ribcage" is a medical report.

3. **Does the revision avoid defensive hedging?**
   - Inclusion is good; apologetic asides break intimacy
   - "Whether you're starting with forty push-ups or four" is a disclaimer, not prose

4. **Does the revision preserve specific imagery over generic lists?**
   - "Same ocean. Same board. Different body." > "Getting out of a chair. Running."
   - One vivid image beats three mundane examples

5. **Would you be proud to read this version aloud?**
   - If the revision feels like explaining a joke, it's wrong
   - The reader should feel something, not just understand something

### If the revision fails the Eloquence Gate:
- **Do not proceed to persona validation**
- Return to Step 4 and draft a revision that addresses the concern WITHOUT sacrificing voice
- Or accept that this feedback won't be actioned (some concerns aren't worth solving badly)

---

## Step 6: Validate Revisions

Re-run the relevant personas on the revised sections:

1. Show persona the **original** and **revised** side by side
2. Ask: "Does this revision address your concern without creating new problems?"
3. Collect: Improved / Same / Worse + reasoning

### Validation Criteria

- **All flagging personas say "Improved"** → Commit the change
- **Mixed response** → Iterate on revision
- **Makes it worse** → Reject revision, try different approach or accept original

Output: `personas/feedback/{chapter}/VALIDATION.md`

---

## Step 6: Commit or Iterate

If validated:
1. Apply changes to chapter file
2. Log the change in `personas/CHANGELOG.md`
3. Note any learnings for future chapters

If not validated:
1. Return to Step 4 with new approach
2. Or accept that this feedback won't be actioned (document why)

---

## File Structure

```
personas/
├── READER-PERSONAS.md          # Persona definitions
├── FEEDBACK-PROCESS.md         # This document
├── CHANGELOG.md                # Log of all changes made from feedback
├── LEARNINGS.md                # Patterns discovered across chapters
└── feedback/
    ├── 00-prologue/
    │   ├── marcus-frustrated-practitioner.md
    │   ├── elena-movement-nerd.md
    │   ├── derek-skeptical-athlete.md
    │   ├── jordan-beginner-dreamer.md
    │   ├── rachel-burnout-cynic.md
    │   ├── SYNTHESIS.md        # Patterns + action items + decisions
    │   ├── REVISIONS.md        # Proposed text changes
    │   └── VALIDATION.md       # Re-review results
    ├── 01-chapter-name/
    │   └── ...
    └── ...
```

---

## Anti-Patterns to Avoid

### ❌ Solving Problems with Explanations
If a line isn't landing, the fix is rarely to explain it more. "Something clicked" may be cliché, but replacing it with a clinical description kills the moment. Find a *different* way to evoke the same feeling — don't dissect it.

### ❌ Chasing Every Complaint
Not every persona needs to love every chapter. If Derek (skeptical athlete) doesn't like the introspective tone, that might be fine — he's not the core reader.

### ❌ Watering Down Voice
If we sand off every edge to avoid criticism, we lose what makes the book distinctive. "Organized, not forced" should stay even if it sounds abstract at first.

### ❌ Over-Explaining Early
Jordan wants definitions. But the prologue's job is to hook, not to teach. We can add a glossary or explain terms when they become central — not in the first 500 words.

### ❌ Removing Personality
The surfing thread is polarizing. 4/5 personas flagged it. But it's core to the author's voice and the book's thesis (cross-domain transfer). Consider if the problem is the surfing or the placement/execution.

### ❌ Making It Longer
Most feedback asks for "more" — more detail, more explanation, more specificity. But brevity is a feature. Often the answer is to replace vague words with precise ones, not to add more words.

---

## Example: Applying This to Prologue Feedback

### Consensus Issues (3+ personas)

1. **"Something clicked" is vague** — Marcus, Elena, Derek, Rachel
   - Action: Replace with more specific sensory description
   - Decision: ACCEPT

2. **"Gravity was doing it for me" is unclear** — Marcus, Elena, Derek
   - Action: Add one sentence explaining the mechanism
   - Decision: ACCEPT

3. **Surfing mention feels tacked on** — Marcus, Derek, Jordan, Rachel
   - Action: Either weave it in more naturally or move to later chapter
   - Decision: CONSIDER (it serves thesis but execution is weak)

4. **Terms undefined (scapular depression, pike)** — Jordan
   - Action: Add brief parenthetical or trust context
   - Decision: DEFER (single persona, addressed in later chapters)

### Polarizing Points

1. **"40 push-ups, 5 pull-ups" starting point**
   - Marcus: relatable / Jordan, Rachel: intimidating
   - Action: Add acknowledgment that readers may be starting from different places
   - Decision: ACCEPT (small addition, helps accessibility)

### Single-Persona Concerns (Usually Skip)

1. **Elena wants acknowledgment of prior movement literature**
   - Valid but not required in prologue
   - Decision: DEFER to author's note or later chapter

2. **Derek wants performance metrics**
   - Will be addressed in skill chapters
   - Decision: REJECT for prologue

---

## Roles

| Role | Responsibility |
|------|----------------|
| **Personas** | Provide raw, honest feedback from their POV |
| **Synthesizer** | Extract patterns, categorize, propose action items |
| **Writer** | Draft revisions that preserve voice while addressing concerns |
| **Validator** | Re-run personas to test revisions |
| **Editor** | Final decision on accept/reject, maintains book coherence |

In practice with AI assistance, these can be different prompts/modes rather than different people.

---

## Iteration Cadence

1. **Per-chapter:** Full feedback loop before moving to next chapter
2. **Per-draft:** After all chapters complete, re-run personas on full book
3. **Major revision:** If core thesis or structure changes, re-run from scratch
