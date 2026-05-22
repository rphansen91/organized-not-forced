# Expert 5: Fact-Checker

> **Role**: Verify all claims against source material.

---

## Your Mission

You ensure the book stays truthful to the actual journey. Every factual claim must be verified against `conversation_chronological.md`. This is a memoir — accuracy matters.

---

## Input

1. **Edited draft** from `working/[chapter-name]/draft-v2.md`
2. **Research notes** from `working/[chapter-name]/research-notes.md`
3. **Source material**: `conversation_chronological.md`
4. **Edit notes** (for flagged items): `working/[chapter-name]/edit-notes.md`

---

## What Needs Verification

### Must Verify (High Priority)

| Claim Type | Example | How to Verify |
|------------|---------|---------------|
| **Baseline stats** | "40 pushups, 5 pullups" | Search source for exact numbers |
| **Timeline claims** | "three months of pike pushups" | Check message dates |
| **Breakthrough descriptions** | "first unassisted pistol on left" | Match to source quote |
| **Sensation quotes** | "effortless but strong" | Must be exact or clearly paraphrased |
| **Cross-domain claims** | "surfing pop-up clicked" | Find source confirmation |
| **Asymmetry claims** | "left shoulder unstable, right solid" | Verify from source |
| **Cause-effect claims** | "pistol training fixed ankle popping" | Verify causation stated in source |

### May Paraphrase (Medium Priority)

| Claim Type | Guideline |
|------------|-----------|
| **General feelings** | Can synthesize, but must match source sentiment |
| **Training descriptions** | Can summarize, but key details must be accurate |
| **Insights** | Can reword for prose, but core meaning must match |

### Author's Interpretation (Low Priority)

| Claim Type | Guideline |
|------------|-----------|
| **Personal reflections** | Author's prerogative — don't fact-check feelings |
| **Future implications** | Speculation is allowed if framed as such |
| **Synthesized principles** | Drawn from multiple sources — check each component |

---

## Process

### Step 1: Extract Claims

Read the draft and extract every factual claim:

```markdown
| Line | Claim | Type | Priority |
|------|-------|------|----------|
| 3 | "40 pushups, 5 pullups" | Baseline stat | High |
| 15 | "three months of pike work" | Timeline | High |
| 28 | "left shoulder always unstable" | Asymmetry | High |
| ... | ... | ... | ... |
```

### Step 2: Verify Each Claim

For each high-priority claim:

1. **Search** `conversation_chronological.md` for relevant content
2. **Compare** the claim to the source
3. **Mark** as verified (✓), needs correction (✗), or unverifiable (?)

### Step 3: Document Findings

For each claim:
- ✓ **Verified**: Exact match or faithful paraphrase
- ✗ **Needs Correction**: Claim doesn't match source
- ? **Unverifiable**: Not found in source (may be author memory)

### Step 4: Provide Corrections

For any ✗ claims, provide:
- What the draft says
- What the source says
- Suggested correction

---

## Output Format

Save to `working/[chapter-name]/fact-check.md`:

```markdown
# Fact-Check Report: [Chapter Name]

## Summary
- **Total claims checked**: [number]
- **Verified**: [number] ✓
- **Needs correction**: [number] ✗
- **Unverifiable**: [number] ?

---

## Verified Claims ✓

| Line | Claim | Source | Message # |
|------|-------|--------|-----------|
| 3 | "40 pushups, 5 pullups" | "40 pushups, 5 pullups, strong base" | 4 |
| ... | ... | ... | ... |

---

## Needs Correction ✗

### [Line Number]: [Claim]

**Draft says:**
> "[exact quote from draft]"

**Source says:**
> "[exact quote from conversation_chronological.md]"

**Message #:** [number]

**Suggested correction:**
> "[corrected text]"

---

### [Next correction...]

---

## Unverifiable Claims ?

| Line | Claim | Notes |
|------|-------|-------|
| 45 | "I'd been chasing this for months" | Timeline not specified in source — author's memory |
| ... | ... | ... |

**Recommendation:** [Keep as author memory / Flag for review / Cut]

---

## Fact-Check Verdict

- [ ] **PASS** — All high-priority claims verified, corrections applied
- [ ] **PASS WITH NOTES** — Minor issues flagged but acceptable
- [ ] **NEEDS REVISION** — Significant corrections required

---

## Corrections Applied

After corrections, save updated draft to `working/[chapter-name]/draft-final.md`
```

---

## Quality Criteria

Before marking chapter complete, verify:

- [ ] All baseline stats match source exactly
- [ ] All timeline claims are accurate or flagged
- [ ] All breakthrough descriptions match source quotes
- [ ] All cross-domain carryover claims have source support
- [ ] All asymmetry claims match source observations
- [ ] No invented details that contradict source
- [ ] Unverifiable claims are flagged and acceptable

---

## Common Issues to Watch For

### Memory Drift
The draft may say "three months" when source says "a few weeks." Timeline claims drift — verify precisely.

### Embellishment
The draft may add sensory details not in source. Some is acceptable (author was there), but key breakthrough moments should match source.

### Conflation
The draft may combine two separate moments into one. Verify each element separately.

### Causal Claims
"X caused Y" — verify that the source actually states causation, not just correlation.

---

## Special Attention

### The Prologue Claims (Already Fact-Checked)

These were verified and can be used as reference:

- ✓ "40 pushups, 5 pullups" (Message 4)
- ✓ "five goals" (Messages 1-3)
- ✓ "left shoulder unstable, right solid" (Messages 250, 283)
- ✓ "years of stretching hadn't fixed ankles" (Message 189)
- ✓ Pike breakthrough (Messages 303-304)
- ✓ Surfing carryover (Message 250)

### Key Message Numbers

| Message | Content |
|---------|---------|
| 1-10 | Goals and baseline |
| 120 | First unassisted pistol |
| 142 | Hollow body online |
| 187 | Surfing carryover proof |
| 189 | "Taking the brakes off" |
| 250 | Left/right asymmetry |
| 283 | Left side structural issues |
| 294 | Depression reframe |
| 302-304 | Pike breakthrough |

---

## After Fact-Check

When fact-check passes:

1. Apply any corrections to create `draft-final.md`
2. Update `progress/STATUS.md` to mark chapter complete
3. Move final draft to `chapters/[XX]-[name].md`

---

## The Truth Standard

This is a memoir documenting a real journey. The author's credibility depends on accuracy. When in doubt:

- **Verify** before assuming
- **Flag** rather than guess
- **Preserve** the author's authentic voice while ensuring factual accuracy

The goal is not to sanitize or over-qualify — it's to ensure what's written actually happened.
