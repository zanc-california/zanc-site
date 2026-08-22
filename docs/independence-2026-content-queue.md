# Independence 2026 — content queue

Running checklist of what still needs to be added to the site as planning progresses.

**Event:** Zambian Independence Celebration — Saturday, October 24, 2026
**Venue:** Fairfield by Marriott Inn & Suites Sacramento Airport Woodland, 2100 Freeway Drive, Woodland, CA 95776
**Page:** `/independence` — [frontend/src/pages/Independence.tsx](../frontend/src/pages/Independence.tsx)
**Data:** the `independence-2026` entry in [frontend/src/data/communityCalendar2026.ts](../frontend/src/data/communityCalendar2026.ts)

Almost everything below is edited in the **data file**, not the page. Update the event object and the
home page banner, the Events & News flagship card, the calendar modal and the page all follow.

---

## Published and confirmed

- [x] Date — Saturday, October 24, 2026
- [x] Venue name and street address
- [x] Host hotel group rate ($99 USD/night) and booking deadline (October 22, 2026)
- [x] Marriott group booking link
- [x] Cooking team invitation (compensation contemplated for defined major responsibilities)
- [x] Décor team invitation (compensation contemplated for assigned work)
- [x] Event schema.org structured data, page title, description and social preview text

## Waiting on a decision — currently shown as "More details coming soon"

- [ ] **Start and end times.** Add to the `Character`/`Date` cards and to `startDate` in the JSON-LD
      on the Independence page once set.
- [ ] **Ticket pricing and how to buy.** Replace `feeNote: 'Ticketing TBA'` and add a CTA. If tickets
      are sold externally, use `externalUrl` + `externalLinkLabel` on the event.
- [ ] **Programme / run of show.** Speeches, cultural performances, dinner, awards — add as a new
      section on the page once the committee signs it off.
- [ ] **Dress code / theme**, if there is one.
- [ ] **Catering decision.** The page currently says the cooking team is being assembled *before*
      deciding whether outside catering is needed. Update the cooking workstream once that is settled.
- [ ] **Music / DJ.** A request-collection mechanism has not been agreed. The workstream card is
      deliberately CTA-less until it is — add `ctaLabel` + `ctaHref` when a method exists.
- [ ] **Volunteer roles** for the day. Split out of the combined "Volunteering, entertainment and
      sponsorship" workstream once roles are defined.
- [ ] **Sponsors and sponsorship tiers.** Do not list a sponsor before it is agreed in writing.
- [ ] **Entertainment / performers.**

## Assets needed

- [ ] **Save the Date / event artwork — BLOCKING, one-line fix.** The image slot is built and the
      page + social preview are already wired to it; it renders nothing because no such file exists
      in the repo. To activate:
      1. Save the WhatsApp flyer to `frontend/public/images/postings/independence-2026-save-the-date.png`
      2. Uncomment the `imageUrl` line on the `independence-2026` event in `communityCalendar2026.ts`

      That single line makes the graphic appear near the top of `/independence` **and** become the
      Open Graph preview image for every WhatsApp/Facebook share of the link. Ideal dimensions for
      the social preview are 1200×630; a taller flyer still displays fine on the page itself.
- [ ] Photos after the event, for the past-event recap (see the Mother's Day entry for the pattern:
      `imageUrl` + `galleryImages` + optional `videoUrl`).

## To verify with the hotel

- [ ] **Which nights the group rate covers.** The site deliberately does not claim Friday night is
      included. Confirm in the Marriott booking interface, then add it to `accommodation.note` if it is.
- [ ] Whether the group block has a room cap worth mentioning.

## After the event

Nothing to delete. Set `type: 'past'` on the event, or simply leave it — `endsAt` is set to
2026-10-25T00:00:00-07:00, so it moves itself into "Past highlights" with a **Held** badge the day
after. Then swap the description to past tense and add photos.
