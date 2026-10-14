#!/usr/bin/env node
// Generates the project's *.html page shells from a manifest. Each shell is ~10 lines: it points
// <wf-page-body page="..."> at its src/config.ts entry — content is data, not hand-written markup.
// Re-run any time the manifest below changes (e.g. a new page is added to src/config.ts).
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const SITE_NAME = "Bancroft's School"

// [file, page-config-key, active-nav-slug, <title>]
const PAGES = [
  ['index.html', 'homepage', '', 'Home'],

  ['admissions.html', 'admissions', 'admissions', 'Admissions'],
  ['admissions-7plus-journey.html', 'admissions-7plus-journey', 'admissions', 'Your 7+ Journey'],
  ['admissions-11plus-journey.html', 'admissions-11plus-journey', 'admissions', 'Your 11+ Journey'],
  ['admissions-11plus-past-papers.html', 'admissions-11plus-past-papers', 'admissions', '11+ Entrance Exam & Past Papers'],
  ['admissions-11plus-starting.html', 'admissions-11plus-starting', 'admissions', 'Starting at Bancroft’s'],
  ['admissions-16plus-journey.html', 'admissions-16plus-journey', 'admissions', 'Your 16+ Journey'],
  ['book-a-visit.html', 'book-a-visit', 'admissions', 'Book a Visit'],
  ['admissions-occasional-places.html', 'admissions-occasional-places', 'admissions', 'Occasional Places'],
  ['register.html', 'register', 'admissions', 'Register Online'],
  ['register-7plus.html', 'register-7plus', 'admissions', '7+ Registration'],
  ['register-11plus.html', 'register-11plus', 'admissions', '11+ Registration'],
  ['register-16plus.html', 'register-16plus', 'admissions', '16+ Registration'],
  ['acceptance-deposit.html', 'acceptance-deposit', 'admissions', 'Acceptance Deposit'],
  ['fees.html', 'fees', 'admissions', 'Fees'],
  ['scholarships-bursaries.html', 'scholarships-bursaries', 'admissions', 'Scholarships & Bursaries'],
  ['admissions-faqs.html', 'admissions-faqs', 'admissions', 'Frequently Asked Questions'],

  ['prep.html', 'prep', 'prep', '7+ Prep'],
  ['prep-why.html', 'prep-why', 'prep', 'Why Bancroft’s Prep'],
  ['prep-life.html', 'prep-life', 'prep', 'Prep School Life'],
  ['prep-curriculum.html', 'prep-curriculum', 'prep', 'Prep Curriculum'],
  ['prep-co-curriculum.html', 'prep-co-curriculum', 'prep', 'Prep Co-Curriculum'],
  ['prep-pastoral-care.html', 'prep-pastoral-care', 'prep', 'Prep Pastoral Care'],
  ['prep-staff.html', 'prep-staff', 'prep', 'Meet the Prep Staff'],

  ['senior.html', 'senior', 'senior', '11+ Senior'],
  ['senior-why.html', 'senior-why', 'senior', 'Why Bancroft’s Senior'],
  ['senior-academic-results.html', 'senior-academic-results', 'senior', 'GCSE Results'],
  ['senior-curriculum.html', 'senior-curriculum', 'senior', 'Senior Curriculum'],
  ['senior-sport-arts.html', 'senior-sport-arts', 'senior', 'Sport & Arts'],
  ['senior-co-curriculum.html', 'senior-co-curriculum', 'senior', 'Senior Co-Curriculum'],
  ['senior-pastoral-care.html', 'senior-pastoral-care', 'senior', 'Senior Pastoral Care'],
  ['senior-learning-for-life.html', 'senior-learning-for-life', 'senior', 'Learning for Life'],
  ['senior-learning-support.html', 'senior-learning-support', 'senior', 'Learning Support'],
  ['senior-trips-visits.html', 'senior-trips-visits', 'senior', 'Trips & Visits'],
  ['senior-spiritual-life.html', 'senior-spiritual-life', 'senior', 'Spiritual Life'],
  ['senior-co-curriculum-ccf.html', 'senior-co-curriculum-ccf', 'senior', 'CCF'],
  ['senior-co-curriculum-dofe.html', 'senior-co-curriculum-dofe', 'senior', 'Duke of Edinburgh’s Award'],
  ['senior-co-curriculum-sea-scouts.html', 'senior-co-curriculum-sea-scouts', 'senior', 'Sea Scouts'],
  ['senior-sport.html', 'senior-sport', 'senior', 'Sport at Bancroft’s'],
  ['senior-sport-football.html', 'senior-sport-football', 'senior', 'Football'],
  ['senior-sport-rugby.html', 'senior-sport-rugby', 'senior', 'Rugby'],
  ['senior-sport-hockey.html', 'senior-sport-hockey', 'senior', 'Hockey'],
  ['senior-sport-netball.html', 'senior-sport-netball', 'senior', 'Netball'],
  ['senior-sport-cricket.html', 'senior-sport-cricket', 'senior', 'Cricket'],
  ['senior-sport-athletics.html', 'senior-sport-athletics', 'senior', 'Athletics'],
  ['senior-sport-swimming.html', 'senior-sport-swimming', 'senior', 'Swimming'],
  ['senior-sport-tennis.html', 'senior-sport-tennis', 'senior', 'Tennis'],
  ['senior-sport-badminton.html', 'senior-sport-badminton', 'senior', 'Badminton'],
  ['senior-arts.html', 'senior-arts', 'senior', 'The Arts at Bancroft’s'],
  ['senior-arts-visual-arts.html', 'senior-arts-visual-arts', 'senior', 'Visual Arts'],
  ['senior-arts-drama.html', 'senior-arts-drama', 'senior', 'Drama'],
  ['senior-arts-music.html', 'senior-arts-music', 'senior', 'Music'],

  ['sixth-form.html', 'sixth-form', 'sixth-form', '16+ Sixth Form'],
  ['sixth-form-why.html', 'sixth-form-why', 'sixth-form', 'Why Bancroft’s Sixth Form'],
  ['sixth-form-life.html', 'sixth-form-life', 'sixth-form', 'Sixth Form Life'],
  ['sixth-form-co-curriculum.html', 'sixth-form-co-curriculum', 'sixth-form', 'Sixth Form Co-Curriculum'],
  ['sixth-form-curriculum-subjects.html', 'sixth-form-curriculum-subjects', 'sixth-form', 'Sixth Form Curriculum & Subjects'],
  ['sixth-form-leavers-destinations.html', 'sixth-form-leavers-destinations', 'sixth-form', 'Leavers’ Destinations'],
  ['sixth-form-staying-on.html', 'sixth-form-staying-on', 'sixth-form', 'Staying On'],
  ['sixth-form-examination-results.html', 'sixth-form-examination-results', 'sixth-form', 'A Level Results'],

  ['school-life.html', 'school-life', 'school-life', 'School Life'],
  ['school-life-community.html', 'school-life-community', 'school-life', 'Our Community'],
  ['term-dates.html', 'term-dates', 'school-life', 'Term Dates'],
  ['calendar.html', 'calendar', 'school-life', 'Events Calendar'],
  ['weekly-menu.html', 'weekly-menu', 'school-life', 'Weekly Menu'],
  ['school-bus-service.html', 'school-bus-service', 'school-life', 'School Bus Service'],
  ['uniform.html', 'uniform', 'school-life', 'Uniform'],
  ['parent-association.html', 'parent-association', 'school-life', 'Parent Association'],

  ['news.html', 'news', 'news', 'News'],
  ['news-article-a.html', 'news-article-a', 'news', 'Bancroft’s pupils celebrate outstanding GCSE results'],
  ['news-article-b.html', 'news-article-b', 'news', 'Bancroft’s Family of Schools welcomes two new Prep partners'],
  ['news-article-c.html', 'news-article-c', 'news', 'First XV named London Schools champions'],

  ['about.html', 'about', 'about', 'About'],
  ['about-welcome.html', 'about-welcome', 'about', 'Welcome from the Head'],
  ['about-what-we-stand-for.html', 'about-what-we-stand-for', 'about', 'What We Stand For'],
  ['about-rankings-recognition.html', 'about-rankings-recognition', 'about', 'Rankings & Recognition'],
  ['about-history-archives.html', 'about-history-archives', 'about', 'Our History & Archives'],
  ['about-governance-leadership.html', 'about-governance-leadership', 'about', 'Governance & Leadership'],
  ['about-policies-procedures.html', 'about-policies-procedures', '', 'Policies and Procedures'],
  ['about-vacancies.html', 'about-vacancies', '', 'Vacancies'],

  ['contact.html', 'contact', '', 'Contact'],
  ['privacy-policy.html', 'privacy-policy', '', 'Privacy Policy'],
]

const page = (pageKey, active, title) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>${title} - ${SITE_NAME}</title>
    <script type="module" src="/src/main.ts"></script>
  </head>
  <body class="bg-gray-50 text-gray-900">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:text-sm">Skip to content</a>
    <wf-header-nav active="${active}"></wf-header-nav>
    <main id="main" class="w-full mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <wf-page-body page="${pageKey}"></wf-page-body>
    </main>
    <wf-site-footer></wf-site-footer>
    <wf-prototype-nav></wf-prototype-nav>
  </body>
</html>
`

for (const [file, pageKey, active, title] of PAGES) {
  writeFileSync(resolve(root, file), page(pageKey, active, title))
}

// Component palette page — its own tooling component, not <wf-page-body>-driven.
writeFileSync(resolve(root, 'components.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>Component List - ${SITE_NAME}</title>
    <script type="module" src="/src/main.ts"></script>
  </head>
  <body class="bg-gray-50 text-gray-900">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:text-sm">Skip to content</a>
    <wf-header-nav active="" minimal></wf-header-nav>
    <main id="main" class="w-full mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <wf-palette-page></wf-palette-page>
    </main>
    <wf-prototype-nav></wf-prototype-nav>
  </body>
</html>
`)

// Sitemap — tooling too: drawn from config.ts's own menu/page data by <wf-sitemap-page>.
writeFileSync(resolve(root, 'sitemap.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>Sitemap - ${SITE_NAME}</title>
    <script type="module" src="/src/main.ts"></script>
  </head>
  <body class="bg-gray-50 text-gray-900">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:text-sm">Skip to content</a>
    <wf-header-nav active="" minimal minimal-label="Sitemap"></wf-header-nav>
    <main id="main" class="w-full mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <wf-sitemap-page></wf-sitemap-page>
    </main>
    <wf-prototype-nav></wf-prototype-nav>
  </body>
</html>
`)

console.log(`Generated ${PAGES.length + 2} HTML pages.`)
