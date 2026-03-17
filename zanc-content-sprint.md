# ZANC Site — Content Sprint for Cursor

Pull the right thematic updates from ZANC's 2026 Secretary's Report and Treasurer's Financial Report into the appropriate site pages. Keep it high-level and community-facing — no internal financials or granular operational details on the public site.

---

## 1. ABOUT PAGE — Leadership Section

Replace the current leadership section with the actual elected committee and board. Elections were held February 10, 2024 (2-year term).

### Committee
| Role | Name |
|------|------|
| President | Mabvuto Kaela |
| Vice President | Kasamba Sikapizye |
| Secretary | Beene Naulapwa |
| Vice Secretary | Lusayo Munde |
| Treasurer | Atupele Munde Mazala |

### Board Members
- Terry Chisenga
- Catherine Samoyu
- Gladys Musamba-Desmarais
- Chibwe Chungu

Remove "John Doe" and any other placeholder names. Use these real names.

---

## 2. ABOUT PAGE — History / Community Section

Add or update the "Our History" or general About content with these high-level facts:

- Founded in 1995 (already on the site — keep it)
- Community spans California, Arizona, Nevada, Illinois, Indiana, New York, and Connecticut
- Active membership includes families across multiple states
- ZANC is a registered fraternal society with the California Franchise Tax Board
- PO Box is active for official correspondence
- Wells Fargo is the banking partner

Do NOT include specific dollar amounts, bank balances, or financial details on the public site.

---

## 3. MEMBERSHIP PAGE — Pricing & Details

Display actual pricing on the membership page. Currently there are NO prices shown.

### Membership Rates
- **Sacramento / Bay Area residents**: $10/month
- **Out of town / Out of state members**: $5/month
- Billing options: Monthly or Yearly (toggle already exists)

Update the Stripe payment buttons to show the price:
- Monthly Sacramento: "$10/month — Join ZANC"
- Yearly Sacramento: "$120/year — Join ZANC" (or whatever the yearly amount is)
- Monthly Out-of-State: "$5/month — Join ZANC"
- Yearly Out-of-State: "$60/year — Join ZANC"

Add a note: "Membership subscription is mandatory for all Group Insurance subscribers. We highly encourage all community members to subscribe to help cover community needs and sponsor events."

---

## 4. INSURANCE PAGE — Details & Pricing

Update the insurance page with accurate program details:

### Group Life Insurance — Hartford
- **Provider**: Hartford Insurance
- **Program type**: Cultural Group Life Insurance
- **Current membership**: 68 insured members (51 adults, 17 children)
- **Coverage area**: Members from CA, AZ, NV, IL, IN, NY, CT
- **Open enrollment**: Once a year, June through July 31st
- **Premium collection**: Bi-annually (February and August)

Add a visible note/banner: **"Open Enrollment: June 1 – July 31 each year. Contact ZANC to enroll."**

Display the actual rates for each insurance category next to the Stripe payment buttons. The categories already exist on the page:
- Adult Only (18-64) In-State
- Adult w/ Dependents (18-64) In-State
- Adult Only (18-64) Out-of-State
- Adult w/ Dependents (18-64) Out-of-State
- Ages 65–70
- Ages 70 and above

(Pull the specific dollar amounts from the Stripe products — they are already configured there. Display them on the page so users see the price before clicking "Pay with Stripe".)

---

## 5. HOME PAGE — Featured Content (replace empty "Latest Updates")

The "Latest Updates" section is currently empty. Replace it with a static "Community Highlights" section until the news/admin CMS is populated. Use these real events:

### Community Highlights

**Zambia 61st Independence Celebration (October 2025)**
Three-day celebration with 131 attendees. Featured a Meet & Greet, Picnic & Wine Tasting in Sonoma, Independence Gala with DJ Flokid, and Farewell Breakfast. A weekend of unity and cultural pride.

**Zambia–CA Investment Innovation Roadshow (2025)**
ZANC co-hosted a gala connecting the Zambian diaspora with investment opportunities in Zambia. Featured speakers from the Zambian Embassy and business community.

**Ambassador Event — His Excellency Chibamba Kanyama**
ZANC hosted the Zambian Ambassador to the United States along with Embassy officers. Community members engaged on immigration, investment, and business opportunities in Zambia. Sponsored by American Hospitality Services.

**Bay FC Match & Tailgate (September 2024)**
ZANC organized a community tailgate at PayPal Park Stadium for the Bay FC vs Orlando Pride match, followed by an after-party featuring performances by Kundananji and Barbra.

Keep descriptions to 2-3 sentences each. Add a subtle "View All Events" or "View News" link that goes to /news.

---

## 6. HOME PAGE — Quick Stats Banner

Add a simple stats bar somewhere on the homepage (below the hero or above the footer CTA) to give social proof:

- **Founded**: 1995
- **Members**: 68+ insured members across 7 states
- **Events**: 4+ major community events per year

Keep it clean — a single row of 3 stat cards with the number prominent and a short label below.

---

## 7. FORMS PAGE — Submission Instructions

The forms page has two downloadable PDFs but no instructions on what to do with them. Add:

"Download, complete, and return your application to ZANC via email at [zanc email] or mail to our PO Box address. For questions, contact the ZANC Secretary."

(Fill in the actual email and PO Box from the site's existing contact info.)

---

## 8. FOOTER — Ensure Accuracy

Verify the footer contact information matches:
- PO Box address (active)
- Contact email
- Social media links (Facebook, LinkedIn — already present)

---

## What NOT to Put on the Public Site

- Bank balances or specific financial figures
- Income statements or expense breakdowns (those stay in the Treasurer's report)
- Internal committee decisions or resignation details
- Funeral fund specifics (Kaliso Mwanza) — this is a private community matter
- Reimbursement disputes with the Embassy/ZDA
- Individual member names (beyond leadership)

---

## Implementation Notes

- All the above is STATIC CONTENT — hardcode it into the React components for now
- When the admin CMS is working (news + gallery tables in Supabase), the "Community Highlights" section can be migrated to dynamic news posts managed by the admin
- The leadership section can eventually become a Supabase table too, but for now static is fine
- Push to main when done — Vercel auto-deploys
