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
  ['admissions-7plus-journey.html', 'admissions-7plus-journey', 'admissions', 'Joining at 7+'],
  ['admissions-11plus-journey.html', 'admissions-11plus-journey', 'admissions', 'Joining at 11+'],
  ['admissions-11plus-past-papers.html', 'admissions-11plus-past-papers', 'admissions', '11+ Assessments & Past Papers'],
  ['admissions-16plus-journey.html', 'admissions-16plus-journey', 'admissions', 'Joining at 16+'],
  ['admissions-starting.html', 'admissions-starting', 'admissions', 'Starting at Bancroft’s'],
  ['book-a-visit.html', 'book-a-visit', 'admissions', 'Visit Us'],
  ['visit-7plus-open-morning.html', 'visit-7plus-open-morning', 'admissions', '7+ Open Morning'],
  ['visit-11plus-open-morning.html', 'visit-11plus-open-morning', 'admissions', '11+ Open Morning'],
  ['visit-sixth-form-open-evening.html', 'visit-sixth-form-open-evening', 'admissions', 'Sixth Form Open Evening'],
  ['admissions-occasional-places.html', 'admissions-occasional-places', 'admissions', 'Occasional Places'],
  ['register.html', 'register', 'admissions', 'Register Online'],
  ['register-7plus.html', 'register-7plus', 'admissions', '7+ Registration'],
  ['register-11plus.html', 'register-11plus', 'admissions', '11+ Registration'],
  ['register-16plus.html', 'register-16plus', 'admissions', '16+ Registration'],
  ['acceptance-deposit-fee.html', 'acceptance-deposit-fee', 'admissions', 'Acceptance Deposit: Fee'],
  ['acceptance-deposit-staff.html', 'acceptance-deposit-staff', 'admissions', 'Acceptance Deposit: Staff'],
  ['acceptance-deposit-bursary.html', 'acceptance-deposit-bursary', 'admissions', 'Acceptance Deposit: Bursary'],
  ['fees.html', 'fees', 'admissions', 'Fees'],
  ['scholarships-awards.html', 'scholarships-awards', 'admissions', 'Scholarships & Awards'],
  ['bursaries.html', 'bursaries', 'admissions', 'Bursaries'],
  ['admissions-faqs.html', 'admissions-faqs', 'admissions', 'Frequently Asked Questions'],

  ['prep.html', 'prep', 'prep', '7+ Prep'],
  ['prep-why.html', 'prep-why', 'prep', 'Why Bancroft’s Prep'],
  ['prep-life.html', 'prep-life', 'prep', 'Prep School Life'],
  ['prep-academic-life.html', 'prep-academic-life', 'prep', 'Prep Academic Life'],
  ['prep-beyond-the-classroom.html', 'prep-beyond-the-classroom', 'prep', 'Prep Beyond the Classroom'],
  ['prep-sport.html', 'prep-sport', 'prep', 'Prep Sport'],
  ['prep-music.html', 'prep-music', 'prep', 'Prep Music'],
  ['prep-drama.html', 'prep-drama', 'prep', 'Prep Drama'],
  ['prep-staff.html', 'prep-staff', 'prep', 'Meet the Prep Staff'],

  ['senior.html', 'senior', 'senior', '11+ Senior'],
  ['senior-why.html', 'senior-why', 'senior', 'Why Bancroft’s'],
  ['senior-life.html', 'senior-life', 'senior', 'Senior School Life'],
  ['senior-academic-life.html', 'senior-academic-life', 'senior', 'Senior Academic Life'],
  ['senior-beyond-the-classroom.html', 'senior-beyond-the-classroom', 'senior', 'Senior Beyond the Classroom'],
  ['senior-sport.html', 'senior-sport', 'senior', 'Senior Sport'],
  ['senior-music.html', 'senior-music', 'senior', 'Senior Music'],
  ['senior-drama.html', 'senior-drama', 'senior', 'Senior Drama'],

  ['sixth-form.html', 'sixth-form', 'sixth-form', '16+ Sixth Form'],
  ['sixth-form-why.html', 'sixth-form-why', 'sixth-form', 'Why Bancroft’s Sixth Form'],
  ['sixth-form-life.html', 'sixth-form-life', 'sixth-form', 'Sixth Form Life'],
  ['sixth-form-academic-life.html', 'sixth-form-academic-life', 'sixth-form', 'Sixth Form Academic Life'],
  ['sixth-form-beyond-the-classroom.html', 'sixth-form-beyond-the-classroom', 'sixth-form', 'Sixth Form Beyond the Classroom'],
  ['sixth-form-sport.html', 'sixth-form-sport', 'sixth-form', 'Sixth Form Sport'],
  ['sixth-form-music.html', 'sixth-form-music', 'sixth-form', 'Sixth Form Music'],
  ['sixth-form-drama.html', 'sixth-form-drama', 'sixth-form', 'Sixth Form Drama'],
  ['sixth-form-preparing-for-life.html', 'sixth-form-preparing-for-life', 'sixth-form', 'Preparing for Life Beyond Bancroft’s'],

  // Shared whole-school pages — linked from Prep, Senior and Sixth Form menus alike (see
  // primaryNav in config.ts); each carries no single stage's active-nav-slug, so it doesn't
  // falsely highlight one stage's nav item over the other two when visited directly.
  ['pastoral-care-houses.html', 'pastoral-care-houses', '', 'Pastoral Care & Houses'],
  ['learning-support.html', 'learning-support', '', 'Learning Support'],
  ['results-destinations.html', 'results-destinations', '', 'Results & Destinations'],

  ['school-life.html', 'school-life', 'school-life', 'School Life'],
  ['school-life-community.html', 'school-life-community', 'school-life', 'Our Community'],
  ['foundation.html', 'foundation', 'school-life', 'Foundation'],
  ['old-bancroftians.html', 'old-bancroftians', 'school-life', 'Old Bancroftians'],
  ['term-dates.html', 'term-dates', 'school-life', 'Term Dates'],
  ['weekly-menu.html', 'weekly-menu', 'school-life', 'Weekly Menu'],
  ['getting-to-bancrofts.html', 'getting-to-bancrofts', 'school-life', 'Getting to Bancroft’s'],
  ['uniform.html', 'uniform', 'school-life', 'Uniform'],

  ['news.html', 'news', 'news', 'News'],
  ['news-article-a.html', 'news-article-a', 'news', 'Bancroft’s pupils celebrate outstanding GCSE results'],
  ['news-article-b.html', 'news-article-b', 'news', 'Bancroft’s Family of Schools welcomes two new Prep partners'],
  ['news-article-c.html', 'news-article-c', 'news', 'First XV named London Schools champions'],

  ['about.html', 'about', 'about', 'About'],
  ['about-welcome.html', 'about-welcome', 'about', 'Welcome from the Head'],
  ['about-what-we-stand-for.html', 'about-what-we-stand-for', 'about', 'What We Stand For'],
  ['about-awards-recognition.html', 'about-awards-recognition', 'about', 'Awards and Recognition'],
  ['about-history.html', 'about-history', 'about', 'Our History'],
  ['about-leadership-governance.html', 'about-leadership-governance', 'about', 'Leadership & Governance'],
  ['about-family-of-schools.html', 'about-family-of-schools', 'about', 'Our Family of Schools'],
  ['about-policies-procedures.html', 'about-policies-procedures', '', 'Policies and Procedures'],
  ['about-vacancies.html', 'about-vacancies', '', 'Vacancies'],

  ['contact.html', 'contact', '', 'Contact'],
  ['privacy-policy.html', 'privacy-policy', '', 'Privacy Policy'],

  // Quick links (header utility row) — each its own page of clear quick links, not in the menu.
  ['parents.html', 'parents', '', 'Parents'],
  ['pupils.html', 'pupils', '', 'Pupils'],
  ['staff.html', 'staff', '', 'Staff'],
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
