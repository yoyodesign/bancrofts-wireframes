// Config-driven site data for the Bancroft's School wireframe prototype. Every page is
// `{ hero?, blocks }` — an ordered list of `{ component, props, anchorId? }` entries rendered by
// <wf-page-body> (see src/components/page-body.ts). Adding/editing a section is a data change
// here, not new markup. See PROTOTYPE.md at the project root for the full page table, flows,
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
}

// ---------------------------------------------------------------------------
// Header CTA — the single pinned, persistent primary action, always visible in the header
// (charity-"Donate"-style prominence, per the confirmed brief). Deliberately just one CTA,
// matching wf-homepage-hero's "one unambiguous next step" logic applied to the header itself.
// ---------------------------------------------------------------------------

export const headerCta = { label: 'Book a Visit', href: 'book-a-visit.html' }

// Small utility row shown at the foot of the burger takeover panel — quick access to Contact and
// the three portals, kept out of the main section list so it doesn't compete with the primary IA.
// The three portals each expand in place (see header-nav.ts) to their own real sub-systems —
// they're login shortcuts for the already-enrolled community, distinct in kind from the primary
// IA's "explore the school" sections, so they stay a flat expandable list here rather than being
// promoted into primaryNav. Uniform is the one exception: it's informational content a prospective
// family cares about too, so it lives as a real page under School Life instead (see primaryNav)
// and isn't duplicated here.
export const headerUtilityLinks: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: 'Contact', href: 'contact.html' },
  {
    label: 'Parent Portal', href: '#',
    children: [
      { label: 'iSAMS Parent Portal', href: '#' },
      { label: 'Parents’ Evening System', href: '#' },
      { label: 'SOCS (Trips & Consent)', href: '#' },
      { label: 'Online Payments', href: '#' },
    ],
  },
  {
    label: 'Pupil Portal', href: '#',
    children: [
      { label: 'Pupil Portal (iSAMS)', href: '#' },
      { label: 'Prep VLE', href: '#' },
      { label: 'Senior VLE', href: '#' },
      { label: 'Office 365 & Teams', href: '#' },
      { label: 'Planet eStream', href: '#' },
    ],
  },
  {
    label: 'Staff Portal', href: '#',
    children: [
      { label: 'Staff Remote Access', href: '#' },
      { label: 'Office 365', href: '#' },
      { label: 'iSAMS', href: '#' },
      { label: 'CPOMS', href: '#' },
      { label: 'VLEs', href: '#' },
    ],
  },
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
      { label: 'Your 7+ Journey', href: 'admissions-7plus-journey.html', description: 'The application process and key dates for entry at 7+.' },
      { label: 'Your 11+ Journey', href: 'admissions-11plus-journey.html', description: 'The application process and key dates for entry at 11+.' },
      { label: 'Your 16+ Journey', href: 'admissions-16plus-journey.html', description: 'The application process and key dates for Sixth Form entry.' },
      { label: 'Register', href: 'register.html', description: 'Start a formal application for a place at Bancroft’s.' },
      { label: 'Fees', href: 'fees.html', description: 'Termly fees for Prep and Senior School, inclusive of VAT.' },
      { label: 'Scholarships & Bursaries', href: 'scholarships-bursaries.html', description: 'Academic and music awards, and means-tested financial support.' },
      { label: 'Frequently Asked Questions', href: 'admissions-faqs.html', description: 'Quick answers to the questions we hear most.' },
    ],
  },
  {
    slug: 'prep', label: '7+ Prep', href: 'prep.html',
    children: [
      { label: '7+ Prep overview', href: 'prep.html', description: 'The first steps into Bancroft’s, for ages 7 to 11.' },
      { label: 'Why Bancroft’s Prep', href: 'prep-why.html', description: 'What makes the Prep years distinctive.' },
      { label: 'Curriculum', href: 'prep-curriculum.html', description: 'What Prep pupils learn in the classroom, from Year 3 onwards.' },
      { label: 'Clubs', href: 'prep-clubs.html', description: 'Weekly clubs, from sport and drama to coding and chess.' },
      { label: 'Meet the Staff', href: 'prep-staff.html', description: 'The teachers and support staff who lead the Prep years.' },
      { label: 'Pastoral Care', href: 'prep-pastoral-care.html', description: 'Settling in and being known as an individual from day one.' },
    ],
  },
  {
    slug: 'senior', label: '11+ Senior', href: 'senior.html',
    children: [
      { label: '11+ Senior overview', href: 'senior.html', description: 'Academic life, pastoral care and results for ages 11 to 16.' },
      { label: 'Why Bancroft’s Senior', href: 'senior-why.html', description: 'What makes the Senior School distinctive.' },
      { label: 'Academic Results', href: 'senior-academic-results.html', description: 'GCSE outcomes and how pupils are stretched and supported.' },
      { label: 'Curriculum', href: 'senior-curriculum.html', description: 'Subjects studied from Year 7 through to GCSE.' },
      { label: 'Sport & Arts', href: 'senior-sport-arts.html', description: 'Fixtures and ensembles beyond the classroom.' },
      { label: 'Clubs', href: 'senior-clubs.html', description: '250+ clubs and societies, from debating to Duke of Edinburgh.' },
      { label: 'Pastoral Care', href: 'senior-pastoral-care.html', description: 'How every pupil is known, supported and challenged.' },
    ],
  },
  {
    slug: 'sixth-form', label: '16+ Sixth Form', href: 'sixth-form.html',
    children: [
      { label: '16+ Sixth Form overview', href: 'sixth-form.html', description: 'The next step, for pupils joining or staying on at 16.' },
      { label: 'Sixth Form Life', href: 'sixth-form-life.html', description: 'Independence, responsibility and a more grown-up school day.' },
      { label: 'Curriculum & Subjects', href: 'sixth-form-curriculum-subjects.html', description: 'A Level subjects and how choices are guided.' },
      { label: 'Clubs', href: 'sixth-form-clubs.html', description: 'Where Sixth Formers lead clubs and societies, not just attend them.' },
      { label: 'Leavers’ Destinations', href: 'sixth-form-leavers-destinations.html', description: 'Where recent leavers have gone on to study and work.' },
      { label: 'Staying On', href: 'sixth-form-staying-on.html', description: 'Moving from Year 11 into the Sixth Form at Bancroft’s.' },
      { label: 'Examination Results', href: 'sixth-form-examination-results.html', description: 'A Level outcomes and value added.' },
    ],
  },
  {
    slug: 'school-life', label: 'School Life', href: 'school-life.html',
    children: [
      { label: 'School Life overview', href: 'school-life.html', description: 'Day-to-day life at Bancroft’s, for current families.' },
      { label: 'Our Community', href: 'school-life-community.html', description: 'Parents, alumni and the wider Bancroft’s network.' },
      { label: 'Calendar', href: 'calendar.html', description: 'Term dates, events and open mornings in one place.' },
      { label: 'Weekly Menu', href: 'weekly-menu.html', description: 'What’s on the menu in the dining hall this week.' },
      { label: 'School Bus Service', href: 'school-bus-service.html', description: 'Routes, timings and how to book a seat.' },
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
      { label: 'Our History & Archives', href: 'about-history-archives.html', description: 'Bancroft’s story, from foundation to today.' },
      { label: 'Governance & Leadership', href: 'about-governance-leadership.html', description: 'Our Board of Governors and Senior Leadership Team.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Footer columns — three real themes (footer.ts's layout is fixed at three link columns plus the
// brand column). Family of Schools, Old Bancroftians and Foundation are each a separate
// organisation with its own site, so they stay footer-only rather than earning primary nav
// weight or a built page in this pass (confirmed in the brief). Portals are external
// staff/parent/pupil systems, also footer-only.
// ---------------------------------------------------------------------------

export const footerColumns = [
  {
    heading: 'Get in Touch', links: [
      { label: 'Contact', href: 'contact.html' },
      { label: 'Policies and Procedures', href: 'about-policies-procedures.html' },
      { label: 'Vacancies', href: 'about-vacancies.html' },
    ],
  },
  {
    heading: "Bancroft's Family", links: [
      { label: 'Family of Schools', href: '#' },
      { label: 'Old Bancroftians', href: '#' },
      { label: 'Foundation', href: '#' },
    ],
  },
  {
    heading: 'Portals', links: [
      { label: 'Parent Portal', href: '#' },
      { label: 'Pupil Portal', href: '#' },
      { label: 'Staff Portal', href: '#' },
    ],
  },
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
          side: 'left', ctaLabel: 'Explore our academic results', ctaHref: 'senior-academic-results.html', ctaId: 'cta-home-academic-promo', mediaLabel: 'Pupils reviewing GCSE results',
        },
      },
      {
        component: 'wf-logos', props: {
          heading: 'Recognised for our pastoral care and teaching',
          names: ['Independent Schools of the Year Finalist 2025', 'Pastoral Care Award Winner 2025', 'Innovation in Education Winner 2025', 'ISI Inspection 2025', 'The Drapers’ Company'],
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
        eyebrow: 'Admissions', heading: 'Joining Bancroft’s', body: 'However your family is joining us, at 7+, 11+ or 16+, this is where to start.',
        mediaLabel: 'Prospective families on an Open Morning tour',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Three entry points, one school', body: ['Most pupils join Bancroft’s at 7+, 11+ or 16+, though occasional places do become available in other year groups. Each journey has its own assessment process and timeline, but all lead into the same through-school community.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Find your journey', cols: 3,
          items: [
            { href: 'admissions-7plus-journey.html', heading: 'Your 7+ Journey', description: 'Joining the Prep years.', imageLabel: 'Prep pupils arriving at school', linkText: 'Start your 7+ journey' },
            { href: 'admissions-11plus-journey.html', heading: 'Your 11+ Journey', description: 'Joining the Senior School.', imageLabel: 'Senior pupils arriving at school', linkText: 'Start your 11+ journey' },
            { href: 'admissions-16plus-journey.html', heading: 'Your 16+ Journey', description: 'Joining or staying on for Sixth Form.', imageLabel: 'Sixth Form pupils arriving at school', linkText: 'Start your 16+ journey' },
          ],
        },
      },
      {
        component: 'wf-cards', props: {
          heading: 'Practical information', cols: 4,
          items: [
            { href: 'fees.html', heading: 'Fees', description: 'Termly fees for Prep and Senior School.' },
            { href: 'scholarships-bursaries.html', heading: 'Scholarships & Bursaries', description: 'Awards and financial support.' },
            { href: 'book-a-visit.html', heading: 'Book a Visit', description: 'Open Mornings and personal tours.' },
            { href: 'admissions-faqs.html', heading: 'Frequently Asked Questions', description: 'Quick answers to common questions.' },
          ],
        },
      },
      bookVisitPromo('cta-admissions-promo'),
    ],
  },

  'admissions-7plus-journey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions - 7+', heading: 'Your 7+ Journey', body: 'A step-by-step guide to joining Bancroft’s Prep, from registration to your child’s first day.',
        mediaLabel: 'Prep pupils on their first day', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Your 7+ Journey', href: 'admissions-7plus-journey.html' }),
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
          ],
        },
      },
      bookVisitPromo('cta-7plus-journey-promo'),
    ],
  },

  'admissions-11plus-journey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions - 11+', heading: 'Your 11+ Journey', body: 'How entry to the Senior School works, from registration through to results day.',
        mediaLabel: 'Pupils sitting entrance assessments', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Your 11+ Journey', href: 'admissions-11plus-journey.html' }),
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
          ],
        },
      },
      { component: 'wf-cards', props: { heading: 'You may also want', cols: 2, items: [
        { href: 'senior-academic-results.html', heading: 'Academic Results', description: 'See recent GCSE outcomes.' },
        { href: 'scholarships-bursaries.html', heading: 'Scholarships & Bursaries', description: 'Academic and music awards, and bursary support.' },
      ] } },
      bookVisitPromo('cta-11plus-journey-promo'),
    ],
  },

  'admissions-16plus-journey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions - 16+', heading: 'Your 16+ Journey', body: 'How to join our Sixth Form, whether you’re already at Bancroft’s or joining us for the first time.',
        mediaLabel: 'Sixth Form pupils in a seminar', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Your 16+ Journey', href: 'admissions-16plus-journey.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-text-media', props: {
          heading: 'Already at Bancroft’s?', body: ['How current Year 11 pupils move into Sixth Form.'],
          side: 'left', mediaLabel: 'Year 11 pupil moving into Sixth Form',
          ctaLabel: 'Staying On', ctaHref: 'sixth-form-staying-on.html',
        },
      },
      { component: 'wf-text', props: { heading: 'New to Bancroft’s?', body: ['External candidates apply based on predicted GCSE grades, an interview and, for some subjects, a short written task.'] } },
      {
        component: 'wf-timeline', props: {
          heading: 'Key steps',
          items: [
            { heading: 'Visit', description: 'Book an Open Morning or a personal tour of the Sixth Form.' },
            { heading: 'Register', description: 'Submit a registration form ahead of the deadline.' },
            { heading: 'Interview and assessment', description: 'An interview and, for some subjects, a short written task.' },
            { heading: 'Offer', description: 'Offers are usually made by the end of the spring term, conditional on GCSE results in August.' },
          ],
        },
      },
      { component: 'wf-cards', props: { heading: 'Related pages', cols: 2, items: [
        { href: 'sixth-form-curriculum-subjects.html', heading: 'Curriculum & Subjects', description: 'A Level subjects on offer.' },
        { href: 'sixth-form-leavers-destinations.html', heading: 'Leavers’ Destinations', description: 'Where recent leavers have gone on to.' },
      ] } },
      { component: 'wf-promo', props: { heading: 'Ready to apply?', body: 'Register your interest and our admissions team will be in touch with next steps.', ctaLabel: 'Register', ctaHref: 'register.html', ctaId: 'cta-16plus-journey-promo-register', mediaLabel: 'Sixth Form pupil completing an application' } },
    ],
  },

  'book-a-visit': {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Book a Visit', subtitle: 'The best way to understand Bancroft’s is to come and see it for yourself.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Book a Visit', href: 'book-a-visit.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['We run Open Mornings throughout the year for each entry point, alongside personal tours for families who’d prefer a quieter visit. Tell us a little about your child below and our admissions team will follow up to confirm a date.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Request a visit', submitLabel: 'Request a visit', submitId: 'submit-book-a-visit',
          successHeading: 'Thank you, we’ll be in touch', successBody: 'A member of our admissions team will contact you within two working days to confirm your visit.',
          fields: [
            { name: 'parentName', label: 'Parent / guardian name', type: 'text', required: true },
            { name: 'email', label: 'Email address', type: 'email', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', required: true },
            { name: 'entryPoint', label: 'Entry point', type: 'select', required: true, options: ['7+ Prep', '11+ Senior', '16+ Sixth Form', 'Occasional place'] },
            { name: 'childYear', label: 'Child’s current year group', type: 'text' },
            { name: 'visitType', label: 'Preferred visit type', type: 'radio', options: ['Open Morning', 'Personal tour'], required: true },
            { name: 'message', label: 'Anything else we should know?', type: 'textarea' },
          ],
        },
      },
    ],
  },

  register: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Register', subtitle: 'Start your child’s formal application to Bancroft’s.',
        breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Register', href: 'register.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Registering is the first formal step in applying for a place, ahead of assessment. A non-refundable registration fee applies at 7+ and 11+; there is no fee to register interest in the Sixth Form. Our admissions team will confirm your entry point’s next steps once we receive your registration.'] } },
      {
        component: 'wf-form', props: {
          heading: 'Register your interest', submitLabel: 'Submit registration', submitId: 'submit-register',
          successHeading: 'Registration received', successBody: 'We’ve received your registration. Our admissions team will email you with the next steps for your entry point.',
          fields: [
            { name: 'childName', label: 'Child’s full name', type: 'text', required: true },
            { name: 'dob', label: 'Child’s date of birth', type: 'text', required: true, placeholder: 'DD/MM/YYYY' },
            { name: 'entryPoint', label: 'Entry point', type: 'select', required: true, options: ['7+ Prep (Year 3)', '11+ Senior (Year 7)', '16+ Sixth Form (Year 12)', 'Occasional place'] },
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
      { component: 'wf-text', props: { body: ['Support with fees is available through our bursary programme at 11+ and 16+.'] } },
      { component: 'wf-accordion', props: { heading: 'Fees, explained', items: [
        { heading: 'When are fees due?', body: 'Fees are invoiced at the start of each term and due within 14 days, unless you’ve arranged a termly payment plan with our Finance team.' },
        { heading: 'Is help with fees available?', body: 'Yes. Support with fees is available through our bursary programme at 11+ and 16+, alongside our academic and music scholarships. See Scholarships & Bursaries for details.' },
      ] } },
      { component: 'wf-promo', props: { heading: 'Financial support available', body: 'Academic and music scholarships, plus a bursary programme at 11+ and 16+, are available to eligible families.', ctaLabel: 'See Scholarships & Bursaries', ctaHref: 'scholarships-bursaries.html', ctaId: 'cta-fees-promo', mediaLabel: 'Pupil receiving a scholarship award' } },
    ],
  },

  'scholarships-bursaries': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Admissions', heading: 'Scholarships & Bursaries', body: 'Recognising exceptional ability, and making a Bancroft’s education possible regardless of financial circumstance.',
        mediaLabel: 'Pupil performing in a music award audition', breadcrumb: bc({ label: 'Admissions', href: 'admissions.html' }, { label: 'Scholarships & Bursaries', href: 'scholarships-bursaries.html' }),
      },
    },
    blocks: [
      { component: 'wf-text-media', props: { heading: 'Academic Scholarships', side: 'left', mediaLabel: 'Pupil sitting a scholarship assessment', body: ['Awarded at 11+ and 16+ on the strength of assessment and interview performance, academic scholarships offer a fee reduction of up to 10 to 15 percent and recognise pupils of exceptional academic promise.'] } },
      { component: 'wf-text-media', props: { heading: 'Music Awards', side: 'right', mediaLabel: 'Pupil playing violin', body: ['Music Awards are open to talented instrumentalists and singers at 11+ and 16+. Award holders receive free individual music lessons for the duration of their time at Bancroft’s, alongside opportunities to lead ensembles.'] } },
      { component: 'wf-text-media', props: { heading: 'Bursaries', side: 'left', mediaLabel: 'Family meeting with the bursaries team', body: ['Means-tested bursaries can cover up to 100 percent of fees for families who would otherwise be unable to consider Bancroft’s. Applications are assessed confidentially, alongside your child’s registration.'] } },
      bookVisitPromo('cta-scholarships-promo', 'Talk to our admissions team about scholarships and bursaries at an Open Morning or personal tour.'),
    ],
  },

  // --- 7+ Prep ---------------------------------------------------------

  prep: {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'The first steps into Bancroft’s', body: 'A warm, settled start for ages 7 to 11, on the same site your child will call home through to Sixth Form.',
        mediaLabel: 'Prep pupils in the playground', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['Bancroft’s Prep gives children a confident, joyful start, small enough that every child is known, ambitious enough to prepare them well for the Senior School.'] } },
      { component: 'wf-text-media', props: { heading: 'Why Bancroft’s Prep', side: 'right', mediaLabel: 'Prep pupils reading together', body: ['What makes the Prep years distinctive.'], ctaLabel: 'Read why families choose us', ctaHref: 'prep-why.html' } },
      { component: 'wf-text-media', props: { heading: 'Curriculum', side: 'left', mediaLabel: 'Prep pupils in a science lesson', body: ['What Prep pupils learn in the classroom.'], ctaLabel: 'See the curriculum', ctaHref: 'prep-curriculum.html' } },
      { component: 'wf-text-media', props: { heading: 'Clubs', side: 'right', mediaLabel: 'Prep pupils at a co-curricular club', body: ['Weekly clubs, from sport and drama to coding and chess.'], ctaLabel: 'See our Clubs', ctaHref: 'prep-clubs.html' } },
      { component: 'wf-text-media', props: { heading: 'Pastoral Care', side: 'left', mediaLabel: 'Teacher with a small group of pupils', body: ['Settling in and being known as an individual.'], ctaLabel: 'Read about pastoral care', ctaHref: 'prep-pastoral-care.html' } },
      { component: 'wf-text-media', props: { heading: 'Meet the Staff', side: 'right', mediaLabel: 'Prep teaching staff', body: ['The teachers who lead the Prep years.'], ctaLabel: 'Meet the team', ctaHref: 'prep-staff.html' } },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to take the next step?', side: 'left', mediaLabel: 'Parent completing a registration form',
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
      { component: 'wf-quote', props: { items: [
        { quote: 'My daughter settled in within days. The teachers know every child by name, and it shows in how she talks about school.', attribution: 'Current Prep parent' },
      ] } },
      bookVisitPromo('cta-prep-why-promo'),
    ],
  },

  'prep-curriculum': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Curriculum', body: 'A broad, carefully sequenced curriculum from Alpha (Year 3) to Prep 2 (Year 6).',
        mediaLabel: 'Prep pupils in an art lesson', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Curriculum', href: 'prep-curriculum.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'A broad foundation', body: ['We want Prep pupils to be curious, independent thinkers who enjoy rising to a challenge. The curriculum is structured for both breadth and depth, giving children solid academic foundations while helping them grow as individuals.'] } },
      { component: 'wf-text', props: { heading: 'How it’s taught', body: ['Form teachers lead most lessons in the early years, alongside specialist teaching in Languages, Music, Computing, PE, Art and Drama from the start. From Year 5 onwards, nearly every subject is taught by a subject specialist, giving children a taste of the Senior School and supporting their growing independence.'] } },
      { component: 'wf-text', props: { heading: 'Year by year', body: ['Every year, from Alpha (Year 3) to Prep 2 (Year 6), is mapped to a clear, connected path of progress, so each stage builds on the last.'] } },
      bookVisitPromo('cta-prep-curriculum-promo'),
    ],
  },

  'prep-clubs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Clubs', body: 'Every Prep pupil takes part in weekly clubs, discovering what they love long before they have to choose.',
        mediaLabel: 'Prep pupils at a co-curricular club', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Clubs', href: 'prep-clubs.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Our school day is built around it: a long lunch hour means every child can eat, play and get to a club, all in the same day, rather than it being squeezed in afterwards. Most clubs run during the school day, as a normal part of school life rather than a separate after-school programme.'] } },
      { component: 'wf-text-media', props: { heading: 'Sport', side: 'right', mediaLabel: 'Prep pupils playing football', body: ['Football, netball, athletics, gymnastics and swimming, alongside house matches and inter-school fixtures.'] } },
      { component: 'wf-text-media', props: { heading: 'Arts & Performance', side: 'left', mediaLabel: 'Prep pupils in choir practice', body: ['Choir, orchestra, drama club and art club, building towards termly concerts and productions.'] } },
      { component: 'wf-text-media', props: { heading: 'Academic & STEM', side: 'right', mediaLabel: 'Prep pupils in a coding club', body: ['Chess, coding, science club and public speaking, for pupils who want to go further.'] } },
      { component: 'wf-text-media', props: { heading: 'Outdoor & Adventure', side: 'left', mediaLabel: 'Prep pupils at forest school', body: ['Forest school, gardening club and residential trips that get pupils outside the classroom.'] } },
      bookVisitPromo('cta-prep-clubs-promo'),
    ],
  },

  'prep-pastoral-care': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '7+ Prep', heading: 'Pastoral Care', body: 'Small class sizes and a settled form-teacher model mean every Prep child is genuinely known.',
        mediaLabel: 'Form teacher greeting pupils in the morning', breadcrumb: bc({ label: '7+ Prep', href: 'prep.html' }, { label: 'Pastoral Care', href: 'prep-pastoral-care.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['A single form teacher sees each Prep class through most of the school day, giving children one consistent, trusted adult to turn to. Our learning support team works closely with form teachers to spot and support any child who needs extra help early.', 'Wraparound care is available before and after the school day, so working families have flexibility without disrupting their child’s routine.'] } },
      bookVisitPromo('cta-prep-pastoral-promo'),
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
        eyebrow: '11+ Senior', heading: 'Academic ambition, genuine warmth', body: 'From Year 7 to Year 11, pupils are stretched academically and known individually.',
        mediaLabel: 'Senior pupils in a classroom discussion', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['11+ is Bancroft’s largest entry point. Pupils join a school that combines academic selectivity with a genuinely broad co-curricular life, on grounds that back onto Epping Forest itself.'] } },
      {
        component: 'wf-text-media', props: {
          heading: 'Why Bancroft’s Senior', side: 'right', mediaLabel: 'Senior pupils outside the main building',
          body: ['What makes the Senior years distinctive.'], ctaLabel: 'Read why families choose us', ctaHref: 'senior-why.html',
        },
      },
      { component: 'wf-text-media', props: { heading: 'Academic Results', side: 'left', mediaLabel: 'Pupils on GCSE results day', body: ['GCSE outcomes and how pupils are stretched.'], ctaLabel: 'See our results', ctaHref: 'senior-academic-results.html' } },
      { component: 'wf-text-media', props: { heading: 'Curriculum', side: 'right', mediaLabel: 'Senior pupils in a science lesson', body: ['Subjects studied from Year 7 to GCSE.'], ctaLabel: 'See the curriculum', ctaHref: 'senior-curriculum.html' } },
      { component: 'wf-text-media', props: { heading: 'Sport & Arts', side: 'left', mediaLabel: 'Pupils on the sports pitch', body: ['Fixtures and ensembles beyond the classroom.'], ctaLabel: 'Explore life beyond the classroom', ctaHref: 'senior-sport-arts.html' } },
      { component: 'wf-text-media', props: { heading: 'Clubs', side: 'right', mediaLabel: 'Pupils at a lunchtime club', body: ['250+ clubs and societies, from debating to Duke of Edinburgh.'], ctaLabel: 'See our Clubs', ctaHref: 'senior-clubs.html' } },
      { component: 'wf-text-media', props: { heading: 'Pastoral Care', side: 'left', mediaLabel: 'Tutor group meeting', body: ['How every Senior pupil is known, supported and challenged.'], ctaLabel: 'Read about pastoral care', ctaHref: 'senior-pastoral-care.html' } },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to take the next step?', side: 'right', mediaLabel: 'Parent completing a registration form',
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
        eyebrow: '11+ Senior', heading: 'Why Bancroft’s Senior', body: 'Academic rigour that doesn’t come at the cost of a rounded school life.',
        mediaLabel: 'Senior pupils in the library', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Why Bancroft’s Senior', href: 'senior-why.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Bancroft’s sits on the edge of Epping Forest, with direct access to its own grounds, yet is minutes from the Central Line and well connected across East London and Essex. Few schools combine that setting with our academic results.', 'Being part of a through-school from 7 to 18 means Senior pupils learn alongside friends they’ve known since Prep, and near Sixth Formers who show them what’s ahead.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Bancroft’s pushed me academically without ever making school feel like pressure. I found things I loved outside the classroom too.', attribution: 'Year 11 pupil' },
      ] } },
      bookVisitPromo('cta-senior-why-promo'),
    ],
  },

  'senior-academic-results': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Academic Results', body: 'Strong, consistent GCSE outcomes across the full range of subjects.',
        mediaLabel: 'Pupils reviewing GCSE results', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Academic Results', href: 'senior-academic-results.html' }),
      },
    },
    blocks: [
      { component: 'wf-statistics', props: { heading: 'GCSE results at a glance', items: [
        { value: '99%', label: 'Grades 9 to 4' },
        { value: '70%', label: 'Grades 9 to 7' },
        { value: '25+', label: 'Subjects offered at GCSE' },
        { value: '100%', label: 'Progression to Sixth Form or equivalent' },
      ] } },
      { component: 'wf-text', props: { heading: 'Beyond the headline figures', body: ['We track value added as closely as raw grades: how far each pupil has progressed against their own starting point, not just against a national average. Our learning support and academic mentoring teams work with pupils individually where extra stretch or support is needed.'] } },
      bookVisitPromo('cta-senior-results-promo'),
    ],
  },

  'senior-curriculum': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Curriculum', body: 'A broad Third Form and Removes, followed by a well-supported route through GCSE options.',
        mediaLabel: 'Senior pupils in a humanities lesson', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Curriculum', href: 'senior-curriculum.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Third Form and Removes (Years 7-8)', body: ['Pupils begin with eighteen subjects across two years, mostly in mixed-ability groups, with only Maths taught in sets. Science is taught as one combined course, covering Physics, Chemistry and Biology together, alongside the connections between them.', 'Two languages are chosen from French, German and Spanish, continuing through the Removes. Music, Drama, Art, Design Technology and Computer Science are compulsory for everyone, with Computer Science moving into Python programming by the Removes.'] } },
      { component: 'wf-text-media', props: { heading: 'GCSE options', side: 'right', mediaLabel: 'Pupils in a GCSE options meeting', body: ['At GCSE, six subjects are compulsory: Maths, English Language, English Literature, Biology, Chemistry and Physics, alongside at least one modern language. Pupils then choose three more from fifteen further options, guided by subject teachers, tutors and our careers team.'] } },
      { component: 'wf-text', props: { heading: 'Accelerated Maths', body: ['Pupils in the top Maths sets can sit their GCSE at the end of Year 10, then continue with an enriched course towards the Additional Maths qualification (FSMQ) in Year 11.'] } },
      bookVisitPromo('cta-senior-curriculum-promo'),
    ],
  },

  'senior-sport-arts': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Sport & Arts', body: 'A far broader programme than our reputation suggests, across sport and the arts.',
        mediaLabel: 'Pupils training on the sports pitch', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }),
      },
    },
    blocks: [
      { component: 'wf-text-media', props: { heading: 'Sport', side: 'right', mediaLabel: 'Pupils training on the sports pitch', ctaLabel: 'Explore our sports programme', ctaHref: 'senior-sport.html', body: ['Pupils compete across nine sports, from house fixtures through to regional and national competition. Our First XV were recently named London Schools champions, and strong individual performers compete well beyond school level.'] } },
      { component: 'wf-text-media', props: { heading: 'The Arts', side: 'left', mediaLabel: 'Pupils in a drama rehearsal', body: ['Visual Arts, Drama and Music all have a genuine presence at Bancroft’s, from termly exhibitions and productions to choirs, orchestras and bands that perform well beyond the school gates.'] } },
      { component: 'wf-text-media', props: { heading: 'Looking for Clubs?', side: 'right', mediaLabel: 'Pupils at a lunchtime club', ctaLabel: 'See our Clubs', ctaHref: 'senior-clubs.html', body: ['Beyond sport and the arts, 250+ clubs and societies run throughout the year, from the Combined Cadet Force and Duke of Edinburgh’s Award to debating and robotics.'] } },
      bookVisitPromo('cta-senior-sport-promo'),
    ],
  },

  'senior-clubs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Clubs', body: 'An impressive array of clubs and societies run throughout the year, and the number keeps growing.',
        mediaLabel: 'Pupils at a lunchtime club', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Clubs', href: 'senior-clubs.html' }),
      },
    },
    blocks: [
      { component: 'wf-statistics', props: { heading: 'The scale of it', items: [
        { value: '250+', label: 'Clubs and societies held throughout the year' },
      ] } },
      { component: 'wf-text', props: { body: ['Our school day is designed around it: lunch is almost an hour and a half, so eating, socialising and getting to a club can all happen without anything being squeezed in after hours. Most clubs run during the school day rather than as a separate paid programme.'] } },
      { component: 'wf-text-media', props: { heading: 'Arts & Performance', side: 'left', mediaLabel: 'Pupils in a school orchestra', body: ['Choirs, orchestras, bands and drama productions, performing well beyond the school gates.'] } },
      { component: 'wf-text-media', props: { heading: 'Academic & STEM', side: 'right', mediaLabel: 'Pupils in a debating society', body: ['Debating, Model United Nations, robotics and subject societies for pupils who want to go deeper.'] } },
      { component: 'wf-text-media', props: { heading: 'Outdoor & Adventure', side: 'left', mediaLabel: 'Pupils on a Duke of Edinburgh expedition', body: ['The Combined Cadet Force, Duke of Edinburgh’s Award, Sea Scouts and a full programme of trips and expeditions.'] } },
      { component: 'wf-text-media', props: { heading: 'Community & Volunteering', side: 'right', mediaLabel: 'Pupils volunteering in the local community', body: ['Peer mentoring, charity fundraising and partnerships with local schools and community groups.'] } },
      { component: 'wf-text-media', props: { heading: 'Looking for Sport?', side: 'left', mediaLabel: 'Pupils training on the sports pitch', body: ['Sport has its own dedicated home, covering all nine sports, from house fixtures to national competition.'], ctaLabel: 'Explore our sports programme', ctaHref: 'senior-sport.html' } },
      bookVisitPromo('cta-senior-clubs-promo'),
    ],
  },

  'senior-pastoral-care': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '11+ Senior', heading: 'Pastoral Care', body: 'A structure built so every pupil is known well by more than one adult.',
        mediaLabel: 'Tutor group meeting', breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Pastoral Care', href: 'senior-pastoral-care.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Every pupil belongs to a tutor group and a house, giving them two overlapping communities and several trusted adults beyond their subject teachers. Our Heads of Year and school counsellors provide additional support where it’s needed, and our Learning for Life and Spiritual Life programmes give pastoral care a place on the timetable, not just in the background.'] } },
      bookVisitPromo('cta-senior-pastoral-promo'),
    ],
  },

  // --- Sport (off primary nav — reached via Sport & Arts, the homepage, and News) ---

  'senior-sport': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Sport at Bancroft’s', body: 'Nine sports, dozens of teams, and a programme built for every level, from house fixtures to national competition.',
        mediaLabel: 'Pupils training on the sports pitch',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Facilities', body: ['Bancroft’s grounds include a multi-purpose sports hall, a 24m indoor swimming pool and 17 acres of playing fields. Our West Grove playing fields add tennis and netball courts, cricket, football and rugby pitches, cricket nets and a CrossFit gym, giving every sport a proper home.'] } },
      {
        component: 'wf-cards', props: {
          heading: 'Explore our sports', cols: 3,
          items: [
            { href: 'senior-sport-football.html', heading: 'Football', description: 'One of the school’s most popular and fastest-growing sports.', imageLabel: 'Football training session', linkText: 'Explore Football' },
            { href: 'senior-sport-rugby.html', heading: 'Rugby', description: 'Reigning London Schools champions.', imageLabel: 'Rugby training session', linkText: 'Explore Rugby' },
            { href: 'senior-sport-hockey.html', heading: 'Hockey', description: 'Competitive fixtures across every year group.', imageLabel: 'Hockey training session', linkText: 'Explore Hockey' },
            { href: 'senior-sport-netball.html', heading: 'Netball', description: 'One of the school’s most popular team sports.', imageLabel: 'Netball training session', linkText: 'Explore Netball' },
            { href: 'senior-sport-cricket.html', heading: 'Cricket', description: 'A full summer term fixture list, boys and girls.', imageLabel: 'Cricket practice session', linkText: 'Explore Cricket' },
            { href: 'senior-sport-athletics.html', heading: 'Athletics', description: 'Track and field, from house sports to county level.', imageLabel: 'Athletics training session', linkText: 'Explore Athletics' },
            { href: 'senior-sport-swimming.html', heading: 'Swimming', description: 'Training in our own 24m indoor pool.', imageLabel: 'Swimming training session', linkText: 'Explore Swimming' },
            { href: 'senior-sport-tennis.html', heading: 'Tennis', description: 'Individual and team competition on our own courts.', imageLabel: 'Tennis training session', linkText: 'Explore Tennis' },
            { href: 'senior-sport-badminton.html', heading: 'Badminton', description: 'A growing squad, open to complete beginners.', imageLabel: 'Badminton training session', linkText: 'Explore Badminton' },
          ],
        },
      },
      bookVisitPromo('cta-sport-promo'),
    ],
  },

  'senior-sport-football': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Football', body: 'One of the school’s most popular and fastest-growing sports.',
        mediaLabel: 'Football training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Football', href: 'senior-sport-football.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Football', body: ['Football is led by a UEFA-qualified coach, with the programme prioritising skill, awareness and teamwork. Our First XI recently became the first Bancroft’s team to reach a national cup final, and girls’ football has grown to match the same access, coaching and support as the boys’ game.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'West Grove football pitches', body: ['Two full grass pitches at West Grove, plus regular access to a 4G artificial pitch, give the programme a proper home across every year group, from Prep right through to the Senior School.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-rugby.html', label: 'Rugby' },
        { href: 'senior-sport-hockey.html', label: 'Hockey' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-football-promo'),
    ],
  },

  'senior-sport-rugby': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Rugby', body: 'Reigning London Schools champions, built on squad depth rather than a handful of standout players.',
        mediaLabel: 'Rugby training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Rugby', href: 'senior-sport-rugby.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Rugby', body: ['Our First XV were recently named London Schools champions, the culmination of an unbeaten season built on strong squad depth. The squad trains three times a week throughout the season alongside a full fixture list against other London schools, and several players have gone on to regional representative squads.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'left', mediaLabel: 'West Grove rugby pitches', body: ['Rugby is played on our West Grove pitches, with access to the CrossFit gym and weights area for strength and conditioning alongside on-field coaching.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-football.html', label: 'Football' },
        { href: 'senior-sport-hockey.html', label: 'Hockey' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-rugby-promo'),
    ],
  },

  'senior-sport-hockey': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Hockey', body: 'Competitive fixtures across every year group, on our own West Grove pitches.',
        mediaLabel: 'Hockey training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Hockey', href: 'senior-sport-hockey.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Hockey', body: ['Hockey squads train weekly and compete in a full fixture list against local schools, with our First XI reaching a national final this season. The programme welcomes players of every experience level, from complete beginners to county-standard performers.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'West Grove hockey pitches', body: ['Matches and training take place on our West Grove playing fields, with strength and conditioning support available through the on-site CrossFit gym.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-netball.html', label: 'Netball' },
        { href: 'senior-sport-athletics.html', label: 'Athletics' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-hockey-promo'),
    ],
  },

  'senior-sport-netball': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Netball', body: 'One of the school’s most popular team sports, from house fixtures to national competition.',
        mediaLabel: 'Netball training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Netball', href: 'senior-sport-netball.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Netball', body: ['Netball is one of the most popular sports in the school, with teams at every age group and a First VII that reached a national final this season. Weekly training focuses on movement, shooting accuracy and match-play tactics.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'left', mediaLabel: 'West Grove netball courts', body: ['Dedicated netball courts at West Grove give every squad a proper home for training and fixtures throughout the season.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-hockey.html', label: 'Hockey' },
        { href: 'senior-sport-tennis.html', label: 'Tennis' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-netball-promo'),
    ],
  },

  'senior-sport-cricket': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Cricket', body: 'A full summer term fixture list for boys and girls, on our own pitches and nets.',
        mediaLabel: 'Cricket practice session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Cricket', href: 'senior-sport-cricket.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Cricket', body: ['Cricket runs a full summer term fixture list for both boys’ and girls’ teams, from Colts through to First XI level, alongside indoor nets practice earlier in the year to keep technique sharp.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'West Grove cricket nets', body: ['West Grove’s brand-new cricket nets and dedicated pitches give the programme excellent facilities for both training and matches.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-athletics.html', label: 'Athletics' },
        { href: 'senior-sport-tennis.html', label: 'Tennis' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-cricket-promo'),
    ],
  },

  'senior-sport-athletics': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Athletics', body: 'Track and field for every pupil, from house sports day to county-level competition.',
        mediaLabel: 'Athletics training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Athletics', href: 'senior-sport-athletics.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Athletics', body: ['Athletics is part of the curriculum for every pupil, with a dedicated squad training beyond that for pupils who want to compete further. Our team reached a national final this season, and several athletes regularly represent their county.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'left', mediaLabel: 'School playing fields', body: ['Track and field training makes use of our 17 acres of playing fields, with strength and conditioning support available through the CrossFit gym.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-cricket.html', label: 'Cricket' },
        { href: 'senior-sport-swimming.html', label: 'Swimming' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-athletics-promo'),
    ],
  },

  'senior-sport-swimming': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Swimming', body: 'Training in our own 24m indoor pool, from beginners to competitive swimmers.',
        mediaLabel: 'Swimming training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Swimming', href: 'senior-sport-swimming.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Swimming', body: ['Swimming takes place in our own 24m indoor pool, used for curriculum lessons, squad training and low-impact fitness work for pupils across other sports. A termly house swimming gala gives every pupil a chance to compete.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'Indoor swimming pool', body: ['Having our own pool on site means training isn’t limited by weather or off-site travel, and it doubles as a recovery and conditioning space for other sports.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-athletics.html', label: 'Athletics' },
        { href: 'senior-sport-tennis.html', label: 'Tennis' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-swimming-promo'),
    ],
  },

  'senior-sport-tennis': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Tennis', body: 'Individual and team competition on our own courts throughout the summer term.',
        mediaLabel: 'Tennis training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Tennis', href: 'senior-sport-tennis.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Tennis', body: ['Tennis combines individual coaching with team competition, giving pupils of every level a route into the sport, from weekly club sessions through to inter-school fixtures in the summer term.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'left', mediaLabel: 'West Grove tennis courts', body: ['Dedicated tennis courts at West Grove give the programme its own home for coaching and matches throughout the season.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-netball.html', label: 'Netball' },
        { href: 'senior-sport-cricket.html', label: 'Cricket' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-tennis-promo'),
    ],
  },

  'senior-sport-badminton': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Sport', heading: 'Badminton', body: 'A growing squad open to players of every ability, including complete beginners.',
        mediaLabel: 'Badminton training session',
        breadcrumb: bc({ label: '11+ Senior', href: 'senior.html' }, { label: 'Sport & Arts', href: 'senior-sport-arts.html' }, { label: 'Sport', href: 'senior-sport.html' }, { label: 'Badminton', href: 'senior-sport-badminton.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Head of Badminton', body: ['Badminton has grown steadily, with every year group represented in fixtures against local schools and in the National Schools’ Championships. The squad trains weekly, working on movement, shot selection and match tactics, and the badminton club welcomes complete beginners alongside more experienced players.'] } },
      { component: 'wf-text-media', props: { heading: 'Facilities', side: 'right', mediaLabel: 'Sports hall badminton courts', body: ['Training and matches take place in our multi-purpose sports hall, with courts available for club sessions as well as squad training.'] } },
      { component: 'wf-button-row', props: { heading: 'More sports', items: [
        { href: 'senior-sport-tennis.html', label: 'Tennis' },
        { href: 'senior-sport-swimming.html', label: 'Swimming' },
        { href: 'senior-sport.html', label: 'See all our sports' },
      ] } },
      bookVisitPromo('cta-sport-badminton-promo'),
    ],
  },

  // --- 16+ Sixth Form ---------------------------------------------------------

  'sixth-form': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'The next exciting step', body: 'More independence, a more grown-up school day, and a launchpad for what comes after.',
        mediaLabel: 'Sixth Form pupils in the common room', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { align: 'center', body: ['Sixth Form at Bancroft’s is where pupils take real ownership of their education, in a school that still knows them individually. Some join us for the first time at 16; most have grown up here since 7 or 11.'] } },
      { component: 'wf-text-media', props: { heading: 'Sixth Form Life', side: 'right', mediaLabel: 'Sixth Form pupils in the common room', body: ['Independence, responsibility and a more grown-up school day.'], ctaLabel: 'See what Sixth Form life is like', ctaHref: 'sixth-form-life.html' } },
      { component: 'wf-text-media', props: { heading: 'Curriculum & Subjects', side: 'left', mediaLabel: 'Sixth Form pupils in a seminar', body: ['A Level subjects and how choices are guided.'], ctaLabel: 'See the subjects on offer', ctaHref: 'sixth-form-curriculum-subjects.html' } },
      { component: 'wf-text-media', props: { heading: 'Clubs', side: 'right', mediaLabel: 'Sixth Former leading a club', body: ['Where Sixth Formers lead clubs and societies, not just attend them.'], ctaLabel: 'See our Clubs', ctaHref: 'sixth-form-clubs.html' } },
      { component: 'wf-text-media', props: { heading: 'Leavers’ Destinations', side: 'left', mediaLabel: 'Graduating Sixth Form pupils', body: ['Where recent leavers have gone on to.'], ctaLabel: 'See where leavers go next', ctaHref: 'sixth-form-leavers-destinations.html' } },
      { component: 'wf-text-media', props: { heading: 'Examination Results', side: 'right', mediaLabel: 'Pupils on A Level results day', body: ['A Level outcomes and value added.'], ctaLabel: 'See our results', ctaHref: 'sixth-form-examination-results.html' } },
      {
        component: 'wf-text-media', props: {
          heading: 'Ready to take the next step?', side: 'left', mediaLabel: 'Sixth Form pupil at their desk',
          body: ['See how joining our Sixth Form works, or come and see Bancroft’s for yourself.'],
          ctaLabel: 'Start your 16+ journey', ctaHref: 'admissions-16plus-journey.html', ctaId: 'cta-sixthform-hero-journey',
          secondaryLabel: 'Book a Visit', secondaryHref: 'book-a-visit.html',
        },
      },
      {
        component: 'wf-text-media', props: {
          heading: 'Already at Bancroft’s?', body: ['How current Year 11 pupils move into Sixth Form.'],
          side: 'right', mediaLabel: 'Year 11 pupil moving into Sixth Form',
          ctaLabel: 'Staying On', ctaHref: 'sixth-form-staying-on.html',
        },
      },
    ],
  },

  'sixth-form-life': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Sixth Form Life', body: 'A dedicated Sixth Form space, more freedom, and real responsibility.',
        mediaLabel: 'Sixth Form pupils relaxing in their common room', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Sixth Form Life', href: 'sixth-form-life.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers have their own dedicated study and social space, a more flexible timetable built around independent study periods, and their own dress code. Many take on leadership roles, from prefect positions to mentoring younger pupils and running clubs of their own.'] } },
      { component: 'wf-quote', props: { items: [
        { quote: 'Sixth Form felt like a genuine step up. I had more freedom, but the support was still there whenever I needed it.', attribution: 'Former pupil, now at university' },
      ] } },
      { component: 'wf-text-media', props: { heading: 'Clubs', side: 'left', mediaLabel: 'Sixth Form pupil leading a club', body: ['Sixth Formers don’t just take part in clubs and societies - many go on to run them, gaining real leadership experience alongside their A Levels.'], ctaLabel: 'See how Sixth Formers lead', ctaHref: 'sixth-form-clubs.html' } },
      bookVisitPromo('cta-sixthform-life-promo'),
    ],
  },

  'sixth-form-clubs': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Clubs', body: 'Sixth Formers don’t just take part in clubs, many go on to lead them.',
        mediaLabel: 'Sixth Form pupil leading a club', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Clubs', href: 'sixth-form-clubs.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Sixth Formers stay involved in the clubs and societies that run right across the school, but with a difference: many take on running them, mentoring younger pupils and building real leadership experience alongside their A Levels.'] } },
      { component: 'wf-text-media', props: { heading: 'Leadership & Mentoring', side: 'right', mediaLabel: 'Sixth Former mentoring a younger pupil', body: ['Running junior clubs, prefect roles and mentoring pupils lower down the school.'] } },
      { component: 'wf-text-media', props: { heading: 'Arts & Performance', side: 'left', mediaLabel: 'Sixth Former leading a rehearsal', body: ['Leading roles in productions, senior ensembles and student-run societies.'] } },
      { component: 'wf-text-media', props: { heading: 'Academic Societies', side: 'right', mediaLabel: 'Sixth Formers in a debating society', body: ['Subject societies, Model United Nations and debating, often student-led.'] } },
      { component: 'wf-text-media', props: { heading: 'Outdoor & Adventure', side: 'left', mediaLabel: 'Sixth Former leading a Duke of Edinburgh expedition', body: ['Gold Duke of Edinburgh’s Award, senior CCF roles and expedition leadership.'] } },
      bookVisitPromo('cta-sixthform-clubs-promo'),
    ],
  },

  'sixth-form-curriculum-subjects': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Curriculum & Subjects', body: 'A wide choice of A Level subjects, with guidance to help pupils choose well.',
        mediaLabel: 'Sixth Form pupils in a subject seminar', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Curriculum & Subjects', href: 'sixth-form-curriculum-subjects.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'A Level subjects', body: ['Pupils typically choose three or four A Level subjects from a wide range spanning the sciences, humanities, languages, arts and social sciences. Our careers and higher education team works with every pupil individually, so subject choices connect clearly to what comes next.'] } },
      { component: 'wf-cards', props: { heading: 'Related pages', cols: 2, items: [
        { href: 'sixth-form-leavers-destinations.html', heading: 'Leavers’ Destinations', description: 'See where subject choices have led recent leavers.' },
        { href: 'sixth-form-examination-results.html', heading: 'Examination Results', description: 'A Level outcomes by subject.' },
      ] } },
      bookVisitPromo('cta-sixthform-curriculum-promo'),
    ],
  },

  'sixth-form-leavers-destinations': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Leavers’ Destinations', body: 'Recent leavers have gone on to a wide range of universities, apprenticeships and careers.',
        mediaLabel: 'Sixth Form pupils celebrating on results day', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Leavers’ Destinations', href: 'sixth-form-leavers-destinations.html' }),
      },
    },
    blocks: [
      { component: 'wf-statistics', props: { heading: 'Recent leavers, at a glance', items: [
        { value: '95%', label: 'Progressed to their first-choice university' },
        { value: '30+', label: 'Universities represented last year' },
        { value: '10%', label: 'Progressed to Russell Group or equivalent' },
        { value: '5%', label: 'Chose an apprenticeship or direct career route' },
      ] } },
      { component: 'wf-text', props: { heading: 'Beyond Bancroft’s', body: ['Our careers and higher education team supports every pupil individually, from work experience placements in Year 12 to personal statement guidance and interview preparation. We track destinations closely so our advice reflects what genuinely helps.'] } },
      bookVisitPromo('cta-leavers-destinations-promo'),
    ],
  },

  'sixth-form-staying-on': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Staying On', body: 'How current Year 11 pupils move smoothly into the Sixth Form.',
        ctaLabel: 'See Sixth Form Curriculum & Subjects', ctaHref: 'sixth-form-curriculum-subjects.html', ctaId: 'cta-staying-on-hero',
        mediaLabel: 'Year 11 pupil meeting their tutor', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Staying On', href: 'sixth-form-staying-on.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Current pupils confirm their Sixth Form subject choices in the spring of Year 11, guided by subject teachers, their tutor and our careers team. Staying on is expected to be straightforward for the great majority of pupils, formalised once GCSE results confirm each subject’s entry requirements are met.'] } },
      { component: 'wf-promo', props: { heading: 'Confirm your Sixth Form place', body: 'Speak to your Head of Year about confirming your subject choices, or register your interest online.', ctaLabel: 'Register', ctaHref: 'register.html', ctaId: 'cta-staying-on-promo', mediaLabel: 'Pupil confirming Sixth Form subject choices' } },
    ],
  },

  'sixth-form-examination-results': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: '16+ Sixth Form', heading: 'Examination Results', body: 'Consistently strong A Level outcomes, across a genuinely broad subject range.',
        mediaLabel: 'Sixth Form pupils on A Level results day', breadcrumb: bc({ label: '16+ Sixth Form', href: 'sixth-form.html' }, { label: 'Examination Results', href: 'sixth-form-examination-results.html' }),
      },
    },
    blocks: [
      { component: 'wf-statistics', props: { heading: 'A Level results at a glance', items: [
        { value: '99%', label: 'Grades A* to C' },
        { value: '55%', label: 'Grades A* to A' },
        { value: '25+', label: 'Subjects offered at A Level' },
        { value: '95%', label: 'Progressed to first-choice university' },
      ] } },
      { component: 'wf-text', props: { heading: 'Beyond the headline figures', body: ['We report value added alongside raw grades, since it reflects individual progress rather than just intake. Subject-by-subject breakdowns are available from our admissions and academic teams on request.'] } },
      bookVisitPromo('cta-sixthform-results-promo'),
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
          heading: 'Explore School Life', cols: 4,
          items: [
            { href: 'school-life-community.html', heading: 'Our Community', description: 'Parents, alumni and the wider Bancroft’s network.', imageLabel: 'Parents at a community event', linkText: 'Meet our community' },
            { href: 'calendar.html', id: 'cta-schoollife-card-calendar', heading: 'Calendar', description: 'Term dates, events and open mornings, in one place.', imageLabel: 'School calendar on a noticeboard', linkText: 'View the Calendar' },
            { href: 'weekly-menu.html', heading: 'Weekly Menu', description: 'What’s on the menu in the dining hall this week.', imageLabel: 'Pupils in the dining hall', linkText: 'See this week’s menu' },
            { href: 'school-bus-service.html', heading: 'School Bus Service', description: 'Routes, timings and how to book a seat.', imageLabel: 'School bus outside the main building', linkText: 'Find your route' },
            { href: 'uniform.html', heading: 'Uniform', description: 'What to buy, where from, and second-hand options.', imageLabel: 'Pupils in school uniform', linkText: 'See the Uniform guide' },
          ],
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'Already a Bancroft’s parent?', body: 'Sign in to the Parent Portal for absence reporting, school reports and everything else specific to your child.',
          ctaLabel: 'Go to the Parent Portal', ctaHref: '#', ctaId: 'cta-schoollife-promo', mediaLabel: 'Parent signed in to the Parent Portal',
        },
      },
    ],
  },

  'school-life-community': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Our Community', body: 'Parents, alumni and supporters who keep the Bancroft’s community close.',
        mediaLabel: 'Parents’ Association event', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Our Community', href: 'school-life-community.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: [
        'Bancroft’s School provides a broad and welcoming community for all. This has been strengthened over the years by our foundation, parents’ association, alumni activities, creative arts and more. Once a Bancroftian, always a Bancroftian.',
        'To see what our individual communities stand for, please see the below links:',
      ] } },
      {
        component: 'wf-cards', props: {
          cols: 4,
          items: [
            { heading: 'Bancroft’s Foundation', href: '#', imageLabel: 'Bancroft’s Foundation' },
            { heading: 'The Drapers’ Company', href: '#', imageLabel: 'The Drapers’ Company' },
            { heading: 'Parents’ Association', href: 'parent-association.html', imageLabel: 'Parents’ Association event' },
            { heading: 'Old Bancroftians', href: '#', imageLabel: 'Old Bancroftians reunion' },
            { heading: 'The Arts Society', href: '#', imageLabel: 'The Arts Society' },
            { heading: 'The Evening Chorus Choir', href: '#', imageLabel: 'The Evening Chorus Choir' },
            { heading: 'The Crofton Singers', href: '#', imageLabel: 'The Crofton Singers' },
          ],
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'See what’s coming up', body: 'Reunions, fundraisers and Parents’ Association gatherings all appear on our Calendar, alongside term dates and Open Mornings.',
          ctaLabel: 'View the Calendar', ctaHref: 'calendar.html', ctaId: 'cta-community-promo', mediaLabel: 'Parents at a community event',
        },
      },
    ],
  },

  calendar: {
    hero: {
      component: 'wf-page-header',
      props: {
        heading: 'Calendar', subtitle: 'Term dates, events and Open Mornings, all in one place, so nothing gets missed.',
        breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Calendar', href: 'calendar.html' }),
      },
    },
    blocks: [
      {
        component: 'wf-calendar', props: {
          filters: ['All', 'Term Dates', 'School Events', '7+ Prep', '11+ Senior', '16+ Sixth Form', 'Sport', 'Community'],
          initialMonth: '2026-09',
          events: [
            { date: '2026-09-01', label: 'INSET Day (pupils not in school)', category: 'Term Dates' },
            { date: '2026-09-02', label: 'Autumn Term begins', category: 'Term Dates' },
            { date: '2026-09-17', label: '11+ Open Morning', category: '11+ Senior' },
            { date: '2026-09-24', label: '7+ Open Morning', category: '7+ Prep' },
            { date: '2026-10-08', label: 'Sixth Form Open Evening', category: '16+ Sixth Form' },
            { date: '2026-10-10', label: 'First XV vs Chigwell', category: 'Sport' },
            { date: '2026-10-17', endDate: '2026-10-25', label: 'Half Term Holiday', category: 'Term Dates' },
            { date: '2026-11-06', label: 'Senior School Parents’ Evening', category: '11+ Senior' },
            { date: '2026-11-13', label: 'Old Bancroftians reunion', category: 'Community' },
            { date: '2026-11-20', label: 'Winter Concert', category: 'School Events' },
            { date: '2026-11-21', label: 'Netball First VII county final', category: 'Sport' },
            { date: '2026-12-04', label: 'Carol Service', category: 'School Events' },
            { date: '2026-12-11', label: 'Autumn Term ends', category: 'Term Dates' },
            { date: '2026-12-12', endDate: '2027-01-03', label: 'Christmas Holidays', category: 'Term Dates' },
          ],
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'Already a Bancroft’s parent?', body: 'Sign in to the Parent Portal for absence reporting, school reports and everything else specific to your child.',
          ctaLabel: 'Go to the Parent Portal', ctaHref: '#', ctaId: 'cta-calendar-promo', mediaLabel: 'Parent signed in to the Parent Portal',
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
        component: 'wf-promo', props: {
          heading: 'Keep track of everything else', body: 'Term dates, events and Open Mornings for the year ahead are all on our Calendar.',
          ctaLabel: 'View the Calendar', ctaHref: 'calendar.html', ctaId: 'cta-menu-promo', mediaLabel: 'Parent checking the school calendar',
        },
      },
    ],
  },

  'school-bus-service': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'School Bus Service', body: 'Getting to Bancroft’s has never been easier, thanks to our school bus service.',
        mediaLabel: 'School bus at a pick-up point', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'School Bus Service', href: 'school-bus-service.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: [
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
          heading: 'Find out more', side: 'right', mediaLabel: 'Parent booking the school bus service online',
          body: ['Bookings and payments for the school bus service are managed through our transport partner, Zeelo, where you can view full routes, timetables and ticket pricing. Our Terms and Conditions and Information Booklet cover everything else you need to know before signing up.'],
          links: [
            { label: 'View routes, timetables and pricing (Zeelo)', href: '#' },
            { label: 'Terms and Conditions', href: '#' },
            { label: 'Information Booklet', href: '#' },
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
          heading: 'Already a Bancroft’s parent?', body: 'Sign in to the Parent Portal for absence reporting, school reports and everything else specific to your child.',
          ctaLabel: 'Go to the Parent Portal', ctaHref: '#', ctaId: 'cta-uniform-promo', mediaLabel: 'Parent signed in to the Parent Portal',
        },
      },
    ],
  },

  'parent-association': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'School Life', heading: 'Parents’ Association', body: 'Our mission is to enhance the experience of every pupil at Bancroft’s.',
        mediaLabel: 'Parents’ Association event', breadcrumb: bc({ label: 'School Life', href: 'school-life.html' }, { label: 'Parent Association', href: 'parent-association.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: [
        'The Parents’ Association brings the Bancroft’s community together through social events and fundraising throughout the school year - fireworks, themed balls, camping trips, fayres and parent-staff matches among them, alongside activities that connect families across year groups.',
        'Every event helps fund things that directly benefit pupils, and volunteering is a great way to get to know other Bancroft’s parents.',
      ] } },
      {
        component: 'wf-table', props: {
          heading: 'Committee', rowHeader: 'Role',
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
          ctaLabel: 'Contact the PA', ctaHref: 'mailto:bancrofts.pa@gmail.com', ctaId: 'cta-parent-association-contact',
        },
      },
      {
        component: 'wf-promo', props: {
          heading: 'See what’s coming up', body: 'Reunions, fundraisers and Parents’ Association gatherings all appear on our Calendar, alongside term dates and Open Mornings.',
          ctaLabel: 'View the Calendar', ctaHref: 'calendar.html', ctaId: 'cta-parent-association-promo', mediaLabel: 'Parents at a community event',
        },
      },
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
      { component: 'wf-cards', props: {
        cols: 3, perPage: 6,
        filters: ['All', 'Academic', 'Community', 'Sport'],
        items: [
          { href: 'news-article-a.html', category: 'Academic', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', description: 'Another year of strong outcomes across the Senior School, with many pupils exceeding expectations.', imageLabel: 'Pupils celebrating results day', linkText: 'Read the story' },
          { href: 'news-article-b.html', category: 'Community', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', description: 'What the new partnership means for families joining at 7+.', imageLabel: 'Prep pupils on a school trip', linkText: 'Read the story' },
          { href: 'news-article-c.html', category: 'Sport', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby, capping a strong year across our sports programme.', imageLabel: 'First XV rugby team', linkText: 'Read the story' },
          { category: 'Academic', heading: 'Sixth Form pupils receive strong university offers', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Sixth Form pupils celebrating' },
          { category: 'Sport', heading: 'Netball First VII reach county final', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Netball match in progress' },
          { category: 'Community', heading: 'Old Bancroftians mark 50 years since leaving', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Old Bancroftians reunion event' },
          { category: 'Academic', heading: 'Prep pupils shine in national maths challenge', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Prep pupils in a maths lesson' },
          { category: 'Community', heading: 'Bancroft’s Family of Schools hosts joint open morning', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Families on an open morning tour' },
          { category: 'Sport', heading: 'Swimming squad breaks three school records', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Swimmers at the school gala' },
          { category: 'Academic', heading: 'Bancroft’s ranked among London’s top performing schools', description: 'Placeholder card - no destination page built in this pass.', imageLabel: 'Pupils in a Senior School lesson' },
        ],
      } },
      bookVisitPromo('cta-news-promo'),
    ],
  },

  'news-article-a': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Academic', heading: 'Bancroft’s pupils celebrate outstanding GCSE results', body: 'Another year of strong outcomes across the Senior School, with many pupils exceeding expectations.',
        mediaLabel: 'Pupils celebrating results day', breadcrumb: bc({ label: 'News', href: 'news.html' }, { label: 'Bancroft’s pupils celebrate outstanding GCSE results', href: 'news-article-a.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { centered: true, body: ['Pupils across Year 11 gathered this morning to collect a strong set of GCSE results, with the proportion of pupils achieving grade 7 or above rising again on last year. Staff and families were on hand throughout the morning to celebrate what has been, for many pupils, the culmination of five years of work.'] } },
      { component: 'wf-media', props: { type: 'image', label: 'Pupils comparing results in the quad', centered: true, aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { centered: true, body: ['Our Head of Senior School praised the cohort’s resilience, noting that results this strong reflect not just ability but the support pupils give one another. Several pupils achieved a clean sweep of grade 9s across the sciences, languages and humanities.', 'The cohort now moves into Sixth Form or on to further study elsewhere, with our careers team continuing to support leavers through the transition.'] } },
      { component: 'wf-share', props: { centered: true } },
      { component: 'wf-cards', props: { heading: 'Related articles', cols: 2, items: [
        { href: 'news-article-c.html', category: 'Sport', heading: 'First XV named London Schools champions', description: 'A landmark season for rugby, capping a strong year across our sports programme.', imageLabel: 'First XV rugby team', linkText: 'Read the story' },
        { href: 'senior-academic-results.html', heading: 'Academic Results', description: 'See our full GCSE results in context.', imageLabel: 'GCSE results summary', linkText: 'See our results' },
      ] } },
      bookVisitPromo('cta-article-a-promo'),
    ],
  },

  'news-article-b': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'Community', heading: 'Bancroft’s Family of Schools welcomes two new Prep partners', body: 'What the new partnership means for families joining at 7+.',
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
        eyebrow: 'Sport', heading: 'First XV named London Schools champions', body: 'A landmark season for rugby, capping a strong year across our sports programme.',
        mediaLabel: 'First XV rugby team celebrating', breadcrumb: bc({ label: 'News', href: 'news.html' }, { label: 'First XV named London Schools champions', href: 'news-article-c.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { centered: true, body: ['Bancroft’s First XV have been named London Schools champions, the culmination of an unbeaten season built on strong squad depth rather than a handful of standout players. It’s the clearest sign yet of a sports programme that is broader and stronger than its reputation suggests.'] } },
      { component: 'wf-media', props: { type: 'video', label: 'Match highlights from the final', centered: true, aspectClass: 'aspect-video' } },
      { component: 'wf-text', props: { centered: true, body: ['The squad, drawn from across Years 10 and 11, trained three times a week throughout the season alongside a full fixture list against other London schools. Several players have been selected for regional representative squads.', 'The result caps a strong year across Bancroft’s sport more broadly, with school teams also reaching finals in netball, hockey and athletics.'] } },
      { component: 'wf-share', props: { centered: true } },
      { component: 'wf-cards', props: { heading: 'Related articles', cols: 2, items: [
        { href: 'senior-sport-rugby.html', heading: 'Rugby', description: 'Meet the programme behind this season’s success.', imageLabel: 'Rugby training session', linkText: 'Explore Rugby at Bancroft’s' },
        { href: 'senior-sport.html', heading: 'Sport at Bancroft’s', description: 'Nine sports, dozens of teams, and a programme for every level.', imageLabel: 'Pupils on the sports pitch', linkText: 'Explore our sports programme' },
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
      { component: 'wf-text-media', props: { heading: 'Our History & Archives', side: 'right', mediaLabel: 'Historic photograph of the school', body: ['Bancroft’s story, from foundation to today.'], ctaLabel: 'Explore our history', ctaHref: 'about-history-archives.html' } },
      { component: 'wf-text-media', props: { heading: 'Governance & Leadership', side: 'left', mediaLabel: 'Board of Governors', body: ['Our Board of Governors and Senior Leadership Team.'], ctaLabel: 'Meet our Governors and leaders', ctaHref: 'about-governance-leadership.html' } },
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

  'about-history-archives': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Our History & Archives', body: 'Bancroft’s story, supported throughout by the Drapers’ Company.',
        mediaLabel: 'Historic photograph of Bancroft’s pupils', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Our History & Archives', href: 'about-history-archives.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { body: ['Bancroft’s has been educating pupils on this site for generations, with the Drapers’ Company as our founding benefactor throughout. Our archives hold decades of photographs, magazines and records charting how the school, and the pupils who’ve passed through it, have changed over time.', 'Our School Archivist maintains this collection and welcomes enquiries from Old Bancroftians and researchers looking to explore the school’s history in more depth.'] } },
      bookVisitPromo('cta-history-promo'),
    ],
  },

  'about-governance-leadership': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        eyebrow: 'About', heading: 'Governance & Leadership', body: 'How Bancroft’s is governed, and the senior team who lead it day to day.',
        mediaLabel: 'Board of Governors meeting', breadcrumb: bc({ label: 'About', href: 'about.html' }, { label: 'Governance & Leadership', href: 'about-governance-leadership.html' }),
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

  'about-policies-procedures': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        heading: 'Policies and Procedures', body: 'Our key school policies, kept up to date and available to every family.',
        mediaLabel: 'Policy documents on a shelf', breadcrumb: bc({ label: 'Policies and Procedures', href: 'about-policies-procedures.html' }),
      },
    },
    blocks: [
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
          ],
        },
      },
      bookVisitPromo('cta-policies-promo'),
    ],
  },

  'about-vacancies': {
    hero: {
      component: 'wf-standard-hero',
      props: {
        heading: 'Vacancies', body: 'Join a school that invests seriously in its staff, as well as its pupils.',
        mediaLabel: 'Staff member teaching a lesson', breadcrumb: bc({ label: 'Vacancies', href: 'about-vacancies.html' }),
      },
    },
    blocks: [
      { component: 'wf-text', props: { heading: 'Working at Bancroft’s', body: ['We look for staff who share our belief that academic ambition and genuine care for pupils aren’t in tension. In return, we invest heavily in professional development and offer a genuinely collegiate working environment.'] } },
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
        { heading: 'How do I get to Bancroft’s?', body: 'The school is a short walk from the Central Line and is served by our own school bus service across North East London and Essex. See School Bus Service for routes.' },
        { heading: 'Is financial support available?', body: 'Yes. We offer academic and music scholarships, and means-tested bursaries covering up to 100 percent of fees. See Scholarships & Bursaries for details.' },
        { heading: 'What is the Bancroft’s Family of Schools?', body: 'A partnership between Bancroft’s and two local preparatory schools, each of which keeps its own name, site and identity while gaining closer links into Bancroft’s at 11+.' },
      ] } },
      bookVisitPromo('cta-faqs-promo'),
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
// Prototype navigator — core pages (grouped by template type), user flows, changelog.
// ---------------------------------------------------------------------------

export type CorePageType = 'Homepage' | 'Content' | 'Listing' | 'Article' | 'Detail' | 'Form'
export const CORE_PAGE_TYPES: CorePageType[] = ['Homepage', 'Content', 'Listing', 'Article', 'Detail', 'Form']

export interface CorePage { label: string; href: string; type: CorePageType; inferred?: boolean }

export const corePages: CorePage[] = [
  { label: 'Homepage', href: 'index.html', type: 'Homepage' },

  { label: 'Admissions', href: 'admissions.html', type: 'Content' },
  { label: 'Your 7+ Journey', href: 'admissions-7plus-journey.html', type: 'Content' },
  { label: 'Your 11+ Journey', href: 'admissions-11plus-journey.html', type: 'Content' },
  { label: 'Your 16+ Journey', href: 'admissions-16plus-journey.html', type: 'Content' },
  { label: 'Fees', href: 'fees.html', type: 'Content' },
  { label: 'Scholarships & Bursaries', href: 'scholarships-bursaries.html', type: 'Content' },
  { label: 'Frequently Asked Questions', href: 'admissions-faqs.html', type: 'Content' },

  { label: '7+ Prep', href: 'prep.html', type: 'Content' },
  { label: 'Why Bancroft’s Prep', href: 'prep-why.html', type: 'Content' },
  { label: 'Prep: Curriculum', href: 'prep-curriculum.html', type: 'Content' },
  { label: 'Prep: Clubs', href: 'prep-clubs.html', type: 'Content' },
  { label: 'Prep: Pastoral Care', href: 'prep-pastoral-care.html', type: 'Content' },
  { label: 'Prep: Meet the Staff', href: 'prep-staff.html', type: 'Content' },

  { label: '11+ Senior', href: 'senior.html', type: 'Content' },
  { label: 'Why Bancroft’s Senior', href: 'senior-why.html', type: 'Content' },
  { label: 'Senior: Academic Results', href: 'senior-academic-results.html', type: 'Content' },
  { label: 'Senior: Curriculum', href: 'senior-curriculum.html', type: 'Content' },
  { label: 'Senior: Sport & Arts', href: 'senior-sport-arts.html', type: 'Content' },
  { label: 'Senior: Clubs', href: 'senior-clubs.html', type: 'Content' },
  { label: 'Senior: Pastoral Care', href: 'senior-pastoral-care.html', type: 'Content' },
  { label: 'Sport (listing)', href: 'senior-sport.html', type: 'Listing' },
  { label: 'Sport: Football', href: 'senior-sport-football.html', type: 'Detail' },
  { label: 'Sport: Rugby', href: 'senior-sport-rugby.html', type: 'Detail' },
  { label: 'Sport: Hockey', href: 'senior-sport-hockey.html', type: 'Detail' },
  { label: 'Sport: Netball', href: 'senior-sport-netball.html', type: 'Detail' },
  { label: 'Sport: Cricket', href: 'senior-sport-cricket.html', type: 'Detail' },
  { label: 'Sport: Athletics', href: 'senior-sport-athletics.html', type: 'Detail' },
  { label: 'Sport: Swimming', href: 'senior-sport-swimming.html', type: 'Detail' },
  { label: 'Sport: Tennis', href: 'senior-sport-tennis.html', type: 'Detail' },
  { label: 'Sport: Badminton', href: 'senior-sport-badminton.html', type: 'Detail' },

  { label: '16+ Sixth Form', href: 'sixth-form.html', type: 'Content' },
  { label: 'Sixth Form Life', href: 'sixth-form-life.html', type: 'Content' },
  { label: 'Sixth Form: Clubs', href: 'sixth-form-clubs.html', type: 'Content' },
  { label: 'Sixth Form: Curriculum & Subjects', href: 'sixth-form-curriculum-subjects.html', type: 'Content' },
  { label: 'Sixth Form: Leavers’ Destinations', href: 'sixth-form-leavers-destinations.html', type: 'Content' },
  { label: 'Sixth Form: Staying On', href: 'sixth-form-staying-on.html', type: 'Content' },
  { label: 'Sixth Form: Examination Results', href: 'sixth-form-examination-results.html', type: 'Content' },

  { label: 'School Life', href: 'school-life.html', type: 'Content' },
  { label: 'Our Community', href: 'school-life-community.html', type: 'Content' },
  { label: 'Calendar', href: 'calendar.html', type: 'Content' },
  { label: 'Weekly Menu', href: 'weekly-menu.html', type: 'Content' },
  { label: 'School Bus Service', href: 'school-bus-service.html', type: 'Content' },
  { label: 'Uniform', href: 'uniform.html', type: 'Content' },
  { label: 'Parent Association', href: 'parent-association.html', type: 'Content' },

  { label: 'About', href: 'about.html', type: 'Content' },
  { label: 'Welcome from the Head', href: 'about-welcome.html', type: 'Content' },
  { label: 'What We Stand For', href: 'about-what-we-stand-for.html', type: 'Content' },
  { label: 'Our History & Archives', href: 'about-history-archives.html', type: 'Content' },
  { label: 'Governance & Leadership', href: 'about-governance-leadership.html', type: 'Content' },
  { label: 'Policies and Procedures', href: 'about-policies-procedures.html', type: 'Content' },
  { label: 'Vacancies', href: 'about-vacancies.html', type: 'Content' },

  { label: 'Privacy Policy', href: 'privacy-policy.html', type: 'Content' },

  { label: 'News (listing)', href: 'news.html', type: 'Listing' },
  { label: 'News article', href: 'news-article-a.html', type: 'Article' },
  { label: 'News article', href: 'news-article-b.html', type: 'Article' },
  { label: 'News article', href: 'news-article-c.html', type: 'Article' },

  { label: 'Book a Visit', href: 'book-a-visit.html', type: 'Form' },
  { label: 'Register', href: 'register.html', type: 'Form' },
  { label: 'Contact', href: 'contact.html', type: 'Form', inferred: true },
]

export interface WalkStep { href: string; targetId: string; label: string; instruction: string }
export interface Flow { name: string; description: string; steps: WalkStep[] }

export const flows: Flow[] = [
  {
    name: '11+ parent enquiry',
    description: 'Homepage → 11+ Senior → Your 11+ Journey → Book a Visit',
    steps: [
      { href: 'index.html', targetId: 'cta-home-senior', label: 'Homepage', instruction: 'Select 11+ Senior to explore that stage.' },
      { href: 'senior.html', targetId: 'cta-senior-hero-journey', label: '11+ Senior', instruction: 'Click “Start your 11+ journey”.' },
      { href: 'admissions-11plus-journey.html', targetId: 'cta-11plus-journey-promo', label: 'Your 11+ Journey', instruction: 'Click “Book a Visit”.' },
      { href: 'book-a-visit.html', targetId: 'submit-book-a-visit', label: 'Book a Visit', instruction: 'Complete and submit the visit request form.' },
    ],
  },
  {
    name: '7+ Prep parent enquiry',
    description: 'Homepage → 7+ Prep → Your 7+ Journey → Book a Visit',
    steps: [
      { href: 'index.html', targetId: 'cta-home-prep', label: 'Homepage', instruction: 'Select 7+ Prep to explore that stage.' },
      { href: 'prep.html', targetId: 'cta-prep-hero-journey', label: '7+ Prep', instruction: 'Click “Start your 7+ journey”.' },
      { href: 'admissions-7plus-journey.html', targetId: 'cta-7plus-journey-promo', label: 'Your 7+ Journey', instruction: 'Click “Book a Visit”.' },
      { href: 'book-a-visit.html', targetId: 'submit-book-a-visit', label: 'Book a Visit', instruction: 'Complete and submit the visit request form.' },
    ],
  },
  {
    name: 'Sixth Form recruitment and retention',
    description: 'Homepage → 16+ Sixth Form → Your 16+ Journey → Register',
    steps: [
      { href: 'index.html', targetId: 'cta-home-sixth-form', label: 'Homepage', instruction: 'Select 16+ Sixth Form to explore that stage.' },
      { href: 'sixth-form.html', targetId: 'cta-sixthform-hero-journey', label: '16+ Sixth Form', instruction: 'Click “Start your 16+ journey”.' },
      { href: 'admissions-16plus-journey.html', targetId: 'cta-16plus-journey-promo-register', label: 'Your 16+ Journey', instruction: 'Click “Register”.' },
      { href: 'register.html', targetId: 'submit-register', label: 'Register', instruction: 'Complete and submit the registration form.' },
    ],
  },
  {
    name: 'Current family quick task',
    description: 'Homepage → School Life → Calendar',
    steps: [
      { href: 'index.html', targetId: 'cta-home-school-life-promo', label: 'Homepage', instruction: 'Click “Go to School Life”.' },
      { href: 'school-life.html', targetId: 'cta-schoollife-card-calendar', label: 'School Life', instruction: 'Click the “Calendar” card under Explore School Life.' },
    ],
  },
  {
    name: 'Reputation to conversion via News',
    description: 'Homepage → News article → Book a Visit',
    steps: [
      { href: 'index.html', targetId: 'cta-home-news-article', label: 'Homepage', instruction: 'Click through to the top news story.' },
      { href: 'news-article-a.html', targetId: 'cta-article-a-promo', label: 'News article', instruction: 'Click “Book a Visit”.' },
      { href: 'book-a-visit.html', targetId: 'submit-book-a-visit', label: 'Book a Visit', instruction: 'Complete and submit the visit request form.' },
    ],
  },
]

export interface ChangelogEntry { date: string; type: 'Added' | 'Changed' | 'Removed' | 'Fixed'; text: string }

export const changelog: ChangelogEntry[] = [
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
  { date: '2026-08-31', type: 'Changed', text: 'Same "too early" problem, found on the Admissions pages: removed the hero CTA from admissions.html, admissions-7plus-journey.html, admissions-11plus-journey.html and admissions-16plus-journey.html - Book a Visit/Register before any content is read, duplicating the always-present header CTA. Not relocated this time, since each page already ends in an appropriate closing promo (Book a Visit or Register) - nothing to lose. None of the four ids were referenced by any walkthrough flow.' },
  { date: '2026-08-31', type: 'Changed', text: 'Rebuilt Prep/Senior/Sixth Form overview pages: the wf-brochure-cards grid plus separate "Also in ___" section (added a few hours earlier) read as two disconnected areas rather than one coherent list. Replaced both with one continuous sequence of wf-text-media blocks, one per area (image + context + CTA each), alternating sides. wf-brochure-cards had no other use once these three pages changed, so it was removed from the kit entirely rather than left unused - kit is 20 components again, not 21.' },
  { date: '2026-08-31', type: 'Added', text: 'Two new components, grounded in the client\'s own pitch design: wf-timeline (numbered, connected steps) replaces the "Key steps" wf-cards grid on the 7+ and 11+ journey pages, which have a genuine linear sequence (16+ stays as is - its process branches, not linear, so a timeline would misrepresent it). wf-brochure-cards (centred text, smaller image below) replaces the main "Explore the ___ years" wf-cards grid on all three stage overview pages, matching the pitch\'s own admissions-entry tile style. Both stay in the kit\'s greyscale palette. See PROTOTYPE.md.' },
  { date: '2026-08-31', type: 'Changed', text: 'Swapped the order of Sixth Form\'s last two closing blocks: "Ready to take the next step?" now comes before "Already at Bancroft\'s?".' },
  { date: '2026-08-31', type: 'Changed', text: 'Removed the "Start your Nplus journey" CTA from the hero on Prep, Senior and Sixth Form overview pages — asking a reader to commit before they\'ve read anything about the stage felt premature, and duplicated the always-present header "Book a Visit" CTA. Relocated it to the end of each page instead, as a two-button wf-text-media block (primary "Start your Nplus journey", secondary "Book a Visit") once the reader has actually read about the stage. Kept the same CTA element ids so the three walkthrough flows that click through this button still work unchanged, just landing lower on the page — verified "7+ Prep parent enquiry" end to end.' },
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
  { date: '2026-08-27', type: 'Added', text: 'Five stepped user flow walkthroughs covering 7+, 11+, 16+, current families and News to conversion.' },
  { date: '2026-08-27', type: 'Fixed', text: 'Header navigation CTA and links are now driven from site config instead of hardcoded placeholder content.' },
]
