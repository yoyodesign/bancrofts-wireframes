// Config-driven site data for the Bancroft's School wireframe prototype. Every page is
// `{ hero?, blocks }` — an ordered list of `{ component, props, anchorId? }` entries rendered by
// <wf-page-body> (see src/components/page-body.ts). Adding/editing a section is a data change
// here, not new markup. See PROTOTYPE.md at the project root for the full page table, user journeys,
// inferred additions and open questions carried over from the confirm step.

export const siteName = "Bancroft's School"
export const footerTagline = "An independent, co-educational day school for ages 7 to 18 on the edge of Epping Forest, part of the Bancroft's Family of Schools."
export const footerLegal = "Bancroft's School. Registered charity."

export interface Block {
  component: string
  props?: Record<string, any>
  anchorId?: string
}

export interface Page {
  hero?: Block
  blocks: Block[]
}

export interface NavChild {
  label: string
  href: string
  description?: string
  children?: { label: string; href: string }[]
}

export interface NavItem {
  slug: string
  label: string
  href: string
  children?: NavChild[]
  /** Sitemap-tree-only override for this section's branch order (sitemap-page.ts) - the real
   *  nav always follows `children` above. Needed when a page's sitemap parent (its own
   *  breadcrumb) isn't the same section that lists it in the real nav: the tree's default sort
   *  otherwise falls back to that OTHER section's nav position, which can't be interleaved with
   *  this section's own children via a plain two-key sort. Lists every href this branch should
   *  show, in order; anything not listed falls back to the default sort. */
  sitemapChildren?: string[]
}

// ---------------------------------------------------------------------------
// Header CTA — the single pinned, persistent primary action, always visible in the header
// (charity-"Donate"-style prominence, per the confirmed brief). Deliberately just one CTA,
// matching wf-homepage-hero's "one unambiguous next step" logic applied to the header itself.
// ---------------------------------------------------------------------------

export const headerCta = { label: 'Visit us', href: 'book-a-visit.html' }

// Small utility row shown at the foot of the burger takeover panel — quick access to Contact and
// the three audience pages, kept out of the main section list so it doesn't compete with the
// primary IA. Parent/Pupil/Staff Portal used to be external login shortcuts with their own
// expandable sub-system lists; the client replaced those with three real internal pages (Parents,
// Pupils, Staff), each just a page of clear quick links to the underlying systems (see
// parents/pupils/staff in pages below) — so these are flat links again, no children, matching
// the footer's former "Portals" column which these pages now also absorb.
export const headerUtilityLinks: { label: string; href: string }[] = [
  { label: 'Contact', href: 'contact.html' },
  { label: 'Parents', href: 'parents.html' },
  { label: 'Pupils', href: 'pupils.html' },
  { label: 'Staff', href: 'staff.html' },
]

// ---------------------------------------------------------------------------
// Navigation — ordered by business/audience priority (11+ is the school's stated top recruitment
// priority, ahead of 7+ and 16+; see PROTOTYPE.md), not sitemap order. Each section with children
// lists its own hub page as the FIRST child inside the dropdown/takeover group, rather than as a
// separate top-level link (see components.md → header-nav row).
// ---------------------------------------------------------------------------

export const primaryNav: NavItem[] = [
  {
    slug: 'admissions', label: 'Admissions', href: 'admissions.html',
    children: [
      { label: 'Admissions overview', href: 'admissions.html', description: 'Entry points, how to apply and what happens next.' },
      { label: 'Joining at 7+', href: 'admissions-7plus-journey.html', description: 'The application process and key dates for entry at 7+.' },
      { label: 'Joining at 11+', href: 'admissions-11plus-journey.html', description: 'The application process and key dates for entry at 11+.' },
      { label: 'Joining at 16+', href: 'admissions-16plus-journey.html', description: 'The application process and key dates for Sixth Form entry.' },
      { label: 'Visit Us', href: 'book-a-visit.html', description: 'Open Mornings and personal tours, and how to book one.' },
      // Deliberately below the joining pages and Visit Us, not straight after them, so it reads
      // as the secondary action it is - Book a Visit stays the dominant CTA (see headerCta and
      // every stage/joining page's primary vs secondary CTA pairing).
      { label: 'Register Online', href: 'register.html', description: 'Start a formal application for a place at Bancroft’s.' },
      { label: 'Fees', href: 'fees.html', description: 'Termly fees for Prep and Senior School, inclusive of VAT.' },
      { label: 'Scholarships & Awards', href: 'scholarships-awards.html', description: 'Academic and music awards for exceptional candidates.' },
      { label: 'Bursaries', href: 'bursaries.html', description: 'Means-tested financial support towards the fees.' },
      { label: 'Frequently Asked Questions', href: 'admissions-faqs.html', description: 'Quick answers to the questions we hear most.' },
    ],
  },
  {
    slug: 'prep', label: '7+ Prep', href: 'prep.html',
    children: [
      { label: '7+ Prep overview', href: 'prep.html', description: 'The first steps into Bancroft’s, for ages 7 to 11.' },
      { label: 'Why Bancroft’s Prep', href: 'prep-why.html', description: 'What makes the Prep years distinctive.' },
      { label: 'Prep School Life', href: 'prep-life.html', description: 'What a day at the Prep looks and feels like.' },
      { label: 'Academic Life', href: 'prep-academic-life.html', description: 'What Prep pupils learn in the classroom, from Year 3 onwards.' },
      { label: 'Beyond the Classroom', href: 'prep-beyond-the-classroom.html', description: 'Sport, music, drama and clubs outside lessons.' },
      { label: 'Pastoral Care', href: 'prep-pastoral-care.html', description: 'The House system and how every pupil is known and supported.' },
      { label: 'Learning Support', href: 'learning-support.html', description: 'How pupils with additional needs are identified and supported.' },
      { label: 'Meet the Staff', href: 'prep-staff.html', description: 'The teachers and support staff who lead the Prep years.' },
    ],
  },
  {
    slug: 'senior', label: '11+ Senior', href: 'senior.html',
    children: [
      { label: '11+ Senior overview', href: 'senior.html', description: 'Academic life, pastoral care and results for ages 11 to 16.' },
      { label: 'Why Bancroft’s', href: 'senior-why.html', description: 'What makes the Senior School distinctive.' },
      { label: 'Senior School Life', href: 'senior-life.html', description: 'What a day in the Senior School looks and feels like.' },
      { label: 'Academic Life', href: 'senior-academic-life.html', description: 'Subjects studied from Year 7 through to GCSE.' },
      { label: 'Beyond the Classroom', href: 'senior-beyond-the-classroom.html', description: 'Sport, music, drama and 250+ clubs and societies.' },
      { label: 'Pastoral Care', href: 'senior-pastoral-care.html', description: 'The House system and how every pupil is known and supported.' },
      { label: 'Learning Support', href: 'learning-support.html', description: 'How pupils with additional needs are identified and supported.' },
      { label: 'Results & Destinations', href: 'results-destinations.html', description: 'GCSE outcomes and where pupils go on to next.' },
    ],
  },
  {
    slug: 'sixth-form', label: '16+ Sixth Form', href: 'sixth-form.html',
    children: [
      { label: '16+ Sixth Form overview', href: 'sixth-form.html', description: 'The next step, for pupils joining or staying on at 16.' },
      { label: 'Why Bancroft’s Sixth Form', href: 'sixth-form-why.html', description: 'What makes the Sixth Form distinctive.' },
      { label: 'Sixth Form Life', href: 'sixth-form-life.html', description: 'For pupils: what your days will actually be like.' },
      { label: 'Academic Life', href: 'sixth-form-academic-life.html', description: 'A Level subjects and how choices are guided.' },
      { label: 'Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html', description: 'Sport, music, drama and where Sixth Formers lead, not just attend.' },
      { label: 'Pastoral Care', href: 'sixth-form-pastoral-care.html', description: 'The House system and how every pupil is known and supported.' },
      { label: 'Learning Support', href: 'learning-support.html', description: 'How pupils with additional needs are identified and supported.' },
      { label: 'Results & Destinations', href: 'results-destinations.html', description: 'A Level outcomes and where recent leavers have gone on to.' },
      { label: 'Preparing for Life Beyond Bancroft’s', href: 'sixth-form-preparing-for-life.html', description: 'Careers guidance, futures and alumni stories.' },
    ],
  },
  {
    slug: 'school-life', label: 'School Life', href: 'school-life.html',
    children: [
      { label: 'School Life overview', href: 'school-life.html', description: 'Day-to-day life at Bancroft’s, for current families.' },
      { label: 'Community & Partnerships', href: 'school-life-community.html', description: 'Parents, alumni and the wider Bancroft’s network.' },
      { label: 'Term Dates', href: 'term-dates.html', description: 'Term starts, half terms and holidays for the year.' },
      { label: 'Weekly Menu', href: 'weekly-menu.html', description: 'What’s on the menu in the dining hall this week.' },
      { label: 'Getting to Bancroft’s', href: 'getting-to-bancrofts.html', description: 'The school bus service, plus TfL and journey planning links.' },
      { label: 'Uniform', href: 'uniform.html', description: 'What to buy, where from, and second-hand options.' },
    ],
  },
  { slug: 'news', label: 'News', href: 'news.html' },
  {
    slug: 'about', label: 'About', href: 'about.html',
    children: [
      { label: 'About overview', href: 'about.html', description: 'Who we are, our history and how the school is run.' },
      { label: 'Welcome from the Head', href: 'about-welcome.html', description: 'An introduction to Bancroft’s from the Head.' },
      { label: 'What We Stand For', href: 'about-what-we-stand-for.html', description: 'Our values and what they mean day to day.' },
      { label: 'Results & Destinations', href: 'results-destinations.html', description: 'GCSE, A Level and leavers’ destinations in one place.' },
      { label: 'Awards and Recognition', href: 'about-awards-recognition.html', description: 'League tables, inspection reports and awards.' },
      { label: 'Our History', href: 'about-history.html', description: 'Bancroft’s story, from foundation to today.' },
      { label: 'Our Grounds & Facilities', href: 'about-grounds-facilities.html', description: 'Our site, sport, arts and learning spaces, and hiring them for external events.' },
      { label: 'Leadership & Governance', href: 'about-leadership-governance.html', description: 'Our Board of Governors and Senior Leadership Team.' },
      { label: 'Our Family of Schools', href: 'about-family-of-schools.html', description: 'Bancroft’s and its two partner schools, under one foundation.' },
      // Client request (2026-11-13): also surface the Vacancies page (previously footer-only,
      // see footerColumns) in the About Us menu itself, renamed to match - see about-vacancies.
      { label: 'Working at Bancroft’s', href: 'about-vacancies.html', description: 'Life on our staff team, and current roles.' },
    ],
    // Sitemap-tree order only (client request) - see the field's own doc above for why this
    // can't just be a `children` reorder: Learning Support is tree-parented here (whole-school
    // page) but is a real nav child of Prep/Senior/Sixth Form, not of About, so it needs its own
    // explicit slot in this branch's display order.
    sitemapChildren: [
      'about-welcome.html',
      'about-what-we-stand-for.html',
      'results-destinations.html',
      'about-awards-recognition.html',
      'about-history.html',
      'about-grounds-facilities.html',
      'about-leadership-governance.html',
      'about-family-of-schools.html',
      'learning-support.html',
      'about-vacancies.html',
    ],
  },
]

// ---------------------------------------------------------------------------
// Footer columns — two themes (footer.ts's own layout can take any number of columns; this pass
// drops to two, down from three). Old Bancroftians is deliberately not here any more (it's a
// child page of Community & Partnerships instead, reached from School Life - client request). Portals used
// to be a third column of external parent/pupil/staff systems; those are now real internal pages
// reached from the header's quick links instead (see headerUtilityLinks), not duplicated here.
// Our Family of Schools and Foundation are each a built internal page now too (see
// about-family-of-schools / foundation in pages below), not an external link.
// ---------------------------------------------------------------------------

export const footerColumns = [
  {
    heading: 'Get in Touch', links: [
      { label: 'Contact', href: 'contact.html' },
      { label: 'Policies and Procedures', href: 'about-policies-procedures.html' },
      { label: 'Working at Bancroft’s', href: 'about-vacancies.html' },
    ],
  },
  {
    heading: "Bancroft's Family", links: [
      { label: 'Our Family of Schools', href: 'about-family-of-schools.html' },
      { label: 'Foundation', href: 'foundation.html' },
    ],
  },
]

// The small legal row under the footer columns. Kept here rather than hardcoded in footer.ts so
// the Sitemap (sitemap-page.ts) reads the same list the footer renders.
export const footerLegalLinks = [
  { label: 'Privacy Policy', href: 'privacy-policy.html' },
]

// ---------------------------------------------------------------------------
// Shared breadcrumb helper — every non-homepage hero/page-header breadcrumb starts at Home.
// ---------------------------------------------------------------------------

const bc = (...items: { label: string; href: string }[]) => [{ label: 'Home', href: 'index.html' }, ...items]

// Reusable trailing promo props — the site's default conversion action (Book a Visit) closes
// almost every Content/Listing page that doesn't already end in its own form. See
// design-system.md → "Always end on a promo".
const bookVisitPromo = (id: string, body = 'Come and see Bancroft’s for yourself. Open Mornings and personal tours run throughout the year.') => ({
  component: 'wf-promo',
  props: {
    heading: 'See Bancroft’s for yourself', body,
    ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: id, mediaLabel: 'Visitors touring the school grounds',
  },
})

// Reusable page-level FAQ block — a short set of questions specific to the page it sits on (see
// PROTOTYPE.md → "SEO audit additions"), always closing on a route through to the central FAQ
// page so the per-page sets and admissions-faqs.html don't compete with each other.
const faqs = (items: { heading: string; body: string; ctaLabel?: string; ctaHref?: string }[], heading = 'Frequently asked questions') => ({
  component: 'wf-accordion',
  props: {
    heading,
    items: [
      ...items,
      { heading: 'Have a different question?', body: 'Our admissions team keeps the questions we hear most in one place.', ctaLabel: 'See all frequently asked questions', ctaHref: 'admissions-faqs.html' },
    ],
  },
})

// ---------------------------------------------------------------------------
// Pages — one entry per page-config-key (matches the `page` attribute on <wf-page-body> in each
// page's .html shell and the manifest key in gen-pages.mjs).
// ---------------------------------------------------------------------------

export const pages: Record<string, Page> = {

  // --- Homepage ---------------------------------------------------------

  homepage: {
    hero: {
      component: 'wf-homepage-hero',
      props: {
        heading: 'An academic education, with room to grow',
        body: 'Bancroft’s is a co-educational day school for ages 7 to 18 on the edge of Epping Forest, minutes from the Central Line.',
        ctaLabel: 'Why Bancroft’s', ctaHref: 'admissions.html', ctaId: 'cta-homepage-hero',
      },
    },
    blocks: [
      {
        component: 'wf-text',
        props: { align: 'center', body: ['From Prep through to Sixth Form, Bancroft’s combines academic ambition with genuine warmth. Choose the stage you’re interested in to find out more.'] },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Explore Bancroft’s by stage', cols: 3,
          items: [
            { id: 'cta-home-prep', href: 'prep.html', heading: '7+ Prep', description: 'The first steps into Bancroft’s, for ages 7 to 11.', imageLabel: 'Prep pupils in the classroom', linkText: 'Explore 7+ Prep' },
            { id: 'cta-home-senior', href: 'senior.html', heading: '11+ Senior', description: 'Academic breadth and pastoral care for ages 11 to 16.', imageLabel: 'Senior pupils in the quad', linkText: 'Explore 11+ Senior' },
            { id: 'cta-home-sixth-form', href: 'sixth-form.html', heading: '16+ Sixth Form', description: 'Independence and ambition for the final two years.', imageLabel: 'Sixth Form pupils studying', linkText: 'Explore 16+ Sixth Form' },
          ],
        },
      },
      {
        component: 'wf-statistics', props: {
          heading: 'Bancroft’s in numbers',
          items: [
            { value: '7-18', label: 'Ages taught, one through-school' },
            { value: '2025', label: 'ISI Inspection year' },
            { value: '10-15%', label: 'Academic scholarship value' },
            { value: '2', label: 'Prep schools in our Family of Schools' },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'A welcome from our Head', body: ['Read why our Head believes Bancroft’s offers a genuinely complete school experience, academically and beyond.'],
          side: 'right', ctaLabel: 'Read the Head’s welcome', ctaHref: 'about-welcome.html', ctaId: 'cta-home-welcome-promo', mediaLabel: 'The Head of Bancroft’s',
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'An academic education that opens doors', body: ['85% of our leavers go on to top-25% universities. Every Sixth Former studies maths, not because it’s compulsory, but because that’s what Bancroft’s produces.'],
          side: 'left', ctaLabel: 'Explore our academic results', ctaHref: 'results-destinations.html', ctaId: 'cta-home-academic-promo', mediaLabel: 'Pupils reviewing GCSE results',
        },
      },
      {
        component: 'wf-logos', props: {
          heading: 'Recognised for our pastoral care and teaching',
          names: ['Independent Schools of the Year Finalist 2025', 'Pastoral Care Award Winner 2025', 'Innovation in Education Winner 2025', 'ISI Inspection 2025', 'The Drapers’ Company'],
          ctaLabel: 'See our awards and recognition', ctaHref: 'about-awards-recognition.html',
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Latest news', cols: 3,
          items: [
            { id: 'cta-home-news-article', href: 'news-article-a.html', category: 'Academic', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', description: 'Another year of strong outcomes across the Senior School, with many pupils exceeding expectations.', imageLabel: 'Pupils celebrating results day', linkText: 'Read the story' },
            { href: 'news-article-b.html', category: 'Community', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', description: 'What the new partnership means for families joining at 7+.', imageLabel: 'Prep pupils on a school trip', linkText: 'Read the story' },
            { href: 'news-article-c.html', category: 'Sport', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby, capping a strong year across our sports programme.', imageLabel: 'First XV rugby team', linkText: 'Read the story' },
          ],
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'Already part of Bancroft’s?', body: 'Term dates, the weekly menu and everything else current families need is in School Life.',
          ctaLabel: 'Go to School Life', ctaHref: 'school-life.html', ctaId: 'cta-home-school-life-promo', mediaLabel: 'Pupils in the dining hall',
        },
      },
    ],
  },

  // --- Admissions ---------------------------------------------------------

  admissions: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-admissions-hero-book',
        eyebrow: 'Admissions', heading: 'Joining Bancroft’s', body: 'However your family is joining us, at 7+, 11+ or 16+, this is where to start.',
        mediaLabel: 'Prospective families on an Open Morning tour',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Three entry points, one school', body: ['Most pupils join Bancroft’s at 7+, 11+ or 16+, though occasional places do become available in other year groups. Each journey has its own assessment process and timeline, but all lead into the same through-school community.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Find your journey', cols: 4,
          items: [
            { href: 'admissions-7plus-journey.html', heading: 'Joining at 7+', description: 'Joining the Prep years.', imageLabel: 'Prep pupils arriving at school', linkText: 'Start your 7+ journey' },
            { href: 'admissions-11plus-journey.html', heading: 'Joining at 11+', description: 'Joining the Senior School.', imageLabel: 'Senior pupils arriving at school', linkText: 'Start your 11+ journey' },
            { href: 'admissions-16plus-journey.html', heading: 'Joining at 16+', description: 'Joining or staying on for Sixth Form.', imageLabel: 'Sixth Form pupils arriving at school', linkText: 'Start your 16+ journey' },
            { href: 'admissions-occasional-places.html', heading: 'Occasional Places', description: 'Joining in another year group.', imageLabel: 'A new pupil being shown around the school', linkText: 'About occasional places' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Practical information', cols: 4,
          items: [
            { href: 'fees.html', heading: 'Fees', description: 'Termly fees for Prep and Senior School.' },
            { href: 'scholarships-awards.html', heading: 'Scholarships & Awards', description: 'Academic and music awards.' },
            { href: 'bursaries.html', heading: 'Bursaries', description: 'Means-tested financial support.' },
            { href: 'admissions-11plus-past-papers.html', heading: '11+ Assessments & Past Papers', description: 'What the assessment involves, with papers to practise.' },
            { href: 'admissions-faqs.html', heading: 'Frequently Asked Questions', description: 'Quick answers to common questions.' },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to register?', side: 'right', mediaLabel: 'Parent completing a registration form',
          body: ['Registering is the first formal step in applying for a place. Most families visit first, so you can picture your child here before you register.'],
          ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-admissions-book',
          secondaryLabel: 'Register Online', secondaryHref: 'register.html', secondaryId: 'cta-admissions-register',
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'A place opened up outside the usual entry points?', body: 'Occasional places do become available, usually when families relocate. See where and how to express interest.',
          ctaLabel: 'About occasional places', ctaHref: 'admissions-occasional-places.html', ctaId: 'cta-admissions-occasional-promo', mediaLabel: 'A new pupil being shown around the school',
        },
      },
      faqs([
        { heading: 'When should we start the admissions process?', body: 'Most families visit a year or more before entry. Registration for 11+ opens in the spring of Year 5, and 7+ families usually register in the autumn term before the September they hope to join.' },
        { heading: 'Which entry point is right for my child?', body: '7+ is entry into Year 3, 11+ is entry into Year 7 and 16+ is entry into Year 12. Each has its own journey page with the process and key dates.' },
        { heading: 'Do you offer places in other year groups?', body: 'Occasional places do become available outside the three main entry points, usually in Years 4, 5, 8 and 9.', ctaLabel: 'About occasional places', ctaHref: 'admissions-occasional-places.html' },
        { heading: 'Is there a registration fee?', body: 'A non-refundable registration fee applies at 7+ and 11+. There is no fee to register interest in the Sixth Form.', ctaLabel: 'Register Online', ctaHref: 'register.html' },
        { heading: 'Can we visit before registering?', body: 'Yes, and we’d encourage it. Open Mornings and personal tours run throughout the year.', ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html' },
      ]),
      bookVisitPromo('cta-admissions-promo'),
    ],
  },

  'admissions-7plus-journey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-7plus-journey-hero-book',
        secondaryLabel: 'Register Online', secondaryHref: 'register-7plus.html', secondaryId: 'cta-7plus-journey-hero-register',
        eyebrow: 'Admissions - 7+', heading: 'Joining at 7+', body: 'A step-by-step guide to joining Bancroft’s Prep, from registration to your child’s first day.',
        mediaLabel: 'Prep pupils on their first day', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Joining at 7+', href: 'admissions-7plus-journey.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'What to expect', body: ['We look for curious, kind children who will make the most of everything Bancroft’s Prep offers. Assessment at 7+ is deliberately gentle: a short taster morning and an informal assessment, not a formal exam.', 'Most families register in the autumn term for entry the following September, though we recommend visiting well before then to get a feel for the school.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'Key steps',
          items: [
            { heading: 'Visit', description: 'Book an Open Morning or a personal tour of the Prep.' },
            { heading: 'Register', description: 'Submit a registration form and pay the registration fee.' },
            { heading: 'Assess and offer', description: 'A taster morning, followed by an offer decision.' },
            { heading: 'Start', description: 'Joining in September. See Starting at Bancroft’s below.' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Practise at home', cols: 2,
          items: [
            { href: '#', heading: '7+ Past Paper', description: 'The full paper, with answers. PDF download.', linkText: 'Download (PDF)' },
            { href: 'admissions-starting.html', heading: 'Starting at Bancroft’s', description: 'From accepting a place to your child’s first day.', linkText: 'See Starting at Bancroft’s' },
          ],
        },
      },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Prep parent about choosing Bancroft’s and settling in.', attribution: 'Prep parent' },
      ] } },
      faqs([
        { heading: 'What does the 7+ assessment involve?', body: 'A short taster morning and an informal assessment, not a formal exam. It is deliberately gentle.' },
        { heading: 'When should we register for 7+?', body: 'Most families register in the autumn term for entry the following September.', ctaLabel: 'Register Online', ctaHref: 'register-7plus.html' },
        { heading: 'Does my child need to prepare?', body: 'No formal preparation is expected. We are looking for curious, kind children, not rehearsed answers.' },
        { heading: 'Are bursaries available at 7+?', body: 'Our bursary programme applies at 11+ and 16+.', ctaLabel: 'See Bursaries', ctaHref: 'bursaries.html' },
        { heading: 'What happens when Prep pupils reach 11?', body: 'Prep pupils have a guaranteed transfer to the Senior School, so the Prep years are not narrowed down to an 11+ entrance test.' },
        { heading: 'How do we get to the Prep?', body: 'See Getting to Bancroft’s for the school bus service, plus TfL and journey planning links.', ctaLabel: 'Getting to Bancroft’s', ctaHref: 'getting-to-bancrofts.html' },
      ], '7+ questions'),
      bookVisitPromo('cta-7plus-journey-promo'),
    ],
  },

  'admissions-11plus-journey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-11plus-journey-hero-book',
        secondaryLabel: 'Register Online', secondaryHref: 'register-11plus.html', secondaryId: 'cta-11plus-journey-hero-register',
        eyebrow: 'Admissions - 11+', heading: 'Joining at 11+', body: 'How entry to the Senior School works, from registration through to results day.',
        mediaLabel: 'Pupils sitting entrance assessments', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Joining at 11+', href: 'admissions-11plus-journey.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'What to expect', body: ['11+ is our largest entry point and the most competitive. Candidates sit written assessments in English and Maths, alongside an interview, in January.', 'Registration opens in the spring of Year 5 and typically closes in the autumn of Year 6. We’d strongly encourage visiting before registering, so you can picture your child here.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'Key steps',
          items: [
            { heading: 'Visit', description: 'Book an Open Morning or a personal tour.' },
            { heading: 'Register', description: 'Submit a registration form ahead of the deadline.' },
            { heading: 'Assess', description: 'Written assessments and an interview in January.' },
            { heading: 'Offer', description: 'Offers are made in February, with a set acceptance deadline.' },
            { heading: 'Start', description: 'An induction day, then a settled first term. See Starting at Bancroft’s below.' },
          ],
        },
      },
      { component: 'wf-cards', props: { heading: 'You may also want', cols: 4, items: [
        { href: 'admissions-11plus-past-papers.html', id: 'cta-11plus-journey-card-papers', heading: '11+ Assessments & Past Papers', description: 'What the assessment involves, with papers to practise.' },
        { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'See recent GCSE outcomes.' },
        { href: 'scholarships-awards.html', heading: 'Scholarships & Awards', description: 'Academic and music awards.' },
        { href: 'bursaries.html', heading: 'Bursaries', description: 'Means-tested financial support.' },
        { href: 'admissions-starting.html', heading: 'Starting at Bancroft’s', description: 'From accepting a place to the first day of Year 7.' },
        { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'The school bus service, plus TfL and journey planning links.' },
      ] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Year 7 parent about the 11+ process and settling in.', attribution: 'Year 7 parent' },
      ] } },
      faqs([
        { heading: 'What does the 11+ assessment involve?', body: 'Written assessments in English and Maths, alongside an interview, held in January.', ctaLabel: 'See 11+ Assessments & Past Papers', ctaHref: 'admissions-11plus-past-papers.html' },
        { heading: 'When is the registration deadline?', body: 'Registration opens in the spring of Year 5 and typically closes in the autumn of Year 6.', ctaLabel: 'Register Online', ctaHref: 'register-11plus.html' },
        { heading: 'When will we hear the outcome?', body: 'Offers are made in February, with a set acceptance deadline.' },
        { heading: 'Can we see past papers?', body: 'Yes. Past Maths and English papers are available to download.', ctaLabel: 'See past papers', ctaHref: 'admissions-11plus-past-papers.html' },
        { heading: 'Can my child apply to Bancroft’s and a grammar school?', body: 'Yes. Many families do both, and the two processes run alongside each other in Year 6.', ctaLabel: 'See all frequently asked questions', ctaHref: 'admissions-faqs.html' },
        { heading: 'Are scholarships and bursaries available at 11+?', body: 'Yes. Academic scholarships, Music Awards and means-tested bursaries are all available at 11+.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html' },
      ], '11+ questions'),
      bookVisitPromo('cta-11plus-journey-promo'),
    ],
  },

  'admissions-16plus-journey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-16plus-journey-hero-book',
        secondaryLabel: 'Register Online', secondaryHref: 'register-16plus.html', secondaryId: 'cta-16plus-journey-hero-register',
        eyebrow: 'Admissions - 16+', heading: 'Joining at 16+', body: 'How to join our Sixth Form, whether you’re already at Bancroft’s or joining us for the first time.',
        mediaLabel: 'Sixth Form pupils in a seminar', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Joining at 16+', href: 'admissions-16plus-journey.html' }),
      },
    },
    blocks: [
      // Replaces the old link out to a standalone "Staying On" page (now deleted) - current
      // Year 11 pupils progress automatically, so this is a short section here rather than a
      // page of its own, and it's the one thing on this page aimed at current families, not
      // prospective ones.
      { component: 'wf-text', props: { heading: 'Already at Bancroft’s? Moving up from Year 11', body: ['Progression from Year 11 into the Sixth Form is automatic for pupils meeting the normal academic requirements - there is no separate entrance assessment for current pupils.', 'Subject choices are made in the spring term of Year 11, guided by a Sixth Form options evening and one-to-one discussions with tutors. A levels are confirmed once GCSE results are known in August.'] } },
      { component: 'wf-text', props: { heading: 'New to Bancroft’s?', body: ['External candidates apply based on predicted GCSE grades, an interview and, for some subjects, a short written task.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'Key steps for new applicants',
          items: [
            { heading: 'Visit', description: 'Book an Open Morning or a personal tour of the Sixth Form.' },
            { heading: 'Register', description: 'Submit a registration form ahead of the deadline.' },
            { heading: 'Interview and assessment', description: 'An interview and, for some subjects, a short written task.' },
            { heading: 'Offer', description: 'Offers are usually made by the end of the spring term, conditional on GCSE results in August.' },
            { heading: 'Start', description: 'Joining in September. See Starting at Bancroft’s below.' },
          ],
        },
      },
      { component: 'wf-cards', props: { heading: 'Related pages', cols: 4, items: [
        { href: 'sixth-form-academic-life.html', heading: 'Academic Life', description: 'A Level subjects on offer.' },
        { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'Where recent leavers have gone on to.' },
        { href: 'admissions-starting.html', heading: 'Starting at Bancroft’s', description: 'From accepting a place to your first day.' },
        { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'The school bus service, plus TfL and journey planning links.' },
      ] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Sixth Form parent or pupil about joining at 16+.', attribution: 'Sixth Form parent' },
      ] } },
      faqs([
        { heading: 'Can I join the Sixth Form from another school?', body: 'Yes. External candidates apply based on predicted GCSE grades, an interview and, for some subjects, a short written task.' },
        { heading: 'What GCSE grades do I need?', body: 'Offers are conditional on GCSE results in August. (Wireframe note: entry requirements by subject to be supplied.)' },
        { heading: 'When are offers made?', body: 'Usually by the end of the spring term.' },
        { heading: 'Is there a registration fee?', body: 'No. There is no fee to register interest in the Sixth Form.', ctaLabel: 'Register Online', ctaHref: 'register-16plus.html' },
        { heading: 'Are scholarships and bursaries available at 16+?', body: 'Yes. Academic scholarships, Music Awards and means-tested bursaries are all available at 16+.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html' },
        { heading: 'Do current Year 11 pupils need to reapply?', body: 'No. Progression into the Sixth Form is automatic for pupils meeting the normal academic requirements, confirmed once GCSE results are known.' },
      ], '16+ questions'),
      { component: 'wf-promo', props: { heading: 'Ready to apply?', body: 'Come to a Sixth Form Open Evening to see Bancroft’s for yourself, or register your interest and our admissions team will be in touch with next steps.', ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-16plus-journey-promo', secondaryLabel: 'Register Online', secondaryHref: 'register-16plus.html', secondaryId: 'cta-16plus-journey-promo-register', mediaLabel: 'Sixth Form pupil completing an application' } },
    ],
  },

  // Renamed from "Book a Visit" to "Visit Us" (client request) - the header CTA keeps the
  // "Book a Visit" label throughout, since that's the established persistent action; only this
  // page's own heading changes. Href stays book-a-visit.html so the header CTA and every
  // existing link to it keep working unchanged.
  'book-a-visit': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Visit Us', subtitle: 'The best way to understand Bancroft’s is to come and see it for yourself.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Visit Us', href: 'book-a-visit.html' }),
      },
    },
    blocks: [
      // A listing, not a form (client request): the general combined form previously here
      // duplicated the three event pages below with no real difference, muddying the "fast and
      // clear" booking journey this page is meant to be. Each event keeps its own form instead.
      { component: 'wf-text', props: { body: ['We run Open Mornings and Open Evenings throughout the year. Choose your event below to book your place.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Book your event', cols: 3,
          items: [
            { href: 'visit-7plus-open-morning.html', id: 'cta-visit-us-7plus', heading: '7+ Open Morning', description: 'Thursday 17 September 2026, for prospective Prep families.', linkText: 'Book this event' },
            { href: 'visit-11plus-open-morning.html', id: 'cta-visit-us-11plus', heading: '11+ Open Morning', description: 'Thursday 24 September 2026, for prospective Senior families.', linkText: 'Book this event' },
            { href: 'visit-sixth-form-open-evening.html', id: 'cta-visit-us-sixthform', heading: 'Sixth Form Open Evening', description: 'Thursday 8 October 2026, for prospective Sixth Form families.', linkText: 'Book this event' },
          ],
        },
      },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a parent about what stood out on their visit.', attribution: 'Year 7 parent' },
      ] } },
      { component: 'wf-promo', props: { heading: 'Looking for something else?', body: 'A Head’s Tour, a private tour, or a different date - get in touch with our admissions team directly.', ctaLabel: 'Contact admissions', ctaHref: 'contact.html', ctaId: 'cta-visit-us-contact', mediaLabel: 'Parent speaking with admissions' } },
    ],
  },

  // Three event booking pages, one shared template (Visit Us brief: this journey must be fast
  // and clear - see PROTOTYPE.md). Each keeps the same shape (one short intro, one form) so a
  // family booking an event never has to re-orient: what's different is the event itself, not
  // the page around it.
  'visit-7plus-open-morning': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: '7+ Open Morning', subtitle: 'Thursday 17 September 2026, 9.30am - 11.30am, for prospective Prep families.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Visit Us', href: 'book-a-visit.html' }, { label: '7+ Open Morning', href: 'visit-7plus-open-morning.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['A guided tour of the Prep, a chance to meet the Head of Prep and current staff, and time to see a normal morning of lessons in progress. Suitable for families considering entry at 7+ (Year 3).'] } },
      {
        component: 'wf-form', props: {
          heading: 'Book your place', submitLabel: 'Book this event', submitId: 'submit-visit-7plus-open-morning',
          successHeading: 'You’re booked', successBody: 'We’ve emailed your confirmation with arrival details.',
          fields: [
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'childYear', label: 'Child’s current year group', type: 'text' },
            { name: 'guests', label: 'Number of guests attending', type: 'text' },
          ],
        },
      },
    ],
  },

  'visit-11plus-open-morning': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: '11+ Open Morning', subtitle: 'Thursday 24 September 2026, 9.30am - 11.30am, for prospective Senior families.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Visit Us', href: 'book-a-visit.html' }, { label: '11+ Open Morning', href: 'visit-11plus-open-morning.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['A guided tour of the Senior School, a chance to meet senior staff and current pupils, and time to see a normal morning of lessons in progress. Suitable for families considering entry at 11+ (Year 7).'] } },
      {
        component: 'wf-form', props: {
          heading: 'Book your place', submitLabel: 'Book this event', submitId: 'submit-visit-11plus-open-morning',
          successHeading: 'You’re booked', successBody: 'We’ve emailed your confirmation with arrival details.',
          fields: [
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'childYear', label: 'Child’s current year group', type: 'text' },
            { name: 'guests', label: 'Number of guests attending', type: 'text' },
          ],
        },
      },
    ],
  },

  'visit-sixth-form-open-evening': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Sixth Form Open Evening', subtitle: 'Thursday 8 October 2026, 6.00pm - 8.00pm, for prospective Sixth Form families.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Visit Us', href: 'book-a-visit.html' }, { label: 'Sixth Form Open Evening', href: 'visit-sixth-form-open-evening.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['An evening introduction to the Sixth Form: subject stands staffed by teachers and current pupils, talks on the application process, and a chance to ask about A Level choices and life beyond Bancroft’s. Suitable for both external applicants and current Year 11 pupils.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Book your place', submitLabel: 'Book this event', submitId: 'submit-visit-sixth-form-open-evening',
          successHeading: 'You’re booked', successBody: 'We’ve emailed your confirmation with arrival details.',
          fields: [
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'childYear', label: 'Child’s current year group', type: 'text' },
            { name: 'guests', label: 'Number of guests attending', type: 'text' },
          ],
        },
      },
    ],
  },

  // Off primary nav, a child of Admissions (SEO review, 2026-10-14): a page of its own so a search
  // for occasional places lands on a page entirely about them, not a section of the Admissions hub.
  'admissions-occasional-places': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions', heading: 'Occasional Places', body: 'Places in other year groups do become available, usually when families relocate.',
        mediaLabel: 'A new pupil being shown around the school',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Occasional Places', href: 'admissions-occasional-places.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Our standard entry points are 7+, 11+ and 16+, and every year group is usually full. Now and then a family relocates, and a place opens up in another year group.'] } },
      {
        component: 'wf-table', props: {
          heading: 'Year groups where places may come up',
          rowHeader: 'School', columns: ['Year groups'],
          rows: [
            { label: 'Prep School', cells: ['Years 4 and 5'] },
            { label: 'Senior School', cells: ['Years 8 and 9'] },
          ],
        },
      },
      {
        component: 'wf-timeline', props: {
          heading: 'How it works',
          items: [
            { heading: 'Express your interest', description: 'Use the form below and we will keep your details on file.' },
            { heading: 'Places confirmed', description: 'Availability is usually confirmed early in the spring term.' },
            { heading: 'Register', description: 'If a place is available, we invite you to register and pay the non-refundable registration fee.' },
            { heading: 'Assessment and interview', description: 'Your child is invited in for an entrance assessment and interview.' },
            { heading: 'Join in September', description: 'Successful candidates join us the following September.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['For Year 8 entry, applicants who previously sat our 11+ assessments are only reconsidered if they reached the interview stage.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Express your interest', submitLabel: 'Send', submitId: 'submit-occasional-places',
          successHeading: 'Thank you for your interest', successBody: 'We will contact you if a place becomes available in your child’s year group.',
          fields: [
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'yearGroup', label: 'Year group you are applying for', type: 'select', required: true, options: ['Year 4', 'Year 5', 'Year 8', 'Year 9'] },
            { name: 'currentSchool', label: 'Current school', type: 'text' },
            { name: 'message', label: 'Anything else we should know?', type: 'textarea' },
          ],
        },
      },
    ],
  },

  // Register Online is now a landing page: one form page per entry point, as on the live site
  // (SEO review, 2026-10-14). Buttons on stage-specific pages link straight to their own form.
  register: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Register Online', subtitle: 'Choose your child’s entry point to start their application.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Register Online', href: 'register.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Registering is the first formal step in applying for a place, ahead of assessment. A non-refundable registration fee applies at 7+ and 11+; there is no fee to register interest in the Sixth Form.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Choose an entry point', cols: 4,
          items: [
            { href: 'register-7plus.html', id: 'cta-register-7plus', heading: '7+ Registration', description: 'Joining the Prep in Year 3.', linkText: 'Register for 7+' },
            { href: 'register-11plus.html', id: 'cta-register-11plus', heading: '11+ Registration', description: 'Joining the Senior School in Year 7.', linkText: 'Register for 11+' },
            { href: 'register-16plus.html', id: 'cta-register-16plus', heading: '16+ Registration', description: 'Joining the Sixth Form in Year 12.', linkText: 'Register for 16+' },
            { href: 'admissions-occasional-places.html', heading: 'Occasional places', description: 'Places in other year groups do come up, usually in Years 4, 5, 8 and 9.', linkText: 'About occasional places' },
          ],
        },
      },
    ],
  },

  'register-7plus': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Register for 7+ entry', subtitle: 'Start your child’s application to join Bancroft’s Prep in Year 3.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Register Online', href: 'register.html' }, { label: '7+ Registration', href: 'register-7plus.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['A non-refundable registration fee applies at 7+. Our admissions team will email you with the next steps once we receive your registration.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Register for 7+ entry', submitLabel: 'Submit registration', submitId: 'submit-register',
          successHeading: 'Registration received', successBody: 'Admissions will email the next steps.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'dob', label: 'Child’s date of birth', type: 'text', required: true, placeholder: 'DD/MM/YYYY' },
            { name: 'entryYear', label: 'Year of entry', type: 'text', required: true, placeholder: 'e.g. September 2027' },
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'currentSchool', label: 'Current school', type: 'text' },
          ],
        },
      },
    ],
  },

  'register-11plus': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Register for 11+ entry', subtitle: 'Start your child’s application to join the Senior School in Year 7.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Register Online', href: 'register.html' }, { label: '11+ Registration', href: 'register-11plus.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['A non-refundable registration fee applies at 11+. Registration opens in the spring of Year 5 and typically closes in the autumn of Year 6. Our admissions team will email you with the next steps once we receive your registration.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Register for 11+ entry', submitLabel: 'Submit registration', submitId: 'submit-register',
          successHeading: 'Registration received', successBody: 'Admissions will email the next steps.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'dob', label: 'Child’s date of birth', type: 'text', required: true, placeholder: 'DD/MM/YYYY' },
            { name: 'entryYear', label: 'Year of entry', type: 'text', required: true, placeholder: 'e.g. September 2027' },
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'currentSchool', label: 'Current school', type: 'text' },
          ],
        },
      },
    ],
  },

  'register-16plus': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Register for 16+ entry', subtitle: 'Register your interest in joining, or staying on for, the Sixth Form.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Register Online', href: 'register.html' }, { label: '16+ Registration', href: 'register-16plus.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['There is no fee to register interest in the Sixth Form. Current Year 11 pupils staying on register here too. Our admissions team will email you with the next steps once we receive your registration.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Register for 16+ entry', submitLabel: 'Submit registration', submitId: 'submit-register',
          successHeading: 'Registration received', successBody: 'Admissions will email the next steps.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'dob', label: 'Child’s date of birth', type: 'text', required: true, placeholder: 'DD/MM/YYYY' },
            { name: 'entryYear', label: 'Year of entry', type: 'text', required: true, placeholder: 'e.g. September 2027' },
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'currentSchool', label: 'Current school', type: 'text' },
          ],
        },
      },
    ],
  },

  // Three functional payment pages, one shared template, replacing the single "Acceptance
  // Deposit" page (client request) - the amount and who pays it differs by case, so each gets
  // its own URL rather than one form branching three ways. All kept out of the menu, and in the
  // real build hidden from search engines (noindex). Payment provider to be confirmed.
  'acceptance-deposit-fee': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Acceptance Deposit: Fee', subtitle: 'Secure your child’s place by paying the standard acceptance deposit.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Acceptance Deposit: Fee', href: 'acceptance-deposit-fee.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Wireframe note: functional payment page, reached from offer emails and Starting at Bancroft’s. Not in the menu, and hidden from search engines in the real build. Payment provider to be confirmed.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Pay your deposit', submitLabel: 'Continue to payment', submitId: 'submit-deposit-fee',
          successHeading: 'Deposit received', successBody: 'Thank you. We’ve emailed your receipt and confirmed your child’s place.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'entryPoint', label: 'Entry point', type: 'select', required: true, options: ['7+ Prep (Year 3)', '11+ Senior (Year 7)', '16+ Sixth Form (Year 12)', 'Occasional place'] },
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
          ],
        },
      },
    ],
  },

  // Staff families pay a reduced or waived deposit under the staff fee remission scheme.
  'acceptance-deposit-staff': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Acceptance Deposit: Staff', subtitle: 'Secure your child’s place under the staff fee remission scheme.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Acceptance Deposit: Staff', href: 'acceptance-deposit-staff.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Wireframe note: for staff families using the fee remission scheme. The deposit amount, if any, is to be confirmed with HR and the Bursar. Not in the menu, and hidden from search engines in the real build.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Confirm your place', submitLabel: 'Continue', submitId: 'submit-deposit-staff',
          successHeading: 'Confirmed', successBody: 'Thank you. We’ve emailed your receipt and confirmed your child’s place.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'entryPoint', label: 'Entry point', type: 'select', required: true, options: ['7+ Prep (Year 3)', '11+ Senior (Year 7)', '16+ Sixth Form (Year 12)', 'Occasional place'] },
            { name: 'staffName', label: 'Staff member’s name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
          ],
        },
      },
    ],
  },

  // Families with a means-tested bursary pay a deposit scaled to their bursary award, if any.
  'acceptance-deposit-bursary': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Acceptance Deposit: Bursary', subtitle: 'Secure your child’s place following a means-tested bursary award.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Acceptance Deposit: Bursary', href: 'acceptance-deposit-bursary.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Wireframe note: for families whose place follows a means-tested bursary award. Whether a reduced deposit applies, scaled to the bursary percentage, is to be confirmed with the Bursar. Not in the menu, and hidden from search engines in the real build.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Pay your deposit', submitLabel: 'Continue to payment', submitId: 'submit-deposit-bursary',
          successHeading: 'Deposit received', successBody: 'Thank you. We’ve emailed your receipt and confirmed your child’s place.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'entryPoint', label: 'Entry point', type: 'select', required: true, options: ['7+ Prep (Year 3)', '11+ Senior (Year 7)', '16+ Sixth Form (Year 12)', 'Occasional place'] },
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
          ],
        },
      },
    ],
  },

  fees: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions', heading: 'School Fees', body: 'Termly fees for the 2026/27 academic year, shown inclusive of VAT.',
        mediaLabel: 'Pupils in a Bancroft’s classroom', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Fees', href: 'fees.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-table', props: {
          heading: 'Academic Year 2026-2027',
          rowHeader: 'Termly Fees',
          columns: ['Net Fees', 'Fees Payable (inc VAT) per Term'],
          rows: [
            { label: 'Prep School', cells: ['£7,268.33', '£8,722.00'] },
            { label: 'Senior School', cells: ['£8,666.67', '£10,400.00'] },
          ],
        },
      },
      { component: 'wf-text', props: { heading: 'Fees and VAT', body: ['Since January 2025, VAT at 20% has applied to independent school fees. The table above shows both the net fee and the amount payable each term including VAT, so the VAT is already in the figure you pay.', 'Support with fees is available through our bursary programme at 11+ and 16+.'] } },
      {
        component: 'wf-table', props: {
          heading: 'What your fees include',
          rowHeader: 'Item',
          columns: ['Covered by termly fees?'],
          rows: [
            { label: 'Tuition', cells: ['Included'] },
            { label: 'Lunches', cells: ['To confirm'] },
            { label: 'Clubs and societies', cells: ['To confirm'] },
            { label: 'Textbooks and exam entries', cells: ['To confirm'] },
            { label: 'Individual music lessons', cells: ['Charged separately (free for Music Award holders)'] },
            { label: 'School bus service', cells: ['Charged separately, booked through Zeelo'] },
            { label: 'Uniform', cells: ['Bought separately'] },
            { label: 'iPad (from Year 7)', cells: ['Bought separately, through the school’s supplier'] },
            { label: 'Trips', cells: ['To confirm'] },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: rows marked "To confirm" need checking with the Bursar before this becomes real copy. The intent is one plain list answering "what do the fees cover?", which parents search for and ask admissions about.'] } },
      faqs([
        { heading: 'Are the fees shown inclusive of VAT?', body: 'Yes. The table shows the net fee and the fee payable each term including VAT.' },
        { heading: 'What do the fees include?', body: 'Tuition is included. See "What your fees include" above for what is covered and what is charged separately.' },
        { heading: 'Is it worth the fees now VAT has been added?', body: 'The fairest way to judge is to look at what the fees cover, the support available and what pupils go on to achieve. (Wireframe note: answer to be agreed with the school.)', ctaLabel: 'See Results & Destinations', ctaHref: 'results-destinations.html' },
        { heading: 'How does Bancroft’s compare with a grammar school?', body: 'Many families consider both. We have set out the main differences in our admissions questions.', ctaLabel: 'See all frequently asked questions', ctaHref: 'admissions-faqs.html' },
        { heading: 'When are fees due?', body: 'Fees are invoiced at the start of each term and due within 14 days, unless you’ve arranged a termly payment plan with our Finance team.' },
        { heading: 'Is help with fees available?', body: 'Yes. Support with fees is available through our bursary programme at 11+ and 16+, alongside our academic and music scholarships.', ctaLabel: 'See Bursaries', ctaHref: 'bursaries.html' },
        { heading: 'Is there a registration fee?', body: 'A non-refundable registration fee applies at 7+ and 11+. There is no fee to register interest in the Sixth Form.' },
      ], 'Fees, explained'),
      { component: 'wf-promo', props: { heading: 'Financial support available', body: 'Academic and music scholarships, plus a bursary programme at 11+ and 16+, are available to eligible families.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html', ctaId: 'cta-fees-promo', mediaLabel: 'Pupil receiving a scholarship award' } },
    ],
  },

  // Split from the former combined "Scholarships & Bursaries" page (client request) - awards
  // are merit-based and assessed, bursaries are means-tested and confidential, different enough
  // processes that a family only interested in one no longer has to read past the other.
  'scholarships-awards': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions', heading: 'Scholarships & Awards', body: 'Recognising academic and musical promise at 11+ and 16+.',
        mediaLabel: 'Pupil performing in a music award audition', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Scholarships & Awards', href: 'scholarships-awards.html' }),
      },
    },
    blocks: [
      { component: 'wf-text-media', props: { heading: 'Academic Scholarships', side: 'left', mediaLabel: 'Pupil sitting a scholarship assessment', body: ['Awarded at 11+ and 16+ on the strength of assessment and interview performance, academic scholarships offer a fee reduction of up to 10 to 15 percent and recognise pupils of exceptional academic promise.'] } },
      { component: 'wf-text-media', props: { heading: 'Music Awards', side: 'right', mediaLabel: 'Pupil playing violin', links: [{ label: 'Music at Bancroft’s', href: 'senior-music.html' }], body: ['Music Awards are open to talented instrumentalists and singers at 11+ and 16+. Award holders receive free individual music lessons for the duration of their time at Bancroft’s, alongside opportunities to lead ensembles.'] } },
      faqs([
        { heading: 'How are academic scholarships awarded?', body: 'On the strength of assessment and interview performance at 11+ and 16+. They offer a fee reduction of up to 10 to 15 percent.' },
        { heading: 'What does a Music Award include?', body: 'Free individual music lessons for the duration of your child’s time at Bancroft’s, alongside opportunities to lead ensembles.' },
        { heading: 'Can I apply for a scholarship and a bursary?', body: 'Yes. The two are assessed separately and are not mutually exclusive.', ctaLabel: 'See Bursaries', ctaHref: 'bursaries.html' },
      ], 'Scholarships and awards questions'),
      bookVisitPromo('cta-scholarships-promo', 'Talk to our admissions team about scholarships and awards at an Open Morning or personal tour.'),
    ],
  },

  bursaries: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions', heading: 'Bursaries', body: 'Making a Bancroft’s education possible regardless of financial circumstance.',
        mediaLabel: 'Family meeting with the bursaries team', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Bursaries', href: 'bursaries.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Means-tested financial support', body: ['Means-tested bursaries can cover up to 100 percent of fees for families who would otherwise be unable to consider Bancroft’s. Applications are assessed confidentially, alongside your child’s registration.', 'Bursaries are available at 11+ and 16+.'] } },
      faqs([
        { heading: 'Who can apply for a bursary?', body: 'Bursaries are means-tested and intended for families who would otherwise be unable to consider Bancroft’s. They are available at 11+ and 16+.' },
        { heading: 'How much can a bursary cover?', body: 'Up to 100 percent of fees, depending on your family’s circumstances.' },
        { heading: 'How are bursary applications assessed?', body: 'Confidentially, alongside your child’s registration.', ctaLabel: 'Register Online', ctaHref: 'register.html' },
        { heading: 'Can I apply for a bursary and a scholarship?', body: 'Yes. The two are assessed separately and are not mutually exclusive.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html' },
      ], 'Bursaries questions'),
      bookVisitPromo('cta-bursaries-promo', 'Talk to our admissions team about bursaries, confidentially, at an Open Morning or personal tour.'),
    ],
  },

  // --- SEO audit additions (2026-10-09) — see PROTOTYPE.md → "SEO audit additions" -----------

  'admissions-11plus-past-papers': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions - 11+', heading: '11+ Assessments & Past Papers', body: 'What the 11+ assessment at Bancroft’s involves, how to prepare, and past papers to practise with.',
        mediaLabel: 'Pupil working through a practice paper',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Joining at 11+', href: 'admissions-11plus-journey.html' }, { label: '11+ Assessments & Past Papers', href: 'admissions-11plus-past-papers.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'The 11+ at Bancroft’s', body: ['11+ is our largest entry point. Candidates sit written assessments in English and Maths, alongside an interview, in January of Year 6.', 'The papers on this page are here so your child knows what to expect on the day. They are free to download and use, whichever schools you are considering.'] } },
      {
        component: 'wf-table', props: {
          heading: 'Key dates',
          rowHeader: 'Stage',
          columns: ['When'],
          rows: [
            { label: '11+ Open Morning', cells: ['Thursday 17 September 2026'] },
            { label: 'Personal tours', cells: ['Throughout the year'] },
            { label: 'Registration opens', cells: ['Spring of Year 5'] },
            { label: 'Registration closes', cells: ['Autumn of Year 6'] },
            { label: 'Assessments and interview', cells: ['January of Year 6'] },
            { label: 'Offers made', cells: ['February of Year 6'] },
          ],
        },
      },
      // Wireframe placeholder only (see PROTOTYPE.md): a link, not working add-to-calendar
      // functionality - which calendar format(s) to support is a build-stage decision.
      { component: 'wf-button-row', props: { items: [{ label: 'Add key dates to calendar', href: '#' }] } },
      {
        component: 'wf-cards', props: {
          heading: 'Past papers: 2017', cols: 3,
          items: [
            { href: '#past-papers', category: '2017 - Maths', heading: '11+ Maths paper', description: 'The full paper, with answers. PDF download.', linkText: 'Download (PDF)' },
            { href: '#past-papers', category: '2017 - English', heading: '11+ English paper', description: 'Comprehension and writing tasks, with answers. PDF download.', linkText: 'Download (PDF)' },
            { href: 'admissions-occasional-places.html', category: '2015 - Maths', heading: '13+ Maths sample paper', description: 'For families applying for an occasional place in Year 9. PDF download.', linkText: 'About occasional places' },
          ],
        },
        anchorId: 'past-papers',
      },
      {
        component: 'wf-cards', props: {
          heading: 'More recent years', cols: 3,
          items: [
            { category: 'Placeholder', heading: '2025 papers', description: 'Maths and English, with answers. To be supplied.' },
            { category: 'Placeholder', heading: '2024 papers', description: 'Maths and English, with answers. To be supplied.' },
            { category: 'Placeholder', heading: '2023 papers', description: 'Maths and English, with answers. To be supplied.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: papers are grouped by year, newest first, each with its answers. Which years the school is willing to publish, and whether answers are included, is still to confirm. The existing PDF addresses should stay live or redirect here so their search rankings carry across.'] } },
      {
        component: 'wf-text-media', props: {
          heading: 'How to prepare', side: 'right', mediaLabel: 'Parent and child reading together',
          body: ['Past papers are most useful for getting familiar with the format and timing, not for memorising answers.', 'Wireframe note: practical guidance for parents and children to be written with the admissions team.'],
          ctaLabel: 'See Joining at 11+', ctaHref: 'admissions-11plus-journey.html',
        },
      },
      faqs([
        { heading: 'Which subjects are tested at 11+?', body: 'English and Maths, alongside an interview.' },
        { heading: 'When does the 11+ assessment take place?', body: 'In January of Year 6, with offers made in February.' },
        { heading: 'Do the past papers come with answers?', body: 'Wireframe note: to confirm which papers have answers or mark schemes available.' },
        { heading: 'Does my child need a tutor?', body: 'Wireframe note: the school’s position on tutoring to be confirmed with the admissions team.' },
        { heading: 'Are bursaries available at 11+?', body: 'Yes. Means-tested bursaries can cover up to 100 percent of fees.', ctaLabel: 'See Bursaries', ctaHref: 'bursaries.html' },
        { heading: 'How do we register?', body: 'Registration opens in the spring of Year 5 and typically closes in the autumn of Year 6.', ctaLabel: 'Register Online', ctaHref: 'register-11plus.html' },
      ], '11+ exam questions'),
      {
        component: 'wf-cards', props: {
          heading: 'Next steps', cols: 4,
          items: [
            { href: 'register-11plus.html', heading: 'Register Online', description: 'Start your child’s 11+ application.' },
            { href: 'admissions-11plus-journey.html', heading: 'Joining at 11+', description: 'The full process, step by step.' },
            { href: 'scholarships-awards.html', heading: 'Scholarships & Awards', description: 'Academic and music awards.' },
            { href: 'bursaries.html', heading: 'Bursaries', description: 'Means-tested financial support.' },
          ],
        },
      },
      bookVisitPromo('cta-past-papers-promo', 'The best preparation is seeing the school. Open Mornings for 11+ run throughout the year.'),
    ],
  },

  // Moved from under Joining at 11+ to sit directly under Admissions (client request): one
  // shared page with a section per entry point, linked from all three joining pages, rather
  // than an 11+-only page. The original content (From offer to first day, FAQs) was written
  // from 11+ parent research; the 7+ and 16+ sections below are drafted to the same pattern and
  // flagged for the school to check, same as the rest of this page already was.
  'admissions-starting': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Becoming Bancroft’s', heading: 'Starting at Bancroft’s', body: 'What happens between accepting a place and your child’s first day, however they’re joining us, and how every new pupil is helped to settle.',
        mediaLabel: 'New pupils on their first day',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Starting at Bancroft’s', href: 'admissions-starting.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Moving to a new school is a big step, for children and for parents, whichever entry point you’re joining at. This page is for families who have accepted a place, and for anyone wondering what joining would really be like.', 'Wireframe note: the events and timings in each section below are a draft structure to confirm with the school. The 11+ section comes from parent research: content from recent joiners that reassures children before they start. The 7+ and 16+ sections follow the same pattern and should be checked the same way.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'Starting at 7+',
          items: [
            { heading: 'Accept your place', description: 'Offers are made after the taster morning and assessment. Accept online and pay the acceptance deposit to secure the place.' },
            { heading: 'Welcome pack', description: 'Key dates, uniform and travel information, sent in the spring.' },
            { heading: 'Taster day', description: 'In the summer term, new pupils spend a day with their class before the holidays.' },
            { heading: 'Over the summer', description: 'Uniform, the school bus and anything else to sort before September.' },
            { heading: 'First day', description: 'A gentle, settled start to Year 3.' },
          ],
        },
      },
      {
        component: 'wf-timeline', props: {
          heading: 'Starting at 11+',
          items: [
            { heading: 'Accept your place', description: 'Offers are made in February. Accept online and pay the acceptance deposit to secure the place.' },
            { heading: 'Welcome pack', description: 'Key dates, uniform and travel information, sent in the spring.' },
            { heading: 'Induction day', description: 'In the summer term, new pupils meet their tutor, their tutor group and each other.' },
            { heading: 'Over the summer', description: 'Uniform, the school bus and anything else to sort before September.' },
            { heading: 'First day', description: 'A gentle start to Year 7, with time to find your way around.' },
          ],
        },
      },
      {
        component: 'wf-timeline', props: {
          heading: 'Starting at 16+',
          items: [
            { heading: 'Accept your place', description: 'Offers are usually made by the end of the spring term, conditional on GCSE results. Accept online and pay the acceptance deposit to secure the place.' },
            { heading: 'Subject choices confirmed', description: 'Final A Level subject choices are confirmed once GCSE results are known in August.' },
            { heading: 'Induction evening', description: 'In the summer term, new joiners meet their tutor and subject teachers.' },
            { heading: 'Over the summer', description: 'Uniform, the school bus and anything else to sort before September.' },
            { heading: 'First day', description: 'A settled start to Year 12, alongside current pupils moving up from Year 11.' },
          ],
        },
      },
      { component: 'wf-text-media', props: { heading: 'Accepting your place', side: 'left', mediaLabel: 'Parent completing an online form', body: ['Once you have accepted an offer, the acceptance deposit secures your child’s place.'], links: [{ label: 'Pay the acceptance deposit', href: 'acceptance-deposit-fee.html' }] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a current pupil about what they were worried about before they joined, and what actually happened.', attribution: 'Year 7 pupil' },
        { quote: 'Placeholder for a quote from a parent about how their child settled in during the first half term.', attribution: 'Parent of a new pupil' },
      ] } },
      { component: 'wf-media', props: { type: 'video', label: 'A week as a new pupil, filmed by pupils', caption: 'Placeholder for a short film made by recent joiners.', aspectClass: 'aspect-video' } },
      {
        component: 'wf-cards', props: {
          heading: 'Getting ready', cols: 4,
          items: [
            { href: 'uniform.html', heading: 'Uniform', description: 'What to buy and where from.' },
            { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'The school bus service, plus TfL and journey planning links.' },
            { href: 'term-dates.html', heading: 'Term Dates', description: 'Term starts, half terms and holidays.' },
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s for lunch.' },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Devices and IT', side: 'left', mediaLabel: 'Pupil using an iPad in class',
          body: ['Every pupil joining in Year 7 needs an iPad, configured and managed by the school, which they use through to Year 11. Devices come from the school’s supplier, with breakage insurance and a choice of payment options.', 'Pupils may bring a mobile phone for the journey to and from school, but phones are not used during the school day.'],
          links: [
            { label: 'Acceptable Use of IT Policy', href: 'about-policies-procedures.html' },
            { label: 'Online Safety Policy', href: 'about-policies-procedures.html' },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Who looks after new pupils', side: 'right', mediaLabel: 'Tutor welcoming a new pupil',
          body: ['Every pupil belongs to a tutor group and a house, so there are several adults, and plenty of older pupils, to turn to from the first day.'],
          links: [
            { label: 'Pastoral Care', href: 'senior-pastoral-care.html' },
            { label: 'Learning Support', href: 'learning-support.html' },
          ],
        },
      },
      faqs([
        { heading: 'Will I know anyone?', body: 'Most new pupils know only a few others when they arrive. The induction day and your tutor group are there so you start September with familiar faces.' },
        { heading: 'What if I get lost?', body: 'Everyone does at first. (Wireframe note: how new pupils are helped around the site in the first weeks, to be supplied.)' },
        { heading: 'How much homework will there be?', body: 'Wireframe note: a short, honest answer from the school, to be supplied.' },
        { heading: 'Who do I talk to if I am worried?', body: 'Your tutor is the first person to speak to, and there are Heads of Year and school counsellors too.', ctaLabel: 'Pastoral Care', ctaHref: 'senior-pastoral-care.html' },
      ], 'Questions new pupils ask'),
      bookVisitPromo('cta-starting-promo', 'Still deciding? Come and see Bancroft’s for yourself. Open Mornings and personal tours run throughout the year.'),
    ],
  },

  // --- 7+ Prep ---------------------------------------------------------

  prep: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-prep-hero-book',
        eyebrow: '7+ Prep', heading: 'The first steps into Bancroft’s', body: 'A warm, settled start for ages 7 to 11, on the same site your child will call home through to Sixth Form.',
        mediaLabel: 'Prep pupils in the playground', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['Bancroft’s Prep gives children a confident, joyful start, small enough that every child is known, ambitious enough to prepare them well for the Senior School.', 'Part of the Bancroft’s Family of Schools.'] } },
      { component: 'wf-text-media', props: { heading: 'Welcome from the Head of Prep', side: 'left', mediaLabel: 'Mr Layburn, Head of Prep', body: ['Mr Layburn, Head of Prep, describes Bancroft’s Prep as a happy school where bright, curious children can reach their full potential.', 'Because Prep pupils have a guaranteed transfer to the Senior School, the curriculum stays rich and varied for all four years, rather than narrowing towards an entrance test.'] } },
      { component: 'wf-text-media', props: { heading: 'Why Bancroft’s Prep', side: 'right', mediaLabel: 'Prep pupils reading together', body: ['What makes the Prep years distinctive.'], ctaLabel: 'Read why families choose us', ctaHref: 'prep-why.html' } },
      { component: 'wf-text-media', props: { heading: 'Prep School Life', side: 'left', mediaLabel: 'Prep pupils in the playground', body: ['What a day at the Prep looks and feels like.'], ctaLabel: 'See a day at the Prep', ctaHref: 'prep-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Academic Life', side: 'right', mediaLabel: 'Prep pupils in a science lesson', body: ['What Prep pupils learn in the classroom.'], ctaLabel: 'See Academic Life', ctaHref: 'prep-academic-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Beyond the Classroom', side: 'left', mediaLabel: 'Prep pupils at a co-curricular club', body: ['Sport, music, drama and clubs, from Forest School to coding and chess.'], ctaLabel: 'Explore Beyond the Classroom', ctaHref: 'prep-beyond-the-classroom.html' } },
      { component: 'wf-text-media', props: { heading: 'Pastoral Care', side: 'right', mediaLabel: 'Teacher with a small group of pupils', body: ['Settling in and being known as an individual, from day one.'], ctaLabel: 'Read about pastoral care', ctaHref: 'prep-pastoral-care.html' } },
      // Learning Support: a highlighted section on every stage landing page (client request), not
      // just a nav link - wf-promo is the kit's "full-width image with text on top" treatment,
      // the one block on this page that reads as more than an ordinary text-media row.
      { component: 'wf-promo', props: { heading: 'Learning Support', body: 'A proactive, tailored approach for pupils with additional needs, starting from the Prep.', ctaLabel: 'Read about Learning Support', ctaHref: 'learning-support.html', ctaId: 'cta-prep-learning-support-promo', mediaLabel: 'Learning support session' } },
      { component: 'wf-text-media', props: { heading: 'Meet the Staff', side: 'left', mediaLabel: 'Prep teaching staff', body: ['The teachers who lead the Prep years.'], ctaLabel: 'Meet the team', ctaHref: 'prep-staff.html' } },
      // "Joining at 7+" - the admissions summary that makes this overview work as the 7+
      // hub the SEO report asks for (process, key dates, fees, assessment). Detail stays on the Journey page.
      {
        component: 'wf-timeline', props: {
          heading: 'Joining at 7+',
          items: [
            { heading: 'Visit', description: 'Come to an Open Morning or book a personal tour of the Prep.' },
            { heading: 'Register', description: 'Register online in the autumn term before entry.' },
            { heading: 'Assess and offer', description: 'A taster morning and an informal assessment, followed by an offer decision.' },
          ],
        },
      },
      {
        component: 'wf-table', props: {
          heading: 'Key dates for 7+ entry',
          rowHeader: 'Stage', columns: ['When'],
          rows: [
            { label: 'Open Morning', cells: ['Thursday 24 September 2026'] },
            { label: 'Registration', cells: ['Autumn term before entry'] },
            { label: 'Taster morning and assessment', cells: ['To be supplied'] },
            { label: 'Offers', cells: ['To be supplied'] },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Fees and assessment', cols: 3,
          items: [
            { href: 'fees.html', heading: 'Fees', description: '£8,722 a term for the Prep, including VAT.', linkText: 'See fees' },
            { href: 'admissions-7plus-journey.html', heading: 'Assessment', description: 'A gentle taster morning and informal assessment, not a formal exam.', linkText: 'What to expect' },
            { href: 'admissions-7plus-journey.html', heading: 'Your full 7+ journey', description: 'Every step of the process, in detail.', linkText: 'See the 7+ journey' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: assessment and offer dates to be supplied by admissions.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Prep parent about choosing Bancroft’s.', attribution: 'Year 4 parent' },
      ] } },
      faqs([
        { heading: 'What ages is the Prep for?', body: 'Ages 7 to 11, from Alphas (Year 3) through to Prep 2 (Year 6).' },
        { heading: 'Where is the Prep?', body: 'On Whitehall Road, a short walk from the Senior School entrance.', ctaLabel: 'Find us', ctaHref: 'contact.html' },
        { heading: 'What clubs can Prep pupils join?', body: 'Sport, music, drama and clubs, from Forest School to coding and chess.', ctaLabel: 'See Beyond the Classroom', ctaHref: 'prep-beyond-the-classroom.html' },
        { heading: 'How will my child get to school?', body: 'Our school bus service is open to all pupils. Alphas (Year 3) must be accompanied by a sibling in Year 5 or above.', ctaLabel: 'Getting to Bancroft’s', ctaHref: 'getting-to-bancrofts.html' },
        { heading: 'Who looks after my child day to day?', body: 'Every child is known as an individual from day one.', ctaLabel: 'Read about Pastoral Care', ctaHref: 'prep-pastoral-care.html' },
        { heading: 'What is the Bancroft’s Family of Schools?', body: 'Bancroft’s Prep is part of the Bancroft’s Family of Schools.', ctaLabel: 'See Our Family of Schools', ctaHref: 'about-family-of-schools.html' },
        { heading: 'When should we register for 7+?', body: 'Most families register in the autumn term for entry the following September.', ctaLabel: 'Register Online', ctaHref: 'register-7plus.html' },
        { heading: 'Are bursaries available at 7+?', body: 'Our bursary programme applies at 11+ and 16+.', ctaLabel: 'See Bursaries', ctaHref: 'bursaries.html' },
      ], 'Prep questions'),
      // Tag-filtered "Latest news" (client request) - items pre-selected by tag rather than a
      // live filter control, since this block's own job is already "just the Prep news".
      { component: 'wf-cards', props: {
        heading: 'Latest news', cols: 2,
        items: [
          { href: 'news-article-b.html', category: 'Prep', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', description: 'What the new partnership means for families joining at 7+.', imageLabel: 'Prep pupils on a school trip', linkText: 'Read the story' },
          { category: 'Prep', heading: 'Prep pupils shine in national maths challenge', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Prep pupils in a maths lesson' },
        ],
      } },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to take the next step?', side: 'right', mediaLabel: 'Parent completing a registration form',
          body: ['See how registration and assessment work at 7+, or come and see Bancroft’s Prep for yourself.'],
          ctaLabel: 'Start your 7+ journey', ctaHref: 'admissions-7plus-journey.html', ctaId: 'cta-prep-hero-journey',
          secondaryLabel: 'Book a Visit', secondaryHref: 'book-a-visit.html',
        },
      },
    ],
  },

  'prep-why': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Why Bancroft’s Prep', body: 'A curious, kind start that sets children up for everything that follows.',
        mediaLabel: 'Prep pupils on a nature walk', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Why Bancroft’s Prep', href: 'prep-why.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['From their first day, Prep pupils are taught by specialist subject teachers as well as their form teacher, so children encounter real expertise early, in the sciences, languages, music and sport.', 'Being part of the same school as our Senior and Sixth Form pupils means Prep children grow up with older role models close by, and a clear, familiar path ahead of them.'] } },
      // A Head of Prep welcome (client request) - reusing wf-media's existing video-placeholder
      // pattern (see the homepage nav promo's "Get to know Alex" card) rather than a new
      // component or a modal, which the brief offered as options.
      { component: 'wf-media', props: { type: 'video', label: 'A welcome from the Head of Prep', caption: 'Placeholder for a short welcome film from Mr Layburn, Head of Prep.', aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { heading: 'Our aims and values', body: ['Happiness comes first at the Prep: “Everyone has the right to be happy” is the first of our school rules, because good things follow from it.', 'We aim to give every child the best possible academic education while making sure they are happy and well-rounded; to offer a wide range of experiences so each child finds where they can excel or simply have fun; to build strong relationships between children, staff and parents; to celebrate a vibrant, diverse community; and to help children recognise their advantages and act with compassion for others.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Six values we want every child to develop', cols: 3,
          items: [
            { heading: 'Balance', description: 'Living balanced, healthy, productive lives.' },
            { heading: 'Excellence', description: 'Aspiring to be the best they can be.' },
            { heading: 'Integrity', description: 'A clear moral grounding for life.' },
            { heading: 'Kindness', description: 'Acting with compassion and empathy.' },
            { heading: 'Curiosity', description: 'An abiding curiosity about the world.' },
            { heading: 'Courage', description: 'A spirit of adventure, facing challenges and working to overcome them.' },
          ],
        },
      },
      { component: 'wf-quote', props: { items: [
        { quote: 'My daughter settled in within days. The teachers know every child by name, and it shows in how she talks about school.', attribution: 'Current Prep parent' },
      ] } },
      {
        component: 'wf-cards', props: {
          heading: 'The evidence', cols: 2,
          items: [
            { href: 'about-awards-recognition.html', heading: 'Awards and Recognition', description: 'League tables, inspection reports and awards.' },
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'Where the Prep years lead: outcomes at the end of Year 11.' },
          ],
        },
      },
      bookVisitPromo('cta-prep-why-promo'),
    ],
  },

  'prep-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Prep School Life', body: 'What a day at Bancroft’s Prep looks and feels like, from the first bell to home time.',
        mediaLabel: 'Prep pupils arriving at school', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Prep School Life', href: 'prep-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['There is a buzz about the Prep, because children are having fun while they learn. With plenty of space to play on a landscaped, secure site within the Bancroft’s campus, the day has room for lessons, clubs, sport and friends.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'A typical day',
          items: [
            { heading: 'Arrival', description: 'Children are met by their form teacher, the one consistent adult through most of their day.' },
            { heading: 'Morning lessons', description: 'Taught by form teachers and specialist subject teachers.' },
            { heading: 'Lunch and clubs', description: 'A long lunch hour, so every child can eat, play and get to a club.' },
            { heading: 'Afternoon', description: 'More lessons, games and time outdoors.' },
            { heading: 'Home time', description: 'The school bus, or wraparound care for families who need it.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: timings for each part of the day to be supplied by the Prep.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a short quote from a Prep pupil about their favourite part of the school day.', attribution: 'Prep pupil, Year 5' },
        { quote: 'Placeholder for a short quote from a Prep pupil about what they look forward to each week.', attribution: 'Prep pupil, Year 3' },
      ] } },
      { component: 'wf-text-media', props: { heading: 'Space to play and explore', side: 'left', mediaLabel: 'Prep pupils playing outside', body: ['The Prep has its own contemporary buildings and shares many of the wider school’s facilities, so children use spaces most schools their size could not offer.'], links: [{ label: 'See Beyond the Classroom', href: 'prep-beyond-the-classroom.html' }] } },
      {
        component: 'wf-cards', props: {
          heading: 'The practical side', cols: 4,
          items: [
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s for lunch this week.' },
            { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'Routes, timings and how to book.' },
            { href: 'uniform.html', heading: 'Uniform', description: 'What to buy and where from.' },
            { href: 'term-dates.html', heading: 'Term Dates', description: 'Term starts, half terms and holidays.' },
          ],
        },
      },
      bookVisitPromo('cta-prep-life-promo'),
    ],
  },

  'prep-academic-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Academic Life', body: 'A broad, carefully sequenced curriculum from Alpha (Year 3) to Prep 2 (Year 6).',
        mediaLabel: 'Prep pupils in an art lesson', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Academic Life', href: 'prep-academic-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'A broad foundation', body: ['We want Prep pupils to be curious, independent thinkers who enjoy rising to a challenge. The curriculum is structured for both breadth and depth, giving children solid academic foundations while helping them grow as individuals.'] } },
      { component: 'wf-text', props: { heading: 'How it’s taught', body: ['Form teachers lead most lessons in the early years, alongside specialist teaching in Languages, Music, Computing, PE, Art and Drama from the start. From Year 5 onwards, nearly every subject is taught by a subject specialist, giving children a taste of the Senior School and supporting their growing independence.'] } },
      { component: 'wf-text', props: { heading: 'Year by year', body: ['Every year, from Alpha (Year 3) to Prep 2 (Year 6), is mapped to a clear, connected path of progress, so each stage builds on the last.'] } },
      bookVisitPromo('cta-prep-academic-life-promo'),
    ],
  },

  // Hub page (client request): Sport, Music and Drama are each promoted to their own page (see
  // prep-sport/prep-music/prep-drama below); everything else that was a flat text-media row
  // here stays a section on the hub itself, same as before.
  'prep-beyond-the-classroom': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Beyond the Classroom', body: 'Every Prep pupil takes part in weekly clubs, discovering what they love long before they have to choose.',
        mediaLabel: 'Prep pupils at a co-curricular club', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Beyond the Classroom', href: 'prep-beyond-the-classroom.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Our school day is built around it: a long lunch hour means every child can eat, play and get to a club, all in the same day, rather than it being squeezed in afterwards. Most clubs run during the school day, as a normal part of school life rather than a separate after-school programme.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Explore Beyond the Classroom', cols: 4,
          items: [
            { href: 'prep-sport.html', heading: 'Sport', description: 'Football, netball, athletics, gymnastics and swimming.', imageLabel: 'Prep pupils playing football', linkText: 'Explore Sport' },
            { href: 'prep-music.html', heading: 'Music', description: 'Choir, orchestra and termly concerts.', imageLabel: 'Prep pupils in choir practice', linkText: 'Explore Music' },
            { href: 'prep-drama.html', heading: 'Drama', description: 'Drama club, building towards termly productions.', imageLabel: 'Prep pupils rehearsing a play', linkText: 'Explore Drama' },
            { href: 'prep-clubs.html', heading: 'Clubs', description: 'A flavour of the dozens of clubs on offer, from coding to gardening.', imageLabel: 'Prep pupils at a lunchtime club', linkText: 'Explore Clubs' },
          ],
        },
      },
      { component: 'wf-text-media', props: { heading: 'Academic & STEM', side: 'right', mediaLabel: 'Prep pupils in a coding club', body: ['Chess, coding, science club and public speaking, for pupils who want to go further.'] } },
      { component: 'wf-text-media', props: { heading: 'Forest School', side: 'left', mediaLabel: 'Prep pupils at forest school', body: ['Regular sessions in our own woodland, plus a gardening club, building confidence and practical skills outdoors.'] } },
      { component: 'wf-text-media', props: { heading: 'Trips & Visits', side: 'right', mediaLabel: 'Prep pupils on a school trip', body: ['Day trips and residentials that get pupils outside the classroom, from local museums to adventurous residential trips in the later Prep years.'] } },
      bookVisitPromo('cta-prep-beyond-classroom-promo'),
    ],
  },

  'prep-sport': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Prep Sport', body: 'Every Prep pupil gets a go at every sport, from their first term onwards.',
        mediaLabel: 'Prep pupils playing football', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Beyond the Classroom', href: 'prep-beyond-the-classroom.html' }, { label: 'Sport', href: 'prep-sport.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Football, netball, athletics, gymnastics and swimming are all part of the weekly timetable, alongside house matches and fixtures against other schools.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Sports on offer', cols: 3,
          items: [
            { heading: 'Football', description: 'Taught from Alpha (Year 3) onwards, with inter-school fixtures.' },
            { heading: 'Netball', description: 'One of the most popular team sports at the Prep.' },
            { heading: 'Athletics', description: 'Track and field, building up to house sports day.' },
            { heading: 'Gymnastics', description: 'Taught in our multi-purpose sports hall.' },
            { heading: 'Swimming', description: 'Taught in the school’s own 24m indoor pool.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: a fuller picture of fixtures and house sport to be supplied by the Prep.'] } },
      bookVisitPromo('cta-prep-sport-promo'),
    ],
  },

  'prep-music': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Prep Music', body: 'Every Prep pupil sings, and many go on to play in an ensemble.',
        mediaLabel: 'Prep pupils in choir practice', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Beyond the Classroom', href: 'prep-beyond-the-classroom.html' }, { label: 'Music', href: 'prep-music.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Choir is part of school life for every Prep pupil, with an orchestra and smaller ensembles open to those learning an instrument. The year builds towards termly concerts, performed in front of family and friends.'] } },
      { component: 'wf-text-media', props: { heading: 'Individual music lessons', side: 'right', mediaLabel: 'Prep pupil having a violin lesson', body: ['Individual lessons are available on most orchestral instruments and piano, taught by specialist visiting teachers.'], links: [{ label: 'See Scholarships & Awards', href: 'scholarships-awards.html' }] } },
      bookVisitPromo('cta-prep-music-promo'),
    ],
  },

  'prep-drama': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Prep Drama', body: 'Confidence on stage, built from Alpha (Year 3) onwards.',
        mediaLabel: 'Prep pupils rehearsing a play', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Beyond the Classroom', href: 'prep-beyond-the-classroom.html' }, { label: 'Drama', href: 'prep-drama.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Drama club runs weekly for pupils who want to go further than classroom drama lessons, building towards a termly production that every year group gets the chance to be part of.'] } },
      bookVisitPromo('cta-prep-drama-promo'),
    ],
  },

  // New page (client request, 2026-11-13): clubs beyond Sport/Music/Drama change regularly, so
  // rather than maintaining a fixed list here, this gives a flavour of the categories on offer.
  'prep-clubs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Prep Clubs', body: 'Dozens of clubs to try, alongside Sport, Music and Drama.',
        mediaLabel: 'Prep pupils at a lunchtime club', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Beyond the Classroom', href: 'prep-beyond-the-classroom.html' }, { label: 'Clubs', href: 'prep-clubs.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Beyond Sport, Music and Drama, Prep pupils can try all sorts of lunchtime and after-school clubs - the exact list changes every term, so this page gives a flavour rather than a fixed menu.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'A flavour of our clubs', cols: 4,
          items: [
            { heading: 'Academic & STEM', description: 'Chess, coding and science club.' },
            { heading: 'Creative', description: 'Art, craft and gardening club.' },
            { heading: 'Active', description: 'Dance, multi-sports and Forest School extras.' },
            { heading: 'Community', description: 'Eco club and pupil voice groups.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: clubs change each term, so the real build should pull this list from a live, regularly-updated source rather than maintaining it as static page content.'] } },
      bookVisitPromo('cta-prep-clubs-promo'),
    ],
  },

  // Stage-specific Pastoral Care pages (client request, 2026-11-13), replacing the single
  // whole-school Pastoral Care & Houses page: each stage now has its own page, nav-childed and
  // breadcrumbed under its own stage, with a stage-specific H1/title so the three don't compete
  // in search. The Chaplain and Learning for Life sections (both whole-school in substance) move
  // to the Senior page, matching where Learning for Life lived historically (senior-learning-for-life.html).
  'prep-pastoral-care': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Pastoral Care at the Prep', body: 'How every Prep pupil is known and supported, from their very first day.',
        mediaLabel: 'Form teacher greeting pupils in the morning',
        breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Pastoral Care', href: 'prep-pastoral-care.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['A single form teacher sees each Prep class through most of the school day, giving children one consistent, trusted adult to turn to. Our learning support team works closely with form teachers to spot and support any child who needs extra help early.', 'Wraparound care is available before and after the school day, so working families have flexibility without disrupting their child’s routine.'] } },
      { component: 'wf-text', props: { heading: 'Houses', body: ['Every Prep pupil belongs to one of the school’s houses, shared with the Senior School and Sixth Form, giving them a ready-made community outside their own class. Houses compete throughout the year in sport, music and other events.', 'Wireframe note: house names, colours and the points system to be supplied by the school.'] } },
      bookVisitPromo('cta-prep-pastoral-care-promo'),
    ],
  },

  'senior-pastoral-care': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Pastoral Care in the Senior School', body: 'How every Senior pupil is known, supported and challenged.',
        mediaLabel: 'Tutor group meeting',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Pastoral Care', href: 'senior-pastoral-care.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Every Senior pupil belongs to a tutor group and a house, giving them two overlapping communities and several trusted adults beyond their subject teachers. Heads of Year and school counsellors provide additional support where it’s needed.'] } },
      { component: 'wf-text', props: { heading: 'Houses', body: ['Every Senior pupil belongs to one of the school’s houses, shared with the Prep and Sixth Form. Houses compete throughout the year in sport, music and other events, giving pupils a ready-made community outside their own year group.', 'Wireframe note: house names, colours and the points system to be supplied by the school.'] } },
      {
        component: 'wf-text-media', props: {
          heading: 'The Chaplain', side: 'right', mediaLabel: 'Pupils in the Chapel',
          body: ['The Chaplain has a pastoral role across the whole school, not only in Chapel services - available to any pupil, of any faith or none, who wants someone to talk to.'],
          links: [{ label: 'Spiritual Life in Community & Partnerships', href: 'school-life-community.html' }],
        },
      },
      {
        component: 'wf-text-media', anchorId: 'learning-for-life', props: {
          heading: 'Learning for Life', side: 'left', mediaLabel: 'Pupils in a Learning for Life discussion',
          body: ['Our timetabled programme for the things that matter beyond exams, covering health and wellbeing, relationships and living in the wider world.', 'Wireframe note: the themes below are placeholders. Final content should come from the existing Learning for Life Programme document, which this page replaces as the version families find in search.'],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'What the Learning for Life programme covers', cols: 3,
          items: [
            { category: 'Placeholder theme', heading: 'Health and wellbeing', description: 'One or two lines on what pupils cover under this theme.', imageLabel: 'Pupils in a wellbeing session' },
            { category: 'Placeholder theme', heading: 'Relationships', description: 'One or two lines on what pupils cover under this theme.', imageLabel: 'Pupils in a group discussion' },
            { category: 'Placeholder theme', heading: 'Living in the wider world', description: 'One or two lines on what pupils cover under this theme.', imageLabel: 'Pupils at a careers talk' },
          ],
        },
      },
      {
        component: 'wf-table', props: {
          heading: 'Learning for Life: year by year',
          rowHeader: 'Year group',
          columns: ['Focus'],
          rows: [
            { label: 'Years 7 and 8', cells: ['To be supplied'] },
            { label: 'Year 9', cells: ['To be supplied'] },
            { label: 'Years 10 and 11', cells: ['To be supplied'] },
          ],
        },
      },
      bookVisitPromo('cta-senior-pastoral-care-promo'),
    ],
  },

  'sixth-form-pastoral-care': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Pastoral Care in the Sixth Form', body: 'How every Sixth Former is known, supported and challenged.',
        mediaLabel: 'Tutor group meeting',
        breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Pastoral Care', href: 'sixth-form-pastoral-care.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers keep their tutor and house, with a dedicated Head of Sixth Form overseeing the year group and its particular pressures - university or career choices, increased independence, and balancing study with leading clubs and societies.'] } },
      { component: 'wf-text', props: { heading: 'Houses', body: ['Every Sixth Former keeps the house they joined lower down the school, shared with the Prep and Senior School, and continues to compete in house events throughout their final two years.', 'Wireframe note: house names, colours and the points system to be supplied by the school.'] } },
      bookVisitPromo('cta-sixth-form-pastoral-care-promo'),
    ],
  },

  // Whole-school page (client request), moved out of Pastoral Care and promoted from a
  // Senior-only page - carries over senior-learning-support.html's content, broadened to cover
  // every stage. See prep.html, senior.html and sixth-form.html for the highlighted landing-page
  // section pointing here.
  'learning-support': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Learning Support', body: 'Every learner understood, supported and empowered, from the Prep through to the Sixth Form.',
        mediaLabel: 'Learning support session',
        // Whole-school master page, tree-parented under About (sitemap tool only - see About's
        // sitemapChildren in primaryNav) even though its real nav home is Prep/Senior/Sixth Form.
        breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Learning Support', href: 'learning-support.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['We believe every child deserves to thrive. Our Learning Support department works closely with pupils, parents and teachers, taking a proactive, tailored approach to supporting pupils with special educational needs and disabilities (SEND), from their very first days in the Prep through to the Sixth Form.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'How support works', cols: 3,
          items: [
            { category: 'Placeholder', heading: 'Understanding each learner', description: 'How needs are identified, at entry and during a pupil’s time here.' },
            { category: 'Placeholder', heading: 'Support in and beyond lessons', description: 'What support looks like day to day, including exam access arrangements.' },
            { category: 'Placeholder', heading: 'Working with families', description: 'How parents are kept involved and who to contact.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: the live page says little beyond its introduction, so the three areas above are a suggested structure for the department to fill.'] } },
      { component: 'wf-text-media', props: { heading: 'Starting early, in the Prep', side: 'right', mediaLabel: 'Form teacher working with a Prep pupil', body: ['In the Prep, the learning support team works alongside form teachers to spot and support any child who needs extra help early, so support is already in place well before Senior entry if a pupil needs it.'], links: [{ label: 'See our SEND Policy', href: 'about-policies-procedures.html' }] } },
      faqs([
        { heading: 'How do I tell the school about my child’s needs?', body: 'Wireframe note: to be supplied. Draft answer: tell us when you register, so support can be planned before your child joins.', ctaLabel: 'Contact admissions', ctaHref: 'contact.html' },
        { heading: 'Does learning support cost extra?', body: 'Wireframe note: to confirm with the Bursar.' },
      ], 'Learning support questions'),
      bookVisitPromo('cta-learning-support-promo'),
    ],
  },

  'prep-staff': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Meet the Staff', body: 'The teachers and support staff who lead the Prep years.',
        mediaLabel: 'Prep teaching staff group photo', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Meet the Staff', href: 'prep-staff.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-cards', props: {
          heading: 'Prep leadership', cols: 3,
          items: [
            { heading: 'Head of Prep', description: 'Leads the Prep years and its teaching staff.', imageLabel: 'Head of Prep' },
            { heading: 'Deputy Head of Prep, Pastoral', description: 'Oversees wellbeing and pastoral support.', imageLabel: 'Deputy Head of Prep, Pastoral' },
            { heading: 'Deputy Head of Prep, Academic', description: 'Leads curriculum and teaching standards.', imageLabel: 'Deputy Head of Prep, Academic' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Alongside our form teachers, Prep pupils are taught by specialists across every subject, many of whom also teach in the Senior School, giving Prep children an early taste of the expertise they’ll continue to learn from.'] } },
      bookVisitPromo('cta-prep-staff-promo'),
    ],
  },

  // --- 11+ Senior ---------------------------------------------------------

  senior: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-senior-hero-book',
        eyebrow: '11+ Senior', heading: 'Academic ambition, genuine warmth', body: 'From Year 7 to Year 11, pupils are stretched academically and known individually.',
        mediaLabel: 'Senior pupils in a classroom discussion', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['11+ is Bancroft’s largest entry point. Pupils join a school that combines academic selectivity with a genuinely broad co-curricular life, on grounds that back onto Epping Forest itself.'] } },
      {
        component: 'wf-text-media', props: {
          heading: 'Why Bancroft’s', side: 'right', mediaLabel: 'Senior pupils outside the main building',
          body: ['What makes the Senior years distinctive.'], ctaLabel: 'Read why families choose us', ctaHref: 'senior-why.html',
        },
      },
      { component: 'wf-text-media', props: { heading: 'Senior School Life', side: 'left', mediaLabel: 'Senior pupils between lessons', body: ['What a day in the Senior School looks and feels like.'], ctaLabel: 'See Senior School Life', ctaHref: 'senior-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Academic Life', side: 'right', mediaLabel: 'Senior pupils in a science lesson', body: ['Subjects studied from Year 7 to GCSE.'], ctaLabel: 'See Academic Life', ctaHref: 'senior-academic-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Beyond the Classroom', side: 'left', mediaLabel: 'Pupils on the sports pitch', body: ['Sport, music, drama and 250+ clubs and societies, from debating to Duke of Edinburgh.'], ctaLabel: 'Explore Beyond the Classroom', ctaHref: 'senior-beyond-the-classroom.html' } },
      { component: 'wf-text-media', props: { heading: 'Pastoral Care', side: 'right', mediaLabel: 'Tutor group meeting', body: ['How every Senior pupil is known, supported and challenged.'], ctaLabel: 'Read about pastoral care', ctaHref: 'senior-pastoral-care.html' } },
      { component: 'wf-promo', props: { heading: 'Results & Destinations', body: 'GCSE outcomes and how pupils are stretched and supported.', ctaLabel: 'See our results', ctaHref: 'results-destinations.html', ctaId: 'cta-senior-results-overview-promo', mediaLabel: 'Pupils on GCSE results day' } },
      // Learning Support: a highlighted section on every stage landing page (client request).
      { component: 'wf-promo', props: { heading: 'Learning Support', body: 'A proactive, tailored approach for pupils with additional needs, from Year 7 through to the Sixth Form.', ctaLabel: 'Read about Learning Support', ctaHref: 'learning-support.html', ctaId: 'cta-senior-learning-support-promo', mediaLabel: 'Learning support session' } },
      // "Joining at 11+" - the admissions summary that makes this overview work as the 11+
      // hub the SEO report asks for (process, key dates, fees, assessment). Detail stays on the Journey page.
      {
        component: 'wf-timeline', props: {
          heading: 'Joining at 11+',
          items: [
            { heading: 'Visit', description: 'Come to an Open Morning or book a personal tour.' },
            { heading: 'Register', description: 'Registration opens in the spring of Year 5.' },
            { heading: 'Assess', description: 'English and Maths assessments and an interview in January of Year 6.' },
            { heading: 'Offer', description: 'Offers are made in February.' },
          ],
        },
      },
      {
        component: 'wf-table', props: {
          heading: 'Key dates for 11+ entry',
          rowHeader: 'Stage', columns: ['When'],
          rows: [
            { label: 'Open Morning', cells: ['Thursday 17 September 2026'] },
            { label: 'Registration opens', cells: ['Spring of Year 5'] },
            { label: 'Registration closes', cells: ['Autumn of Year 6'] },
            { label: 'Assessments and interview', cells: ['January of Year 6'] },
            { label: 'Offers made', cells: ['February of Year 6'] },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Fees and assessment', cols: 3,
          items: [
            { href: 'fees.html', heading: 'Fees', description: '£10,400 a term for the Senior School, including VAT. Scholarships and bursaries are available.', linkText: 'See fees' },
            { href: 'admissions-11plus-past-papers.html', heading: 'Assessment', description: 'English and Maths papers and an interview, with past papers to practise.', linkText: 'See the past papers' },
            { href: 'admissions-11plus-journey.html', heading: 'Your full 11+ journey', description: 'Every step of the process, in detail.', linkText: 'See the 11+ journey' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: dates match the 11+ Exam & Past Papers page; exact dates for each year to be supplied by admissions.'] } },
      {
        component: 'wf-text-media', props: {
          heading: 'Preparing for the 11+?', side: 'right', mediaLabel: 'Pupil working through a practice paper',
          body: ['See what the 11+ assessment involves, with past Maths and English papers to practise with.'],
          ctaLabel: 'See the 11+ exam and past papers', ctaHref: 'admissions-11plus-past-papers.html',
        },
      },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Senior parent about choosing Bancroft’s.', attribution: 'Year 8 parent' },
      ] } },
      faqs([
        { heading: 'What subjects do pupils study?', body: 'Pupils begin with eighteen subjects across Years 7 and 8, before choosing their GCSE options.', ctaLabel: 'See Academic Life', ctaHref: 'senior-academic-life.html' },
        { heading: 'How do Bancroft’s GCSE results compare?', body: 'Our results are published each year, with a five-year view alongside.', ctaLabel: 'See Results & Destinations', ctaHref: 'results-destinations.html' },
        { heading: 'When do clubs take place?', body: 'Most clubs run during the school day. (Wireframe note: to be confirmed with the school.)', ctaLabel: 'See Beyond the Classroom', ctaHref: 'senior-beyond-the-classroom.html' },
        { heading: 'How are pupils supported?', body: 'Every pupil belongs to a tutor group and a house, with Heads of Year and school counsellors providing additional support.', ctaLabel: 'Read about Pastoral Care', ctaHref: 'senior-pastoral-care.html' },
        { heading: 'How will my child get to school?', body: 'Bancroft’s is a short walk from the Central Line and is served by our own school bus service.', ctaLabel: 'Getting to Bancroft’s', ctaHref: 'getting-to-bancrofts.html' },
        { heading: 'How do new pupils settle in?', body: 'An induction day in the summer term, a tutor group and a house mean new pupils start September with familiar faces.', ctaLabel: 'See Starting at Bancroft’s', ctaHref: 'admissions-starting.html' },
        { heading: 'Are scholarships and bursaries available?', body: 'Yes. Academic scholarships, Music Awards and means-tested bursaries are all available at 11+.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html' },
        { heading: 'When do we need to register for 11+?', body: 'Registration opens in the spring of Year 5 and typically closes in the autumn of Year 6.', ctaLabel: 'Register Online', ctaHref: 'register-11plus.html' },
      ], 'Senior School questions'),
      { component: 'wf-cards', props: {
        heading: 'Latest news', cols: 2,
        items: [
          { href: 'news-article-a.html', category: 'Senior', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', description: 'Another year of strong outcomes across the Senior School, with many pupils exceeding expectations.', imageLabel: 'Pupils celebrating results day', linkText: 'Read the story' },
          { href: 'news-article-c.html', category: 'Senior', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby, capping a strong year across our sports programme.', imageLabel: 'First XV rugby team', linkText: 'Read the story' },
        ],
      } },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to take the next step?', side: 'left', mediaLabel: 'Parent completing a registration form',
          body: ['See how registration and assessment work at 11+, or come and see Bancroft’s Senior for yourself.'],
          ctaLabel: 'Start your 11+ journey', ctaHref: 'admissions-11plus-journey.html', ctaId: 'cta-senior-hero-journey',
          secondaryLabel: 'Book a Visit', secondaryHref: 'book-a-visit.html',
        },
      },
    ],
  },

  'senior-why': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Why Bancroft’s', body: 'Academic rigour that doesn’t come at the cost of a rounded school life.',
        mediaLabel: 'Senior pupils in the library', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Why Bancroft’s', href: 'senior-why.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Bancroft’s sits on the edge of Epping Forest, with direct access to its own grounds, yet is minutes from the Central Line and well connected across East London and Essex. Few schools combine that setting with our academic results.', 'Being part of a through-school from 7 to 18 means Senior pupils learn alongside friends they’ve known since Prep, and near Sixth Formers who show them what’s ahead.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Bancroft’s pushed me academically without ever making school feel like pressure. I found things I loved outside the classroom too.', attribution: 'Year 11 pupil' },
      ] } },
      {
        component: 'wf-cards', props: {
          heading: 'The evidence', cols: 2,
          items: [
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'This year’s outcomes, with a five-year view.' },
            { href: 'about-awards-recognition.html', heading: 'Awards and Recognition', description: 'League tables, inspection reports and awards.' },
          ],
        },
      },
      bookVisitPromo('cta-senior-why-promo'),
    ],
  },

  // New page (client request) - Senior never had a day-in-the-life page of its own, unlike Prep
  // and Sixth Form, which both already did.
  'senior-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Senior School Life', body: 'What a day in the Senior School looks and feels like, from the Third Form to GCSE.',
        mediaLabel: 'Senior pupils between lessons', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Senior School Life', href: 'senior-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Senior pupils move between specialist teachers and subjects throughout the day, with a tutor group and house providing a steady point of contact alongside that variety. Lunch is almost an hour and a half, long enough to eat, socialise and still get to a club.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'A typical day',
          items: [
            { heading: 'Tutor time', description: 'A check-in with your tutor group before lessons start.' },
            { heading: 'Morning lessons', description: 'Taught by subject specialists across a broad timetable.' },
            { heading: 'Lunch and clubs', description: 'Almost ninety minutes to eat, socialise and get to a club.' },
            { heading: 'Afternoon', description: 'More lessons, sport or a society meeting.' },
            { heading: 'Home time', description: 'The school bus, or clubs and fixtures that run on after the bell.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: timings for each part of the day to be supplied by the Senior School.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a short quote from a Senior pupil about their favourite part of the school day.', attribution: 'Senior pupil, Year 9' },
      ] } },
      { component: 'wf-text-media', props: { heading: 'Beyond the timetable', side: 'left', mediaLabel: 'Pupils at a lunchtime club', body: ['Most clubs run during the school day rather than as a separate after-school programme, so getting involved doesn’t mean a longer day.'], ctaLabel: 'Explore Beyond the Classroom', ctaHref: 'senior-beyond-the-classroom.html' } },
      {
        component: 'wf-cards', props: {
          heading: 'The practical side', cols: 4,
          items: [
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s for lunch this week.' },
            { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'Routes, timings and how to book.' },
            { href: 'uniform.html', heading: 'Uniform', description: 'What to buy and where from.' },
            { href: 'term-dates.html', heading: 'Term Dates', description: 'Term starts, half terms and holidays.' },
          ],
        },
      },
      bookVisitPromo('cta-senior-life-promo'),
    ],
  },

  // Master page (client request), replacing three separate pages: senior-academic-results.html
  // (GCSE), sixth-form-examination-results.html (A Level) and sixth-form-leavers-destinations.html
  // (destinations) - all three merged in now rather than left half-stubbed, since the content
  // already existed and this is a straightforward migration, not new authoring. Listed in the
  // About menu (hence the breadcrumb/eyebrow); linked prominently from the 11+ Senior and
  // 16+ Sixth Form menus, both Academic Life pages and the homepage storyboard (pending that
  // pass - see PROTOTYPE.md).
  'results-destinations': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Results & Destinations', body: 'Strong, consistent GCSE and A Level outcomes, and where they take pupils next, updated every August.',
        mediaLabel: 'Pupils reviewing exam results', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Results & Destinations', href: 'results-destinations.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'GCSE Results', body: ['Strong, consistent GCSE outcomes across the full range of subjects.'] } },
      { component: 'wf-statistics', props: { heading: 'GCSE results at a glance', items: [
        { value: '99%', label: 'Grades 9 to 4' },
        { value: '70%', label: 'Grades 9 to 7' },
        { value: '25+', label: 'Subjects offered at GCSE' },
        { value: '100%', label: 'Progression to Sixth Form or equivalent' },
      ] } },
      {
        component: 'wf-table', props: {
          heading: 'GCSE: five-year view',
          rowHeader: 'Year',
          columns: ['Grades 9 to 7', 'Grades 9 to 4'],
          rows: [
            { label: '2026', cells: ['70%', '99%'] },
            { label: '2025', cells: ['To be supplied', 'To be supplied'] },
            { label: '2024', cells: ['To be supplied', 'To be supplied'] },
            { label: '2023', cells: ['To be supplied', 'To be supplied'] },
            { label: '2022', cells: ['To be supplied', 'To be supplied'] },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'GCSE subject highlights', cols: 3,
          items: [
            { category: 'Placeholder', heading: 'Maths', description: 'Headline figure and one line of context.' },
            { category: 'Placeholder', heading: 'Sciences', description: 'Headline figure and one line of context.' },
            { category: 'Placeholder', heading: 'Languages', description: 'Headline figure and one line of context.' },
          ],
        },
      },
      { component: 'wf-text', props: { heading: 'A Level Results', body: ['Consistently strong A Level outcomes across a genuinely broad subject range.'] } },
      { component: 'wf-statistics', props: { heading: 'A Level results at a glance', items: [
        { value: '99%', label: 'Grades A* to C' },
        { value: '55%', label: 'Grades A* to A' },
        { value: '25+', label: 'Subjects offered at A Level' },
        { value: '95%', label: 'Progressed to first-choice university' },
      ] } },
      {
        component: 'wf-table', props: {
          heading: 'A Level: five-year view',
          rowHeader: 'Year',
          columns: ['Grades A* to A', 'Grades A* to C'],
          rows: [
            { label: '2026', cells: ['55%', '99%'] },
            { label: '2025', cells: ['To be supplied', 'To be supplied'] },
            { label: '2024', cells: ['To be supplied', 'To be supplied'] },
            { label: '2023', cells: ['To be supplied', 'To be supplied'] },
            { label: '2022', cells: ['To be supplied', 'To be supplied'] },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'A Level subject highlights', cols: 3,
          items: [
            { category: 'Placeholder', heading: 'Maths and Further Maths', description: 'Headline figure and one line of context.' },
            { category: 'Placeholder', heading: 'Sciences', description: 'Headline figure and one line of context.' },
            { category: 'Placeholder', heading: 'Humanities', description: 'Headline figure and one line of context.' },
          ],
        },
      },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a short quote from a recent Year 11 pupil about their results and what they are going on to study.', attribution: 'Year 11 pupil, 2026' },
        { quote: 'Placeholder for a short quote from a recent leaver about their results and where they are going next.', attribution: 'Upper Sixth leaver, 2026' },
      ] } },
      { component: 'wf-text', props: { heading: 'Beyond the headline figures', body: ['We track value added as closely as raw grades, at both GCSE and A Level: how far each pupil has progressed against their own starting point, not just against a national average. Subject-by-subject breakdowns are available from our admissions and academic teams on request.'] } },
      { component: 'wf-text', props: { heading: 'Leavers’ Destinations', body: ['Recent leavers have gone on to a wide range of universities, apprenticeships and careers.'] } },
      { component: 'wf-statistics', props: { heading: 'Recent leavers, at a glance', items: [
        { value: '95%', label: 'Progressed to their first-choice university' },
        { value: '30+', label: 'Universities represented last year' },
        { value: '10%', label: 'Progressed to Russell Group or equivalent' },
        { value: '5%', label: 'Chose an apprenticeship or direct career route' },
      ] } },
      { component: 'wf-text-media', props: { body: ['Our careers and higher education team supports every pupil individually, from work experience placements in Year 12 to personal statement guidance and interview preparation. We track destinations closely so our advice reflects what genuinely helps.'], side: 'left', mediaLabel: 'Pupil in a careers guidance session', ctaLabel: 'Preparing for Life Beyond Bancroft’s', ctaHref: 'sixth-form-preparing-for-life.html' } },
      {
        component: 'wf-cards', props: {
          heading: 'See also', cols: 3,
          items: [
            { href: 'about-awards-recognition.html', heading: 'Awards and Recognition', description: 'League tables, inspection reports and awards.' },
            { href: 'senior-academic-life.html', heading: 'Senior Academic Life', description: 'Subjects studied from Year 7 to GCSE.' },
            { href: 'sixth-form-academic-life.html', heading: 'Sixth Form Academic Life', description: 'A Level subjects and how choices are guided.' },
          ],
        },
      },
      faqs([
        { heading: 'How do Bancroft’s results compare with other schools?', body: 'League table positions and inspection outcomes are kept together on one page.', ctaLabel: 'See Awards and Recognition', ctaHref: 'about-awards-recognition.html' },
        { heading: 'How many GCSEs do pupils take?', body: 'Typically ten: six compulsory subjects and at least one modern language, plus three further options.', ctaLabel: 'See Senior Academic Life', ctaHref: 'senior-academic-life.html' },
        { heading: 'Which A Level subjects are offered?', body: 'More than 25 subjects, spanning the sciences, humanities, languages, arts and social sciences.', ctaLabel: 'See Sixth Form Academic Life', ctaHref: 'sixth-form-academic-life.html' },
        { heading: 'Can I see results by subject?', body: 'Subject-by-subject breakdowns are available from our admissions and academic teams on request.', ctaLabel: 'Contact admissions', ctaHref: 'contact.html' },
        { heading: 'What happens after GCSEs?', body: 'Progression into the Sixth Form is automatic for pupils meeting the normal academic requirements.', ctaLabel: 'See Joining at 16+', ctaHref: 'admissions-16plus-journey.html' },
      ], 'Results and destinations questions'),
      bookVisitPromo('cta-results-destinations-promo'),
    ],
  },

  'senior-academic-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Academic Life', body: 'A broad Third Form and Removes, followed by a well-supported route through GCSE options.',
        mediaLabel: 'Senior pupils in a humanities lesson', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Academic Life', href: 'senior-academic-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Third Form and Removes (Years 7-8)', body: ['Pupils begin with eighteen subjects across two years, mostly in mixed-ability groups, with only Maths taught in sets. Science is taught as one combined course, covering Physics, Chemistry and Biology together, alongside the connections between them.', 'Two languages are chosen from French, German and Spanish, continuing through the Removes. Music, Drama, Art, Design Technology and Computer Science are compulsory for everyone, with Computer Science moving into Python programming by the Removes.'] } },
      { component: 'wf-text-media', props: { heading: 'GCSE options', side: 'right', mediaLabel: 'Pupils in a GCSE options meeting', body: ['At GCSE, six subjects are compulsory: Maths, English Language, English Literature, Biology, Chemistry and Physics, alongside at least one modern language. Pupils then choose three more from fifteen further options, guided by subject teachers, tutors and our careers team.', 'Wireframe note: client idea for the real build - each subject’s full detail (content, assessment, trips) opens in a modal rather than its own page, provided the content is still crawlable by search engines (e.g. rendered in the page’s HTML, just visually hidden until opened). Not built here.'] } },
      { component: 'wf-text', props: { heading: 'Accelerated Maths', body: ['Pupils in the top Maths sets can sit their GCSE at the end of Year 10, then continue with an enriched course towards the Additional Maths qualification (FSMQ) in Year 11.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Related pages', cols: 3,
          items: [
            { href: 'senior-beyond-the-classroom.html#trips-visits', heading: 'Trips & Visits', description: 'History, geography and language trips that extend what is taught in lessons.' },
            { href: 'senior-pastoral-care.html#learning-for-life', heading: 'Learning for Life', description: 'The timetabled programme that sits alongside academic subjects.' },
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'See how this curriculum translates into outcomes.' },
          ],
        },
      },
      bookVisitPromo('cta-senior-academic-life-promo'),
    ],
  },

  // Hub page (client request), replacing both Sport & Arts and Co-Curriculum. Sport, Music and
  // Drama are each promoted to their own page (Music/Drama renamed from senior-arts-music/drama;
  // Sport keeps its existing page, rewritten - see senior-sport.html). CCF, Duke of Edinburgh's
  // Award, Sea Scouts and Trips & Visits become concise sections here instead of their own pages
  // (client request) - each kept to its own heading so they stay scannable despite losing their
  // old page-length depth. Visual Arts is deleted outright (client request), not migrated.
  'senior-beyond-the-classroom': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Beyond the Classroom', body: 'An impressive array of clubs, sport and the arts run throughout the year, and the number keeps growing.',
        mediaLabel: 'Pupils at a lunchtime club', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Beyond the Classroom', href: 'senior-beyond-the-classroom.html' }),
      },
    },
    blocks: [
      { component: 'wf-statistics', props: { heading: 'The scale of it', items: [
        { value: '250+', label: 'Clubs and societies held throughout the year' },
      ] } },
      { component: 'wf-text', props: { body: ['Our school day is designed around it: lunch is almost an hour and a half, so eating, socialising and getting to a club can all happen without anything being squeezed in after hours. Most clubs run during the school day rather than as a separate paid programme.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Explore Beyond the Classroom', cols: 4,
          items: [
            { href: 'senior-sport.html', heading: 'Sport', description: 'Nine sports, from house fixtures to national competition.', imageLabel: 'Pupils training on the sports pitch', linkText: 'Explore Sport' },
            { href: 'senior-music.html', heading: 'Music', description: 'Orchestras, choirs and bands, with an annual concert at Drapers’ Hall.', imageLabel: 'School orchestra in rehearsal', linkText: 'Explore Music' },
            { href: 'senior-drama.html', heading: 'Drama', description: 'Two major productions a year, plus House Drama and LAMDA.', imageLabel: 'Pupils in a drama rehearsal', linkText: 'Explore Drama' },
            { href: 'senior-clubs.html', heading: 'Clubs', description: 'A flavour of the 250+ clubs and societies on offer.', imageLabel: 'Pupils at a lunchtime club', linkText: 'Explore Clubs' },
          ],
        },
      },
      { component: 'wf-text-media', props: { heading: 'Academic & STEM', side: 'right', mediaLabel: 'Pupils in a debating society', body: ['Debating, Model United Nations, robotics and subject societies for pupils who want to go deeper.'] } },
      { component: 'wf-text', props: { heading: 'CCF', body: ['The Combined Cadet Force gives pupils from Year 9 upwards the chance to take part in adventurous activity and personal development, with an Army Section and an RAF Flight. The contingent meets weekly, with activities from shooting and first aid to fieldcraft and an annual camp.'] } },
      { component: 'wf-text', props: { heading: 'Duke of Edinburgh’s Award', body: ['Bancroft’s has run the Duke of Edinburgh’s Award since 1976, as one of the largest Directly Licensed Centres in London. Every pupil from Year 9 upwards can take part, at Bronze, Silver and Gold, with the school running its own expeditions through to Gold assessments in Snowdonia.'] } },
      { component: 'wf-text', props: { heading: 'Sea Scouts', body: ['The school’s own Scout group is open to boys and girls from Prep 2 (Year 5) to Year 9, with sailing, kayaking and rowing at Fairlop Waters alongside the usual range of Scouting activities and an annual summer camp.'] } },
      {
        component: 'wf-text', anchorId: 'trips-visits', props: { heading: 'Trips & Visits', body: ['A wide range of trips runs every year: History’s Rochester Castle and First World War battlefield visits, Geography field trips as far as Iceland and Ecuador, language immersion trips, ski trips, and volunteering projects in Costa Rica and Peru.'] },
      },
      { component: 'wf-text-media', props: { heading: 'Community & Volunteering', side: 'left', mediaLabel: 'Pupils volunteering in the local community', body: ['Peer mentoring, charity fundraising and partnerships with local schools and community groups.'] } },
      bookVisitPromo('cta-senior-beyond-classroom-promo'),
    ],
  },


  // --- Sport (off primary nav — reached via Sport & Arts, the homepage, and News) ---

  // Each sport is now a section here rather than its own page (client request); the nine
  // individual sport pages are deleted, their standout facts folded into these descriptions.
  'senior-sport': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Sport at Bancroft’s', body: 'Nine sports, dozens of teams, and a programme built for every level, from house fixtures to national competition.',
        mediaLabel: 'Pupils training on the sports pitch',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Beyond the Classroom', href: 'senior-beyond-the-classroom.html' }, { label: 'Sport', href: 'senior-sport.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Facilities', body: ['Bancroft’s grounds include a multi-purpose sports hall, a 24m indoor swimming pool and 17 acres of playing fields. Our West Grove playing fields add tennis and netball courts, cricket, football and rugby pitches, cricket nets and a CrossFit gym, giving every sport a proper home.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Our sports', cols: 3,
          items: [
            { heading: 'Football', description: 'One of the school’s most popular and fastest-growing sports - our First XI recently became the first Bancroft’s team to reach a national cup final.', imageLabel: 'Football training session' },
            { heading: 'Rugby', description: 'Reigning London Schools champions, built on squad depth rather than a handful of standout players.', imageLabel: 'Rugby training session' },
            { heading: 'Hockey', description: 'Competitive fixtures across every year group, with our First XI reaching a national final this season.', imageLabel: 'Hockey training session' },
            { heading: 'Netball', description: 'One of the school’s most popular team sports, with a First VII that reached a national final this season.', imageLabel: 'Netball training session' },
            { heading: 'Cricket', description: 'A full summer term fixture list, boys and girls, from Colts through to First XI level.', imageLabel: 'Cricket practice session' },
            { heading: 'Athletics', description: 'Track and field, from house sports to county level - our team reached a national final this season.', imageLabel: 'Athletics training session' },
            { heading: 'Swimming', description: 'Training in our own 24m indoor pool, with a termly house swimming gala for every pupil.', imageLabel: 'Swimming training session' },
            { heading: 'Tennis', description: 'Individual and team competition on our own courts, from weekly coaching to inter-school fixtures.', imageLabel: 'Tennis training session' },
            { heading: 'Badminton', description: 'A growing squad, open to complete beginners, competing in the National Schools’ Championships.', imageLabel: 'Badminton training session' },
          ],
        },
      },
      bookVisitPromo('cta-sport-promo'),
    ],
  },


  // Promoted to a direct child of the Beyond the Classroom hub (client request), renamed from
  // senior-arts-music.html - content carried over as-is. Defined here, before Drama, purely so
  // the sitemap tree's child order (Sport, Music, Drama) matches Prep and Sixth Form - these
  // pages are off the menu, so the tree falls back to config.ts's own definition order.
  'senior-music': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Music', body: 'An integral part of life at Bancroft’s, from the classroom to Drapers’ Hall.',
        mediaLabel: 'School orchestra in rehearsal',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Beyond the Classroom', href: 'senior-beyond-the-classroom.html' }, { label: 'Music', href: 'senior-music.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'The Music department', body: ['In their first two years, all pupils have a broad musical education covering composing, performing and listening, from classical works to contemporary styles. Older pupils can continue to GCSE and A Level.', 'Individual instrumental and vocal lessons are taught each week by around 30 visiting teachers, and pupils have regular masterclasses with professional musicians.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'Rehearsal space in the Stave', body: ['The department is based in the Stave, with a large rehearsal space, teaching and practice rooms, and a technology suite for recording and composition.'] } },
      { component: 'wf-text', props: { heading: 'Ensembles and concerts', body: ['More than fifteen orchestras, choirs, bands and ensembles rehearse each week, from Sinfonia and the Concert Band to the Big Band, Soul Band and chamber groups. Many pupils also form bands of their own.', 'Every group performs at least once a year, in school and at venues across London. The highlight is the annual concert at Drapers’ Hall in the City of London.'] } },
      { component: 'wf-text-media', props: { heading: 'Music Awards at 11+', side: 'left', mediaLabel: 'Pupil playing violin', body: ['Music Award holders receive individual tuition and a programme of masterclasses covering performance, composition, music technology and conducting.'], links: [{ label: 'See Scholarships & Awards', href: 'scholarships-awards.html' }] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'senior-drama.html', label: 'Drama' },
        { href: 'senior-sport.html', label: 'Sport' },
        { href: 'senior-clubs.html', label: 'Clubs' },
        { href: 'senior-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-music-promo'),
    ],
  },

  // Promoted to a direct child of the Beyond the Classroom hub (client request), renamed from
  // senior-arts-drama.html - content carried over as-is; only the "More in the arts" row changes,
  // since Visual Arts (and the "arts" grouping itself) no longer exist.
  'senior-drama': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Drama', body: 'Dynamic, inclusive and central to school life.',
        mediaLabel: 'Pupils in a drama rehearsal',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Beyond the Classroom', href: 'senior-beyond-the-classroom.html' }, { label: 'Drama', href: 'senior-drama.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'The Drama department', body: ['Every pupil studies Drama in Years 7 and 8, exploring genre, improvisation, physical theatre and characterisation. From Year 9 it becomes a creative option, leading on to GCSE and A Level for those who want to take it further.', 'There is as much to do off stage as on it: pupils can learn sound and lighting design, stage management and set building alongside our Theatre Technician.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'The Performing Arts Centre', body: ['Two performance spaces, the traditional Great Hall and the flexible Performing Arts Centre, are both equipped with modern sound and lighting systems.'] } },
      { component: 'wf-text', props: { heading: 'On stage', body: ['Two ambitious productions run every year, a senior show and a junior show, alongside a House Drama competition involving pupils from every year group and the Inter-House Performing Arts Competition.', 'Pupils can take LAMDA examinations up to Grade 8, and Bancroft’s companies have regularly performed at the Edinburgh Fringe. Theatre trips and workshops with visiting actors and directors run throughout the year.'] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'senior-music.html', label: 'Music' },
        { href: 'senior-sport.html', label: 'Sport' },
        { href: 'senior-clubs.html', label: 'Clubs' },
        { href: 'senior-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-drama-promo'),
    ],
  },

  // New page (client request, 2026-11-13): 250+ clubs and societies change regularly, so rather
  // than maintaining a fixed list here, this gives a flavour of the categories on offer.
  'senior-clubs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Senior Clubs & Societies', body: 'A flavour of the 250+ clubs and societies that run throughout the year.',
        mediaLabel: 'Pupils at a lunchtime club', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Beyond the Classroom', href: 'senior-beyond-the-classroom.html' }, { label: 'Clubs', href: 'senior-clubs.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Beyond Sport, Music and Drama, pupils can join clubs and societies covering almost every interest. The exact list changes every term, so this page gives a flavour rather than a fixed menu.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'A flavour of our clubs & societies', cols: 4,
          items: [
            { heading: 'Academic & Debating', description: 'Subject societies, Model United Nations and debating.' },
            { heading: 'Creative', description: 'Art, photography, film and creative writing.' },
            { heading: 'STEM', description: 'Coding, robotics and science societies.' },
            { heading: 'Community & Outdoors', description: 'Volunteering, environment and Scouting groups.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: clubs and societies change each term, so the real build should pull this list from a live, regularly-updated source rather than maintaining it as static page content.'] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'senior-sport.html', label: 'Sport' },
        { href: 'senior-music.html', label: 'Music' },
        { href: 'senior-drama.html', label: 'Drama' },
        { href: 'senior-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-senior-clubs-promo'),
    ],
  },

  // --- 16+ Sixth Form ---------------------------------------------------------

  'sixth-form': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        ctaLabel: 'Book a Visit', ctaHref: 'book-a-visit.html', ctaId: 'cta-sixthform-hero-book',
        eyebrow: '16+ Sixth Form', heading: 'The next exciting step', body: 'More independence, a more grown-up school day, and a launchpad for what comes after.',
        mediaLabel: 'Sixth Form pupils in the common room', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['Sixth Form at Bancroft’s is where pupils take real ownership of their education, in a school that still knows them individually. Some join us for the first time at 16; most have grown up here since 7 or 11.'] } },
      { component: 'wf-text-media', props: { heading: 'Why Bancroft’s Sixth Form', side: 'left', mediaLabel: 'Sixth Form pupils outside the main building', body: ['What makes the Sixth Form distinctive.'], ctaLabel: 'Read why pupils choose us', ctaHref: 'sixth-form-why.html' } },
      { component: 'wf-text-media', props: { heading: 'Sixth Form Life', side: 'right', mediaLabel: 'Sixth Form pupils in the common room', body: ['For pupils: what your days will actually be like.'], ctaLabel: 'See what Sixth Form life is like', ctaHref: 'sixth-form-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Academic Life', side: 'left', mediaLabel: 'Sixth Form pupils in a seminar', body: ['A Level subjects and how choices are guided.'], ctaLabel: 'See the subjects on offer', ctaHref: 'sixth-form-academic-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Beyond the Classroom', side: 'right', mediaLabel: 'Sixth Former leading a club', body: ['Sport, music, drama and where Sixth Formers lead clubs and societies, not just attend them.'], ctaLabel: 'Explore Beyond the Classroom', ctaHref: 'sixth-form-beyond-the-classroom.html' } },
      { component: 'wf-text-media', props: { heading: 'Pastoral Care', side: 'left', mediaLabel: 'Tutor group meeting', body: ['How every Sixth Former is known, supported and challenged.'], ctaLabel: 'Read about pastoral care', ctaHref: 'sixth-form-pastoral-care.html' } },
      { component: 'wf-promo', props: { heading: 'Results & Destinations', body: 'A Level outcomes, value added, and where recent leavers have gone on to.', ctaLabel: 'See our results', ctaHref: 'results-destinations.html', ctaId: 'cta-sixthform-results-overview-promo', mediaLabel: 'Pupils on A Level results day' } },
      // Learning Support: a highlighted section on every stage landing page (client request).
      { component: 'wf-promo', props: { heading: 'Learning Support', body: 'A proactive, tailored approach for pupils with additional needs, continuing right through to the Sixth Form.', ctaLabel: 'Read about Learning Support', ctaHref: 'learning-support.html', ctaId: 'cta-sixthform-learning-support-promo', mediaLabel: 'Learning support session' } },
      { component: 'wf-text-media', props: { heading: 'Preparing for Life Beyond Bancroft’s', side: 'right', mediaLabel: 'Pupil in a careers guidance session', body: ['Careers guidance, futures and alumni stories.'], ctaLabel: 'See what comes next', ctaHref: 'sixth-form-preparing-for-life.html' } },
      // "Joining at 16+" - the admissions summary that makes this overview work as the 16+
      // hub the SEO report asks for (process, key dates, fees, assessment). Detail stays on the Journey page.
      {
        component: 'wf-timeline', props: {
          heading: 'Joining at 16+',
          items: [
            { heading: 'Visit', description: 'Come to a Sixth Form Open Evening or book a personal tour.' },
            { heading: 'Register', description: 'Register your interest online. There is no registration fee at 16+.' },
            { heading: 'Interview and assessment', description: 'An interview and, for some subjects, a short written task.' },
            { heading: 'Offer', description: 'Offers are usually made by the end of the spring term, conditional on GCSE results.' },
          ],
        },
      },
      {
        component: 'wf-table', props: {
          heading: 'Key dates for 16+ entry',
          rowHeader: 'Stage', columns: ['When'],
          rows: [
            { label: 'Open Evening', cells: ['Thursday 8 October 2026'] },
            { label: 'Registration closes', cells: ['To be supplied'] },
            { label: 'Interviews', cells: ['To be supplied'] },
            { label: 'Offers made', cells: ['By the end of the spring term'] },
            { label: 'GCSE results', cells: ['August'] },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Fees and assessment', cols: 3,
          items: [
            { href: 'fees.html', heading: 'Fees', description: 'Sixth Form fees are the Senior School fee, £10,400 a term including VAT. Scholarships and bursaries are available.', linkText: 'See fees' },
            { href: 'admissions-16plus-journey.html', heading: 'Assessment', description: 'Places are offered on predicted GCSE grades, an interview and, for some subjects, a short written task.', linkText: 'What to expect' },
            { href: 'admissions-16plus-journey.html', heading: 'Your full 16+ journey', description: 'Every step of the process, in detail.', linkText: 'See the 16+ journey' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: that Sixth Form fees match the Senior School fee, and the registration and interview dates, are to be confirmed with admissions.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Sixth Form parent about choosing Bancroft’s.', attribution: 'Sixth Form parent' },
      ] } },
      faqs([
        { heading: 'How many A Levels do pupils take?', body: 'Pupils typically choose three or four A Level subjects.', ctaLabel: 'See Academic Life', ctaHref: 'sixth-form-academic-life.html' },
        { heading: 'What are the A Level results like?', body: 'Our results are published each year, with a five-year view alongside.', ctaLabel: 'See Results & Destinations', ctaHref: 'results-destinations.html' },
        { heading: 'Where do leavers go next?', body: 'Recent leavers have gone on to a wide range of universities, apprenticeships and careers.', ctaLabel: 'See Results & Destinations', ctaHref: 'results-destinations.html' },
        { heading: 'Can I join from another school?', body: 'Yes. Some pupils join us for the first time at 16.', ctaLabel: 'See Joining at 16+', ctaHref: 'admissions-16plus-journey.html' },
        { heading: 'How is Sixth Form different from Year 11?', body: 'More independence, more responsibility and a more grown-up school day.', ctaLabel: 'See Sixth Form Life', ctaHref: 'sixth-form-life.html' },
        { heading: 'What GCSE grades do I need?', body: 'Offers are conditional on GCSE results in August. (Wireframe note: entry requirements by subject to be supplied.)', ctaLabel: 'See Joining at 16+', ctaHref: 'admissions-16plus-journey.html' },
        { heading: 'Are scholarships and bursaries available at 16+?', body: 'Yes. Academic scholarships, Music Awards and means-tested bursaries are all available at 16+.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html' },
      ], 'Sixth Form questions'),
      { component: 'wf-cards', props: {
        heading: 'Latest news', cols: 2,
        items: [
          { category: 'Sixth Form', heading: 'Sixth Form pupils receive strong university offers', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Sixth Form pupils celebrating' },
          { category: 'Sixth Form', heading: 'Bancroft’s ranked among London’s top performing schools', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Pupils in a Senior School lesson' },
        ],
      } },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to take the next step?', side: 'left', mediaLabel: 'Sixth Form pupil at their desk',
          body: ['See how joining our Sixth Form works, or come and see Bancroft’s for yourself.'],
          ctaLabel: 'Start your 16+ journey', ctaHref: 'admissions-16plus-journey.html', ctaId: 'cta-sixthform-hero-journey',
          secondaryLabel: 'Book a Visit', secondaryHref: 'book-a-visit.html',
        },
      },
      // Replaces the old link out to a standalone "Staying On" page (now deleted, client
      // request) - that content lives as a section on Joining at 16+ instead.
      {
        component: 'wf-text-media', props: {
          heading: 'Already at Bancroft’s?', body: ['How current Year 11 pupils move up into Sixth Form.'],
          side: 'right', mediaLabel: 'Year 11 pupil moving into Sixth Form',
          ctaLabel: 'See Joining at 16+', ctaHref: 'admissions-16plus-journey.html', ctaId: 'cta-sixthform-moving-up',
        },
      },
    ],
  },

  'sixth-form-why': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Why Bancroft’s Sixth Form', body: 'Two years of challenge and discovery that prepare pupils for university, careers and life beyond school.',
        mediaLabel: 'Sixth Form pupils outside the main building', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Why Bancroft’s Sixth Form', href: 'sixth-form-why.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Our Sixth Form is where ambition meets opportunity: a community that values curiosity, leadership and independence, and expects pupils to push themselves, try new things and grow as people.', 'Some pupils join us for the first time at 16; most have grown up here since 7 or 11. Either way, they are known individually, by tutors and teachers who help them aim high and choose well.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a parent or recent leaver on why they chose Bancroft’s for Sixth Form.', attribution: 'Parent of a Sixth Form pupil' },
      ] } },
      {
        component: 'wf-cards', props: {
          heading: 'The evidence', cols: 2,
          items: [
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'This year’s A Level outcomes, and where pupils go after Bancroft’s.' },
            { href: 'about-awards-recognition.html', heading: 'Awards and Recognition', description: 'League tables, inspection reports and awards.' },
          ],
        },
      },
      bookVisitPromo('cta-sixthform-why-promo'),
    ],
  },

  // Written for pupils, not parents - "you", not "pupils". Why Bancroft's Sixth Form carries the
  // case for parents and applicants' families; this page is what the two years feel like.
  'sixth-form-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Sixth Form Life', body: 'Your own space, more freedom and real responsibility.',
        mediaLabel: 'Sixth Form pupils relaxing in their common room', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Sixth Form Life', href: 'sixth-form-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Form feels different from the rest of school. You manage your own time and study more like a university student, with tutors, mentors and friends who know you well behind you.', 'You have your own study and social space, a more flexible timetable built around independent study periods, and your own dress code.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'A typical day',
          items: [
            { heading: 'Start with your tutor', description: 'A check-in with the tutor who knows you best.' },
            { heading: 'Lessons and study periods', description: 'Smaller classes, with free periods to work where and how you choose.' },
            { heading: 'Lunch', description: 'Time for the clubs and societies you belong to, or run.' },
            { heading: 'Afternoon', description: 'More lessons, sport or time on something of your own.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: the detail of the Sixth Form day to be supplied, ideally in pupils’ own words.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Sixth Form felt like a genuine step up. I had more freedom, but the support was still there whenever I needed it.', attribution: 'Former pupil, now at university' },
      ] } },
      { component: 'wf-text-media', props: { heading: 'Beyond the Classroom', side: 'left', mediaLabel: 'Sixth Form pupil leading a club', body: ['You won’t just take part in clubs and societies. Many Sixth Formers go on to run them, mentor younger pupils or become prefects.'], ctaLabel: 'See how Sixth Formers lead', ctaHref: 'sixth-form-beyond-the-classroom.html' } },
      {
        component: 'wf-cards', props: {
          heading: 'Thinking about joining?', cols: 3,
          items: [
            { href: 'sixth-form-academic-life.html', heading: 'Academic Life', description: 'The A Levels you can choose from.' },
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'Where it could take you.' },
            { href: 'admissions-16plus-journey.html', heading: 'Joining at 16+', description: 'How to apply.' },
          ],
        },
      },
      bookVisitPromo('cta-sixthform-life-promo'),
    ],
  },

  // Hub page, new for this stage (client request) - Sixth Form never had Sport, Music or Drama
  // pages of its own before; each is new content here, written around the same "Sixth Formers
  // lead, not just attend" theme the rest of this page already had.
  'sixth-form-beyond-the-classroom': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Beyond the Classroom', body: 'Sixth Formers don’t just take part in clubs, many go on to lead them.',
        mediaLabel: 'Sixth Form pupil leading a club', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers stay involved in the clubs and societies that run right across the school, but with a difference: many take on running them, mentoring younger pupils and building real leadership experience alongside their A Levels.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Explore Beyond the Classroom', cols: 4,
          items: [
            { href: 'sixth-form-sport.html', heading: 'Sport', description: 'Captaincy, coaching younger pupils and nine sports to stay involved in.', imageLabel: 'Sixth Form pupils training on the sports pitch', linkText: 'Explore Sport' },
            { href: 'sixth-form-music.html', heading: 'Music', description: 'Leading ensembles, Music Scholars and the senior end of every concert.', imageLabel: 'Sixth Form pupil leading an ensemble', linkText: 'Explore Music' },
            { href: 'sixth-form-drama.html', heading: 'Drama', description: 'Leading roles, and student-directed work alongside the main productions.', imageLabel: 'Sixth Former directing a rehearsal', linkText: 'Explore Drama' },
            { href: 'sixth-form-clubs.html', heading: 'Clubs', description: 'Leading and running clubs, not just attending them.', imageLabel: 'Sixth Former leading a club', linkText: 'Explore Clubs' },
          ],
        },
      },
      { component: 'wf-text-media', props: { heading: 'Leadership & Mentoring', side: 'right', mediaLabel: 'Sixth Former mentoring a younger pupil', body: ['Running junior clubs, prefect roles and mentoring pupils lower down the school.'] } },
      { component: 'wf-text-media', props: { heading: 'Academic Societies', side: 'left', mediaLabel: 'Sixth Formers in a debating society', body: ['Subject societies, Model United Nations and debating, often student-led.'] } },
      { component: 'wf-text-media', props: { heading: 'Outdoor & Adventure', side: 'right', mediaLabel: 'Sixth Former leading a Duke of Edinburgh expedition', body: ['Gold Duke of Edinburgh’s Award, senior CCF roles and expedition leadership.'] } },
      bookVisitPromo('cta-sixthform-beyond-classroom-promo'),
    ],
  },

  'sixth-form-sport': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Sixth Form Sport', body: 'Nine sports to stay involved in, with real leadership opportunities for Sixth Formers.',
        mediaLabel: 'Sixth Form pupils training on the sports pitch', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html' }, { label: 'Sport', href: 'sixth-form-sport.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers continue across all nine sports, with First team places, captaincy and coaching younger year groups all open to them. Many combine playing with helping run training for junior squads.'] } },
      { component: 'wf-text-media', props: { heading: 'Captaincy and coaching', side: 'right', mediaLabel: 'Sixth Form pupil coaching younger pupils', body: ['Sixth Form captains lead warm-ups, help plan training and represent their squad at fixtures, working alongside coaching staff rather than just following them.'] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'sixth-form-music.html', label: 'Music' },
        { href: 'sixth-form-drama.html', label: 'Drama' },
        { href: 'sixth-form-clubs.html', label: 'Clubs' },
        { href: 'sixth-form-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-sixthform-sport-promo'),
    ],
  },

  'sixth-form-music': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Sixth Form Music', body: 'The senior end of every ensemble, and a natural home for Music Scholars.',
        mediaLabel: 'Sixth Form pupil leading an ensemble', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html' }, { label: 'Music', href: 'sixth-form-music.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Form musicians lead sections in the school’s orchestras, choirs and bands, often alongside continuing Music or Music Technology at A Level. Music Scholars take on extra responsibility, from mentoring younger players to helping direct smaller ensembles.'] } },
      { component: 'wf-text-media', props: { heading: 'Music Scholars', side: 'left', mediaLabel: 'Pupil playing violin', body: ['Music Scholars continue the individual tuition and masterclasses that came with their award at 11+ or 16+, alongside extra leadership responsibility within the department.'], links: [{ label: 'See Scholarships & Awards', href: 'scholarships-awards.html' }] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'sixth-form-sport.html', label: 'Sport' },
        { href: 'sixth-form-drama.html', label: 'Drama' },
        { href: 'sixth-form-clubs.html', label: 'Clubs' },
        { href: 'sixth-form-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-sixthform-music-promo'),
    ],
  },

  'sixth-form-drama': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Sixth Form Drama', body: 'Leading roles in the main productions, and student-directed work of their own.',
        mediaLabel: 'Sixth Former directing a rehearsal', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html' }, { label: 'Drama', href: 'sixth-form-drama.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers take the leading roles in the senior production, and many go further, writing, directing or stage-managing a student-led piece of their own alongside the main calendar of shows.'] } },
      { component: 'wf-text-media', props: { heading: 'Off stage too', side: 'right', mediaLabel: 'Sixth Former at the sound desk', body: ['Sound, lighting and stage management all have senior pupils in charge on the night, working alongside the Theatre Technician rather than just assisting.'] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'sixth-form-sport.html', label: 'Sport' },
        { href: 'sixth-form-music.html', label: 'Music' },
        { href: 'sixth-form-clubs.html', label: 'Clubs' },
        { href: 'sixth-form-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-sixthform-drama-promo'),
    ],
  },

  // New page (client request, 2026-11-13): clubs and societies change regularly, so rather than
  // maintaining a fixed list here, this gives a flavour of the categories on offer, with the
  // Sixth Form's own leadership angle (same framing as Sport/Music/Drama above).
  'sixth-form-clubs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Sixth Form Clubs & Societies', body: 'Leading and running clubs, not just attending them.',
        mediaLabel: 'Sixth Former leading a club', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html' }, { label: 'Clubs', href: 'sixth-form-clubs.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers stay involved in the clubs and societies that run right across the school, often taking on running them or mentoring younger pupils. The exact list changes every term, so this page gives a flavour rather than a fixed menu.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'A flavour of our clubs & societies', cols: 4,
          items: [
            { heading: 'Academic & Debating', description: 'Leading subject societies, Model United Nations and debating.' },
            { heading: 'Creative', description: 'Art, photography, film and creative writing.' },
            { heading: 'STEM', description: 'Coding, robotics and science societies.' },
            { heading: 'Community & Outdoors', description: 'Volunteering, Gold Duke of Edinburgh’s and Scouting leadership.' },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: clubs and societies change each term, so the real build should pull this list from a live, regularly-updated source rather than maintaining it as static page content.'] } },
      { component: 'wf-button-row', props: { heading: 'Beyond the Classroom', items: [
        { href: 'sixth-form-sport.html', label: 'Sport' },
        { href: 'sixth-form-music.html', label: 'Music' },
        { href: 'sixth-form-drama.html', label: 'Drama' },
        { href: 'sixth-form-beyond-the-classroom.html', label: 'See Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-sixthform-clubs-promo'),
    ],
  },

  'sixth-form-academic-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Academic Life', body: 'A wide choice of A Level subjects, with guidance to help pupils choose well.',
        mediaLabel: 'Sixth Form pupils in a subject seminar', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Academic Life', href: 'sixth-form-academic-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'A Level subjects', body: ['Pupils typically choose three or four A Level subjects from a wide range spanning the sciences, humanities, languages, arts and social sciences. Our careers and higher education team works with every pupil individually, so subject choices connect clearly to what comes next.'] } },
      { component: 'wf-cards', props: { heading: 'Related pages', cols: 2, items: [
        { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'A Level outcomes by subject, and where they’ve led recent leavers.' },
        { href: 'sixth-form-preparing-for-life.html', heading: 'Preparing for Life Beyond Bancroft’s', description: 'Careers guidance, futures and alumni stories.' },
      ] } },
      bookVisitPromo('cta-sixthform-academic-life-promo'),
    ],
  },

  // New page (client request), covering careers and futures, with a section for alumni stories.
  // Results & Destinations already covers the numbers (outcomes, universities); this page is
  // about the support pupils get getting there, and what it looks like further out.
  'sixth-form-preparing-for-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Preparing for Life Beyond Bancroft’s', body: 'Careers guidance, university applications and the wider skills pupils leave with.',
        mediaLabel: 'Pupil in a careers guidance session', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Preparing for Life Beyond Bancroft’s', href: 'sixth-form-preparing-for-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Our careers and higher education team supports every pupil individually, from the first careers conversations in the Lower Sixth through to results day and beyond.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'From Lower Sixth to results day',
          items: [
            { heading: 'Careers guidance begins', description: 'One-to-one conversations and aptitude tools help narrow down direction, well before applications open.' },
            { heading: 'Work experience', description: 'Placements in Year 12 give pupils a real sense of a career before committing to it.' },
            { heading: 'Applications', description: 'Personal statement guidance, interview preparation and support with UCAS, apprenticeship or other applications.' },
            { heading: 'Results and beyond', description: 'Support continues through results day and into the first term of whatever comes next.' },
          ],
        },
      },
      { component: 'wf-text', props: { heading: 'Alumni stories', body: ['Wireframe note: placeholder for a short series of alumni profiles - where they went, what they studied, and what they are doing now. To be supplied by the school, alongside the Old Bancroftians association.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Placeholder for a quote from a Bancroft’s alumnus about where Sixth Form took them.', attribution: 'Old Bancroftian' },
        { quote: 'Placeholder for a quote from a recent leaver about the careers support they received.', attribution: 'Upper Sixth leaver, 2026' },
      ] } },
      {
        component: 'wf-cards', props: {
          heading: 'Related pages', cols: 2,
          items: [
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'This year’s outcomes, and where recent leavers have gone on to.' },
            { href: 'old-bancroftians.html', heading: 'Old Bancroftians', description: 'Staying connected to the school after you leave.' },
          ],
        },
      },
      bookVisitPromo('cta-sixthform-preparing-for-life-promo'),
    ],
  },

  // --- School Life ---------------------------------------------------------

  'school-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Day to day at Bancroft’s', body: 'Everything current families need for day-to-day life at Bancroft’s, from our wider school community to the practical details that keep each week running smoothly.',
        mediaLabel: 'Pupils and parents at a school event', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['School Life is where current families find the practical information they need day to day, alongside a sense of the wider Bancroft’s community.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Explore School Life', cols: 3,
          items: [
            { href: 'school-life-community.html', heading: 'Community & Partnerships', description: 'Parents, alumni and the wider Bancroft’s network.', imageLabel: 'Parents at a community event', linkText: 'Meet our community' },
            { href: 'term-dates.html', id: 'cta-schoollife-card-term-dates', heading: 'Term Dates', description: 'Term starts, half terms and holidays for the year.', imageLabel: 'Term dates on a school noticeboard', linkText: 'See the Term Dates' },
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s on the menu in the dining hall this week.', imageLabel: 'Pupils in the dining hall', linkText: 'See this week’s menu' },
            { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'Routes, timings and how to book a seat.', imageLabel: 'School bus outside the main building', linkText: 'Find your route' },
            { href: 'uniform.html', heading: 'Uniform', description: 'What to buy, where from, and second-hand options.', imageLabel: 'Pupils in school uniform', linkText: 'See the Uniform guide' },
          ],
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'Already a Bancroft’s parent?', body: 'Quick links for absence reporting, school reports and everything else specific to your child.',
          ctaLabel: 'Go to Parents', ctaHref: 'parents.html', ctaId: 'cta-schoollife-promo', mediaLabel: 'Parent signed in to the Parent Portal',
        },
      },
    ],
  },

  // Restructured from a flat link grid into one section per community (client request): Parents'
  // Association (full content, merged in from the now-deleted parent-association.html), Foundation
  // and Old Bancroftians (each a short section plus a link out to its own new page), Spiritual
  // Life including the chaplain (merged in from the now-deleted senior-spiritual-life.html, moved
  // here from Senior per that pass's note), and Charitable Giving & Service (new).
  'school-life-community': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Community & Partnerships', body: 'Parents, alumni, faith and service — the wider Bancroft’s community beyond the classroom.',
        mediaLabel: 'Parents’ Association event', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Community & Partnerships', href: 'school-life-community.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: [
        'Bancroft’s School provides a broad and welcoming community for all. This has been strengthened over the years by our foundation, parents’ association, alumni activities, faith life and more. Once a Bancroftian, always a Bancroftian.',
      ] } },
      { component: 'wf-text', props: { heading: 'Parents’ Association', body: [
        'The Parents’ Association brings the Bancroft’s community together through social events and fundraising throughout the school year - fireworks, themed balls, camping trips, fayres and parent-staff matches among them, alongside activities that connect families across year groups.',
        'Every event helps fund things that directly benefit pupils, and volunteering is a great way to get to know other Bancroft’s parents.',
      ] } },
      {
        component: 'wf-table', props: {
          heading: 'Parents’ Association committee', rowHeader: 'Role',
          columns: ['Name'],
          rows: [
            { label: 'Chair', cells: ['Dr Sumeeta Dhir'] },
            { label: 'Vice Chair', cells: ['Mrs Bahia Daifi'] },
            { label: 'Secretary', cells: ['Dr Belinda John-Baptiste'] },
            { label: 'Treasurer', cells: ['Mrs Samia Dar'] },
            { label: 'Vice Treasurers', cells: ['Mrs Maria Poullos and Mrs Tamsin James'] },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Get involved', side: 'right', mediaLabel: 'Parents volunteering at a PA event',
          body: ['Volunteering at PA events is a great way to get involved in the wider Bancroft’s community. For upcoming events or to find out more, get in touch with the PA directly.'],
          ctaLabel: 'Contact the PA', ctaHref: 'mailto:bancrofts.pa@gmail.com', ctaId: 'cta-community-pa-contact',
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Foundation', side: 'left', mediaLabel: 'Bancroft’s Foundation',
          body: ['The Bancroft’s Foundation supports the school’s charitable purpose, including bursary funding that makes a Bancroft’s education possible for families who would otherwise be unable to consider it.'],
          ctaLabel: 'About the Foundation', ctaHref: 'foundation.html',
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Old Bancroftians', side: 'right', mediaLabel: 'Old Bancroftians reunion',
          body: ['Our alumni association keeps former pupils connected to the school and to each other, through reunions, networking and support for current pupils thinking about life after Bancroft’s.'],
          ctaLabel: 'About Old Bancroftians', ctaHref: 'old-bancroftians.html',
        },
      },
      { component: 'wf-text', props: { heading: 'Spiritual Life', body: ['One of Bancroft’s greatest strengths is a diverse, multi-faith community, where every pupil is encouraged to explore their own spiritual life and to learn about the beliefs and values of others.'] } },
      { component: 'wf-text-media', props: { heading: 'The Chapel and the Chaplain', side: 'left', mediaLabel: 'The school Chapel', body: ['The Chapel is central to an ethos of mutual respect and acceptance. Its services are inclusive, focusing on shared values and common concerns, and give pupils space to reflect on questions of meaning and purpose. The Chaplain’s role goes beyond the Chapel itself - available to any pupil, of any faith or none, who wants someone to talk to.'] } },
      { component: 'wf-text', props: { heading: 'Faith groups', body: ['Pupils of particular faiths can also meet together, through regular Communion services, the Christian Union, and the Jewish, Muslim and Hindu Societies, as well as weekly Muslim assemblies.'] } },
      { component: 'wf-text', props: { heading: 'Charitable Giving & Service', body: ['Charity and service run through school life, from form-group fundraising and an annual Charities Week to longer partnerships with local causes. Pupils take the lead in choosing and running much of it, alongside volunteering opportunities that also count towards the Duke of Edinburgh’s Award.', 'Wireframe note: this year’s nominated charities and the Charities Week programme to be supplied by the school.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Also part of our community', cols: 3,
          items: [
            { heading: 'The Drapers’ Company', href: '#', imageLabel: 'The Drapers’ Company' },
            { heading: 'The Arts Society', href: '#', imageLabel: 'The Arts Society' },
            { heading: 'The Evening Chorus Choir', href: '#', imageLabel: 'The Evening Chorus Choir' },
            { heading: 'The Crofton Singers', href: '#', imageLabel: 'The Crofton Singers' },
          ],
        },
      },
    ],
  },

  // Its own page, not just a filter on the Events Calendar: "term dates" drives far more search
  // traffic than "calendar" (SEO review, 2026-10-14), and plain text is easier for search engines
  // and parents to read than a month grid drawn by script. Dates match the Events Calendar's.
  'term-dates': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Term Dates', subtitle: 'Term dates for the 2026 to 2027 school year, for the Prep and Senior School.',
        breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Term Dates', href: 'term-dates.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-table', props: {
          heading: 'Autumn Term 2026',
          rowHeader: 'Date', columns: ['When'],
          rows: [
            { label: 'INSET day (pupils not in school)', cells: ['Tuesday 1 September 2026'] },
            { label: 'Autumn Term begins', cells: ['Wednesday 2 September 2026'] },
            { label: 'Half term', cells: ['Saturday 17 October 2026 to Sunday 25 October 2026'] },
            { label: 'Autumn Term ends', cells: ['Friday 11 December 2026'] },
            { label: 'Christmas holidays', cells: ['Saturday 12 December 2026 to Sunday 3 January 2027'] },
          ],
        },
      },
      {
        component: 'wf-table', props: {
          heading: 'Spring Term 2027',
          rowHeader: 'Date', columns: ['When'],
          rows: [
            { label: 'Spring Term begins', cells: ['To be supplied'] },
            { label: 'Half term', cells: ['To be supplied'] },
            { label: 'Spring Term ends', cells: ['To be supplied'] },
          ],
        },
      },
      {
        component: 'wf-table', props: {
          heading: 'Summer Term 2027',
          rowHeader: 'Date', columns: ['When'],
          rows: [
            { label: 'Summer Term begins', cells: ['To be supplied'] },
            { label: 'Half term', cells: ['To be supplied'] },
            { label: 'Summer Term ends', cells: ['To be supplied'] },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Wireframe note: the real page lists the full year, and next year’s dates as soon as they are published.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Also useful', cols: 3,
          items: [
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s for lunch this week.' },
            { href: 'getting-to-bancrofts.html', heading: 'Getting to Bancroft’s', description: 'Routes, timings and how to book a seat.' },
            { href: '#footer-subscribe', heading: 'Sign up for our newsletter', description: 'Get news and updates by email.', linkText: 'Sign up' },
          ],
        },
      },
    ],
  },


  'weekly-menu': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Weekly Menu', body: 'What’s on the menu in the dining hall this week, including allergen information.',
        mediaLabel: 'Dining hall lunch service', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Weekly Menu', href: 'weekly-menu.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-table', props: {
          heading: 'This week’s menu', rowHeader: 'Day',
          columns: ['Main', 'Vegetarian Option'],
          rows: [
            { label: 'Monday', cells: ['Roast chicken with seasonal vegetables', 'Sweet potato and chickpea curry'] },
            { label: 'Tuesday', cells: ['Beef bolognese with pasta', 'Three bean chilli with rice'] },
            { label: 'Wednesday', cells: ['Fish and new potatoes', 'Vegetable lasagne'] },
            { label: 'Thursday', cells: ['Roast turkey with all the trimmings', 'Mushroom and lentil pie'] },
            { label: 'Friday', cells: ['Fish and chips', 'Halloumi and vegetable skewers'] },
          ],
        },
      },
      { component: 'wf-text', props: { body: ['Fresh fruit and yoghurt are available daily, and the salad bar is available at every meal.'] } },
      { component: 'wf-text', props: { heading: 'Allergen information', body: ['Full allergen information for every dish is available from our catering team on request. Please let your child’s form teacher know of any allergy or dietary requirement so we can plan accordingly.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Keep up to date', cols: 2,
          items: [
            { href: 'news.html', id: 'cta-menu-onward-news', heading: 'Latest news', description: 'Stories from across Bancroft’s.', linkText: 'Read the news' },
            { href: '#footer-subscribe', id: 'cta-menu-onward-newsletter', heading: 'Sign up for our newsletter', description: 'Get news and updates by email.', linkText: 'Sign up' },
          ],
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'Keep track of everything else', body: 'Term starts, half terms and holidays for the year ahead are all on our Term Dates page.',
          ctaLabel: 'See Term Dates', ctaHref: 'term-dates.html', ctaId: 'cta-menu-promo', mediaLabel: 'Parent checking the school calendar',
        },
      },
    ],
  },

  // Renamed from "School Bus Service" (client request) - the school bus is now one section
  // alongside new TfL and journey-planner links, since not every family uses the bus.
  'getting-to-bancrofts': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Getting to Bancroft’s', body: 'By school bus, by public transport, or under your own steam.',
        mediaLabel: 'School bus at a pick-up point', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Getting to Bancroft’s', href: 'getting-to-bancrofts.html' }),
      },
    },
    blocks: [
      // Added (client request, 2026-11-13): a map of the site and its transport links, so
      // families can orient themselves before reading the route detail below.
      { component: 'wf-media', props: { label: 'Map: Bancroft’s site and nearby transport links', aspectClass: 'aspect-[16/9]' } },
      { component: 'wf-text', props: { heading: 'School Bus Service', body: [
        'We’re delighted to work with Zeelo on our home-to-school travel service, offering a range of ticket options - an Annual Pass, an Annual One-Way Pass, Termly Passes and a 30 Ride Bundle - for convenient, flexible travel throughout the academic year.',
        'The service is available to all pupils; Alphas (Year 3) must be accompanied by a sibling in P1 (Year 5) or above.',
      ] } },
      { component: 'wf-cards', props: { heading: 'Our routes', cols: 3, items: [
        { category: 'Route 1', heading: 'Epping and Theydon Bois' },
        { category: 'Route 2', heading: 'Mile End', description: 'Covering Hackney, Walthamstow and Wanstead.' },
        { category: 'Route 3', heading: 'Goodmayes', description: 'Covering Clayhall, Hainault and Chigwell.' },
      ] } },
      {
        component: 'wf-text-media', props: {
          heading: 'Find out more about the bus', side: 'right', mediaLabel: 'Parent booking the school bus service online',
          body: ['Bookings and payments for the school bus service are managed through our transport partner, Zeelo, where you can view full routes, timetables and ticket pricing. Our Terms and Conditions and Information Booklet cover everything else you need to know before signing up.'],
          links: [
            { label: 'View routes, timetables and pricing (Zeelo)', href: '#' },
            { label: 'Terms and Conditions', href: '#' },
            { label: 'Information Booklet', href: '#' },
          ],
        },
      },
      // New section (client request): the school is a short walk from the Central Line, so public
      // transport is a real option alongside the bus, not just a fallback.
      {
        component: 'wf-text-media', props: {
          heading: 'By public transport', side: 'left', mediaLabel: 'Pupils walking from the Central Line',
          body: ['Bancroft’s is a short walk from Woodford station on the Central Line, with further links across North East London and Essex. For a route from your own address, plan your journey with TfL or National Rail.'],
          links: [
            { label: 'TfL Journey Planner', href: '#' },
            { label: 'National Rail Journey Planner', href: '#' },
          ],
        },
      },
    ],
  },

  uniform: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Uniform', body: 'Everything you need to know about Bancroft’s uniform, from what to buy to second-hand options.',
        mediaLabel: 'Pupils in school uniform', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Uniform', href: 'uniform.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: [
        'All Bancroft’s pupils wear uniform, purchased through Schoolblazer, our official supplier. Some items may be sourced from high street retailers, provided they match the school’s specified style.',
        'Sixth Formers don’t wear uniform, but are expected to follow our Sixth Form dress code.',
      ] } },
      {
        component: 'wf-cards', props: {
          heading: 'Uniform guides', cols: 4,
          items: [
            { heading: 'Prep School Uniform and Sports Kit', description: 'Everything Prep pupils need, by year group.', imageLabel: 'Prep uniform guide' },
            { heading: 'Senior School Uniform and Sports Kit', description: 'Everything Senior pupils need, by year group.', imageLabel: 'Senior uniform guide' },
            { heading: 'Senior School Stationery Items', description: 'Books, equipment and other items to bring.', imageLabel: 'Senior stationery list' },
            { heading: 'Sixth Form Dress Code', description: 'What to wear in place of uniform, from Year 12.', imageLabel: 'Sixth Form dress code' },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Where to buy', side: 'left', mediaLabel: 'Schoolblazer uniform shop',
          body: [
            'Schoolblazer is our official uniform supplier, offering the full range online and by phone: 0333 700 0703 (Mon–Fri 9am–8pm, Sat 9am–5.30pm) or customerservices@schoolblazer.com.',
          ],
          ctaLabel: 'Shop at Schoolblazer', ctaHref: 'https://www.schoolblazer.com/', ctaId: 'cta-uniform-schoolblazer',
        },
      },
      { component: 'wf-text', props: { heading: 'Second-hand uniform', body: [
        'We keep a stock of second-hand uniform available to purchase. For details, contact Mrs Maddock on km@bancrofts.org or 020 8506 6768.',
      ] } },
      {
        component: 'wf-promo', props: {
          heading: 'Already a Bancroft’s parent?', body: 'Quick links for absence reporting, school reports and everything else specific to your child.',
          ctaLabel: 'Go to Parents', ctaHref: 'parents.html', ctaId: 'cta-uniform-promo', mediaLabel: 'Parent signed in to the Parent Portal',
        },
      },
    ],
  },

  // New child page of Community & Partnerships (client request) - a short section there links
  // through to this fuller page, rather than Community & Partnerships carrying the Foundation's
  // full detail itself.
  foundation: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Foundation', body: 'Supporting Bancroft’s charitable purpose, including the bursaries that make a Bancroft’s education possible regardless of financial circumstance.',
        mediaLabel: 'Bancroft’s Foundation', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Community & Partnerships', href: 'school-life-community.html' }, { label: 'Foundation', href: 'foundation.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['The Bancroft’s Foundation exists to support the school’s charitable purpose: widening access to a Bancroft’s education, and maintaining the buildings and grounds that every pupil benefits from.', 'Wireframe note: the Foundation’s governance, how it relates to the school and the Drapers’ Company, and its current fundraising priorities are to be supplied.'] } },
      { component: 'wf-text-media', props: { heading: 'Bursaries', side: 'right', mediaLabel: 'Family meeting with the bursaries team', body: ['Foundation funding underpins the school’s means-tested bursary programme, covering up to 100 percent of fees for families who would otherwise be unable to consider Bancroft’s.'], ctaLabel: 'See Bursaries', ctaHref: 'bursaries.html' } },
      {
        component: 'wf-cards', props: {
          heading: 'Supporting the Foundation', cols: 2,
          items: [
            { heading: 'Donate', description: 'Wireframe note: giving options and a donation form or link to be supplied.' },
            { heading: 'Leave a legacy', description: 'Wireframe note: legacy giving information to be supplied.' },
          ],
        },
      },
    ],
  },

  // New child page of Community & Partnerships (client request), replacing the old external "#" link.
  'old-bancroftians': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Old Bancroftians', body: 'Once a Bancroftian, always a Bancroftian - staying connected to the school and to each other after you leave.',
        mediaLabel: 'Old Bancroftians reunion', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Community & Partnerships', href: 'school-life-community.html' }, { label: 'Old Bancroftians', href: 'old-bancroftians.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['The Old Bancroftians association keeps former pupils connected to the school and to each other, long after they leave - through reunions, networking events and support for current pupils thinking about life after Bancroft’s.', 'Wireframe note: membership, how to register as an Old Bancroftian, and the events calendar to be supplied.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Staying connected', cols: 3,
          items: [
            { heading: 'Reunions', description: 'Year-group and decade reunions held through the year.' },
            { heading: 'Networking', description: 'Connecting Old Bancroftians across industries and generations.' },
            { heading: 'Supporting current pupils', description: 'Careers talks, mentoring and work experience offers from alumni.' },
          ],
        },
      },
      { component: 'wf-text-media', props: { heading: 'Alumni stories', side: 'left', mediaLabel: 'Old Bancroftian at a reunion event', body: ['Hear from Old Bancroftians about where Bancroft’s took them.'], ctaLabel: 'See Preparing for Life Beyond Bancroft’s', ctaHref: 'sixth-form-preparing-for-life.html' } },
    ],
  },

  // --- News ---------------------------------------------------------

  news: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'News', subtitle: 'Stories from across Bancroft’s, from academic achievement to sport, the arts and our wider community.',
        breadcrumb: bc({ label: 'News', href: 'news.html' }),
      },
    },
    blocks: [
      // Tags (client request) - replacing the old content-type filter (Academic/Community/Sport)
      // with an audience one (Prep/Senior/Sixth Form/Alumni), since that's what the stage landing
      // pages' own "Latest news" blocks below actually need to filter by. wf-cards only supports
      // one category per card, so this is a straight swap, not an addition - noted in PROTOTYPE.md.
      { component: 'wf-cards', props: {
        cols: 3, perPage: 6,
        filters: ['All', 'Prep', 'Senior', 'Sixth Form', 'Alumni'],
        items: [
          { href: 'news-article-a.html', category: 'Senior', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', description: 'Another year of strong outcomes across the Senior School, with many pupils exceeding expectations.', imageLabel: 'Pupils celebrating results day', linkText: 'Read the story' },
          { href: 'news-article-b.html', category: 'Prep', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', description: 'What the new partnership means for families joining at 7+.', imageLabel: 'Prep pupils on a school trip', linkText: 'Read the story' },
          { href: 'news-article-c.html', category: 'Senior', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby, capping a strong year across our sports programme.', imageLabel: 'First XV rugby team', linkText: 'Read the story' },
          { category: 'Sixth Form', heading: 'Sixth Form pupils receive strong university offers', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Sixth Form pupils celebrating' },
          { category: 'Senior', heading: 'Netball First VII reach county final', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Netball match in progress' },
          { category: 'Alumni', heading: 'Old Bancroftians mark 50 years since leaving', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Old Bancroftians reunion event' },
          { category: 'Prep', heading: 'Prep pupils shine in national maths challenge', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Prep pupils in a maths lesson' },
          { category: 'Prep', heading: 'Bancroft’s Family of Schools hosts joint open morning', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Families on an open morning tour' },
          { category: 'Senior', heading: 'Swimming squad breaks three school records', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Swimmers at the school gala' },
          { category: 'Sixth Form', heading: 'Bancroft’s ranked among London’s top performing schools', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Pupils in a Senior School lesson' },
        ],
      } },
      bookVisitPromo('cta-news-promo'),
    ],
  },

  'news-article-a': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Senior', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', body: 'Another year of strong outcomes across the Senior School, with many pupils exceeding expectations.',
        mediaLabel: 'Pupils celebrating results day', breadcrumb: bc({ label: 'News', href: 'news.html' }, { label: 'Bancroft’s pupils celebrate outstanding GCSE results', href: 'news-article-a.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { centered: true, body: ['Pupils across Year 11 gathered this morning to collect a strong set of GCSE results, with the proportion of pupils achieving grade 7 or above rising again on last year. Staff and families were on hand throughout the morning to celebrate what has been, for many pupils, the culmination of five years of work.'] } },
      { component: 'wf-media', props: { type: 'image', label: 'Pupils comparing results in the quad', centered: true, aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { centered: true, body: ['Our Head of Senior School praised the cohort’s resilience, noting that results this strong reflect not just ability but the support pupils give one another. Several pupils achieved a clean sweep of grade 9s across the sciences, languages and humanities.', 'The cohort now moves into Sixth Form or on to further study elsewhere, with our careers team continuing to support leavers through the transition.'] } },
      { component: 'wf-share', props: { centered: true } },
      { component: 'wf-cards', props: { heading: 'Related', cols: 3, items: [
        { href: 'results-destinations.html', id: 'cta-article-a-gcse-results', category: '11+ Senior', heading: 'Results & Destinations', description: 'See our full GCSE results, and where leavers go on to, in context.', imageLabel: 'GCSE results summary', linkText: 'See our results' },
        { href: 'senior-academic-life.html', id: 'cta-article-a-destinations', category: '11+ Senior', heading: 'Senior Academic Life', description: 'See how this curriculum translates into outcomes.', imageLabel: 'Senior pupils in a science lesson', linkText: 'See Academic Life' },
        { href: 'news-article-c.html', category: 'Sport', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby, capping a strong year across our sports programme.', imageLabel: 'First XV rugby team', linkText: 'Read the story' },
      ] } },
      bookVisitPromo('cta-article-a-promo'),
    ],
  },

  'news-article-b': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Prep', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', body: 'What the new partnership means for families joining at 7+.',
        mediaLabel: 'Prep pupils on a school trip', breadcrumb: bc({ label: 'News', href: 'news.html' }, { label: 'Bancroft’s Family of Schools welcomes two new Prep partners', href: 'news-article-b.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { centered: true, body: ['Bancroft’s has formalised partnerships with two local preparatory schools, creating the Bancroft’s Family of Schools. Each school keeps its own name, site and identity, while gaining closer links to Bancroft’s at Senior level.'] } },
      { component: 'wf-media', props: { type: 'image', label: 'Pupils visiting Bancroft’s from a partner Prep school', centered: true, aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { centered: true, body: ['Families at both partner schools will have access to joint events, shared expertise from Bancroft’s specialist teaching staff, and a clearer, closer route into the Senior School at 11+, without any change to their current school’s own character.', 'Bancroft’s own Prep, based on the main school site, continues to operate exactly as before, offering a third route into the Senior School at 7+.'] } },
      { component: 'wf-share', props: { centered: true } },
      { component: 'wf-cards', props: { heading: 'Related articles', cols: 2, items: [
        { href: 'news-article-a.html', category: 'Academic', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', description: 'Another year of strong outcomes across the Senior School.', imageLabel: 'Pupils celebrating results day', linkText: 'Read the story' },
        { href: 'prep.html', heading: '7+ Prep', description: 'Explore Bancroft’s own Prep years.', imageLabel: 'Prep pupils in the classroom', linkText: 'Explore 7+ Prep' },
      ] } },
      bookVisitPromo('cta-article-b-promo'),
    ],
  },

  'news-article-c': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Senior', heading: 'First XV named London Schools champions', body: 'A landmark season for rugby, capping a strong year across our sports programme.',
        mediaLabel: 'First XV rugby team celebrating', breadcrumb: bc({ label: 'News', href: 'news.html' }, { label: 'First XV named London Schools champions', href: 'news-article-c.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { centered: true, body: ['Bancroft’s First XV have been named London Schools champions, the culmination of an unbeaten season built on strong squad depth rather than a handful of standout players. It’s the clearest sign yet of a sports programme that is broader and stronger than its reputation suggests.'] } },
      { component: 'wf-media', props: { type: 'video', label: 'Match highlights from the final', centered: true, aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { centered: true, body: ['The squad, drawn from across Years 10 and 11, trained three times a week throughout the season alongside a full fixture list against other London schools. Several players have been selected for regional representative squads.', 'The result caps a strong year across Bancroft’s sport more broadly, with school teams also reaching finals in netball, hockey and athletics.'] } },
      { component: 'wf-share', props: { centered: true } },
      { component: 'wf-cards', props: { heading: 'Related articles', cols: 2, items: [
        { href: 'senior-sport.html', heading: 'Sport at Bancroft’s', description: 'Meet the programme behind this season’s success, and our other eight sports.', imageLabel: 'Rugby training session', linkText: 'Explore our sports programme' },
        { href: 'senior-beyond-the-classroom.html', heading: 'Beyond the Classroom', description: 'Sport, music, drama and 250+ clubs and societies.', imageLabel: 'Pupils at a lunchtime club', linkText: 'Explore Beyond the Classroom' },
      ] } },
      bookVisitPromo('cta-article-c-promo'),
    ],
  },

  // --- About ---------------------------------------------------------

  about: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'About Bancroft’s', body: 'Who we are, where we’ve come from, and how the school is run.',
        mediaLabel: 'Bancroft’s main building', breadcrumb: bc({ label: 'About', href: 'about.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['Bancroft’s has educated pupils on the edge of Epping Forest for generations, supported throughout by the Drapers’ Company. We were rated excellent across every area of our 2025 ISI Inspection. This is where to find out more about our values, our history and how the school is led.'] } },
      { component: 'wf-text-media', props: { heading: 'Welcome from the Head', side: 'right', mediaLabel: 'The Head of Bancroft’s', body: ['An introduction to Bancroft’s from the Head.'], ctaLabel: 'Read the welcome', ctaHref: 'about-welcome.html' } },
      { component: 'wf-text-media', props: { heading: 'What We Stand For', side: 'left', mediaLabel: 'Pupils in assembly', body: ['Our values, and what they mean day to day.'], ctaLabel: 'Read our values', ctaHref: 'about-what-we-stand-for.html' } },
      { component: 'wf-text-media', props: { heading: 'Results & Destinations', side: 'right', mediaLabel: 'Pupils reviewing exam results', body: ['GCSE and A Level outcomes, and where leavers go on to.'], ctaLabel: 'See our results', ctaHref: 'results-destinations.html' } },
      { component: 'wf-text-media', props: { heading: 'Awards and Recognition', side: 'left', mediaLabel: 'Awards displayed in the school foyer', body: ['League tables, inspection reports and awards, in one place.'], ctaLabel: 'See our awards and recognition', ctaHref: 'about-awards-recognition.html' } },
      { component: 'wf-text-media', props: { heading: 'Our History', side: 'right', mediaLabel: 'Historic photograph of the school', body: ['Bancroft’s story, from foundation to today.'], ctaLabel: 'Explore our history', ctaHref: 'about-history.html' } },
      { component: 'wf-text-media', props: { heading: 'Our Grounds & Facilities', side: 'left', mediaLabel: 'Aerial view of the Bancroft’s site', body: ['Our site, sport, arts and learning spaces, and hiring them for external events.'], ctaLabel: 'See our grounds and facilities', ctaHref: 'about-grounds-facilities.html' } },
      { component: 'wf-text-media', props: { heading: 'Leadership & Governance', side: 'right', mediaLabel: 'Board of Governors', body: ['Our Board of Governors and Senior Leadership Team.'], ctaLabel: 'Meet our Governors and leaders', ctaHref: 'about-leadership-governance.html' } },
      { component: 'wf-text-media', props: { heading: 'Our Family of Schools', side: 'left', mediaLabel: 'Pupils from Bancroft’s and its partner Prep schools', body: ['Bancroft’s and its two partner Prep schools, under one foundation.'], ctaLabel: 'Meet our Family of Schools', ctaHref: 'about-family-of-schools.html' } },
      bookVisitPromo('cta-about-promo'),
    ],
  },

  'about-welcome': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Welcome from the Head', subtitle: 'An introduction to Bancroft’s and what we believe a school should be.',
        breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Welcome from the Head', href: 'about-welcome.html' }),
      },
    },
    blocks: [
      { component: 'wf-media', props: { type: 'video', label: 'Get to know Alex, our Head', caption: 'Get to know Alex, our Head' } },
      { component: 'wf-text', props: { body: ['Welcome to Bancroft’s. We are an academically ambitious school, and unapologetically so, but ambition here has never meant narrowness. Our pupils are stretched in the classroom and given genuine room to discover what else they love, in sport, the arts, and the outdoors on our own doorstep.', 'What strikes most visitors first is how well our pupils are known as individuals, not just as names on a register. That, more than any single result, is what I hope you’ll notice too when you visit.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'A Bancroft’s education is academically serious and genuinely kind. I don’t think those two things need to be in tension, and I don’t believe they are here.', attribution: 'Head of Bancroft’s' },
      ] } },
      bookVisitPromo('cta-welcome-promo'),
    ],
  },

  'about-what-we-stand-for': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'What We Stand For', body: 'The values that shape every part of a Bancroft’s education.',
        mediaLabel: 'Pupils in a school assembly', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'What We Stand For', href: 'about-what-we-stand-for.html' }),
      },
    },
    blocks: [
      { component: 'wf-text-media', props: { heading: 'Academic ambition', side: 'left', mediaLabel: 'Pupils in a challenging lesson', body: ['We believe every pupil should be stretched, not just the most able. Small class sizes and specialist teaching mean ambition is personal, not just a whole-school statistic.'] } },
      { component: 'wf-text-media', props: { heading: 'Genuine community', side: 'right', mediaLabel: 'Pupils and staff at a school event', body: ['From tutor groups to houses to the Bancroft’s Family of Schools, we build overlapping communities so every pupil, and every family, has somewhere they belong.'] } },
      { component: 'wf-text-media', props: { heading: 'Room to grow', side: 'left', mediaLabel: 'Pupils on the school grounds near Epping Forest', body: ['Our grounds on the edge of Epping Forest give pupils space, literally and figuratively, to discover interests well beyond the curriculum.'] } },
      bookVisitPromo('cta-values-promo'),
    ],
  },

  'about-history': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Our History', body: 'Bancroft’s story, supported throughout by the Drapers’ Company.',
        mediaLabel: 'Historic photograph of Bancroft’s pupils', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Our History', href: 'about-history.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Bancroft’s has been educating pupils on this site for generations, with the Drapers’ Company as our founding benefactor throughout. Our archives hold decades of photographs, magazines and records charting how the school, and the pupils who’ve passed through it, have changed over time.', 'Our School Archivist maintains this collection and welcomes enquiries from Old Bancroftians and researchers looking to explore the school’s history in more depth.'] } },
      bookVisitPromo('cta-history-promo'),
    ],
  },

  // New page (client request, 2026-11-13): grounds and facilities in one place, ending on an
  // enquiry block for external lettings rather than its own page, "which can become its own page
  // later if lettings grows" - the client's own words.
  'about-grounds-facilities': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Our Grounds & Facilities', body: 'A site built for academic work, sport, the arts and life outdoors, on the edge of Epping Forest.',
        mediaLabel: 'Aerial view of the Bancroft’s site', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Our Grounds & Facilities', href: 'about-grounds-facilities.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Bancroft’s sits on a single site on the edge of Epping Forest, a few minutes’ walk from the Central Line, giving Prep, Senior and Sixth Form pupils room to learn, play and perform without ever having to travel between sites.'] } },
      { component: 'wf-text-media', props: { heading: 'The site', side: 'left', mediaLabel: 'Aerial view of the Bancroft’s site', body: ['Wireframe note: an overview of the grounds - acreage, main buildings and how the Prep, Senior School and Sixth Form sit together on one site - to be supplied by the school.'] } },
      { component: 'wf-text-media', props: { heading: 'Sport facilities', side: 'right', mediaLabel: 'Pupils on the sports pitches', body: ['Playing fields, courts and an indoor sports hall support a sports programme that runs across every stage.'], ctaLabel: 'See Beyond the Classroom', ctaHref: 'senior-beyond-the-classroom.html' } },
      { component: 'wf-text-media', props: { heading: 'Arts and performance spaces', side: 'left', mediaLabel: 'The Performing Arts Centre', body: ['The Great Hall and the Performing Arts Centre both have modern sound and lighting systems, staging productions, concerts and assemblies throughout the year.'], ctaLabel: 'See Beyond the Classroom', ctaHref: 'senior-beyond-the-classroom.html' } },
      { component: 'wf-text-media', props: { heading: 'Learning spaces', side: 'right', mediaLabel: 'Pupils in a well-equipped classroom', body: ['Wireframe note: a short section on classrooms, specialist teaching spaces (science, art, design technology) and the library, to be supplied by the school.'] } },
      {
        component: 'wf-promo', props: {
          heading: 'Hire our facilities', body: 'Our sports, arts and learning spaces are available to hire outside the school day. Get in touch to discuss your event.',
          ctaLabel: 'Enquire about hiring our facilities', ctaHref: 'contact.html', ctaId: 'cta-grounds-facilities-hire', mediaLabel: 'An external event in the Performing Arts Centre',
        },
      },
    ],
  },

  'about-leadership-governance': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Leadership & Governance', body: 'How Bancroft’s is governed, and the senior team who lead it day to day.',
        mediaLabel: 'Board of Governors meeting', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Leadership & Governance', href: 'about-leadership-governance.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Our Board of Governors, drawn from the Drapers’ Company and beyond, brings a wide range of professional expertise to overseeing Bancroft’s strategy, finances and safeguarding standards. The Board meets termly and works closely with our Senior Leadership Team on the school’s long-term direction.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Board of Governors', cols: 3,
          items: [
            { heading: 'Chair of Governors', description: 'Leads the Board of Governors.', imageLabel: 'Chair of Governors' },
            { heading: 'Vice Chair of Governors', description: 'Deputises for the Chair.', imageLabel: 'Vice Chair of Governors' },
            { heading: 'Safeguarding Governor', description: 'Leads Board oversight of safeguarding.', imageLabel: 'Safeguarding Governor' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Senior Leadership Team', cols: 3,
          items: [
            { heading: 'Head of Bancroft’s', description: 'Leads the school as a whole.', imageLabel: 'Head of Bancroft’s' },
            { heading: 'Deputy Head, Academic', description: 'Leads curriculum and teaching standards across the school.', imageLabel: 'Deputy Head, Academic' },
            { heading: 'Deputy Head, Pastoral', description: 'Leads pastoral care and pupil wellbeing.', imageLabel: 'Deputy Head, Pastoral' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          cols: 3,
          items: [
            { heading: 'Head of Prep', description: 'Leads the Prep years.', imageLabel: 'Head of Prep' },
            { heading: 'Head of Sixth Form', description: 'Leads the Sixth Form.', imageLabel: 'Head of Sixth Form' },
            { heading: 'Bursar', description: 'Leads finance and school operations.', imageLabel: 'Bursar' },
          ],
        },
      },
      bookVisitPromo('cta-governance-leadership-promo'),
    ],
  },

  'about-awards-recognition': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Awards and Recognition', body: 'League tables, inspection reports and awards, in one place and updated every year.',
        mediaLabel: 'Awards displayed in the school foyer',
        breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Awards and Recognition', href: 'about-awards-recognition.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['This page is kept current, so it is always the right place to check how Bancroft’s is performing. News stories about individual results and awards link back here.'] } },
      {
        component: 'wf-table', props: {
          heading: 'League tables',
          rowHeader: 'Table',
          columns: ['Year', 'Position'],
          rows: [
            { label: 'Sunday Times Parent Power', cells: ['2026', 'To be supplied'] },
            { label: 'A Level league table', cells: ['2026', 'To be supplied'] },
            { label: 'GCSE league table', cells: ['2026', 'To be supplied'] },
          ],
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'ISI Inspection 2025', side: 'right', mediaLabel: 'Inspectors visiting a lesson',
          body: ['Bancroft’s was rated excellent across every area of our 2025 ISI Inspection.', 'Wireframe note: a short summary of the key findings sits here, with the full report as a download.'],
          links: [
            { label: 'Read the full ISI Inspection report (PDF)', href: '#' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Awards', cols: 3,
          items: [
            { category: '2025 - Finalist', heading: 'Independent Schools of the Year', description: 'One line on what the shortlisting recognised.' },
            { category: '2025 - Winner', heading: 'Pastoral Care Award', description: 'One line on what the award recognised.' },
            { category: '2025 - Winner', heading: 'Innovation in Education', description: 'One line on what the award recognised.' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Pupil achievements', cols: 3,
          items: [
            { href: 'news.html', category: 'Academic', heading: 'Top 4 in the UK Biology Olympiad', description: 'Placeholder card - links to the news story.', linkText: 'Read the story' },
            { href: 'news-article-c.html', category: 'Sport', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby.', linkText: 'Read the story' },
            { href: 'news-article-a.html', category: 'Academic', heading: 'Outstanding GCSE results', description: 'Another year of strong outcomes across the Senior School.', linkText: 'Read the story' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'The results behind the rankings', cols: 3,
          items: [
            { href: 'results-destinations.html', heading: 'Results & Destinations', description: 'GCSE and A Level outcomes, with a five-year view, and where leavers go on to.' },
          ],
        },
      },
      bookVisitPromo('cta-awards-recognition-promo'),
    ],
  },

  // New visible menu page (client request) - an internal master page with a section per partner
  // school, rather than the footer's old bare "Family of Schools" link with nowhere real to land.
  'about-family-of-schools': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Our Family of Schools', body: 'Bancroft’s and its two partner Prep schools, under one foundation.',
        mediaLabel: 'Pupils from Bancroft’s and its partner Prep schools', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Our Family of Schools', href: 'about-family-of-schools.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['The Bancroft’s Family of Schools is a partnership between Bancroft’s and two local preparatory schools. Each partner school keeps its own name, site and identity, while gaining closer links into Bancroft’s at Senior level - joint events, shared expertise from Bancroft’s specialist teaching staff, and a clearer route into the Senior School at 11+.', 'Bancroft’s own Prep, on the main school site, continues to operate exactly as before, offering a third route into the Senior School at 7+.'] } },
      { component: 'wf-text-media', props: { heading: 'Partner school one', side: 'left', mediaLabel: 'Partner Prep school building', body: ['Wireframe note: name, location and a short description of the first partner school to be supplied, linking out to its own website.'], ctaLabel: 'Visit their website', ctaHref: '#' } },
      { component: 'wf-text-media', props: { heading: 'Partner school two', side: 'right', mediaLabel: 'Partner Prep school building', body: ['Wireframe note: name, location and a short description of the second partner school to be supplied, linking out to its own website.'], ctaLabel: 'Visit their website', ctaHref: '#' } },
      {
        component: 'wf-cards', props: {
          heading: 'Also part of the Family', cols: 2,
          items: [
            { href: 'prep.html', heading: '7+ Prep', description: 'Bancroft’s own Prep, on the main school site.', imageLabel: 'Prep pupils in the playground', linkText: 'Explore 7+ Prep' },
            { href: 'news-article-b.html', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', description: 'What the partnership means for families joining at 7+.', imageLabel: 'Prep pupils on a school trip', linkText: 'Read the story' },
          ],
        },
      },
      bookVisitPromo('cta-family-of-schools-promo'),
    ],
  },

  'about-policies-procedures': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        heading: 'Policies and Procedures', body: 'Our key school policies, kept up to date and available to every family.',
        mediaLabel: 'Policy documents on a shelf', breadcrumb: bc({ label: 'Policies and Procedures', href: 'about-policies-procedures.html' }),
      },
    },
    blocks: [
      // Client request: a line noting that ISI reports live here too, alongside the policies.
      { component: 'wf-text', props: { body: ['Our ISI Inspection reports also live on this page, alongside our key policies.'] } },
      {
        component: 'wf-accordion', props: {
          heading: 'Key policies',
          items: [
            { heading: 'Safeguarding Policy', body: 'How we keep pupils safe, including our approach to child protection, staff training and reporting a concern.', ctaLabel: 'Read the full policy (PDF)', ctaHref: '#' },
            { heading: 'Admissions Policy', body: 'How places are offered at each entry point, including our assessment process and oversubscription criteria.', ctaLabel: 'Read the full policy (PDF)', ctaHref: '#' },
            { heading: 'Behaviour Policy', body: 'Our approach to pupil conduct and discipline, and how we recognise and encourage positive behaviour.', ctaLabel: 'Read the full policy (PDF)', ctaHref: '#' },
            { heading: 'Anti-Bullying Policy', body: 'How we prevent, identify and respond to bullying, both in school and online.', ctaLabel: 'Read the full policy (PDF)', ctaHref: '#' },
            { heading: 'SEND Policy', body: 'Support for pupils with additional needs, including how needs are identified and the support available.', ctaLabel: 'Read the full policy (PDF)', ctaHref: '#' },
            { heading: 'Complaints Policy', body: 'How to raise a concern and the stages involved in reaching a resolution.', ctaLabel: 'Read the full policy (PDF)', ctaHref: '#' },
            { heading: 'ISI Inspection Reports', body: 'Our most recent ISI Inspection reports, kept here alongside our policies.', ctaLabel: 'Read the full report (PDF)', ctaHref: '#' },
          ],
        },
      },
      bookVisitPromo('cta-policies-promo'),
    ],
  },

  // Renamed from "Vacancies" and elevated with more culture content and a video (client request,
  // 2026-11-13) - it's a popular page, and the client wants it to say more about what it's
  // actually like to work here, not just list roles. Added to the About Us menu alongside its
  // existing footer link (see primaryNav → about, and footerColumns).
  'about-vacancies': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        heading: 'Working at Bancroft’s', body: 'Join a school that invests seriously in its staff, as well as its pupils.',
        mediaLabel: 'Staff member teaching a lesson', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Working at Bancroft’s', href: 'about-vacancies.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Our culture', body: [
        'We look for staff who share our belief that academic ambition and genuine care for pupils aren’t in tension. In return, we invest heavily in professional development and offer a genuinely collegiate working environment.',
        'Wireframe note: client wants this section to say a lot more about what it’s actually like to work here day to day - staff voices, development opportunities, wellbeing support - rather than the short, generic paragraph above. Fuller copy to be supplied by the client.',
      ] } },
      { component: 'wf-media', props: { type: 'video', label: 'A look at working at Bancroft’s', aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { body: ['Wireframe note: client idea for the real build - these listings come from MyNewTerm, as a link or embed (to be scoped with the dev team), rather than being maintained as page content here.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Current vacancies', cols: 3,
          items: [
            { href: '#', heading: 'Teacher of Mathematics', description: 'Full time, Senior School. Required from September 2027.', imageLabel: 'Mathematics classroom', linkText: 'View this role' },
            { href: '#', heading: 'Prep Class Teacher', description: 'Full time, Bancroft’s Prep. Required from September 2027.', imageLabel: 'Prep classroom', linkText: 'View this role' },
            { href: '#', heading: 'Learning Support Assistant', description: 'Part time, Senior School. Required immediately.', imageLabel: 'Learning support session', linkText: 'View this role' },
          ],
        },
      },
      { component: 'wf-promo', props: { heading: 'Don’t see the right role?', body: 'We welcome speculative applications from outstanding candidates at every level.', ctaLabel: 'Contact our HR team', ctaHref: 'contact.html', ctaId: 'cta-vacancies-promo', mediaLabel: 'Staff member at their desk' } },
    ],
  },

  'admissions-faqs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions', heading: 'Frequently Asked Questions', body: 'Quick answers to the questions we hear most from prospective and current families.',
        mediaLabel: 'Parent reading through school information', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Frequently Asked Questions', href: 'admissions-faqs.html' }),
      },
    },
    blocks: [
      { component: 'wf-accordion', props: { heading: 'Common questions', items: [
        { heading: 'What ages does Bancroft’s teach?', body: 'Bancroft’s is a through-school for ages 7 to 18, with entry points at 7+, 11+ and 16+, plus occasional places in other year groups when they arise.' },
        { heading: 'Is Bancroft’s co-educational?', body: 'Yes, Bancroft’s has been fully co-educational throughout the school for many years.' },
        { heading: 'How do I get to Bancroft’s?', body: 'The school is a short walk from the Central Line and is served by our own school bus service across North East London and Essex, alongside TfL and journey planning options.', ctaLabel: 'Getting to Bancroft’s', ctaHref: 'getting-to-bancrofts.html' },
        { heading: 'Is financial support available?', body: 'Yes. We offer academic and music scholarships, and means-tested bursaries covering up to 100 percent of fees.', ctaLabel: 'See Scholarships & Awards', ctaHref: 'scholarships-awards.html' },
        { heading: 'Should we choose a grammar school or an independent school?', body: 'Both routes are selective and academically strong, so the decision usually comes down to fit, cost and what happens beyond the classroom. Bancroft’s is co-educational, takes pupils from 7 to 18 and offers bursaries of up to 100 percent of fees. (Wireframe note: wording to be agreed with the admissions team.)' },
        { heading: 'Can my child apply to Bancroft’s and a grammar school?', body: 'Yes. Many families do both, and the two processes run alongside each other in Year 6.', ctaLabel: 'See Joining at 11+', ctaHref: 'admissions-11plus-journey.html' },
        { heading: 'Is the Bancroft’s 11+ the same as the grammar school test?', body: 'No. Bancroft’s sets its own English and Maths papers and interviews every candidate.', ctaLabel: 'See 11+ Assessments & Past Papers', ctaHref: 'admissions-11plus-past-papers.html' },
        { heading: 'What is the Bancroft’s Family of Schools?', body: 'A partnership between Bancroft’s and two local preparatory schools, each of which keeps its own name, site and identity while gaining closer links into Bancroft’s at 11+.', ctaLabel: 'See Our Family of Schools', ctaHref: 'about-family-of-schools.html' },
      ] } },
      bookVisitPromo('cta-faqs-promo'),
    ],
  },

  // --- Parents / Pupils / Staff (quick links) ---------------------------------
  // Replace the old Parent/Pupil/Staff Portal external links (client request) - each is now a
  // real internal page of clear quick links to the underlying systems, reached from the header's
  // quick links (see headerUtilityLinks in config.ts), not in the main menu. The systems listed
  // are carried over from what each portal used to expand to.

  parents: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Parents', subtitle: 'Quick links to the systems you’ll use most as a Bancroft’s parent.',
        breadcrumb: bc({ label: 'Parents', href: 'parents.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-cards', props: {
          heading: 'Quick links', cols: 4,
          items: [
            { href: '#', heading: 'iSAMS Parent Portal', description: 'Reports, attendance and your child’s record.' },
            { href: '#', heading: 'Parents’ Evening System', description: 'Book appointments for parents’ evenings.' },
            { href: '#', heading: 'SOCS (Trips & Consent)', description: 'Give consent and pay for school trips.' },
            { href: '#', heading: 'Online Payments', description: 'Pay for lunches, trips and other school costs.' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'You may also want', cols: 3,
          items: [
            { href: 'term-dates.html', heading: 'Term Dates', description: 'Term starts, half terms and holidays.' },
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s for lunch this week.' },
            { href: 'contact.html', heading: 'Contact', description: 'Get in touch with the right team.' },
          ],
        },
      },
    ],
  },

  pupils: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Pupils', subtitle: 'Quick links to the systems you’ll use most as a Bancroft’s pupil.',
        breadcrumb: bc({ label: 'Pupils', href: 'pupils.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-cards', props: {
          heading: 'Quick links', cols: 4,
          items: [
            { href: '#', heading: 'Pupil Portal (iSAMS)', description: 'Your timetable, homework and reports.' },
            { href: '#', heading: 'Prep VLE', description: 'The Prep’s virtual learning environment.' },
            { href: '#', heading: 'Senior VLE', description: 'The Senior School’s virtual learning environment.' },
            { href: '#', heading: 'Office 365 & Teams', description: 'Email, documents and online lessons.' },
            { href: '#', heading: 'Planet eStream', description: 'The school’s video and media library.' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'You may also want', cols: 3,
          items: [
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s for lunch this week.' },
            { href: 'uniform.html', heading: 'Uniform', description: 'What to buy and where from.' },
            { href: 'term-dates.html', heading: 'Term Dates', description: 'Term starts, half terms and holidays.' },
          ],
        },
      },
    ],
  },

  staff: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Staff', subtitle: 'Quick links to the systems you’ll use most as a member of staff.',
        breadcrumb: bc({ label: 'Staff', href: 'staff.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-cards', props: {
          heading: 'Quick links', cols: 4,
          items: [
            { href: '#', heading: 'Staff Remote Access', description: 'Access school systems from off site.' },
            { href: '#', heading: 'Office 365', description: 'Email, documents and Teams.' },
            { href: '#', heading: 'iSAMS', description: 'The school’s management information system.' },
            { href: '#', heading: 'CPOMS', description: 'Safeguarding and welfare recording.' },
            { href: '#', heading: 'VLEs', description: 'The Prep and Senior virtual learning environments.' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'You may also want', cols: 2,
          items: [
            { href: 'about-vacancies.html', heading: 'Working at Bancroft’s', description: 'Current roles at Bancroft’s.' },
            { href: 'about-policies-procedures.html', heading: 'Policies and Procedures', description: 'Key school policies, including safeguarding.' },
          ],
        },
      },
    ],
  },

  // --- Contact & legal ---------------------------------------------------------

  contact: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Contact', subtitle: 'Get in touch with the right team, or find us on the edge of Epping Forest.',
        breadcrumb: bc({ label: 'Contact', href: 'contact.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-text-media', props: {
          heading: 'Getting here', mediaLabel: 'Bancroft’s School entrance',
          body: [
            'Bancroft’s is a short walk from the Central Line, on the edge of Epping Forest, with direct access to our own grounds.',
            'Senior School: 611–627 High Road, Woodford Green, Essex IG8 0RF. Prep School is on Whitehall Road, a short walk from the Senior School entrance.',
            'Visitor parking is available on site; please check in at reception on arrival.',
          ],
          ctaLabel: 'Get directions', ctaHref: 'https://www.google.com/maps/search/?api=1&query=Bancroft%27s+School%2C+611-627+High+Road%2C+Woodford+Green%2C+Essex+IG8+0RF', ctaId: 'cta-contact-directions',
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'School offices', cols: 2,
          items: [
            { heading: 'Senior School', description: '020 8505 4821 · office@bancrofts.org' },
            { heading: 'Prep School', description: '020 8506 6751 · prepoffice@bancrofts.org — on Whitehall Road, a short walk from the Senior School entrance.' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Admissions & governance', cols: 3,
          items: [
            { heading: 'Senior & Sixth Form Admissions', description: 'admissions@bancrofts.org' },
            { heading: 'Prep School Admissions', description: 'prepoffice@bancrofts.org' },
            { heading: 'Governors’ Chairman', description: 'chairman@bancrofts.org' },
          ],
        },
      },
      {
        component: 'wf-form', props: {
          heading: 'Send us a message', submitLabel: 'Send message', submitId: 'submit-contact',
          successHeading: 'Thanks for getting in touch', successBody: 'We’ll direct your message to the right team and respond within two working days.',
          fields: [
            { name: 'name', label: 'Your name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'department', label: 'Who would you like to reach?', type: 'select', required: true, options: ['Admissions', 'Bursary and Fees', 'HR and Vacancies', 'General Enquiry'] },
            { name: 'message', label: 'Message', type: 'textarea', required: true },
          ],
        },
      },
    ],
  },

  'privacy-policy': {
    hero: { component: 'wf-page-header', props: { heading: 'Privacy Policy', subtitle: 'How Bancroft’s collects, uses and protects personal data.', breadcrumb: bc({ label: 'Privacy Policy', href: 'privacy-policy.html' }) } },
    blocks: [
      { component: 'wf-text', props: { heading: 'Our commitment to privacy', body: ['Bancroft’s is committed to protecting the privacy of pupils, parents, staff and website visitors. This page outlines how we collect, use and safeguard personal data in line with UK data protection law.', 'This is placeholder text for the wireframe prototype. The final Privacy Policy will be provided by Bancroft’s and its data protection advisers.'] } },
    ],
  },

}

// ---------------------------------------------------------------------------
// Prototype navigator — core pages (grouped by template type), user journeys, changelog.
// ---------------------------------------------------------------------------

export type CorePageType = 'Homepage' | 'Landing' | 'Content' | 'Listing' | 'Article'
export const CORE_PAGE_TYPES: CorePageType[] = ['Homepage', 'Landing', 'Content', 'Listing', 'Article']

export interface CorePage { label: string; href: string; type: CorePageType; inferred?: boolean }

export const corePages: CorePage[] = [
  { label: 'Homepage', href: 'index.html', type: 'Homepage' },

  // --- Admissions ---------------------------------------------------------
  { label: 'Admissions', href: 'admissions.html', type: 'Landing' },
  { label: 'Joining at 7+', href: 'admissions-7plus-journey.html', type: 'Content' },
  { label: 'Joining at 11+', href: 'admissions-11plus-journey.html', type: 'Content' },
  { label: '11+ Assessments & Past Papers', href: 'admissions-11plus-past-papers.html', type: 'Content' },
  { label: 'Joining at 16+', href: 'admissions-16plus-journey.html', type: 'Content' },
  { label: 'Starting at Bancroft’s', href: 'admissions-starting.html', type: 'Content' },
  { label: 'Visit Us', href: 'book-a-visit.html', type: 'Content' },
  { label: '7+ Open Morning', href: 'visit-7plus-open-morning.html', type: 'Content' },
  { label: '11+ Open Morning', href: 'visit-11plus-open-morning.html', type: 'Content' },
  { label: 'Sixth Form Open Evening', href: 'visit-sixth-form-open-evening.html', type: 'Content' },
  { label: 'Occasional Places', href: 'admissions-occasional-places.html', type: 'Content' },
  { label: 'Register Online', href: 'register.html', type: 'Content' },
  { label: '7+ Registration', href: 'register-7plus.html', type: 'Content' },
  { label: '11+ Registration', href: 'register-11plus.html', type: 'Content' },
  { label: '16+ Registration', href: 'register-16plus.html', type: 'Content' },
  { label: 'Acceptance Deposit: Fee', href: 'acceptance-deposit-fee.html', type: 'Content' },
  { label: 'Acceptance Deposit: Staff', href: 'acceptance-deposit-staff.html', type: 'Content' },
  { label: 'Acceptance Deposit: Bursary', href: 'acceptance-deposit-bursary.html', type: 'Content' },
  { label: 'Fees', href: 'fees.html', type: 'Content' },
  { label: 'Scholarships & Awards', href: 'scholarships-awards.html', type: 'Content' },
  { label: 'Bursaries', href: 'bursaries.html', type: 'Content' },
  { label: 'Frequently Asked Questions', href: 'admissions-faqs.html', type: 'Content' },

  // --- 7+ Prep --------------------------------------------------------------
  { label: '7+ Prep', href: 'prep.html', type: 'Landing' },
  { label: 'Why Bancroft’s Prep', href: 'prep-why.html', type: 'Content' },
  { label: 'Prep School Life', href: 'prep-life.html', type: 'Content' },
  { label: 'Prep: Academic Life', href: 'prep-academic-life.html', type: 'Content' },
  { label: 'Prep: Beyond the Classroom', href: 'prep-beyond-the-classroom.html', type: 'Landing' },
  { label: 'Prep: Sport', href: 'prep-sport.html', type: 'Content' },
  { label: 'Prep: Music', href: 'prep-music.html', type: 'Content' },
  { label: 'Prep: Drama', href: 'prep-drama.html', type: 'Content' },
  { label: 'Prep: Clubs', href: 'prep-clubs.html', type: 'Content' },
  { label: 'Prep: Pastoral Care', href: 'prep-pastoral-care.html', type: 'Content' },
  { label: 'Prep: Meet the Staff', href: 'prep-staff.html', type: 'Content' },

  // --- 11+ Senior -----------------------------------------------------------
  { label: '11+ Senior', href: 'senior.html', type: 'Landing' },
  { label: 'Why Bancroft’s', href: 'senior-why.html', type: 'Content' },
  { label: 'Senior School Life', href: 'senior-life.html', type: 'Content' },
  { label: 'Senior: Academic Life', href: 'senior-academic-life.html', type: 'Content' },
  { label: 'Senior: Beyond the Classroom', href: 'senior-beyond-the-classroom.html', type: 'Landing' },
  { label: 'Senior: Sport', href: 'senior-sport.html', type: 'Content' },
  { label: 'Senior: Music', href: 'senior-music.html', type: 'Content' },
  { label: 'Senior: Drama', href: 'senior-drama.html', type: 'Content' },
  { label: 'Senior: Clubs', href: 'senior-clubs.html', type: 'Content' },
  { label: 'Senior: Pastoral Care', href: 'senior-pastoral-care.html', type: 'Content' },

  // --- 16+ Sixth Form ---------------------------------------------------------
  { label: '16+ Sixth Form', href: 'sixth-form.html', type: 'Landing' },
  { label: 'Why Bancroft’s Sixth Form', href: 'sixth-form-why.html', type: 'Content' },
  { label: 'Sixth Form Life', href: 'sixth-form-life.html', type: 'Content' },
  { label: 'Sixth Form: Academic Life', href: 'sixth-form-academic-life.html', type: 'Content' },
  { label: 'Sixth Form: Beyond the Classroom', href: 'sixth-form-beyond-the-classroom.html', type: 'Landing' },
  { label: 'Sixth Form: Sport', href: 'sixth-form-sport.html', type: 'Content' },
  { label: 'Sixth Form: Music', href: 'sixth-form-music.html', type: 'Content' },
  { label: 'Sixth Form: Drama', href: 'sixth-form-drama.html', type: 'Content' },
  { label: 'Sixth Form: Clubs', href: 'sixth-form-clubs.html', type: 'Content' },
  { label: 'Sixth Form: Pastoral Care', href: 'sixth-form-pastoral-care.html', type: 'Content' },
  { label: 'Preparing for Life Beyond Bancroft’s', href: 'sixth-form-preparing-for-life.html', type: 'Content' },

  // --- Shared whole-school pages, linked from all three stage menus -----------
  { label: 'Learning Support', href: 'learning-support.html', type: 'Content' },
  { label: 'Results & Destinations', href: 'results-destinations.html', type: 'Content' },

  // --- School Life ------------------------------------------------------------
  { label: 'School Life', href: 'school-life.html', type: 'Landing' },
  { label: 'Community & Partnerships', href: 'school-life-community.html', type: 'Content' },
  { label: 'Foundation', href: 'foundation.html', type: 'Content' },
  { label: 'Old Bancroftians', href: 'old-bancroftians.html', type: 'Content' },
  { label: 'Term Dates', href: 'term-dates.html', type: 'Content' },
  { label: 'Weekly Menu', href: 'weekly-menu.html', type: 'Content' },
  { label: 'Getting to Bancroft’s', href: 'getting-to-bancrofts.html', type: 'Content' },
  { label: 'Uniform', href: 'uniform.html', type: 'Content' },

  // --- About --------------------------------------------------------------
  { label: 'About', href: 'about.html', type: 'Landing' },
  { label: 'Welcome from the Head', href: 'about-welcome.html', type: 'Content' },
  { label: 'What We Stand For', href: 'about-what-we-stand-for.html', type: 'Content' },
  { label: 'Awards and Recognition', href: 'about-awards-recognition.html', type: 'Content' },
  { label: 'Our History', href: 'about-history.html', type: 'Content' },
  { label: 'Our Grounds & Facilities', href: 'about-grounds-facilities.html', type: 'Content' },
  { label: 'Leadership & Governance', href: 'about-leadership-governance.html', type: 'Content' },
  { label: 'Our Family of Schools', href: 'about-family-of-schools.html', type: 'Content' },
  { label: 'Policies and Procedures', href: 'about-policies-procedures.html', type: 'Content' },
  { label: 'Working at Bancroft’s', href: 'about-vacancies.html', type: 'Content' },

  { label: 'Privacy Policy', href: 'privacy-policy.html', type: 'Content' },

  // --- News ---------------------------------------------------------------
  { label: 'News (listing)', href: 'news.html', type: 'Listing' },
  { label: 'News article', href: 'news-article-a.html', type: 'Article' },
  { label: 'News article', href: 'news-article-b.html', type: 'Article' },
  { label: 'News article', href: 'news-article-c.html', type: 'Article' },

  // --- Quick links (header utility row; each a page of clear quick links) ----
  { label: 'Parents', href: 'parents.html', type: 'Content' },
  { label: 'Pupils', href: 'pupils.html', type: 'Content' },
  { label: 'Staff', href: 'staff.html', type: 'Content' },

  { label: 'Contact', href: 'contact.html', type: 'Content', inferred: true },
]

export interface WalkStep { href: string; targetId: string; label: string; instruction: string }
export interface Flow { name: string; description: string; steps: WalkStep[] }

export const flows: Flow[] = [
  {
    name: '11+ parent enquiry',
    description: 'Homepage → 11+ Senior → Joining at 11+ → Book a Visit. End state is a booked event, tracked as a key event by entry point (7+, 11+, 16+).',
    steps: [
      { href: 'index.html', targetId: 'cta-home-senior', label: 'Homepage', instruction: 'Select the 11+ Senior card.' },
      { href: 'senior.html', targetId: 'cta-senior-hero-journey', label: '11+ Senior', instruction: 'Scroll to “Ready to take the next step?” and click “Start your 11+ journey”. The hero “Book a Visit” is a shortcut straight to the form.' },
      { href: 'admissions-11plus-journey.html', targetId: 'cta-11plus-journey-promo', label: 'Joining at 11+', instruction: 'Click “Book a Visit” in the closing banner.' },
      { href: 'book-a-visit.html', targetId: 'cta-visit-us-11plus', label: 'Visit Us', instruction: 'Click “Book this event” under “11+ Open Morning”.' },
      { href: 'visit-11plus-open-morning.html', targetId: 'submit-visit-11plus-open-morning', label: '11+ Open Morning', instruction: 'Complete and submit the booking form.' },
    ],
  },
  {
    name: '7+ Prep parent enquiry',
    description: 'Homepage → 7+ Prep → Joining at 7+ → Book a Visit. End state is a booked event, tracked as a key event by entry point (7+, 11+, 16+).',
    steps: [
      { href: 'index.html', targetId: 'cta-home-prep', label: 'Homepage', instruction: 'Select the 7+ Prep card.' },
      { href: 'prep.html', targetId: 'cta-prep-hero-journey', label: '7+ Prep', instruction: 'Scroll to “Ready to take the next step?” and click “Start your 7+ journey”. The hero “Book a Visit” is a shortcut straight to the form.' },
      { href: 'admissions-7plus-journey.html', targetId: 'cta-7plus-journey-promo', label: 'Joining at 7+', instruction: 'Click “Book a Visit” in the closing banner.' },
      { href: 'book-a-visit.html', targetId: 'cta-visit-us-7plus', label: 'Visit Us', instruction: 'Click “Book this event” under “7+ Open Morning”.' },
      { href: 'visit-7plus-open-morning.html', targetId: 'submit-visit-7plus-open-morning', label: '7+ Open Morning', instruction: 'Complete and submit the booking form.' },
    ],
  },
  {
    name: 'Sixth Form applicant',
    description: 'Homepage → 16+ Sixth Form → Joining at 16+ → Book a Visit. End state is a booked event, tracked as a key event by entry point (7+, 11+, 16+).',
    steps: [
      { href: 'index.html', targetId: 'cta-home-sixth-form', label: 'Homepage', instruction: 'Select the 16+ Sixth Form card.' },
      { href: 'sixth-form.html', targetId: 'cta-sixthform-hero-journey', label: '16+ Sixth Form', instruction: 'Scroll to “Ready to take the next step?” and click “Start your 16+ journey”.' },
      { href: 'admissions-16plus-journey.html', targetId: 'cta-16plus-journey-promo', label: 'Joining at 16+', instruction: 'Click “Book a Visit” in the closing banner. “Register Online” is the secondary option beside it.' },
      { href: 'book-a-visit.html', targetId: 'cta-visit-us-sixthform', label: 'Visit Us', instruction: 'Click “Book this event” under “Sixth Form Open Evening”.' },
      { href: 'visit-sixth-form-open-evening.html', targetId: 'submit-visit-sixth-form-open-evening', label: 'Sixth Form Open Evening', instruction: 'Complete and submit the booking form.' },
    ],
  },
  {
    name: 'Sixth Form current pupil',
    description: 'Homepage → 16+ Sixth Form → Joining at 16+ (Year 11 progression) → 16+ Registration → Registration received.',
    steps: [
      { href: 'index.html', targetId: 'cta-home-sixth-form', label: 'Homepage', instruction: 'Select the 16+ Sixth Form card.' },
      { href: 'sixth-form.html', targetId: 'cta-sixthform-moving-up', label: '16+ Sixth Form', instruction: 'Scroll to “Already at Bancroft’s?” at the foot of the page and click “See Joining at 16+”.' },
      { href: 'admissions-16plus-journey.html', targetId: 'cta-16plus-journey-hero-register', label: 'Joining at 16+', instruction: 'Under “Already at Bancroft’s?”, read about moving up from Year 11, then click “Register Online” in the hero.' },
      { href: 'register-16plus.html', targetId: 'submit-register', label: '16+ Registration', instruction: 'Complete and submit the 16+ registration form.' },
    ],
  },
  {
    name: 'Current family quick task',
    description: 'Homepage → School Life → Term Dates, with Weekly Menu and Getting to Bancroft’s beside it.',
    steps: [
      { href: 'index.html', targetId: 'cta-home-school-life-promo', label: 'Homepage', instruction: 'Click “Go to School Life”.' },
      { href: 'school-life.html', targetId: 'cta-schoollife-card-term-dates', label: 'School Life', instruction: 'Click the “Term Dates” card under Explore School Life. Weekly Menu and Getting to Bancroft’s are beside it.' },
    ],
  },
  {
    name: 'Reputation to conversion via News',
    description: 'Homepage → News article → Results & Destinations → Book a Visit. Direct route: the article’s closing banner. End state is a booked event, tracked as a key event by entry point (7+, 11+, 16+).',
    steps: [
      { href: 'index.html', targetId: 'cta-home-news-article', label: 'Homepage', instruction: 'Click the first “Latest news” story.' },
      { href: 'news-article-a.html', targetId: 'cta-article-a-gcse-results', label: 'News article', instruction: 'Under “Related”, click “Results & Destinations”. Senior Academic Life is beside it, and the closing banner’s “Book a Visit” is the direct route.' },
      { href: 'results-destinations.html', targetId: 'cta-results-destinations-promo', label: 'Results & Destinations', instruction: 'Click “Book a Visit” in the closing banner.' },
      { href: 'book-a-visit.html', targetId: 'cta-visit-us-11plus', label: 'Visit Us', instruction: 'Click “Book this event” under “11+ Open Morning”.' },
      { href: 'visit-11plus-open-morning.html', targetId: 'submit-visit-11plus-open-morning', label: '11+ Open Morning', instruction: 'Complete and submit the booking form.' },
    ],
  },
  {
    name: '11+ past papers',
    description: 'Joining at 11+ → 11+ Assessments & Past Papers → Book a Visit. End state is a booked event, tracked as a key event by entry point (7+, 11+, 16+).',
    steps: [
      { href: 'admissions-11plus-journey.html', targetId: 'cta-11plus-journey-card-papers', label: 'Joining at 11+', instruction: 'Under “You may also want”, click “11+ Assessments & Past Papers”.' },
      { href: 'admissions-11plus-past-papers.html', targetId: 'cta-past-papers-promo', label: '11+ Assessments & Past Papers', instruction: 'Click “Book a Visit” in the closing banner.' },
      { href: 'book-a-visit.html', targetId: 'cta-visit-us-11plus', label: 'Visit Us', instruction: 'Click “Book this event” under “11+ Open Morning”.' },
      { href: 'visit-11plus-open-morning.html', targetId: 'submit-visit-11plus-open-morning', label: '11+ Open Morning', instruction: 'Complete and submit the booking form.' },
    ],
  },
  {
    name: 'Value and fees',
    description: 'Fees → Scholarships & Awards → Book a Visit. End state is a booked event, tracked as a key event by entry point (7+, 11+, 16+).',
    steps: [
      { href: 'fees.html', targetId: 'cta-fees-promo', label: 'Fees', instruction: 'Click “See Scholarships & Awards” in the closing banner.' },
      { href: 'scholarships-awards.html', targetId: 'cta-scholarships-promo', label: 'Scholarships & Awards', instruction: 'Click “Book a Visit” in the closing banner.' },
      { href: 'book-a-visit.html', targetId: 'cta-visit-us-11plus', label: 'Visit Us', instruction: 'Click “Book this event” under “11+ Open Morning”.' },
      { href: 'visit-11plus-open-morning.html', targetId: 'submit-visit-11plus-open-morning', label: '11+ Open Morning', instruction: 'Complete and submit the booking form.' },
    ],
  },
  {
    name: 'Register Online',
    description: 'Admissions → Register Online → 11+ Registration → Registration received.',
    steps: [
      { href: 'admissions.html', targetId: 'cta-admissions-register', label: 'Admissions', instruction: 'Under “Ready to register?”, click “Register Online”.' },
      { href: 'register.html', targetId: 'cta-register-11plus', label: 'Register Online', instruction: 'Choose an entry point. This walkthrough follows 11+.' },
      { href: 'register-11plus.html', targetId: 'submit-register', label: '11+ Registration', instruction: 'Complete and submit the 11+ registration form.' },
    ],
  },
]

export interface ChangelogEntry { date: string; type: 'Added' | 'Changed' | 'Removed' | 'Fixed'; text: string }

export const changelog: ChangelogEntry[] = [
  { date: '2026-11-16', type: 'Added', text: 'New "Clubs" page under Beyond the Classroom for Prep, Senior and Sixth Form (client request, via Figma comments) - a flavour of club categories rather than a fixed list, since the real roster changes every term. Added alongside Sport/Music/Drama in each hub\'s card grid and (for Senior/Sixth Form) their cross-link button rows.' },
  { date: '2026-11-16', type: 'Added', text: 'Map added to Getting to Bancroft’s, after the client flagged it would help families orient themselves before the route detail (client request, via Figma comments).' },
  { date: '2026-11-16', type: 'Changed', text: '"Vacancies" renamed to "Working at Bancroft’s" and added to the About Us menu (kept its existing footer link too), with a new culture section and video placeholder added above the existing "Current vacancies" listing (client request, via Figma comments).' },
  { date: '2026-11-13', type: 'Changed', text: 'Homepage storyboard hero ("The Gate" beat) updated to match the new Figma copy: heading "A London school with room to grow." (London italicised), subhead "Academic strength, warmth and community since 1737.", and the "ISI Inspected 2025" line dropped (it duplicated the ISI stat already in the "Proof, carved in stone" beat). "Scroll to discover" and the no-CTA treatment already matched Figma, so left unchanged.' },
  { date: '2026-11-13', type: 'Changed', text: 'Sitewide header CTA relabelled from "Book a Visit" to "Visit us", matching Figma\'s nav. Destination unchanged (book-a-visit.html).' },
  { date: '2026-11-13', type: 'Changed', text: 'Replaced the single whole-school "Pastoral Care & Houses" page with three stage-specific pages - Pastoral Care at the Prep, Pastoral Care in the Senior School, Pastoral Care in the Sixth Form - each with its own H1/title tag, nav-childed under its own stage directly after Beyond the Classroom. The Chaplain and Learning for Life sections move to the Senior page. All cross-links updated.' },
  { date: '2026-11-13', type: 'Added', text: 'New page "Our Grounds & Facilities" in About, after Our History: the site, sport, arts and learning spaces, ending on a "Hire our facilities" enquiry block for external lettings rather than its own page.' },
  { date: '2026-11-13', type: 'Changed', text: '"Our Community" renamed to "Community & Partnerships" throughout (sitemap, School Life menu, page heading/breadcrumb, all links). Address and children (Foundation, Old Bancroftians) unchanged.' },
  { date: '2026-11-13', type: 'Changed', text: "About's sitemap-tree branch order updated to the client's new sequence: Welcome from the Head, What We Stand For, Our History, Our Grounds & Facilities, Leadership & Governance, Our Family of Schools, Awards and Recognition, Results & Destinations, Learning Support." },
  { date: '2026-10-15', type: 'Changed', text: '11+ Entrance Exam & Past Papers, checked against the SEO report\'s hub structure: papers are now grouped by year with answers (2017 Maths and English, plus placeholder slots for recent years), the 2015 13+ Maths sample paper is added for occasional-place families, and Key dates gives the 11+ Open Morning date alongside personal tours.' },
  { date: '2026-10-15', type: 'Added', text: 'The 7+ Prep, 11+ Senior and 16+ Sixth Form overview pages now work as the entry-point hubs the SEO report asks for: each gains a "Joining at" section (process timeline, key dates table, fees and assessment summary, link to the full Journey page) and two or three admissions questions in its FAQs. The Journey pages keep the full detail.' },
  { date: '2026-10-14', type: 'Added', text: 'Occasional Places page under Admissions, off the menu, at the SEO director\'s recommendation: a page entirely about occasional places ranks better for that search than a section on the Admissions hub. Content from the live page (year groups, how it works, expression of interest form). Linked from Admissions "Find your journey", the Admissions FAQs and the Register Online landing page, which used to send these enquiries to Contact.' },
  { date: '2026-10-14', type: 'Added', text: 'From the SEO review: a Term Dates page in School Life, above the calendar (now "Events Calendar"), because "term dates" drives far more search traffic than "calendar". Register Online is now a landing page leading to separate 7+, 11+ and 16+ registration forms, as on the live site; stage-specific buttons link straight to their own form.' },
  { date: '2026-10-14', type: 'Added', text: 'CCF, Duke of Edinburgh\'s Award and Sea Scouts pages under Senior Co-Curriculum (also linked from Trips & Visits), an Acceptance Deposit form page (off the menu, linked from Starting at Bancroft\'s) and a Spiritual Life page linked from Senior Pastoral Care.' },
  { date: '2026-10-14', type: 'Changed', text: 'Senior Pastoral Care\'s separate promo blocks are now one "Support and wellbeing" card row (Learning for Life, Learning Support, Spiritual Life, Starting at Bancroft\'s). Starting at Bancroft\'s gains "Devices and IT" from the live IT information page, and Fees lists the Year 7 iPad as bought separately.' },
  { date: '2026-10-13', type: 'Added', text: 'Five new pages: Prep School Life (Prep nav), Why Bancroft\'s Sixth Form (Sixth Form nav), and three off primary nav - Learning Support (from Pastoral Care), Trips & Visits (from Co-Curriculum and Curriculum) and Starting at Bancroft\'s, a transition page for 11+ joiners that follows the offer step on Your 11+ Journey.' },
  { date: '2026-10-13', type: 'Changed', text: '"Clubs" is now "Co-Curriculum" on all three stages, in menus, headings, breadcrumbs and page addresses - the school\'s own term. This reverses the 2026-08-30 rename. Everyday phrases such as "250+ clubs and societies" are unchanged.' },
  { date: '2026-10-13', type: 'Changed', text: '"Register" is now "Register Online" as the page, menu item and button label. "Book a Visit" added to the hero of Admissions and the three Journey pages, matching the stage pages.' },
  { date: '2026-10-13', type: 'Changed', text: '7+ Prep overview gains "Welcome from the Head of Prep"; Why Bancroft\'s Prep gains "Our aims and values" with the six core values. Sixth Form Life is rewritten for pupils, and the Sixth Form nav now runs overview, Why, A Level Results, matching Senior.' },
  { date: '2026-10-13', type: 'Removed', text: '"Grammar or independent school?" removed as a page; its questions now sit in the Admissions FAQs, with related questions on Fees and Your 11+ Journey. The comparison table is not carried over.' },
  { date: '2026-10-12', type: 'Added', text: 'New Arts section mirroring Sport: "The Arts at Bancroft\'s" listing page plus Visual Arts, Drama and Music pages, using content from bancrofts.org/senior/the-arts/ (paraphrased, not copied, no staff or pupil names). Off primary nav like Sport, reached from the "The Arts" block on Sport & Arts, "Arts & Performance" on Senior Clubs and Music Awards on Scholarships & Bursaries.' },
  { date: '2026-10-12', type: 'Changed', text: 'Terminology: "User flows" are now "User journeys" throughout the Prototype panel, change log and project notes, to match the team\'s own wording.' },
  { date: '2026-10-10', type: 'Changed', text: 'Journey and CTA corrections. "Book a Visit" is the primary CTA throughout and "Register" is secondary: the visit form is now "Book your visit" with an Event and Date choice and a "You\'re booked" confirmation; 7+ Prep, 11+ Senior and 16+ Sixth Form gain a hero "Book a Visit"; Your 16+ Journey\'s closing banner leads with "Book a Visit" with "Register" beside it (wf-promo and wf-text-media can now give their secondary button an id). Admissions gains a "Ready to register?" block.' },
  { date: '2026-10-10', type: 'Changed', text: 'Onward links so pages are not dead ends: Calendar and Weekly Menu link to News and the newsletter sign-up, the GCSE results article links to GCSE Results and Leavers\' Destinations, 11+ Senior links to Scholarships & Bursaries and 7+ Prep notes the Family of Schools.' },
  { date: '2026-10-10', type: 'Changed', text: 'User journeys replaced: the five walkthroughs are now nine (11+ parent, 7+ Prep parent, Sixth Form applicant, Sixth Form current pupil, Current family, News to conversion, 11+ past papers, Value and fees, Register), each step pointing at a real element.' },
  { date: '2026-10-09', type: 'Added', text: 'New Sitemap view in the Prototype panel: the whole site drawn as a tree in the style of the original Sitemap v1, in the wireframe\'s greyscale. It has no page list of its own - columns come from the menu, each page\'s position from its breadcrumb, its type tag from Core pages and the footer block from the footer links - so it always matches the site. Pages outside the menu are shown dashed and marked "Not in menu".' },
  { date: '2026-10-09', type: 'Added', text: 'SEO audit additions, from the Search Audit and Recommendations report: four new pages - 11+ Entrance Exam & Past Papers (off primary nav as a sub-page of Your 11+ Journey, reached from there, the Admissions "Guides for parents" row and a new "Preparing for the 11+?" block on 11+ Senior), Rankings & Recognition (About nav), a "Grammar or independent school?" guide for parents (off primary nav, reached from Admissions, Your 11+ Journey, Why Bancroft\'s Senior and Fees) and Learning for Life (off primary nav, reached from Senior Pastoral Care and Senior Curriculum).' },
  { date: '2026-10-09', type: 'Changed', text: 'Results pages rebuilt to the audit\'s evergreen structure and renamed to match what parents search: "Academic Results" is now "GCSE Results", "Examination Results" is now "A Level Results" (URLs unchanged). Each gains a five-year table, subject highlights, a pupil quote, cross-links and FAQs. A Level Results moves up the Sixth Form nav to sit before Leavers\' Destinations.' },
  { date: '2026-10-09', type: 'Added', text: 'Page-specific FAQ accordions on Admissions, the three Journey pages, the three stage overviews, Fees, Scholarships & Bursaries and both results pages. Journey pages carry process questions, stage overviews carry questions about life at that stage, and every set ends on a link to the central FAQ page.' },
  { date: '2026-10-09', type: 'Added', text: 'Fees gains a "Fees and VAT" explanation and a "What your fees include" table (rows marked "To confirm" need checking with the Bursar). The homepage awards strip now links through to Rankings & Recognition.' },
  { date: '2026-09-01', type: 'Changed', text: 'Contact now uses real details from bancrofts.org/contact/: Senior/Prep School addresses, phone numbers and office emails, plus separate Admissions and Governors\' Chairman contacts, in two new "School offices" and "Admissions & governance" card rows. "Getting here" is now a wf-text-media block with a real "Get directions" Google Maps link, replacing the previous generic Central Line/Epping Forest blurb.' },
  { date: '2026-09-01', type: 'Changed', text: 'Our Community now leads with real intro copy and a 7-item card grid (Bancroft’s Foundation, The Drapers’ Company, Parents’ Association, Old Bancroftians, The Arts Society, The Evening Chorus Choir, The Crofton Singers), replacing the previous single summary paragraph. Parent Association is removed from the School Life secondary nav - it\'s reached via its card here instead - but the page itself is unchanged and its card links straight to it; the other six cards point out to "#" pending real destinations, matching every other external-organisation link in this build.' },
  { date: '2026-09-01', type: 'Added', text: 'New Parent Association page under School Life (mission, committee, events and how to get involved), using real content from bancrofts.org/about-us/our-community/parents-association/ (paraphrased, not copied). It\'s real content a prospective family can browse, not just a login shortcut, so - same reasoning as Uniform - it earns its own page rather than living only as a Parent Portal bookmark; the "Parents\' Association" link that used to sit in that portal dropdown is superseded by this page.' },
  { date: '2026-09-01', type: 'Added', text: 'New Uniform page under School Life (guides, Schoolblazer as official supplier, second-hand uniform contact), using real content from bancrofts.org/parents/uniform/ (paraphrased, not copied). Uniform is informational content a prospective family cares about too, so it earns a real page rather than living only as a portal bookmark - the "Uniform Shop" link that used to sit in the Parent Portal utility list is superseded by this page. Also changed: the header nav\'s Parent/Pupil/Staff Portal utility links now expand in place to their real sub-systems (previously a single dead "#" link each), inspired by uppingham.co.uk\'s "Key Links" pattern.' },
  { date: '2026-08-29', type: 'Fixed', text: 'wf-promo had the exact same mobile-stacking bug as wf-text-media, above — DOM order followed side directly, so a stacked layout showed text before image whenever side="right" (this is what "A welcome from our Head" was doing on the homepage). Fixed the same way: media always first in the DOM, side only reorders visually at sm: and above.' },
  { date: '2026-08-29', type: 'Changed', text: 'Homepage hero is full viewport height, accounting for the sticky header\'s own height (and the walkthrough bar\'s, when active) — min-h-[calc(100vh-var(--wf-bar-h)-4rem)], not a flat 100vh, so its bottom edge lines up with the viewport bottom on load instead of running 64px past the fold. Content is vertically centered. Checked it doesn\'t clip the CTA even at a short 375x600 mobile viewport.' },
  { date: '2026-08-29', type: 'Fixed', text: 'SEO indexing gap: the project had a robots.txt disallowing all crawlers, but that alone doesn\'t stop a URL being indexed if it\'s ever discovered via an external link — it only stops crawling, not indexing. Added `<meta name="robots" content="noindex, nofollow, noarchive">` to every one of the 56 generated pages (via gen-pages.mjs, the single source of truth for all page shells), which is the actual guarantee against indexing. Both should stay in place if this is ever deployed somewhere with a real URL.' },
  { date: '2026-09-01', type: 'Changed', text: 'Swapped News and About in the primary navigation order - now Admissions, 7+ Prep, 11+ Senior, 16+ Sixth Form, School Life, News, About.' },
  { date: '2026-09-01', type: 'Changed', text: 'Your 16+ Journey now uses wf-timeline too, per client request, matching 7+/11+. Its process genuinely branches (internal Staying On vs. external application), so the timeline covers only the external path (Visit, Register, Interview and assessment, Offer) with "Already at Bancroft\'s?" split out as its own block pointing to Staying On - rather than forcing one page\'s two different audiences into a single misleading sequence.' },
  { date: '2026-08-31', type: 'Changed', text: 'Senior Curriculum page now uses real content from bancrofts.org/senior/the-curriculum/curriculum-11-16/ (paraphrased, not copied): Third Form/Removes\' 18-subject structure, the real six compulsory GCSE subjects plus three from fifteen options, and the accelerated Maths track. Corrected "Years 7 to 9" to the school\'s real Third Form/Removes terminology for Years 7-8.' },
  { date: '2026-08-31', type: 'Changed', text: 'Prep Curriculum page now uses real content from bancrofts.org/prep/curriculum/ (paraphrased, not copied): the curriculum\'s philosophy, how teaching is split between form teachers and subject specialists (and how that shifts from Year 5), and the Alpha (Year 3) to Prep 2 (Year 6) year-group structure, replacing the previous generic one-line summary.' },
  { date: '2026-08-31', type: 'Changed', text: 'About Bancroft\'s: same fix as the Prep/Senior/Sixth Form overview pages - "Explore About" wf-cards grid replaced with a sequence of wf-text-media blocks (one per area, alternating sides, image + context + CTA each).' },
  { date: '2026-08-31', type: 'Changed', text: 'Weekly Menu changed from an accordion (each day hidden until clicked) to a wf-table - Day / Main / Vegetarian Option, all five days visible at once. The two notes that used to repeat inside every accordion item (fresh fruit and yoghurt, salad bar) now appear once underneath instead.' },
  { date: '2026-08-31', type: 'Changed', text: 'Homepage hero CTA changed from "Book a Visit" to "Why Bancroft\'s", pointing to admissions.html instead of book-a-visit.html - a single starting point that branches into all three journeys (7+/11+/16+), rather than asking for a visit before the reader has chosen a stage.' },
  { date: '2026-08-31', type: 'Changed', text: 'Same "too early" problem, found on the Admissions pages: removed the hero CTA from admissions.html, admissions-7plus-journey.html, admissions-11plus-journey.html and admissions-16plus-journey.html - Book a Visit/Register before any content is read, duplicating the always-present header CTA. Not relocated this time, since each page already ends in an appropriate closing promo (Book a Visit or Register) - nothing to lose. None of the four ids were referenced by any user journey walkthrough.' },
  { date: '2026-08-31', type: 'Changed', text: 'Rebuilt Prep/Senior/Sixth Form overview pages: the wf-brochure-cards grid plus separate "Also in ___" section (added a few hours earlier) read as two disconnected areas rather than one coherent list. Replaced both with one continuous sequence of wf-text-media blocks, one per area (image + context + CTA each), alternating sides. wf-brochure-cards had no other use once these three pages changed, so it was removed from the kit entirely rather than left unused - kit is 20 components again, not 21.' },
  { date: '2026-08-31', type: 'Added', text: 'Two new components, grounded in the client\'s own pitch design: wf-timeline (numbered, connected steps) replaces the "Key steps" wf-cards grid on the 7+ and 11+ journey pages, which have a genuine linear sequence (16+ stays as is - its process branches, not linear, so a timeline would misrepresent it). wf-brochure-cards (centred text, smaller image below) replaces the main "Explore the ___ years" wf-cards grid on all three stage overview pages, matching the pitch\'s own admissions-entry tile style. Both stay in the kit\'s greyscale palette. See PROTOTYPE.md.' },
  { date: '2026-08-31', type: 'Changed', text: 'Swapped the order of Sixth Form\'s last two closing blocks: "Ready to take the next step?" now comes before "Already at Bancroft\'s?".' },
  { date: '2026-08-31', type: 'Changed', text: 'Removed the "Start your Nplus journey" CTA from the hero on Prep, Senior and Sixth Form overview pages — asking a reader to commit before they\'ve read anything about the stage felt premature, and duplicated the always-present header "Book a Visit" CTA. Relocated it to the end of each page instead, as a two-button wf-text-media block (primary "Start your Nplus journey", secondary "Book a Visit") once the reader has actually read about the stage. Kept the same CTA element ids so the three user journey walkthroughs that click through this button still work unchanged, just landing lower on the page — verified "7+ Prep parent enquiry" end to end.' },
  { date: '2026-08-30', type: 'Changed', text: 'Clubs category cards (all three stages) changed from wf-cards to wf-text-media, alternating sides, so each category can carry its own image next to the copy instead of a plain text card.' },
  { date: '2026-08-30', type: 'Changed', text: 'Reordered secondary nav per client spec: Prep is now overview, Why, Curriculum, Clubs, Meet the Staff, Pastoral Care; Senior is overview, Why, Academic Results, Curriculum, Sport & Arts, Clubs, Pastoral Care. Senior\'s Sport/Arts hub renamed from "Sport, Arts & Co-Curriculum" to "Sport & Arts" throughout (URL, title, breadcrumbs on all 9 Sport detail pages) — Co-Curriculum removed from its scope now that Clubs has its own section; its old co-curriculum content block replaced with a short cross-link to Clubs instead.' },
  { date: '2026-08-30', type: 'Changed', text: 'Curriculum and Clubs split into clearly separate secondary nav items for all three stages, per client direction. Prep\'s "Curriculum & Co-Curriculum" page/nav entry is now two: Curriculum (classroom content only) and Clubs. Renamed the three Clubs pages to prep-clubs.html / senior-clubs.html / sixth-form-clubs.html (from *-cocurriculum.html), heading simplified to just "Clubs". Also linked Clubs from each stage\'s overview page directly, not just the nav.' },
  { date: '2026-08-30', type: 'Added', text: 'New Clubs & Co-Curriculum page for each entry point (Prep, Senior, Sixth Form), off primary nav like Sport, reached via a CTA from an existing page for that stage. Grouped into 4 categories per stage rather than listing every club. Senior surfaces the real "250+ clubs" stat from bancrofts.org. Senior excludes Sport (already has its own section, cross-linked instead); Sixth Form leans into leadership since Sixth Formers often run clubs, not just attend them. See PROTOTYPE.md for the research behind this and the open question on whether clubs are fee-included.' },
  { date: '2026-08-30', type: 'Changed', text: 'Calendar\'s "Whole School" filter split into "Term Dates" (INSET days, term begins/ends, holidays) and "School Events" (concerts, Carol Service) — clearer than one mixed category.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-promo image/box now matches the standard hero\'s size (aspect-[21/9]), instead of a fixed padding-based height, for more visual impact.' },
  { date: '2026-08-29', type: 'Fixed', text: 'The wf-promo redesign broke the homepage: "A welcome from our Head" and "An academic education that opens doors" are mid-page feature blocks, not closing CTAs, but they were using wf-promo (for its old two-column look) and inherited the new full-width style, making the homepage read as one big gray promo box after another. Converted both to wf-text-media, which is what they actually are content-wise. Added ctaId support to wf-text-media (it didn\'t have it) to carry over their existing CTA ids. Every other wf-promo usage sitewide is a genuine closing CTA (confirmed each is the last block on its page) and keeps the new style.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-promo redesigned: full-width image placeholder with heading/body/CTA centred on top of it (same family as the homepage hero), replacing the two-column image-one-side/text-card-the-other layout, so Promo reads as visually distinct from Text & Media rather than a smaller variant of it. The side prop is gone — no columns left for it to place — stripped from the component and all 13 config.ts call sites.' },
  { date: '2026-08-29', type: 'Fixed', text: 'Real bug in every walkthrough, not just "Current family quick task": clicking a flow\'s LAST step\'s target crashed the whole Prototype navigator component (walkthrough bar AND the floating "Prototype" button both vanished) on whatever page/state followed. Cause: stepIndex incremented past the end of the steps array with no bounds check, and render() then read flow.steps[stepIndex].href on undefined. Fixed by exiting the flow cleanly on that last click instead of overflowing the index, plus a bounds-check in render() as a backstop. Also fixed the Prototype panel\'s "Component List" row, which still said "All 18 components" instead of 19.' },
  { date: '2026-08-29', type: 'Fixed', text: 'The page behind the full-screen nav can no longer scroll while the nav is open — it\'s a fixed panel over the real page, so the page underneath could still scroll invisibly, leaving you somewhere unexpected once the nav closed. Locks document.documentElement\'s scroll while navOpen is true, restores it when closed; the nav panel\'s own content still scrolls fine since it\'s a separate scroll container. Applies at every viewport width.' },
  { date: '2026-08-29', type: 'Changed', text: 'Welcome from the Head restructured: removed the large hero image and moved the "Get to know Alex" video to the top of the page, right under the heading, with the intro copy now underneath it instead of above.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-logos boxes now have padding around the text (was running edge-to-edge on longer names like "Independent Schools of the Year Finalist 2025") and center-aligned wrapped text, instead of ragged-left.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-text-media\'s links row (used on School Bus Service) now stacks vertically instead of wrapping in a horizontal row.' },
  { date: '2026-08-29', type: 'Changed', text: 'Replaced em dashes (—) with plain hyphens (-) across all real page content site-wide (hero eyebrows, body copy, card descriptions), per house style. Left them in the Prototype panel\'s own changelog, which isn\'t page content visitors see.' },
  { date: '2026-08-29', type: 'Fixed', text: 'wf-text-media had a real bug: a stacked mobile/tablet layout followed whatever side said (text-then-media for side="right"), instead of always being image-first. Fixed sitewide — media is now always first in the DOM, with side only reordering the two columns visually at lg: and above. Also fixed the Component List page\'s Text & Media specimen, whose headings had "side" backwards.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-text-media gained an optional links prop — a row of reference links shown as plain text + arrow instead of buttons — replacing the tertiaryLabel button added earlier this session, which didn\'t fit School Bus Service\'s three links as well. School Bus Service\'s "Find out more" now uses it, with the image flipped to sit on the right.' },
  { date: '2026-08-29', type: 'Changed', text: 'School Bus Service now uses real content from bancrofts.org/about-us/school-bus-service/ — the Zeelo partnership and its ticket options, the Year 3/P1 sibling rule, the three real named routes (Epping & Theydon Bois, Mile End, Goodmayes), and links out to Zeelo for routes/timetables/pricing plus the Terms and Conditions and Information Booklet. Replaced the fabricated postcode-enquiry form and made-up route names, since the real page doesn\'t have a form at all — it links out to Zeelo for everything.' },
  { date: '2026-08-29', type: 'Changed', text: 'Calendar\'s closing promo still said "Book a Visit" too — the last School Life page with the mismatch. It can\'t point to itself, and Open Mornings are already in the grid above, so it now points to the Parent Portal instead, matching the School Life page\'s own promo.' },
  { date: '2026-08-29', type: 'Changed', text: 'Two more School Life pages still ended on a generic "Book a Visit" promo, same mismatch as the School Life page itself: Weekly Menu and Our Community. Both now point to the Calendar instead — events, reunions and PA gatherings for Our Community; term dates and events generally for Weekly Menu. Kept School Life\'s own promo pointing at the Parent Portal rather than Calendar too, since Calendar is already one of its four cards.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-accordion\'s expand/collapse button no longer shows a persistent focus ring after a mouse click — switched from focus: to focus-visible:, same fix as the menu toggle earlier. Keyboard focus still shows the ring.' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-accordion items can now carry an optional ctaLabel/ctaHref, shown as a link once the item is expanded. Used on Policies and Procedures, where "Key policies" moved from a wf-cards grid to an accordion — expanding a policy title shows a fuller summary and a "Read the full policy (PDF)" link, more than a one-line card description could carry.' },
  { date: '2026-08-29', type: 'Changed', text: 'Sixth Form\'s "Already at Bancroft’s?" is now a wf-text-media block instead of a single full-width wf-cards item, which looked out of place as a one-card row.' },
  { date: '2026-08-29', type: 'Changed', text: 'School Life\'s closing promo no longer says "Book a Visit" — that made no sense for an audience already part of the school. Replaced with a Parent Portal promo, matching the rest of the page\'s current-family focus.' },
  { date: '2026-08-29', type: 'Removed', text: 'wf-links removed from the kit. Link lists with a description became wf-cards (Practical information, Related pages, Popular routes, Key policies); the nine "More sports" link rows, which had no description, became a plain row of primary-style buttons instead, matching the button style used sitewide. See PROTOTYPE.md.' },
  { date: '2026-08-29', type: 'Added', text: 'wf-calendar now supports school holidays as date ranges (an optional endDate), rendered as a shaded band across the days they span rather than two disconnected point-events. Half Term and Christmas Holidays on the Calendar page now use this.' },
  { date: '2026-08-29', type: 'Changed', text: 'Removed the "Term dates and key events" heading and paragraph above the calendar — it just restated what the page header subtitle already says.' },
  { date: '2026-08-29', type: 'Changed', text: 'Calendar no longer has a large hero image either — same reasoning as the forms: it\'s a "get straight to the content" page, so the plain heading/breadcrumb header gets people to the month grid faster.' },
  { date: '2026-08-29', type: 'Added', text: 'New wf-calendar component: a real month grid on Calendar, with category filters (Whole School / 7+ Prep / 11+ Senior / 16+ Sixth Form / Sport / Community), month navigation, and an agenda-list fallback on mobile. Replaces the old static "Coming up" cards. Bespoke build — flagged in PROTOTYPE.md as needing dev-team input on the real data source (manual entry vs. MIS/ICS sync).' },
  { date: '2026-08-29', type: 'Changed', text: 'wf-accordion no longer defaults its first item open — every accordion (FAQs, Fees) now starts fully closed, since the always-open first item was a shared-kit default rather than a deliberate choice for any one page.' },
  { date: '2026-08-29', type: 'Changed', text: 'Added 12px more gap between "Book a Visit" and the menu toggle, now that the toggle has its own text label sitting right next to it.' },
  { date: '2026-08-29', type: 'Changed', text: 'Menu toggle now shows a "Menu" / "Close" label next to the icon, so it\'s clear what the button does. It\'s a fixed width so swapping between the two labels never nudges "Book a Visit" next to it.' },
  { date: '2026-08-29', type: 'Changed', text: 'Homepage sport promo replaced with an academic promo ("An academic education that opens doors") linking to Academic Results, instead of Sport.' },
  { date: '2026-08-29', type: 'Changed', text: 'Book a Visit and Contact no longer have large hero images either — same reasoning as Register, both are form-first pages where the image only added scroll. School Bus Service keeps its image: it’s an upsell page selling the service before asking for a postcode, so the photo is doing real work there.' },
  { date: '2026-08-29', type: 'Changed', text: 'Register no longer has a large hero image — swapped to the plain heading/breadcrumb header (same pattern as News), so the form is reachable with far less scrolling.' },
  { date: '2026-08-28', type: 'Changed', text: 'Video promo moved out of the two-column grid to its own fixed position, pinned top-right directly under "Book a Visit" and the menu toggle — its right edge now tracks those buttons exactly at every browser width, instead of sitting wherever the grid columns happened to land it.' },
  { date: '2026-08-28', type: 'Added', text: 'Desktop nav now has a third column: a persistent "Get to know Alex" video promo, linking to Welcome from the Head. Stays the same regardless of which section is selected, filling the space that would otherwise sit empty on wide screens.' },
  { date: '2026-08-28', type: 'Added', text: 'Welcome from the Head now embeds the "Get to know Alex" video near the top of the page, matching the nav promo it’s linked from.' },
  { date: '2026-08-28', type: 'Changed', text: 'Removed the "ADMISSIONS"-style eyebrow label above the desktop nav’s sub-page list, and the "Select a section to see its pages" placeholder text before anything is picked — both were unnecessary.' },
  { date: '2026-08-28', type: 'Changed', text: 'The Contact/Portals row in the desktop nav is now pinned to the bottom of the viewport at all times, instead of trailing after the sub-page list — so it stays in the same place regardless of how long a section’s list is.' },
  { date: '2026-08-28', type: 'Changed', text: 'Increased spacing between sub-page links in the desktop nav’s right-hand column by 12px, since they read as too tightly packed.' },
  { date: '2026-08-28', type: 'Fixed', text: 'Desktop nav no longer pre-selects a section when the menu opens — nothing is highlighted until you click something.' },
  { date: '2026-08-28', type: 'Fixed', text: 'Nav buttons no longer show a focus ring after a mouse click — it now only appears for keyboard navigation, where it’s still needed.' },
  { date: '2026-08-28', type: 'Changed', text: 'Sub-page links in the desktop nav’s right-hand column now highlight only their own text on hover, not the full row width.' },
  { date: '2026-08-28', type: 'Added', text: 'Desktop takeover menu is now a two-column layout (inspired by uppingham.co.uk): sections stay visible on the left, sub-pages show on the right and swap in place when you pick a different section, instead of navigating away from the list. Mobile keeps the existing drill-down, since there isn’t room for two columns at that width.' },
  { date: '2026-08-28', type: 'Added', text: 'wf-cards now supports optional pagination (perPage), used on News to demonstrate a second page — 7 placeholder stories added alongside the 3 real articles so pagination has something real to page through.' },
  { date: '2026-08-28', type: 'Changed', text: 'News listing page now uses a compact header with no large promo image, and dropped the "Latest stories" heading above the cards, so stories appear higher up the page.' },
  { date: '2026-08-28', type: 'Fixed', text: 'Removed a duplicate divider line above Admissions at the top of the open main navigation — the header’s own border already closes that edge off.' },
  { date: '2026-08-28', type: 'Fixed', text: 'Removed a duplicate divider line above the Contact/Portals row at the bottom of the open main navigation.' },
  { date: '2026-08-28', type: 'Changed', text: 'Main navigation reordered to Admissions, 7+ Prep, 11+ Senior, 16+ Sixth Form, so the entry points now read in age order.' },
  { date: '2026-08-28', type: 'Added', text: 'New Sport listing page and 9 individual sport detail pages (Football, Rugby, Hockey, Netball, Cricket, Athletics, Swimming, Tennis, Badminton), kept out of primary navigation and cross-linked from Sport, Arts & Co-Curriculum, the homepage and the Rugby news article.' },
  { date: '2026-08-28', type: 'Fixed', text: 'Component List page: the Homepage hero specimen no longer overlaps its own heading and description text above it.' },
  { date: '2026-08-28', type: 'Added', text: 'New wf-table component, added to the kit and the Component List page, so Fees can show a real net-fee-vs-payable table instead of a stats block that didn’t fit the data.' },
  { date: '2026-08-28', type: 'Fixed', text: 'Fees page now uses a proper table (matching bancrofts.org’s own layout) instead of a statistics block that repeated row labels and read as broken.' },
  { date: '2026-08-28', type: 'Changed', text: 'Fees page now uses the real 2026/27 figures from bancrofts.org (Prep £8,722, Senior School £10,400 per term, inc. VAT), replacing placeholder figures.' },
  { date: '2026-08-28', type: 'Removed', text: 'Book a Visit removed from the Admissions menu list, since it’s already the pinned header CTA and listing it again there just duplicated it.' },
  { date: '2026-08-28', type: 'Changed', text: 'About refined from 10 sub-pages to 5: Governors and Our Leadership Team merged into one Governance & Leadership page, Vacancies and Policies and Procedures moved to footer-only utility links, FAQs relocated into Admissions, and the ISI Inspection page folded into About’s own intro copy as a stated credential.' },
  { date: '2026-08-27', type: 'Changed', text: 'Takeover menu is now drill-down instead of expand-in-place: tapping a section opens a dedicated screen for just its sub-pages, with a Back row to return, instead of an accordion that pushed every other section down the page.' },
  { date: '2026-08-27', type: 'Fixed', text: 'The takeover panel now aligns to the header correctly even while a walkthrough bar is showing, instead of opening underneath it.' },
  { date: '2026-08-27', type: 'Changed', text: 'Secondary navigation rows in the takeover panel dropped their description text and are now single-line, considerably reducing the expanded height of each section.' },
  { date: '2026-08-27', type: 'Changed', text: 'Menu toggle moved next to Book a Visit on the right of the header, instead of sitting on the left next to the logo.' },
  { date: '2026-08-27', type: 'Fixed', text: 'Book a Visit now stays pinned top right in the header at all times, instead of moving into the burger menu when it opens.' },
  { date: '2026-08-27', type: 'Added', text: 'First build: full 47-page site from the confirmed sitemap, across Homepage, Admissions, 7+ Prep, 11+ Senior, 16+ Sixth Form, School Life, News and About.' },
  { date: '2026-08-27', type: 'Added', text: 'Burger takeover navigation at every breakpoint, with a pinned "Book a Visit" header CTA.' },
  { date: '2026-08-27', type: 'Added', text: 'Five stepped user journey walkthroughs covering 7+, 11+, 16+, current families and News to conversion.' },
  { date: '2026-08-27', type: 'Fixed', text: 'Header navigation CTA and links are now driven from site config instead of hardcoded placeholder content.' },
]
