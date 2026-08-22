# ZANC site — freshness audit and update, August 2026

Carried out against the brief in `Cursor Prompt_ ZANC Website Full Freshness Audit + Independence 2026 Readiness.md`.
Reference date: **22 August 2026**. The site had last been touched on 4 July 2026.

---

## A. Audit findings

### Stale or expired

| Item | Where | State found |
|---|---|---|
| Independence 2026 | calendar data, home, events | Flagship event listed as "Date, venue, sponsorship, and ticketing TBA" with no homepage presence, despite date and venue being confirmed |
| Denim & White Day Party (Jul 4) | calendar data | **Disappeared from the site entirely** — its countdown had passed so it was filtered out of Upcoming, but it was authored `type: 'upcoming'` so it never appeared in Past either |
| ROOTS & RISE gala | events page | Still the featured "2026 signature anchor" with no date, pencilled in for August, which had all but passed |
| Summer Picnic | calendar data | "Aiming for July 4 weekend when confirmed" — that weekend had gone |
| Golf Outing | calendar modal | Filed under "June", still TBA |
| Insurance open enrolment | home, events article | Jun 1 – Jul 31 window presented as current, three weeks after it closed |
| Elections 2026 (February) | home highlights | Occupied one of three homepage highlight slots, competing with genuinely upcoming activity |
| Membership pricing | membership page | "April promo only — the $80/year rate applies when you join during the month of April" |
| Calendar modal | calendar data | Month-by-month layout that read as if the year had not started |

### Contradictions

- Rev. Stephen Mubanga was **"LA Community Coordinator"** on About but **"Los Angeles (SoCal) area representative"** in the News article.
- "68+ insured members" (home stat band), "Join 68+ members" (home CTA), and "68 insured members (51 adults and 17 children)" (insurance page) were three independent hard-coded copies of one figure — and the CTA conflated *insured* members with *total* membership.
- Homepage "Community Highlights" and "What's Happening in the Community" were two adjacent sections doing substantially the same job.

### Broken or non-functional

- **`/donate` was a mockup shipped to production.** All three CTAs fired `alert("This would redirect to a payment processing page in a real implementation.")`. It is linked from the footer of every page.
- The Denim & White party's ticket link (`eventbrite.com/e/denim-and-white-day-party`) was a placeholder slug that never resolved to a listing.
- Favicon pointed at `/vite.svg`, which does not exist in `public/` — a 404 on every page load.
- `/initiatives` was a footer-linked one-paragraph stub with a code comment where the content should be.
- Two empty screen-reader-only links (`<a href="/membership"><span class="sr-only">Join ZANC</span></a>`) on About.
- About used raw `<a href>` for internal navigation, forcing full page reloads out of the SPA.

### Questionable claims

- `/donate` described an **educational scholarship programme**, **"our offices"**, and **healthcare projects in Zambia** — none of which are supported anywhere else in the repository.
- "4+ annual events" had no traceable source.
- Homepage gave Southern California a 50/50 section equal in weight to NorCal — "one extended ZANC family", "two home bases" — which overstated a relationship the brief describes as still being built.
- **No tax-deductibility claim was found anywhere**, which is correct and was left that way. About's statement that ZANC "is registered as a fraternal society with the California Franchise Tax Board" is a registration statement, not a deductibility claim, and was left as written.
- Leadership roster was internally consistent (elected 2026–2028 committee + six appointed invitees). No conflicting roster was found.

### SEO / sharing — the largest technical gap

For a community that shares links over WhatsApp, `index.html` had **no meta description, no Open Graph tags, no Twitter card, and no canonical URL**. There was no `robots.txt`, no `sitemap.xml`, and no per-route title handling of any kind — all 15 routes shared one title. A link unfurler saw the organisation name and nothing else.

### Dead code

~4,000 lines unreachable from the app: the whole application-form branch (`ApplicationFlow` → `ServiceSelection` + `InsuranceForm` + `MembershipApplicationForm`), `pages/AdminDashboard.tsx` (superseded by `admin/AdminDashboard`), `SignIn`/`SignUp`/`Success`/`SuccessPage`/`Cancel`/`CancelPage`/`Forms`, `supabaseClient.ts`, `AuthContext`, `utils/performance.ts`.

One was a genuine liability: **`pages/NewsDetail.tsx` contained fully fabricated 2025 content** — a gala at the "Grand California Hotel", scholarship application deadlines, a board installation ceremony, and a board member who appears nowhere else. Unrouted, but one import away from being public.

---

## B. Changes made

### Event system — single source of truth

**`src/data/communityCalendar2026.ts`**
- Added `endsAt`, `detailPath`, `venueName`, `venueAddress`, `accommodation`, and `workstreams` to `CommunityEvent`, plus `EventAccommodation` and `EventWorkstream` types.
- Added `getEventStatus()`, `hasConcluded()` and `getPastEvents()`. **Dated events now age from Upcoming into Past on their own instead of vanishing**, and render with a "Held" badge.
- Replaced `getLandingSpotlightEvent()` with `getNextUpcomingEvent()`, which excludes events that already have their own homepage banner so nothing is shown twice. Removed the now-unused `homeSpotlight` flag.
- Added `getIndependenceEvent()` so no caller re-declares the event's details.
- Populated Independence with the confirmed date, venue, address, hotel block and four planning workstreams; made it the `featured` event and added it to `COUNTDOWN_MILESTONES` so the countdown survives past 27 September.
- Removed the placeholder Eventbrite link and the "· Eventbrite" fee note from the Denim & White party.
- Removed the stale July 4 aim from the Summer Picnic; removed `featured` from ROOTS & RISE with an inline note asking for a decision.
- Rewrote the calendar modal around "Earlier this year (held) / September / October (flagship) / November / December / Still to be scheduled".

**`src/data/insuranceProgram.ts`** *(new)* — `getEnrollmentStatus()` plus window and premium-date labels, so the home page, events page and insurance page cannot disagree about whether enrolment is open. The status line now reads "2026 open enrolment is closed. The next open enrolment window is June 1 – July 31, 2027."

**`src/data/siteStats.ts`** *(new)* — every public numeric claim in one place, each with its source and a `lastConfirmed` date. "States reached" is now *derived* from `MEMBER_STATES` rather than hard-coded, so it cannot drift from the list on About and Insurance.

### Independence 2026

- **`src/pages/Independence.tsx`** *(new)*, routed at `/independence`: hero with date and venue; an at-a-glance row; an explicit "still being finalised" note covering times, programme, performers, catering, dress code and pricing; a hotel block with the group rate, booking deadline and Marriott link; a travel note welcoming SoCal and out-of-town guests; and four community workstream cards. Cooking and décor carry mailto CTAs and state that defined responsibilities may be compensated. Music and the volunteering/sponsorship bundle deliberately carry **no CTA** — a collection mechanism has not been agreed, and the brief said not to invent one.
- Added to the navbar and footer, linked from the homepage banner, the events flagship card and the donate page.
- Ships schema.org `Event` structured data with a **date-only** `startDate`, since no start time is confirmed.

### Homepage

- Independence banner placed directly after the hero, with venue, group rate, booking deadline and a route into the workstreams.
- **Merged the two duplicated sections.** "Community Highlights" (elections, expired enrolment, a generic year-round card) is gone; "What's Happening" absorbed the calendar CTA and now leads with a data-driven "Next up" card — currently Bay FC on 27 September.
- Stats band now reads from `HOME_STATS`. "4+ annual events" became "Year-round / Community events"; the "Join 68+ members" CTA no longer passes an insurance figure off as a membership count.
- SoCal section softened to "Connecting with SoCal" and "strengthening connections with Zambians in Southern California", naming the SoCal representative and inviting SoCal members to Independence, without implying a formal statewide structure.

### Donate

Rebuilt around mechanisms that actually work: Zelle and Venmo (the same rails as membership and insurance), a sponsorship enquiry route, in-kind giving, and volunteering. Removed the placeholder `alert()` CTAs, the scholarship programme, "our offices" and the Zambia project claims. **No tax characterisation of contributions was added**, and a file comment records that none should be added without authoritative documentation.

### SEO and sharing

- `src/hooks/useDocumentMeta.ts` and `src/lib/siteMeta.ts` *(new)* — per-route title, description, canonical, Open Graph, Twitter card and JSON-LD, with no new dependency. Applied to all 13 public routes.
- `index.html` — description, canonical, full OG/Twitter set, theme colour, and `Organization` JSON-LD.
- `public/robots.txt`, `public/sitemap.xml` (13 public routes, admin excluded), `public/favicon.svg` *(new)*.

### Other

- **Initiatives** rebuilt into four pillars that each link to something that genuinely exists, plus a partnerships note — no longer a dead-end.
- **Membership** — April promo removed; "Card checkout is not available right now" now points at the Zelle/Venmo options directly below.
- **About** — Rev. Mubanga's title aligned with the News article; founding year and state list read from `siteStats`; two empty sr-only links removed; internal `<a href>` navigation converted to router `<Link>`.
- Metadata added to Contact, Get Involved, Gallery, Community and Privacy Policy; unused `React` imports removed from the files touched.
- `tsconfig.app.json` raised to ES2021 so `String.prototype.replaceAll` in `sanitizeRichText.ts` type-checks.
- **Deleted `src/pages/NewsDetail.tsx`** — unrouted, and the only file containing fabricated content.

---

## C. Items requiring human confirmation

1. **Which nights the hotel group rate covers.** The site does not claim Friday night is included. Confirm in the Marriott booking interface before adding it.
2. **Independence start and end times** — currently "more details coming soon".
3. **Ticket pricing and sales channel.**
4. **Catering** — whether the community cooking team removes the need for outside catering.
5. **Music/DJ request collection** — no mechanism defined, so no UI was built.
6. **ROOTS & RISE gala** — pencilled in for August, never dated. Still on for 2026, moving to 2027, or retire the listing?
7. **Golf Outing and Summer Picnic** — both still TBA with the season effectively over.
8. **Insured member count (68 / 51 adults / 17 children)** — last evidenced April 2026. Confirm or update `INSURED_MEMBERS` in `siteStats.ts`.
9. **Annual membership rate.** The $80/year figure was tied to an April promotion; the card now says to email for the current annual rate. Supply the standing rate if there is one.
10. **Stripe.** `STRIPE_PAYMENT_LINKS_ENABLED = false` in `src/lib/stripe.ts` disables every card payment path site-wide. Joining and paying is Zelle/Venmo/PDF only. Was this intended to stay off?
11. **Board portraits.** Vice President Beene Naulapwa renders `/images/members/secretary.jpg`, while unused generic `president.jpg`, `vice-president.jpg` and `treasurer.jpg` sit in the same folder — likely mismatched.
12. **Nonprofit / tax wording.** No deductibility claim exists and none was added. If ZANC does hold a status that permits one, it needs documenting before it goes on the site.

---

## D. Remaining Independence content queue

See [independence-2026-content-queue.md](./independence-2026-content-queue.md).

---

## E. Verification

| Check | Result |
|---|---|
| `npm run build` | Pass — 3.6s, 548 kB JS / 151 kB gzipped |
| `npm run lint` | Pass — 0 errors, 1 pre-existing `react-refresh` warning in `AuthContext.tsx` |
| `tsc --noEmit` | **10 errors → 2**, both in unreachable dead files left untouched (`ApplicationFlow.tsx`, `pages/AdminDashboard.tsx`). Note `npm run build` is bare `vite build` and does not type-check, so these never blocked deploys. |
| Tests | None exist in the project |
| Routes checked (200, rendered) | `/`, `/independence`, `/news`, `/about`, `/membership`, `/insurance`, `/community`, `/gallery`, `/get-involved`, `/initiatives`, `/donate`, `/contact`, `/privacy-policy` |
| Assets checked (200, correct MIME) | `robots.txt`, `sitemap.xml`, `favicon.svg`, both form PDFs, `images/logo.jpg` |
| Console errors | None on `/`, `/independence`, `/news`, `/donate` |
| Mobile (375 px) | 0 px horizontal overflow on `/`, `/independence`, `/news`, `/donate` |
| Accessibility (Independence) | One `h1`, ordered heading hierarchy, every `img` has `alt`, no empty links, all external links carry `rel="noopener noreferrer"` |
| Metadata | Verified live in-browser — per-route title, description, canonical, OG and Twitter tags update on client-side navigation; `Event` JSON-LD validates as well-formed |
| External links | Marriott group link returns 307 into Marriott's own deep-link handler (alive). Its final booking page needs a real browser session to confirm — see item C1. |

### Not done, deliberately

- **~3,800 lines of dead code left in place.** The brief said not to make unrelated architecture changes, and the largest block (`InsuranceForm`, `MembershipApplicationForm`, `ApplicationFlow` — ~2,200 lines) looks like substantial unfinished work someone may intend to revive. Only the file containing fabricated content was removed. Worth a separate decision.
- **The duplicate asset tree at the repository root (`public/`)** was left alone. Vercel's root directory is `frontend/`, so it is never deployed; it is tracked in git and deleting it is a call for the maintainer. It does contain one asset the deployed tree lacks — `independence-2025.JPG`.
- **Code splitting.** The single 548 kB bundle exceeds Vite's warning threshold. Out of scope here.
