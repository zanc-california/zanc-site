# Independence 2026 — content queue

## October 26 — local post-event candidate

The Independence page now serves as a celebration recap, with a six-photo introduction
and a 14-photo album at `/gallery?album=independence-2026`. Home, News and the calendar
point to the recap. Expired reservation, hotel-rate and volunteer-recruitment prompts
are removed from these current surfaces; the original press release is preserved.

Preliminary attribution: **Photography by Nirav Solanki**, linked to
https://niravsolanki.com/. Credit appears on the recap, homepage and each selected
gallery image. The photographer's full shareable gallery link is still awaited;
no token-based gallery URL is included in the public application.

Selected source image numbers: 178, 006, 002, 046, 062, 068, 123, 137, 155, 166,
173, 184, 202 and 244. WebP derivatives use 640px and 1600px widths; original
downloads are preserved outside the public build. Captions describe the scenes
without assigning unconfirmed identities to people in the photographs.

October 26 cleanup removes empty business and marketplace features, unfinished LA
page promotion, blank news-image fillers and empty opportunity-loading cards.
Earlier calendar listings are compact and no longer solicit reservations. Current
museum wording and the original press release's link to the recap are refreshed.
The community board stops waiting after eight seconds and offers email when its
listing request is unavailable; empty title/description entries do not become cards.

The owner authorized publication on October 26. Build, TypeScript, affected-file
lint and calendar checks pass. The local browser sweep checks 14 public pages,
six downloadable assets, desktop/mobile layouts and gallery interactions. Production
release status is verified separately after publishing. No final attendance count,
financial outcome or future municipal agreement is reported in the public recap.

## Historical pre-event release — October 16

The following records the organizer confirmations and revised publicity used then.

## Confirmed content in this release

- Woodland celebration: Saturday, October 24, 2026; doors 5:30 PM, program 6:00 PM.
- Fairfield by Marriott Inn & Suites Sacramento Airport Woodland, 2100 Freeway Drive, Woodland, CA 95776.
- Adults 18+ $55; ages 10–17 $25; under 10 free. Reserve for every attendee; hall capacity is 160, not a live count of seats available.
- Reservation URL: https://www.eventbrite.com/e/zambias-62nd-independence-celebration-registration-2002341560509
- Jean Nangwala and Dj LittyRocket confirmed. Joseph Prouse's availability is uncertain; he is no longer advertised in current site copy or artwork. Full program times remain pending.
- Organizer-confirmed highlights include a robotics conversation, a vegetarian dish prepared by a robotic kitchen as part of the buffet, and Zambian cultural history and fun facts. No on-site robot demonstration is announced.
- Confirmed Woodland guests: Rajen Ranchhod, Honorary Consul of Zambia; Catherine Bonnefoy, Honorary Consul of France in Sacramento; Ognian Gavrilov, Honorary Consul of Bulgaria in Sacramento; John Shea, President and CEO of the World Trade Center Northern California; Eduardo Madrid Moreno, District Director in the Office of Sacramento Vice Mayor Karina Talamantes. Attendance does not establish a speaking slot or organizational sponsorship.
- The October 16 community flyer replaces Joseph's portrait with Ognian Gavrilov, Honorary Consul of Bulgaria. A new robotics and cultural heritage spotlight replaces Joseph's standalone flyer beside Jean and the DJ. Superseded public artwork is removed from the current build; originals are preserved locally and in Git history.
- American Hospitality Services sponsor; additional area-business and volunteer inquiries welcomed through ZANC.
- Family, guest and artist flyers available to view and download. The approved flyers include Zelle details; website copy directs visitors through the completed reservation link without requiring a separate payment step.
- San Francisco City Hall flag raising: Friday, October 23, 2026, 11:30 AM. Updated countdown, calendar, event listing, page and flyer.
- Hotel group rate remains $99/night, with October 22 booking deadline. This deadline is separate from the flag-raising date.
- September 28 Sacramento visit recap and original group photo: introductory discussion with Vice Mayor Karina Talamantes’ office. Sacramento–Lusaka cooperation and a possible 2027 forum remain proposals. Eduardo's attendance is confirmed; Vice Mayor Talamantes is unavailable.

## Editing locations

- `frontend/src/data/communityCalendar2026.ts`: event data, countdown, calendar, reservation URL, guest flyers and workstreams.
- `frontend/src/pages/Independence.tsx`: event page and structured data.
- `frontend/src/pages/Home.tsx`: event promotion and visit recap preview.
- `frontend/src/pages/News.tsx`: site-authored visit article.
- `frontend/public/images/postings/`: public, approved artwork and visit photograph.

Raw correspondence, trackers and private coordination remain outside the public build.

## Still to confirm

- Detailed running order, performance and speaking times, and any end-time revision.
- Music-request collection method, volunteer assignments, final menu and dress guidance.
- Additional sponsors and any agreed benefits; do not announce an interested party as a sponsor.
- Hotel group-rate eligible nights and any room-block limit.
- Civic guests who accept invitations; do not list invitees as confirmed attendees.
- After-event photographs and recap.

## Artwork provenance

The flag-raising flyer uses the existing artwork with its bottom banner corrected to “FRIDAY, OCTOBER 23, 2026” and “11:30 AM • SAN FRANCISCO CITY HALL”. The original is preserved. All other flyers were copied from the organizer-approved versions; no new guest or sponsor claims were added.

October 14 community flyer: AI-assisted composition using organizer-supplied photos and public profile portraits, with disclosure in the artwork and caption. Its original remains in the local output folder. Separate website guest cards use the original source images. Portrait/title sources: [John Shea / WTC](https://www.norcalwtc.org/about-us/our-team/), [Catherine Bonnefoy / Alliance Française](https://www.afsacramento.org/about-us/consul-sacramento-catherine-bonnefoy/), [Eduardo / District 3](https://www.karinatalamantes.org/district-3-team), [Ognian Gavrilov / professional profile](https://gavrilovlaw.com/people/ognian-gavrilov/), and [Bulgarian Ministry of Foreign Affairs title listing](https://www.mfa.bg/en/embassies/usa/1829). Rajen's photo is an existing project asset. Attendance confirmations are organizer-supplied. The homepage links to the updated guest section; existing reservations and family flyer remain available.
