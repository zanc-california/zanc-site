# Cursor Prompt: ZANC Website Full Freshness Audit + Independence 2026 Readiness

You are working inside the codebase for the **Zambian Association in Northern California (ZANC)** website:

**https://www.zancsac.com**

Current date: **August 22, 2026**

Your job is to perform a thorough **site-wide freshness, accuracy, consistency, UX, and upcoming-events audit**, then implement appropriate updates.

Do not merely edit the homepage. Inspect the entire repository, all routes, components, content files, metadata, links, forms, structured data, and any hard-coded dates or statistics.

## Core Objective

Bring the website fully up to date for late August 2026 and prepare it to serve as the public information hub for the remainder of the year, especially the upcoming:

- September 27, 2026 Bay FC vs Orlando Pride community match
- October 24, 2026 Zambian Independence Celebration
- ongoing ZANC membership, insurance, community and engagement activities

The site should feel current, intentional and actively maintained.

---

# Phase 1: Audit Before Editing

First inspect the entire codebase and create an internal inventory of:

- all public routes/pages
- homepage sections
- events and event data
- announcements
- leadership/committee information
- insurance information
- membership information
- donation/fundraising language
- initiatives
- Southern California references
- contact details
- external links
- forms
- newsletter/subscription functionality
- statistics/counters
- SEO metadata
- social preview metadata
- footer information
- stale dates
- expired calls to action
- “coming soon” sections
- broken links or buttons
- duplicate or contradictory content
- placeholder content
- hard-coded information that should instead be data-driven

Search globally for:

- 2025
- 2026
- June
- July
- August
- September
- October
- enrollment
- election
- Independence
- insurance
- donate
- Southern California
- SoCal
- coming soon
- event
- ZANC leadership
- committee

Before making substantive changes, identify anything that appears stale, contradictory or unsupported.

---

# Phase 2: Freshness Rules

Apply these rules carefully.

## Past activities

Do not delete useful historical information merely because an event has passed.

Instead distinguish clearly between:

- upcoming
- current
- completed / past
- recurring annually

Past events should not appear as though they are still upcoming.

Where appropriate, move them into an archive, “past events,” or historical context.

## Insurance

The 2026 open enrollment period of **June 1 through July 31** has passed.

Do not continue presenting it as a current enrollment opportunity.

Preserve useful insurance information, but clearly mark the 2026 enrollment window as closed if that is how the site is currently structured.

Do not invent a new enrollment period.

## Elections

The February 2026 ZANC elections are complete.

They may remain as a community/history item, but they should not compete visually with genuinely upcoming activities unless there is a reason in the existing design.

## Current date awareness

The site should read naturally as a site being viewed in **late August 2026**.

---

# Phase 3: Independence 2026

Create or prepare a first-class public event presence for:

## Zambian Independence Day Celebration

**Date:** Saturday, October 24, 2026

**Venue:**  
Fairfield by Marriott Inn & Suites Sacramento Airport Woodland  
2100 Freeway Drive  
Woodland, CA 95776

The current confirmed event direction is:

- One flagship Saturday celebration
- Formal + cultural + networking/social character
- Additional details to be announced
- Attendance from Northern California, Southern California and out-of-town guests is encouraged
- Hotel accommodation is available at the host hotel

Do NOT invent:

- ticket prices
- event start/end times
- performers
- DJs
- menu
- theme
- dress-code requirements
- prize program
- speakers
- sponsors beyond those explicitly supplied
- Friday or Sunday official programming

Use wording such as “More details coming soon” where information is not yet confirmed.

---

# Phase 4: Hotel Booking Information

A dedicated Marriott group booking link is now available for Independence attendees.

**Hotel:**  
Fairfield by Marriott Inn & Suites Sacramento Airport Woodland

**Group rate currently displayed:** $99 USD/night

**Booking deadline shown by Marriott:** October 22, 2026

**Booking link:**

https://app.marriott.com/resview2?id=1787092104701&key=GRP&app=resvlink%7Chttps://app.marriott.com/resview2?id=1787092104701&key=GRP&app=resvlink%7Csmart-link

Add this as supporting information on the Independence event page/card.

Do NOT imply that Friday night is included in the group rate unless the booking interface/data explicitly confirms that.

Where appropriate say:

“Special ZANC Independence group rate available through the host hotel.”

Do not call it a “package” unless actual package benefits exist.

---

# Phase 5: Homepage Priority

Review homepage information architecture.

The homepage should prioritize what is most relevant as of August 22, 2026.

Likely hierarchy:

1. ZANC identity / join CTA
2. Upcoming Independence Celebration
3. September 27 Bay FC community match
4. Current community participation opportunities
5. Membership / insurance / initiatives
6. completed or historical items

Do not blindly follow this hierarchy if the existing architecture suggests a better solution, but Independence should now have meaningful homepage visibility.

Consider whether the current “Community Highlights” and “What’s Happening” sections duplicate each other.

Simplify if appropriate.

---

# Phase 6: Event System

Inspect how events are currently modeled.

If events are manually duplicated across multiple components/pages, refactor toward a single source of truth where reasonably safe.

Each event should support fields such as:

- title
- date
- status
- location
- short description
- full description
- image
- CTA
- external URL
- category
- featured
- optional accommodation information

Do not over-engineer a CMS if the existing site does not need one.

The goal is to make future updates easier for a volunteer-run community organization.

---

# Phase 7: Community Participation / Independence Workstreams

Prepare the Independence page so future updates can easily add:

- cooking team
- décor team
- volunteers
- DJ/music requests
- entertainment
- sponsors
- ticketing
- program
- hotel/travel information

Currently confirmed community planning direction:

### Cooking
ZANC is first inviting members of the community who are interested in joining the Independence cooking team before deciding whether outside catering is necessary.

Members taking defined major cooking responsibilities may be compensated.

### Décor
Community members interested in taking defined décor responsibilities are also being sought, with compensation contemplated for assigned work.

Do not portray these as unpaid volunteer obligations.

### Music
Community members have expressed interest in submitting DJ/music requests.

A formal collection mechanism has not yet been defined.

If no suitable UI exists yet, simply make the event architecture capable of adding these later rather than inventing a form.

---

# Phase 8: Southern California Language

Review all Southern California language carefully.

Current reality:

- ZANC remains the Zambian Association in Northern California.
- There are active/informal Zambian networks in Southern California.
- ZANC is intentionally strengthening relationships with those communities.
- Southern California members are especially encouraged to attend Independence.
- Do not imply that ZANC formally governs or represents every Southern California Zambian organization.
- Do not imply that a formal statewide structure has been adopted unless the existing content supports it.

The current homepage language may overstate how formal the Southern California relationship is.

Where necessary, soften wording toward:

“strengthening connections with Zambians in Southern California”

rather than presenting a completed organizational structure.

---

# Phase 9: Donations / Nonprofit Language

Audit all donation and tax-deductibility wording very carefully.

ZANC's nonprofit/tax status should NOT be inferred by the website.

Do not state that donations are tax deductible unless the repository contains authoritative current documentation supporting that claim.

If the current site contains language suggesting tax-deductible status without adequate basis, flag it and revise conservatively.

Do not remove a functioning donation mechanism solely because of this instruction; distinguish payment functionality from tax-characterization claims.

---

# Phase 10: Leadership and Organizational Accuracy

Audit leadership names/titles against the most recent content already present in the repository.

Do not invent or infer officers.

If multiple conflicting leadership rosters exist, flag the discrepancy rather than choosing one without evidence.

Ensure “President,” “Vice President,” “Treasurer,” etc. are consistent site-wide.

---

# Phase 11: Stats and Claims

Audit numerical claims such as:

- member counts
- insured member counts
- states reached
- annual events
- founding year

For example, the homepage currently contains figures such as “68+ insured members,” “7 states reached,” and “4+ annual events.”

Determine where those values originate.

If they are hard-coded with no clear source or have likely become stale:

- centralize them where possible
- make them easy to update
- or replace overly precise unsupported claims with durable wording

Do not invent replacement numbers.

---

# Phase 12: UX / Technical QA

Review:

- mobile responsiveness
- event cards
- navigation
- buttons
- CTA destinations
- image alt text
- semantic headings
- accessibility
- loading states
- empty states
- broken external links
- console errors
- TypeScript errors
- hydration issues
- SEO titles/descriptions
- Open Graph cards
- sitemap
- robots configuration
- canonical URLs
- structured event data if already supported

Run the existing test/lint/build commands.

Do not make unrelated architecture changes.

---

# Phase 13: Independence SEO / Sharing

Ensure the new Independence event has strong metadata suitable for WhatsApp, Facebook, Google and other sharing.

Suggested concepts:

**Title:**  
Zambian Independence Celebration 2026 | ZANC

**Description:**  
Join the Zambian community in Northern California on Saturday, October 24, 2026 in Woodland, California for ZANC’s Independence Celebration.

If the supplied Save the Date image already exists in the repository or can be appropriately added through the existing asset workflow, use it as the event/social preview image.

Do not fabricate asset paths.

---

# Phase 14: Deliverables

At completion, provide:

## A. Audit Findings
A concise list of:

- stale items found
- contradictions found
- expired information
- broken links
- questionable claims
- UX/content issues

## B. Changes Made
List each substantive update by route/component/file.

## C. Items Requiring Human Confirmation
Do not guess.

Examples may include:

- Friday hotel group-rate availability
- final ticket pricing
- event time
- DJ
- menu
- final décor plan
- sponsorship recognition
- exact nonprofit/tax wording
- current membership counts

## D. Remaining Independence Content Queue
Create a small checklist of what information should be added as planning progresses.

## E. Verification
Report:

- build result
- lint result
- tests
- routes checked
- links checked

---

# Important Guardrails

This website represents a real community organization.

Do not:

- manufacture events
- manufacture partnerships
- invent committee decisions
- infer legal/tax status
- invent donation deductibility
- invent sponsors
- announce tentative ideas as confirmed
- delete history merely because it is old
- rewrite culturally specific language unnecessarily
- substantially redesign the visual brand unless required to fix usability

Favor **accuracy, freshness, clarity and maintainability** over novelty.

Before completing, review the live experience mentally from the perspective of:

1. a Zambian family in Sacramento,
2. a Southern California guest considering traveling for Independence,
3. a prospective member,
4. an institutional/community partner,
5. a person visiting ZANC for the first time.

The final site should make it immediately obvious that ZANC is active, that Independence 2026 is approaching, and how someone can participate.