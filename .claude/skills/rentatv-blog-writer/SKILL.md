---
name: rentatv-blog-writer
description: >
  Writing skill for Rent ATV Santa Teresa blog posts. Use this skill whenever
  writing, drafting, editing, or improving any blog post, article, or travel
  guide for the rentatvsantateresa.com website. Triggers on: "write a post",
  "write a blog", "draft an article", "write about [topic] for the site",
  "new post", "content for the blog". Always apply this skill for any
  long-form content destined for src/content/blog/.
---

# Rent ATV Santa Teresa — Blog Writing Skill

## Voice and perspective

Every post is written in first person. The narrator is a person who lives and operates in Santa Teresa, knows the roads intimately, and is giving honest advice to a visitor. This builds trust, carries a real voice, and keeps people reading because feelings and personal experience are woven into practical information.

Do this:

> "I have ridden that road in the middle of the green season when the water was up to the footboards. It is passable on the Outlander. I would not try it in a regular car."

Not this:

> "The road can become difficult during the rainy season."

The first version is memorable. The second is forgettable.

## Rules — no exceptions

### Em dashes are banned

Never use an em dash or en dash to join clauses. Replace with:

- A comma: "It is passable, though I would take it slowly."
- A new sentence: "It is passable. I would take it slowly."
- A colon: "One thing matters here: ground clearance."
- Parentheses for asides: "The road (especially past Manzanillo) gets rough."

### Heading structure — consistent across every post

```
# Post title (in frontmatter only, never repeated in the body)

Intro paragraph (no heading)

## Section heading (H2, main sections only)

Body paragraphs

### Sub-section heading (H3, only when a section has 3+ distinct sub-topics)
```

- H2 headings are short, direct, sentence-case (not title case)
- H3 headings only when a section genuinely needs subdivision
- Never skip levels
- No bold text used as a fake heading

### Road accuracy

The main road from Santa Teresa to Mal País is paved. Other routes, including inland tracks, hill roads, and the route north toward Manzanillo, are unpaved and can become rough and muddy in the green season. Never describe the entire road network as paved or entirely unpaved.

### Images are required in every post

Every post must have image fields in its frontmatter. If a real photo has not been provided, leave the path as an empty string. The layout renders a branded placeholder automatically. Never skip the image fields.

## Frontmatter template (required for every post)

```yaml
---
title: "Post title — sentence case, specific, keyword included"
description: "One sentence, 150 chars max, includes the target keyword"
pubDate: YYYY-MM-DD
image: "" # Replace with /photos/blog/filename.webp when photo is provided
imageAlt: "Descriptive alt text written as if for a sighted person — what is in the photo"
tags: ["tag1", "tag2", "tag3"]
featured: false
---
```

The `imageAlt` must be written even when the image path is empty. It describes the photo that should go there, which helps when sourcing the right image later.

## Body structure

**Opening paragraph (no heading).** Hook the reader with something specific and personal. A moment, an observation, a concrete detail from being on the ground. Do not start with "Santa Teresa is..." or "If you are planning a trip." Start with something that makes the reader feel they are already there.

**Two to four H2 sections.** Each section answers one question the target reader actually has. Practical, specific, honest. Use personal anecdotes to illustrate points. Do not pad.

**Closing paragraph (no heading, no "conclusion" heading).** End with a forward-looking line that connects naturally to renting a quad. Not a hard sell. The WhatsApp CTA is added automatically by the layout; do not include it in the markdown.

## Tone calibration

- Honest over promotional. If something is difficult, say so.
- Specific over general. "22 km and about 50 minutes" beats "a reasonable distance."
- Short sentences after a complex thought. Let it land.
- Active voice. "I take the coastal road" not "The coastal road is taken."
- No buzzwords: vibrant, stunning, paradise, hidden gem, off the beaten path.

## Target length

- 600 to 900 words for the body (not counting frontmatter)
- Do not pad to hit a word count
- Posts under 500 words are too thin for SEO value

## Keyword integration

- Include the target keyword naturally in: title, first paragraph, one H2 (if it fits naturally), and 2 to 3 times in the body
- Do not force it
- Related terms and location modifiers (Mal País, Playa Hermosa, Montezuma, Costa Rica) should appear naturally

## Facts to keep accurate

- Fleet: Can-Am Outlander 450 4x4, fully automatic, locking rear cargo box, front and rear racks
- Delivery: free to hotels in Santa Teresa, Playa Carmen, Mal País
- Rates: $65/day (under 3 days), $60/day (3-7 days), $55/day (7+ days), $50/day (14+ days)
- Road: partially paved. Santa Teresa to Mal País is paved. Inland and northern routes are unpaved.
- Distances: Playa Carmen 0 km, Santa Teresa 2 km, Playa Hermosa 5 km, Manzanillo 14 km, Montezuma 22 km
- Licence: physical driver's licence required, photo not accepted
- Closed shoes required (no flip-flops)

## File output format

When producing a complete post ready to commit, output it as a single markdown code block. Add the target path as the first comment inside the block:

```markdown
<!-- path: src/content/blog/slug-here.md -->
---
title: ...
---

Body here.
```
