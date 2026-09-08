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

The main road from Santa Teresa to Mal País and from Santa Teresa to Cobano is paved. Other routes, including inland tracks, hill roads, the route north toward Manzanillo, and the stretch toward Montezuma, are unpaved and can become rough and muddy in the green season. Never describe the entire road network as paved or entirely unpaved, and never describe "the main road" itself as dirt or unpaved.

### Images are required in every post

Every post must have image fields in its frontmatter. If a real photo has not been provided, leave the path as an empty string. The layout renders a branded placeholder automatically. Never skip the image fields.

### Hero image must be unique per post

Never reuse a hero image (the frontmatter `image` field) that is already the hero of another published post. Check the other files in `src/content/blog/` before picking one. The real photos available are in `public/photos/` (each as `-800.webp` and `-1200.webp`): `coast-road-beach`, `cove-sunset`, `fleet-canam-side`, `fleet-honda-side`, `fleet-kymco-front`, `jungle-trail`, `jungle-tunnel-road`, `malpais-cove`, `manzanillo-headland`. Pick whichever of these best fits the post's specific topic; use the frontmatter `image` field with the `-1200` path.

### Body images — two to three per post

Every post needs at least two, ideally three, images inside the body itself, not just the hero. Distribute them across sections rather than clustering them near the top, and place each one where it actually illustrates the surrounding paragraph (a road-condition photo in the roads section, a fleet photo in the ATV section, a destination photo in the distances/itinerary section, and so on).

Body images are not Astro components (posts are plain markdown), so add them as raw HTML using the site's existing photo sizes and the `media-frame` utility class, matching the image's real aspect ratio so nothing shifts on load:

```html
<div class="media-frame my-8" style="aspect-ratio: 4/3">
  <img
    src="/photos/jungle-trail-1200.webp"
    srcset="/photos/jungle-trail-800.webp 800w, /photos/jungle-trail-1200.webp 1200w"
    sizes="(min-width: 1024px) 700px, 100vw"
    alt="Descriptive alt text, specific to what is in the photo"
    width="1200"
    height="900"
    loading="lazy"
    decoding="async"
    class="h-full w-full object-cover"
  />
</div>
```

`jungle-trail` and `cove-sunset` are 1200x675 (use `aspect-ratio: 16/9`, `height="675"`); the rest are 1200x900 (`aspect-ratio: 4/3`, `height="900"`). Do not reuse the same photo already used as this post's own hero image, but reusing a photo that is another post's hero (as a body image, not a hero) is fine given the limited library.

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

**Conclusion (H2, required, always the last section before any FAQ).** Every post ends with a `## Conclusion` section: a short summary of the takeaway that connects naturally to renting a quad. Not a hard sell. If the post has a Frequently Asked Questions section, the Conclusion goes immediately before it, as the bridge out of the practical content and into the FAQ. The WhatsApp CTA is added automatically by the layout; do not include it in the markdown.

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
- Road: partially paved. Santa Teresa to Mal País and to Cobano is paved. Inland routes, northern routes toward Manzanillo, and the stretch toward Montezuma are unpaved.
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
