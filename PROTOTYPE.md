# Bancroft's School — Wireframe Prototype

A navigable, greyscale wireframe of the new Bancroft's site, built from the confirmed sitemap
(Sitemap v1) using the `wireframe-website-prototype` skill's Lit + Vite + Tailwind kit.

## Run it

```bash
cd bancrofts-wireframe
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` you can preview with
`npm run preview`, or host anywhere that serves static files, if you want a shareable link beyond
this machine.

**If you do put it on a live/public URL**: every page ships `<meta name="robots" content="noindex,
nofollow, noarchive">` (in `scripts/gen-pages.mjs`, the single source for all 56 page shells) plus a
`public/robots.txt` disallowing all crawlers — together these keep it out of search results and stop
crawlers indexing it even if a link to it leaks out. Both need to stay in place; don't remove either
without replacing it, and re-run `node scripts/gen-pages.mjs` (then `npm run build`) if you ever hand-edit
a page shell, so it doesn't drift from the generator.

## Navigation

- **Burger takeover, every breakpoint** (not just mobile) — inspired by uppingham.co.uk. The header
  is deliberately minimal: brand on the left, "Book a Visit" + the menu toggle grouped on the right.
  Both stay fixed in that exact position whether the takeover is open or closed.
- **Responsive takeover layout — two patterns, same underlying data.**
  - **Wide viewports (`lg:` and up):** a two-column layout, inspired by uppingham.co.uk — primary
    sections stay visible in a left column; selecting one swaps the right-hand column's sub-page
    list in place, so the reviewer can move between areas without losing the section list. Nothing
    is pre-selected when the panel opens — the right column stays empty until the user picks a
    section, rather than assuming which one they want. The Contact/Portals row is pinned to the
    actual bottom of the viewport (independent fixed positioning, not part of the scrolling
    content), so it stays in the same place regardless of how long the selected section's list is.
  - **Video promo, pinned top-right, wide viewports only.** A static "Get to know Alex" card (Head
    intro video, CMS-managed) sits directly under the header's "Book a Visit" + menu toggle group,
    regardless of which section is selected or none — one persistent slot rather than a variant per
    section, both for CMS simplicity and so it doesn't flicker as the reviewer clicks between
    sections. Independently fixed-positioned (not a grid column), so its right edge tracks the
    header buttons exactly at every viewport width rather than drifting with the two-column grid's
    own widths. Links through to "Welcome from the Head" (`about-welcome.html`), which now embeds
    the actual video via the existing `wf-media` video pattern, rather than opening a video modal
    inside the nav itself.
  - **Narrow viewports:** drill-down, not expand-in-place. Tapping a section opens a dedicated screen
    for just that section's sub-pages, with a Back row to return to the root list — rather than an
    accordion expanding in place, which pushed every other section down the page and had no cap on
    height for a section with many children (About has 10). There isn't room for a second column of
    labels at this width, so this stays the fallback rather than the two-column view shrinking down.
  - Sub-page rows are single-line (no description text) in both layouts, keeping things scannable
    regardless of how many links a section holds.
- **Pinned "Book a Visit" CTA** in the header at all times, charity-"Donate"-style — never relocates
  into the takeover panel. Contact and the three portals sit as quick links at the foot of the root
  list only.

## Page table

| Template | Route | Type |
|---|---|---|
| Homepage | `index.html` | Homepage |
| Admissions (hub) | `admissions.html` | Content |
| Your 7+ / 11+ / 16+ Journey | `admissions-{7,11,16}plus-journey.html` | Content |
| Book a Visit | `book-a-visit.html` | Form |
| Register | `register.html` | Form |
| Fees | `fees.html` | Content |
| Scholarships & Bursaries | `scholarships-bursaries.html` | Content |
| Frequently Asked Questions | `admissions-faqs.html` | Content |
| 7+ Prep (hub) + Why / Curriculum / Pastoral Care / Staff | `prep*.html` | Content |
| 11+ Senior (hub) + Why / Results / Curriculum / Sport,Arts&Co-Curriculum / Pastoral Care | `senior*.html` | Content |
| Sport (listing, off primary nav) + 9 sport detail pages | `senior-sport.html`, `senior-sport-{football,rugby,hockey,netball,cricket,athletics,swimming,tennis,badminton}.html` | Listing / Detail |
| 16+ Sixth Form (hub) + Life / Subjects / Destinations / Staying On / Results | `sixth-form*.html` | Content |
| School Life (hub) + Community / Calendar / Menu / Bus Service | `school-life*.html`, `calendar.html`, `weekly-menu.html`, `school-bus-service.html` | Content |
| News (listing) + 3 example articles | `news.html`, `news-article-{a,b,c}.html` | Listing / Article |
| About (hub) + Welcome / Values / History / Governance & Leadership | `about.html`, `about-welcome.html`, `about-what-we-stand-for.html`, `about-history-archives.html`, `about-governance-leadership.html` | Content |
| Policies and Procedures, Vacancies (footer-only, not in About's nav) | `about-policies-procedures.html`, `about-vacancies.html` | Content |
| Contact | `contact.html` | Form (inferred — see below) |
| Privacy Policy | `privacy-policy.html` | Content (legal, inferred) |
| Component List | `components.html` | Tooling, not site IA |

59 HTML files total (58 site pages + Component List).

### Sitemap (2026-10-09)

`sitemap.html`, opened from the Prototype panel's "Sitemap" row — a tooling page like the Component
List (`<wf-sitemap-page>`, `src/components/sitemap-page.ts`). It draws the site as a tree in the style
of the original Sitemap v1 (window-style page blocks, one column per section, footer block), in the
wireframe's greyscale rather than the original's coloured tags.

It keeps no page list of its own, so it can't drift from the site:

- **Columns and their order** — `primaryNav`.
- **Where each page sits** — the page's own breadcrumb (its last ancestor crumb is its parent). This
  is what places off-menu pages correctly, e.g. the nine sports under Sport, 11+ Exam & Past Papers
  under Your 11+ Journey.
- **Type tag** — `corePages` (the same six types as the Core pages panel; section overviews stay
  "Content"). A page missing from `corePages` shows as "Untyped".
- **Footer block** — `footerColumns` plus `footerLegalLinks` (the Privacy Policy link, moved out of
  `footer.ts` into config so both read one list). Links with no built page are tagged "External".

Pages outside the burger menu get a dashed outline and a "Not in menu" marker (Book a Visit shows
"Header button"). A page with no breadcrumb parent, menu entry or footer link appears under "Unplaced
pages" rather than silently dropping off. The block for the page you arrived from is ringed.

The tree is wider than most windows, so it opens scaled to fit the available width — the whole
structure at once, as in the original drawing — with a "Fit to screen / 100%" toggle, +/- steps
(20% to 150%) and click-and-drag to slide around when it's larger than the window. Fit applies to
width only; the page still scrolls vertically. In a narrow window the fitted labels are too small to
read, so there it's an overview and you magnify to read.

### SEO audit additions (2026-10-09)

Six additions taken from the Search Audit and Recommendations report (24.09.26), placed by how the
report sizes each opportunity:

- **`admissions-11plus-past-papers.html`** — 11+ Entrance Exam & Past Papers hub. The report's largest
  search opportunity (the existing 2017 paper PDFs rank for around 2,760 searches a month). Off
  primary nav, as a sub-page of Your 11+ Journey: it was briefly in the Admissions nav, but it broke
  the 7+/11+/16+ run and pushed Admissions to nine items, and most visitors arrive from search rather
  than the menu. Reached from Your 11+ Journey, the Admissions "Guides for parents" row, the Grammar
  guide and a "Preparing for the 11+?" block on `senior.html` (placed after the six area blocks and
  above the FAQs, framed as 11+ preparation so it doesn't read as a seventh area of Senior life).
  Ends on Register / Book a Visit.
- **`about-rankings-recognition.html`** — Rankings & Recognition, in the About nav after What We Stand
  For. Whole-school proof (league tables, ISI 2025, awards), so it sits in About rather than under one
  stage. Gives the ISI report a home again after the About restructure folded it into intro copy. The
  homepage awards strip links here (`wf-logos` gained optional `ctaLabel`/`ctaHref`).
- **`admissions-grammar-or-independent.html`** — a guide for parents, off primary nav (same pattern as
  Sport): it is a search/AI landing page, not something browsed to. Reached from a new "Guides for
  parents" row on Admissions, Your 11+ Journey, Why Bancroft's Senior and Fees.
- **`senior-learning-for-life.html`** — off primary nav, reached from Senior Pastoral Care and Senior
  Curriculum. Replaces a PDF as the version found in search. To confirm: Senior-only, or Prep too.
- **Results pages** — kept as two pages, one per stage, but rebuilt to the report's evergreen structure
  (five-year table, subject highlights, pupil quote, cross-links, FAQs) and renamed "GCSE Results" /
  "A Level Results" to match search terms. URLs are unchanged (`senior-academic-results.html`,
  `sixth-form-examination-results.html`); renaming those is a decision for the real build's URL map.
- **FAQs** — a `faqs()` helper in `config.ts` adds a page-specific `wf-accordion` to Admissions, the
  three Journey pages, the three stage overviews, Fees, Scholarships & Bursaries and both results
  pages. Journey pages carry process questions and stage overviews carry "life at this stage"
  questions, so the two candidate hubs per entry point stay distinct. Every set ends on a link to
  the central `admissions-faqs.html`.
- **Fees** — adds "Fees and VAT" and a "What your fees include" table for the value-after-VAT question.

Anything not already in the wireframe or the report is marked in the page itself as "Wireframe
note", "Placeholder", "To confirm" or "To be supplied" — league table positions, prior-year results,
what fees cover, the grammar comparison points and the Learning for Life themes all need real content.

New pages must be added in three places: `scripts/gen-pages.mjs` (the shell), `src/config.ts` (the
content) and `vite.config.ts`'s `rollupOptions.input` (or the page is missing from the deployed build).

### Co-Curriculum section (2026-08-30)

Per client feedback, from a conversation with a target-audience parent: clubs/co-curriculum was
missing as its own section, and the volume of activity Bancroft's actually runs deserved more than a
line or two buried in another page. Researched the real site first: bancrofts.org/senior/co-curriculum/
and /prep/co-curriculum/ exist (Senior states "250+ clubs and societies"), but there's no equivalent
Sixth Form page, and neither page lists individual clubs — Prep only links out to a termly PDF
timetable, Senior has nothing beyond the stat.

Added one new page per entry point — `prep-cocurriculum.html`, `senior-cocurriculum.html`,
`sixth-form-cocurriculum.html` — off primary nav (same pattern as Sport), reached only via a CTA on an
existing page for that stage: Prep's `prep-curriculum.html` ("Beyond the classroom"), Senior's
`senior-sport-arts-cocurriculum.html` ("Co-Curriculum & Outdoor Activities"), and a new block added to
Sixth Form's `sixth-form-life.html`. Each new page groups activities into 4 categories as `wf-cards`
(not an attempt to list 250+ individual clubs, which nothing in the source material supports anyway),
with content tailored per stage: Prep includes Sport as one category since Prep doesn't have its own
separate Sport section; Senior deliberately excludes Sport and cross-links to `senior-sport.html`
instead, since Sport already has its own deep 9-page section — duplicating it here would be redundant;
Sixth Form's categories lean into leadership (running clubs, mentoring), matching what
`sixth-form-life.html` already said about Sixth Formers before this addition. Senior's page also
surfaces the real "250+" stat via `wf-statistics`, since it's an actual sourced number, not invented.

On the included-in-fees-vs-extra question the client raised: the real site doesn't say either way, but
its own wording (Senior: "lunch is almost an hour and a half so that eating, chatting, playing and
attending a club can all happen") implies clubs run within the normal school day. Each new page's intro
text reflects that framing lightly ("most clubs run during the school day... rather than a separate
after-school programme") without overclaiming, since this genuinely needs confirming with the client
before it's real copy.

**Follow-up, same day — Curriculum/Clubs split promoted into secondary nav**: per client direction,
Clubs needed to be a clear, separately nav-visible item everywhere, not just cross-linked off another
page — and Prep specifically had "Curriculum & Co-Curriculum" bundled into one page/nav entry, needing
an actual split, not just a link. Renamed the three Clubs pages from `*-cocurriculum.html` to
`*-clubs.html` (`prep-clubs.html`, `senior-clubs.html`, `sixth-form-clubs.html`), heading simplified to
just "Clubs" throughout (nav label, hero heading, breadcrumb). Split `prep-curriculum.html`: removed
its "Beyond the classroom" co-curricular block entirely (that's now Clubs' job), trimmed the heading
from "Curriculum & Co-Curriculum" to "Curriculum", classroom content only. Added "Clubs" as its own
`primaryNav` child for all three stages, alongside the existing/now-standalone "Curriculum" entry.
Senior's `senior-sport-arts-cocurriculum.html` hub (Sport + Arts + Co-Curriculum overview) is left in
place and still in nav — not asked to change — but its "Co-Curriculum & Outdoor Activities" block's CTA
now points to the renamed `senior-clubs.html`. Also added a small "Also in [stage]" `wf-cards` block to
each stage's overview page (`prep.html`, `senior.html`, `sixth-form.html`) linking to Clubs directly,
matching the pattern Senior already used for Pastoral Care, so Clubs is one click from the stage
overview too, not just the nav dropdown.

**Follow-up, same day — nav order + Sport & Arts renamed**: reordered `primaryNav`'s children per
client spec — Prep: overview, Why, Curriculum, Clubs, Meet the Staff, Pastoral Care; Senior: overview,
Why, Academic Results, Curriculum, Sport & Arts, Clubs, Pastoral Care. Senior's Sport/Arts hub renamed
throughout — URL `senior-sport-arts-cocurriculum.html` → `senior-sport-arts.html`, title/heading/nav
label "Sport, Arts & Co-Curriculum" → "Sport & Arts" — since Co-Curriculum is no longer this page's
concern now that Clubs has its own section. Its "Co-Curriculum & Outdoor Activities" content block
(CCF, DofE, Sea Scouts) was replaced with a short "Looking for Clubs?" cross-link to `senior-clubs.html`
instead of keeping that content here twice — Clubs' own "Outdoor & Adventure" category already covers
the same ground. Every breadcrumb through Sport's 9 detail pages updated to match (10 occurrences).

### Hero CTA moved to end of page (2026-08-31)

Client feedback: the "Start your Nplus journey" hero CTA on Prep, Senior and Sixth Form asked for
commitment before the reader had learned anything about the stage — disjointed, and arguably redundant
with the always-present header "Book a Visit" CTA. UX principle: match CTA weight to where the reader
actually is in their own journey; a stage-overview page is a research moment, not a decision moment, so
the ask belongs at the end, once context is earned, not at the top before any is given.

Removed `ctaLabel`/`ctaHref`/`ctaId` from all three stage heroes (`prep.html`, `senior.html`,
`sixth-form.html`) — hero is now intro-only, matching how most other content pages already work. Added
a `wf-text-media` block at the end of each page instead: primary "Start your Nplus journey" + secondary
"Book a Visit", after the reader has actually read about the stage. Sixth Form's old closing
`wf-promo` ("Ready to join our Sixth Form? / Register") was replaced by this — "Register" wasn't
referenced by anything, safe to retire; the "Already at Bancroft's? / Staying On" block above it (a
different audience — current Year 11 moving up, not new applicants) is untouched.

Kept the exact same CTA element ids (`cta-prep-hero-journey`, `cta-senior-hero-journey`,
`cta-sixthform-hero-journey`) on the relocated buttons, purely so the three walkthrough flows that
click through them (`11+ parent enquiry`, `7+ Prep parent enquiry`, `Sixth Form recruitment and
retention`) keep working without touching `flows` at all — the flow only cares that the id exists on
the page, not where. Verified `7+ Prep parent enquiry` end to end: the walkthrough ring correctly finds
the relocated button and clicking it still advances to `admissions-7plus-journey.html`.

**Follow-up, same day — same fix extended to the Admissions pages**: client spotted the identical
pattern on `admissions-7plus-journey.html`'s hero (a "Book a Visit" button above any content). Same
root cause, so same audit: checked every `wf-standard-hero` with a `ctaLabel` across the site. Two more
of the four premature-conversion CTAs found belonged to `admissions.html` and
`admissions-11plus-journey.html`/`admissions-16plus-journey.html` — all four removed. (The other two
hits from that audit, `sixth-form-staying-on.html`'s "See Sixth Form Curriculum & Subjects" and
`school-life.html`'s "See the Calendar", are informational cross-links to more reading, not a
conversion ask — left alone, since they don't have the "asking to commit before context" problem this
fix addresses.)

Unlike the stage-page fix above, these four weren't relocated to the end — each of the four pages
already closes on an appropriate promo (Book a Visit for `admissions`/7+/11+, Register for 16+), so
removing the premature hero button loses no path; it was simply redundant with what the page already
ends on, plus the always-present header CTA. None of the four hero CTA ids (`cta-admissions-hero`,
`cta-7plus-journey-hero`, `cta-11plus-journey-hero`, `cta-16plus-journey-hero`) were referenced by any
walkthrough flow, so nothing else needed updating.

### Sport section (2026-08-28)

The real Sport section (bancrofts.org/senior/sport/) is far deeper than our "Sport, Arts &
Co-Curriculum" page could show on its own: a hub page plus 9 individual sport pages, each with a
named lead of sport, sport-specific facilities and real achievements. Reflecting that depth without
adding to primary nav:

- **`senior-sport.html`** — a Sport listing page (facilities overview + cards to all 9 sports),
  matching the News Listing → Detail pattern. **Not in `primaryNav`** — reached only via links, per
  your steer to keep it out of the burger menu.
- **9 detail pages**, one per sport (Football, Rugby, Hockey, Netball, Cricket, Athletics, Swimming,
  Tennis, Badminton) — each with a "Head of [Sport]" role card, sport-specific facilities, and a
  "More sports" cross-link row.
- **Three entry points**, since this content is meant to be a differentiator (per the insight
  research: "Sport is stronger than market perception"), not something one link can hide:
  1. "Sport, Arts & Co-Curriculum" (still the nav-visible page) now links out via its Sport section's CTA.
  2. A new homepage promo block ("A sporting programme stronger than you'd expect").
  3. The Rugby news article's Related Articles now link to the real Rugby page and the Sport listing,
     instead of back to the generic Sport, Arts & Co-Curriculum page.
- Individual sport facts (coach roles, facilities, achievements) are plausible wireframe content in
  the same voice as the rest of the site, not scraped verbatim from bancrofts.org — real staff names
  and contact details from the live site were deliberately not reused.

### About restructure (2026-08-28)

About was trimmed from 10 sub-pages to 5, on request:
- **Governors + Our Leadership Team → Governance & Leadership.** One page, two clearly labelled
  sections (Board of Governors, then Senior Leadership Team) rather than a blended list.
- **Vacancies** moved out of About's nav entirely; stays a real page, reachable only via the footer's
  "Get in Touch" column — same treatment as Portals.
- **Policies and Procedures** moved the same way: footer-only, since it's reference material people
  arrive at directly rather than browse to.
- **Frequently Asked Questions** relocated into Admissions (`admissions-faqs.html`), since its content
  is admissions-stage questions, and surfaced on the Admissions overview page's practical-information
  links. No longer in the footer.
- **ISI Inspection 2025** removed as a standalone page; folded into About overview's intro copy as a
  stated credential ("rated excellent across every area of our 2025 ISI Inspection").

## User flows (walkthroughs, via the Prototype panel)

1. **11+ parent enquiry** — Homepage → 11+ Senior → Your 11+ Journey → Book a Visit
2. **7+ Prep parent enquiry** — Homepage → 7+ Prep → Your 7+ Journey → Book a Visit
3. **Sixth Form recruitment and retention** — Homepage → 16+ Sixth Form → Your 16+ Journey → Register
4. **Current family quick task** — Homepage → School Life → Calendar
5. **Reputation to conversion via News** — Homepage → News article → Book a Visit

## Inferred additions (flag for review)

- **Contact page** (`contact.html`) — not a distinct box in the confirmed sitemap (footer-only line
  item), but built as a real page since the onboarding brief lists "Contact Us and Getting Here" as
  needing sign-off, and the footer's Contact link needs a real destination.
- **Privacy Policy** (`privacy-policy.html`) — the shipped footer component hardcodes a link to it;
  built as a minimal legal placeholder page since no real content was supplied.
- **Family of Schools, Old Bancroftians, Foundation, and the three Portals** — footer links only
  (`href="#"`), per your confirmation that these are separate organisations/systems with their own
  sites, not pages to build in this pass.
- **School Bus Service route enquiry form** — the sitemap named the page but not a specific
  interaction; added a short postcode enquiry form so the page has a real next step.

## Open items carried over from Step 3 (confirm)

- **"Sport, Arts & Co-Curriculum"** is built as one content page walking through Sport, then Arts,
  then Co-Curriculum as sequential sections, per your steer to avoid nav bloat rather than exploding
  this back into per-sport pages. Flag if you'd rather see it structured differently once you've
  clicked through it.
- Nav order is now Admissions, 7+ Prep, 11+ Senior, 16+ Sixth Form, School Life, About, News —
  age/entry-point order rather than the earlier business-priority ordering, per your steer.
- **News categories/scale** — the real site runs 9 categories (Alumni, Assembly Insights, Blog,
  Podcast, Prep School, Senior School, Sport, Staff Spotlights, Whole School) plus a separate Year
  filter (2010–2026) and real pagination across ~59 pages (~700 posts). Per your onboarding brief,
  the plan is a curated 30–40 stories on the new site, not a full migration, so this build keeps the
  filter set small (All/Academic/Community/Sport) and demonstrates pagination structurally (`wf-cards`
  now supports an opt-in `perPage`) rather than reproducing the full taxonomy. Recommendation for the
  real content-strategy pass: (1) the 9 real categories actually mix three different kinds of
  classification — format (Blog, Podcast), audience/phase (Prep School, Senior School, Whole School)
  and topic (Sport, Alumni, Staff Spotlights, Assembly Insights) — worth rationalising into one clean
  taxonomy rather than porting as-is; (2) once past ~5–6 categories, a pill-tab row like the current
  one stops scaling visually (it'll wrap) — the real site's own answer is a dropdown select, which is
  the right pattern to adopt if the curated category count grows past that; (3) a genuine Year filter
  only matters once there's more than one year of content on the new site, so it can be deferred
  until the archive actually spans multiple years.

## New component added to the kit

- **`wf-table`** (`src/components/table.ts`) — a genuine gap in the fixed 18-component palette:
  nothing could express a real data table (a row label plus one or more data columns), which the
  Fees page needs to show net fee vs. fee payable per school stage, matching bancrofts.org's own
  table. Config shape: `{ heading?, rowHeader, columns: string[], rows: { label, cells: string[] }[] }`.
  Registered in `main.ts`, wired into `page-body.ts`'s dispatcher, greyscale-styled to match the rest
  of the kit (dark header row, bordered surface, horizontal scroll on narrow viewports). Flag this
  back to the skill's shared kit and its Component List page/`components.md` catalogue, since this
  project only added it locally.
- **`wf-calendar`** (`src/components/calendar.ts`) — the Calendar page needed to bring term dates,
  INSET days, Open Mornings, fixtures and other one-off events together in one filterable place,
  rather than a flat "Coming up" card list with no dates. This is a genuinely new, bespoke build (not
  a shared-kit gap like `wf-table`): a real month grid computed from a `{ date, label, category }[]`
  event list, with a category filter row (same filter-tab pattern as News), Prev/Today/Next month
  navigation, and — because a 7-column grid stops being usable much below tablet width — an agenda-list
  fallback below `lg:` showing the same filtered events grouped by date instead of gridded. Deliberately
  kept in the kit's neutral greyscale palette throughout; categories are distinguished by the filter,
  not by colour-coded pills, to stay consistent with the rest of the structural-only build (see Design
  scope note below). Config shape: `{ filters: string[], initialMonth: 'YYYY-MM', events: { date, label,
  category, endDate? }[] }`. This is flagged explicitly as an area needing dev-team input before real
  build: the data source (manually entered vs. synced from the school's MIS/iSAMS via an ICS feed)
  isn't something a wireframe can decide, and Umbraco has no native events/calendar module out of the
  box.
  School holidays are a distinct case from a one-off event: an optional `endDate` beyond `date` marks a
  multi-day span, which renders as a shaded band across every day cell it covers (label printed once,
  on its start date or the first cell of any grid row it continues into), instead of the pill treatment
  single-day events get — so a holiday reads as "this whole stretch is off" rather than two disconnected
  point-events at its boundaries. The mobile agenda list collapses a range to one row too (e.g. "17 – 25
  October"), rather than listing every day inside it individually.

## Component removed from the kit

- **`wf-links`** — removed at the client's request: a plain bordered-box link list duplicated what
  `wf-cards` already does for a link with a description, and added a second, slightly different link
  affordance sitewide for no real benefit. Every former `wf-links` usage was converted to one of two
  things, judged per instance:
  - **A link with a description** (e.g. Admissions' "Practical information", Fees-adjacent "Related
    pages", School Bus Service's "Popular routes") → **`wf-cards`**, same `heading`/`href`/`cols`,
    `label` renamed to `heading` to match `CardItem`'s shape. No `imageLabel` set, so these render as
    plain text cards — `wf-cards` already supports that (see `cards.ts`). Policies' "Key policies"
    started here too, but moved on again to an accordion — see below.
  - **A short row of same-weight links with no description** (only the nine "More sports" rows on the
    sport detail pages) → a plain row of primary-style buttons, reusing the exact button class already
    used for the header CTA and other primary actions sitewide, for visual consistency. This is
    rendered inline in `page-body.ts`'s `'wf-button-row'` case rather than as a new `wf-*` component
    file — it's simpler than `wf-links` was, so adding a same-weight replacement component would have
    defeated the point of removing one. Config shape: `{ heading?, items: { href, label }[] }`.
  - `links.ts` and its `LinkItem` type (`utils.ts`) are deleted; the Component List page is renumbered
    1–19 with no gap.

## wf-accordion: optional CTA per item

`AccordionItem` gained two optional fields, `ctaLabel`/`ctaHref` — a link shown under an item's body
once it's expanded (same link-affordance style as Cards' "View", arrow included), for a policy-style
list where each entry should point through to its own document rather than just showing a one-line
summary. Used on Policies and Procedures: "Key policies" was a `wf-cards` grid (converted from
`wf-links`, see above) that only had room for a one-line description each; per client feedback it
reads better as an accordion — expanding a policy's title shows a fuller summary plus a "Read the full
policy (PDF)" link, rather than a card whose one line of text and single "View" link couldn't say much.
Nothing new was added to the kit for this — `wf-accordion` already existed, just gained the optional
CTA fields.

## wf-text-media: reference-link row, and a real mobile-stacking bug

Two changes to `text-media.ts`, both from the same School Bus Service "Find out more" request:

- **New `links` prop** — `{ label, href }[]`, rendered as plain text + arrow (Cards' "View"
  affordance), not buttons. For a row of same-weight REFERENCE links (School Bus Service's Zeelo
  routes/pricing, Terms and Conditions, Information Booklet) rather than one primary action — the
  existing `ctaLabel`/`secondaryLabel` button pair stays for every other page's actual "next step"
  CTAs, `links` takes over from them when set. (A third button prop, `tertiaryLabel`, was added and
  then removed in the same session once `links` covered the real need better — see the changelog.)
- **Real bug, not just this page**: the component picked its DOM order from `side` directly
  (`side === 'right'` emitted text before media, else media before text), so a stacked mobile/tablet
  layout followed whatever `side` said rather than always being image-first. Fixed by always emitting
  media first in the DOM, and only reordering the two columns visually at `lg:` and above (via
  `lg:order-last` on the media column when `side="right"`) — so stacking below `lg:` is now always
  image-then-text, on every page that uses `wf-text-media` with `side="right"`, not just the one this
  was noticed on. Flag this back to the skill's shared kit.
- The Component List page's Text & Media specimen also had its own headings backwards ("Text left,
  media right" labelling `side="left"`, when `side="left"` actually means media is on the left) —
  fixed while touching this component.
- **`wf-promo` had the identical mobile-stacking bug** — same root cause (DOM order tied to `side`),
  same fix (media always first in the DOM, `sm:order-last` on the media column when `side="right"`,
  since `wf-promo`'s two-column breakpoint is `sm:` not `lg:`). Found via the homepage's "A welcome
  from our Head" promo, which is `side="right"` and was showing text before image on mobile. Every
  `wf-promo` with `side="right"` sitewide is affected by the same fix, not just that one instance.
  (Superseded later the same day — see "wf-promo redesigned" below, which replaced the two-column
  layout this bug lived in with a single full-width one that has no `side` prop, and so no mobile
  stacking-order question left to have a bug in.)

## wf-promo redesigned: full-width image with text on top

Per client feedback, `wf-promo` no longer looks like a smaller `wf-text-media` (image one side, text
card the other) — it's now a full-width image placeholder with heading/body/CTA centred on top of it,
the same visual family as `wf-homepage-hero` (grey placeholder + dark legibility overlay + white
centred text) just contained within the page column rather than breaking out to the true viewport
edges. This makes Promo and Text & Media read as genuinely different components again, which the
two-column layout had eroded.

The `side` prop is gone — there's only one column now, so it had nothing left to mean. Stripped from
`promo.ts`, `page-body.ts`'s dispatcher, and every one of the 13 `wf-promo` call sites in `config.ts`
(including the shared `bookVisitPromo` helper), rather than leaving it in the data as a dead, ignored
prop. `wf-text-media` is untouched — it keeps its own `side` and two-column layout; only Promo changed.

**Follow-up fix, same day**: two of those 13 call sites — the homepage's "A welcome from our Head" and
"An academic education that opens doors" — weren't actually closing CTAs. They're mid-page feature
blocks (content about the Head and academic results, not a page-ending "now do this" prompt), only
using `wf-promo` because its old two-column look happened to suit them. Once the redesign changed
what `wf-promo` *means* visually (a full-width closing-CTA banner, not a generic side-by-side content
block), those two inherited that meaning along with the look — the homepage ended up with three
near-identical full-width grey boxes stacked down the page (these two, plus the genuine closing CTA,
"Already part of Bancroft's?"), which read as broken rather than intentional.

Fixed by converting both to `wf-text-media`, which is what they actually are content-wise — restoring
their original two-column look and giving the homepage visual variety again. `wf-text-media` didn't
have a `ctaId` prop (nothing had needed one before), so it gained one to carry over these two blocks'
existing CTA ids without losing them. Every *other* direct `wf-promo` usage in `config.ts` (5 besides
`bookVisitPromo`: Your 16+ Journey's "Ready to apply?", Fees' "Financial support available", Sixth
Form's "Ready to join our Sixth Form?", Staying On's "Confirm your Sixth Form place", Vacancies' "Don't
see the right role?", plus the homepage's own "Already part of Bancroft's?") was checked and confirmed
to be the literal last block on its page — genuine closing CTAs, correctly keeping the new style.

## Site-wide typography pass: em dashes → hyphens

Replaced `—` (em dash) with `-` (plain hyphen) across all real page content — hero eyebrows, body
copy, card/promo descriptions, calendar agenda separators — per house style. Scoped to actual
rendered page content only: source-code comments (`/** */`, `//`) never reach the browser so were
left as-is, and the Prototype panel's own changelog entries were also left alone since they're a
build log for internal/client review, not page content a site visitor sees. Flag if that scoping
should extend to the changelog text too.

## Defects found in the shipped component kit (fixed locally, flag for the skill's shared kit)

- `header-nav.ts` shipped with a hardcoded "Shop"/"Donate" CTA pair pointing at a previous project's
  own domain, instead of reading the header CTA from config. Fixed here by adding `headerCta` /
  `headerUtilityLinks` to `config.ts` and making the component read from them.
- `prototype-nav.ts` had a leftover example reference to "every horse's Detail page" in its static
  help copy; generalised to "every news article."
- `prototype-nav.ts`'s walkthrough had a real crash bug: `onDocClick` incremented `stepIndex` on
  every matching click with no bounds check, including the flow's LAST step. That pushed `stepIndex`
  past the end of the `steps` array, and `render()` unconditionally called `renderWalkBar(flow)`
  whenever a flow was active, which read `flow.steps[stepIndex].href` — `undefined.href` — crashing
  the whole component's render. Since the walkthrough bar and the floating "Prototype" button both
  come from that one `render()`, completing ANY flow (not just one) made both vanish on whatever
  page/state followed, with a console error the only trace. Found via "Current family quick task"
  specifically (a 2-step flow, so the bug shows up fast), confirmed it affects every flow the same
  way, including form-submit endings (e.g. "11+ parent enquiry"'s Book a Visit submission). Fixed by
  exiting the flow on that last click instead of overflowing the index, plus a `this.stepIndex <
  flow.steps.length` bounds-check in `render()` as a backstop against the same class of bug.
- `prototype-nav.ts`'s "Component List" row in the root panel still said "All 18 components" — stale
  since `wf-table` and `wf-calendar` were added and `wf-links` was removed this session, netting 19.
- The Component List page's generated shell (`gen-pages.mjs`) omitted `minimal` on `<wf-header-nav>`,
  which `components.md` requires for that page (brand + "Return to homepage" only, no full nav). Fixed
  in this project's `scripts/gen-pages.mjs`.
- `palette-page.ts`'s `wf-homepage-hero` specimen wrapped its heading, description paragraph and the
  hero together in one `pt-8 sm:pt-8` div, intending to cancel the hero's own `-mt-12 sm:-mt-16`
  negative top margin (see `lit.md`'s full-bleed-hero gotcha). Two separate problems: the padding
  value didn't match the margin value it was meant to cancel (`pt-8` against `-mt-12`/`-mt-16`), and
  more fundamentally a negative margin cancels against padding on the *same* containing box
  immediately above it in flow — padding shared with a heading and paragraph above the hero doesn't
  reach the hero at all, so the hero's negative margin pulled up against the paragraph regardless,
  hiding the paragraph entirely under the hero's dark background and cutting into the heading below
  it. Fixed by giving the hero its own inner wrapper (nothing else inside it above the hero) with
  `pt-12 sm:pt-16`, matching the negative margin unit for unit, with the heading and paragraph kept
  outside that inner wrapper.
- `accordion.ts` shipped with its first item open by default (`openIndexes = new Set([0])`), on every
  page that uses `wf-accordion` regardless of content. Fixed by defaulting to fully closed — accordions
  should start collapsed unless a page deliberately opts an item in.

## Timeline + Brochure Cards: two new components, from the client's own pitch design

Client had already explored a step-by-step/journey treatment and a compact admissions-entry card style
in their own pitch design (a separate, branded mockup, not this wireframe). Reviewed it directly to
ground these two additions in something already validated, rather than inventing a new pattern:

- **`wf-timeline`** — numbered nodes connected by a single vertical line, for a genuine ordered
  sequence. Replaces the "Key steps" `wf-cards` grid on the admissions journey pages — first on
  `admissions-7plus-journey.html` (Visit → Register → Assess and offer) and
  `admissions-11plus-journey.html` (Visit → Register → Assess → Offer), both a clean linear sequence.
  A plain card grid doesn't read as a process; three or four boxes in a row look like unrelated
  content, not steps.

  Initially left off `admissions-16plus-journey.html`, since that page's content genuinely branches
  (internal Staying On vs. external application) rather than being one linear sequence — a timeline
  covering both would have misrepresented the process. Client asked for it anyway, for consistency
  across all three stages (2026-09-01). Resolved by timelining only the part that actually is linear:
  the external-applicant path (Visit → Register → Interview and assessment → Offer). "Already at
  Bancroft's?" (the Staying On path, a different audience) was split into its own block above the
  timeline instead of forced into it — the old three-item "Related pages" card row, which used to
  include Staying On alongside the timeline content, was trimmed to the two genuinely-related pages
  left (Curriculum & Subjects, Leavers' Destinations) now that Staying On has its own dedicated spot.

`wf-timeline` is kept in the kit's neutral greyscale — the pitch itself uses a gold-rule/serif editorial
treatment that's explicitly out of scope for this structural-only wireframe (see Design scope note
below); a real build would carry that branding onto this same structure.

**`wf-brochure-cards` — added, then retired the same day.** Built as a compact, centred variant of
`wf-cards` (centred text above a smaller image, matching the pitch's admissions-entry tiles) for the
three stage overview pages' main grid. On review, the client felt the real problem wasn't the card
style — it was that the grid plus a separate "Also in ___" leftover section, underneath, with a visible
gap between them, read as two disconnected areas rather than one coherent "explore this stage" list.
Swapping the card style alone wouldn't have fixed that. Rebuilt properly instead: `prep.html`,
`senior.html` and `sixth-form.html` now use one continuous sequence of `wf-text-media` blocks, one per
area (Why/Curriculum/Clubs/Pastoral Care/Staff for Prep; six for Senior; five for Sixth Form), sides
alternating, each with its own image, a line of context and a CTA to that area's own page — no grid,
no second tier, nothing left over. Since `wf-brochure-cards` had no other usage once these three pages
changed, it was deleted rather than left in the kit unused (`brochure-cards.ts`, its `main.ts` import,
`page-body.ts` dispatcher case and Component List specimen all removed) — the kit is genuinely 20 now,
not 21.

## Design scope note

This build is structural only: greyscale, no Bancroft's brand colours, type or illustration — the
component kit started at a fixed 18 but has grown with genuine, client-directed additions since (now
20; each one flagged in this file when it happened, including one added and retired the same day once
it turned out not to be the actual fix). Brand direction ("Becoming / Being / Beyond Bancroft's",
palette expansion, illustration) is a separate design-phase conversation.

## Changelog

See the in-prototype Change log (Prototype panel → Change log) for the authoritative, dated list —
kept in sync with `src/config.ts`'s `changelog` export.
