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

The narrator is a local who knows the roads and is giving a visitor honest advice, like a friend who lives here. The narrator is **not** the rental company. This site connects visitors with local vendors (the footer and T&C say so), so posts never need to explain that, and never speak as the business that owns, delivers or hands over the quads.

First person is fine for opinions and recommendations ("I would take the main road", "Playa Hermosa is my pick for a first ride"). Second person and plain instructions carry most of the advice ("Take the main road through Cóbano. Leave early.").

Do this:

> "That road floods in the green season, sometimes up to the footboards. A quad gets through at walking pace. I would not try it in a regular car."

Not this:

> "The road can become difficult during the rainy season."

The first version is specific and memorable. The second is forgettable.

### Never invent stories or claims

Do not make up anecdotes, customers, or first-hand events. That means no "last month someone showed up…", no "the first time I rode…", no "I once watched a couple…", and no "I have had guests argue…". Do not claim personal habits or past visits ("last time I went it cost…", "most evenings I end up…"). If a claim cannot be backed up by `src/data/site.ts`, an official source, or something the owner confirmed, leave it out or phrase it as general advice ("the classic mistake is…").

### Never write as the vendor

Banned phrasings include: "I/we rent", "I/we deliver", "my/our fleet", "our quads", "my renters", "before I hand over the keys", "I will not rent to…", "message me and I'll bring one", "I walk you through the controls", and "I keep the ATVs serviced". Write it neutrally instead: "quads can be delivered to your hotel…", "the rental quads here are Kymco, Honda and Yamaha", "you get a walkthrough of the controls", "ask whether roadside help is included". Rates and delivery can be mentioned as facts, not as personal promises. The WhatsApp CTA comes from the layout, so the body never asks the reader to message anyone.

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

Never reuse a hero image (the frontmatter `image` field) that is already the hero of another published post. Check the other files in `src/content/blog/` before picking one. The real photos available are in `public/photos/` (each as `-800.webp` and `-1200.webp`): `atv-beach-sunset` (quad parked at Mar Azul beach at sunset), `coast-road-beach`, `cove-sunset`, `dirt-side-road` (potholed side road with parked SUVs), `fleet-canam-side`, `fleet-honda-side`, `fleet-kymco-front`, `gravel-road-junction`, `jungle-trail`, `jungle-tunnel-road`, `main-street-paved` (the paved main street through town), `malpais-cove`, `malpais-tidepools-sunset`, `manzanillo-headland`, `no-driving-beach-sign` ("No conducir en la playa / Do not drive on beach"), `side-road-atv-view` (dirt road from the rider's seat). Pick whichever of these best fits the post's specific topic; use the frontmatter `image` field with the `-1200` path.

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

### TL;DR is required in every post

Every post needs a `tldr` list in its frontmatter: 3 to 4 short bullet points (the schema allows 2 to 5) summarizing the practical takeaways. The layout renders it as a "TL;DR" box between the hero image and the body, and the build fails if it is missing. Same voice rules as the body (local advice, never vendor voice, no em dashes, accurate road and rate facts). Each bullet is one or two sentences a skimmer could act on, not a teaser.

### Actionable lists go in a checklist callout

When a list is something the reader will actually use (steps to take before arriving, things to check or ask, what to pack, what to bring to pickup), it is the most valuable part of that section and must pop. Render it as a checklist callout, not a plain markdown bullet list. Aim for one or two per post wherever there is a genuine reason; never force one. Plain markdown bullets stay for descriptive or comparison lists (pros and cons, lists of places, features).

Posts are plain markdown, so write it as raw HTML. The `.checklist` styles live in `src/styles/global.css` (sand background, jungle-green left rule, green check markers):

```html
<aside class="checklist" aria-labelledby="unique-checklist-id">
  <p id="unique-checklist-id" class="checklist-title">Before you arrive: 5 checks</p>
  <ul>
    <li>Open the exact property location in satellite view.</li>
    <li>Ask whether the final access road is paved, gravel, or dirt.</li>
  </ul>
</aside>
```

- The title is short and concrete, ideally with the count ("Before you ride: 4 checks", "Pickup day: what to bring"). Give it an `id` that is unique within the post.
- The callout replaces any lead-in sentence like "Use this checklist before you arrive:". Don't write both.
- Keep it scannable: 3 to 9 items, each one sentence, no em dashes. Items start with a verb, except a self-check list, which can use yes/no questions ("Will I make more than one trip a day?").
- Markdown doesn't render inside the `<aside>`, so links go in as `<a href="/...">` tags.

### Internal linking: every new post gets linked from every older post

When publishing a new post, edit every existing post in `src/content/blog/` with an earlier `pubDate` and add one contextual link to the new post (`/blog/new-slug`). Put the link on an existing phrase in the body where the new post genuinely expands on the point, or lightly rework a sentence so it fits; never add a "related posts" list or a bare "read more" line, and never link from inside the TL;DR, a heading, or the FAQ. Skip an older post only if it already links to the new one. The new post should also link out to at least two relevant older posts. Run `npm run build` afterwards.

### Outbound links: only to back up a claim

An outbound link is a vote of confidence, so it has to verify a claim or strengthen a statement in the sentence it sits on (a road rule, a weather pattern, a park regulation, a travel fact). Link only to tourism boards (e.g. visitcostarica.com), government or official sites (e.g. MOPT, IMN, SINAC, embassies), and reputable travel blogs or guides. **Never link to a competitor**: no other ATV, buggy, scooter, e-bike, car or tour rental business, even with `nofollow`, and even on a generic phrase like "insurance terms". If a source for a claim is a rental company, leave the phrase as plain text. Use normal markdown links on the claim itself, not on sales phrases.

### Pillar post: every new post gets a teaser in the hub

`src/content/blog/getting-around-santa-teresa.md` is the pillar post. Its `## My guides for each decision` section has one H3 per post on the site: a question-style heading, two or three sentences in the local-advice voice teasing the post's main takeaway, and a contextual link to it. When publishing a new post, add its H3 to that section (grouped with related guides, not just appended), and set the pillar's `updatedDate` to the publish date. This is in addition to the older-posts linking rule above.

## Frontmatter template (required for every post)

```yaml
---
title: "Post title — sentence case, specific, keyword included"
description: "One sentence, 150 chars max, includes the target keyword"
tldr:
  - "First practical takeaway, one or two sentences"
  - "Second takeaway"
  - "Third takeaway"
pubDate: YYYY-MM-DD
image: "" # Replace with /photos/blog/filename.webp when photo is provided
imageAlt: "Descriptive alt text written as if for a sighted person — what is in the photo"
tags: ["tag1", "tag2", "tag3"]
featured: false
---
```

The `imageAlt` must be written even when the image path is empty. It describes the photo that should go there, which helps when sourcing the right image later.

## Body structure

**Opening paragraph (no heading).** Hook the reader with something specific: a concrete detail about the place, a common mistake visitors make, or a practical tension. Never an invented story. Do not start with "Santa Teresa is..." or "If you are planning a trip." Start with something that makes the reader feel they are already there.

**Two to four H2 sections.** Each section answers one question the target reader actually has. Practical, specific, honest. Use concrete local detail to illustrate points, never invented anecdotes. Do not pad.

**Conclusion (H2, required, always the last section before any FAQ).** Every post ends with a `## Conclusion` section: a short summary of the takeaway that connects naturally to renting a quad. Not a hard sell. If the post has a Frequently Asked Questions section, the Conclusion goes immediately before it, as the bridge out of the practical content and into the FAQ. The WhatsApp CTA is added automatically by the layout; do not include it in the markdown.

## Tone calibration

- Honest over promotional. If something is difficult, say so.
- Specific over general. "22 km and about 50 minutes" beats "a reasonable distance."
- Short sentences after a complex thought. Let it land.
- Active voice. "Take the coastal road" not "The coastal road should be taken."
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

- `src/data/site.ts` is the source of truth for fleet, rates, discounts, UTVs and tours. Read it before quoting any number. As of Nov 2026, the quads are a Kymco 300cc (fully automatic), a Honda 420cc (semi-automatic, foot shifter) and a Yamaha 450cc (fully automatic). Rates start at $70 per 24 hours, with 10% off rentals over 7 days.
- Delivery: free to hotels in Santa Teresa, Playa Carmen, Mal País
- Road: partially paved. Santa Teresa to Mal País and to Cobano is paved. Inland routes, northern routes toward Manzanillo, and the stretch toward Montezuma are unpaved.
- Distances: Playa Carmen 0 km, Santa Teresa 2 km, Playa Hermosa 5 km, Manzanillo 14 km, Montezuma 22 km
- Licence: physical driver's licence required, photo not accepted
- Closed shoes are recommended, not enforced. Never say anyone gets turned away for sandals.

## Slug (filename) rules

The filename is the URL: `src/content/blog/atv-vs-taxi-santa-teresa.md` publishes at `/blog/atv-vs-taxi-santa-teresa`. Don't add a `slug:` frontmatter field; the filename is the only source of truth. The slug is never just the title run through a slugifier.

- 3 to 5 words, lowercase, hyphen-separated, no dates or numbers that will go stale.
- Lead with the primary keyword, then the place: `atv-vs-rental-car-santa-teresa`, not `atv-vs-rental-car-in-santa-teresa-how-to-choose`.
- Drop filler words: is, a, an, the, in, for, to, of, which, how-to, what, guide, best, better.
- Say "santa-teresa" once at most. Use another place name (`mal-pais`, `playa-hermosa`) only if the post is actually about that place.
- Check that no existing post in `src/content/blog/` already uses the slug or one that's nearly the same.
- A published post's slug never changes silently. Renaming a live post means a 301 in `public/_redirects` and updating every internal link to it, so only do it when asked.

## File output format

When producing a complete post ready to commit, output it as a single markdown code block. Add the target path as the first comment inside the block:

```markdown
<!-- path: src/content/blog/slug-here.md -->
---
title: ...
---

Body here.
```
