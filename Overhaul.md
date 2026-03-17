Here's the full design overhaul spec — "Copper & Redwood" — fusing Zambian heritage with NorCal pride.

The Core Idea
The site currently reads as a basic community page. The overhaul makes it feel like a modern, thriving Bay Area organization with deep Zambian roots. The color palette blends Zambian copper and forest green with NorCal's golden hills, bay water blue, and morning fog tones.

What Changes
Color: Mono-green becomes a rich palette — Zambian green for authority, copper for accent/warmth, fog-white backgrounds, bay-blue for links. Copper replaces green as the accent color on stats, hover states, and CTAs.

Typography: System fonts out, "General Sans" + "Satoshi" from Fontshare in — modern, distinctive, professional.

Nav: Sticky on scroll, mobile hamburger menu, renamed pages ("Events & News", "Join ZANC", "Community"), admin link hidden from public, social icons moved to footer only.

Hero: Full-width background image with dark overlay gradient, bold headline "Zambian Heritage. Bay Area Community." — two copper + white CTAs.

New page — /community: Three sections:

Suggestion Box — "Have a suggestion for the community?" form that writes to Supabase

Opportunities Board — admin-posted jobs, scholarships, housing listings

Community Exchange — teaser for future member marketplace (coming soon card)

NorCal Pride section on the home page calling out Bay Area, Sacramento, Wine Country, Silicon Valley + 7-state reach.

Interactive elements: Scroll-reveal animations, count-up stats, hover card lifts, skeleton loading states, back-to-top button.

Forms page eliminated — downloads moved into their respective pages (membership form on Join page, insurance form on Insurance page).

Implementation
4 phases in the spec: Foundation (fonts, colors, nav, hero) → Page Redesigns → Community Features → Polish. Paste the whole file into Cursor and let it run through the phases.

The spec includes Supabase SQL for two new tables (suggestions and opportunities) with RLS policies, the complete Tailwind config extension, Fontshare CDN link, and detailed wireframes for every section.

zanc-design-overhaul
ZANC Site — Award-Winning Design Overhaul Sprint
Design Vision
ZANC sits at the intersection of two powerful identities: Zambian heritage and NorCal pride. The redesign fuses both — the warmth, copper tones, and bold patterns of Zambia with the clean, modern, nature-inspired aesthetic of the Bay Area. The result should feel like a community that is rooted in African culture but thriving in Northern California.

Think: Zambian soul, Bay Area polish.

Color Palette — "Copper & Redwood"
Blend the Zambian flag (green, orange, black, copper eagle) with NorCal's natural landscape (redwoods, golden hills, bay water, fog).

text
PRIMARY PALETTE:

--zambia-green:     #1B5E20    /* Deep forest green — Zambian flag + redwood canopy */
--zambia-green-light: #2E7D32  /* Lighter green for hover states */
--copper:           #B87333    /* Zambian copper eagle — primary accent */
--copper-light:     #D4956B    /* Softer copper for highlights, hover */
--copper-glow:      #F5E6D3    /* Warm copper tint for backgrounds */

NORCAL ACCENTS:

--golden-hills:     #C8A951    /* California golden hour / golden hills */
--bay-blue:         #3D7B9E    /* San Francisco Bay water */
--fog:              #F0EDE8    /* NorCal morning fog — primary page background */
--redwood:          #5D2E0C    /* Redwood bark — deep warm brown for text emphasis */

NEUTRALS:

--charcoal:         #1A1A1A    /* Primary text */
--slate:            #4A4A4A    /* Secondary text */
--mist:             #E8E4DD    /* Borders, dividers */
--cloud:            #FAFAF7    /* Card backgrounds */
--white:            #FFFFFF    /* Pure white for overlays */

SEMANTIC:

--success:          #2E7D32
--error:            #C62828
--warning:          #E65100
Usage Rules
--zambia-green for header, nav, footer, primary buttons

--copper for accent highlights, hover states, active nav indicators, stat numbers, icons

--fog for page background (warm off-white, not cold gray)

--copper-glow for hero sections, feature cards background tint

--golden-hills for special badges, premium member indicators

--bay-blue for links, secondary CTAs

All primary buttons: solid --zambia-green with white text, hover to --zambia-green-light

All accent buttons: solid --copper with white text

Typography
Load via CDN (Fontshare or Google Fonts). No system fonts for the website.

text
HEADINGS: "General Sans" (Fontshare) — weight 600-700
  Alt: "DM Sans" (Google Fonts) if General Sans unavailable

BODY: "Satoshi" (Fontshare) — weight 400-500
  Alt: "Inter" (Google Fonts)

DISPLAY / HERO: "General Sans" — weight 700, size 48-72px
  Letter-spacing: -0.02em for large display text

ACCENT TEXT (stats, labels, badges): "General Sans" — weight 500, uppercase, 
  letter-spacing: 0.08em, size 12-14px
Type Scale
text
Hero title:       48-64px / 700 / -0.02em tracking
Section heading:  28-36px / 600
Card heading:     20-24px / 600
Body:             16-18px / 400 / line-height 1.6
Small/caption:    13-14px / 400 / muted color
Stat numbers:     48-64px / 700 / copper color
Stat labels:      12-14px / 500 / uppercase / letter-spaced
Layout & Components
Global Nav — Redesigned
text
┌──────────────────────────────────────────────────────────────┐
│  [ZANC LOGO]  Home  About  Events  Community  Join  Insurance │
│                                            [🔍] [☰ mobile]  │
└──────────────────────────────────────────────────────────────┘
Changes:

Add a proper ZANC logo/wordmark (Zambian eagle icon + "ZANC" in General Sans 700)
If no logo file exists, create a text-based mark: Zambian flag emoji + "ZANC" in
copper, with "Association of Zambians in California" as a smaller subtitle

Sticky nav on scroll (becomes compact with drop shadow)

Mobile: hamburger drawer menu (slide-in from right)

Active page indicator: copper underline (not green)

Remove social icons from nav (they belong in footer only)

Rename pages for clarity:

"News" → "Events & News"

"Gallery" → stays "Gallery"

"Membership" → "Join ZANC"

Add "Community" (new page — see below)

Hide "Admin" from public nav entirely. Admins access /admin directly.

Hide "Forms" from main nav — move form downloads into the relevant pages
(membership form on Join page, insurance form on Insurance page)

Hero Section — Home Page
text
┌──────────────────────────────────────────────────────────────┐
│  [Full-width background: Victoria Falls or NorCal landscape] │
│                                                              │
│     Zambian Heritage.                                        │
│     Bay Area Community.                                      │
│                                                              │
│     Connecting Zambians across Northern California            │
│     since 1995.                                              │
│                                                              │
│     [Join ZANC ●]  [Explore Events ○]                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
Full-width hero with overlay gradient (dark green to transparent from left)

Background image: high-quality Victoria Falls OR composite showing both
Zambia and Bay Area (Golden Gate Bridge + Zambian landscape)

Hero text white, left-aligned, with text-shadow for readability

Primary CTA: solid copper button ("Join ZANC")

Secondary CTA: outlined white button ("Explore Events")

Subtle parallax scroll effect on the background image

Stats Bar
text
┌──────────────────────────────────────────────────────────────┐
│   Est. 1995          68+ Insured Members       7 States      │
│   [copper number]    [copper number]           [copper num]  │
│   Zambian Heritage   Across America            Coast to Coast│
└──────────────────────────────────────────────────────────────┘
Dark green background with copper stat numbers

Numbers animate (count up) on scroll-into-view

Add a 4th stat: "4+ Annual Events" or "30+ Years Strong"

Community Highlights Section — Home Page
text
┌──────────────────────────────────────────────────────────────┐
│  COMMUNITY HIGHLIGHTS                                        │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ [image] │  │ [image] │  │ [image] │                     │
│  │ Title   │  │ Title   │  │ Title   │                     │
│  │ Date    │  │ Date    │  │ Date    │                     │
│  │ Excerpt │  │ Excerpt │  │ Excerpt │                     │
│  │ [Read →]│  │ [Read →]│  │ [Read →]│                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                              │
│           [View All Events & News →]                         │
└──────────────────────────────────────────────────────────────┘
3-column card grid (stacks on mobile)

Each card: image placeholder (copper-glow bg if no image), title, date badge, excerpt

Subtle hover effect: card lifts with shadow, copper border appears

Show 3 most recent highlights

NorCal Pride Section — Home Page (NEW)
text
┌──────────────────────────────────────────────────────────────┐
│  [Warm copper-glow background]                               │
│                                                              │
│  ROOTED IN NORCAL                                            │
│                                                              │
│  From Sacramento to the Bay Area, our community thrives      │
│  across Northern California's most vibrant cities.           │
│                                                              │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │ 🌉    │  │ 🏛️    │  │ 🌲    │  │ ☀️    │           │
│  │Bay Area│  │Sacra-  │  │Wine   │  │Silicon │           │
│  │        │  │mento   │  │Country│  │Valley  │           │
│  └────────┘  └────────┘  └────────┘  └────────┘           │
│                                                              │
│  Plus members in AZ, NV, IL, IN, NY & CT                     │
└──────────────────────────────────────────────────────────────┘
Warm section with NorCal location callouts

Small icons or illustrations for each region

Subtle message: "we're not just Sacramento — we're all of NorCal"

"Join Our Community" CTA — Home Page Bottom
text
┌──────────────────────────────────────────────────────────────┐
│  [Dark green background with subtle copper pattern/texture]  │
│                                                              │
│  Be Part of Something Bigger                                 │
│                                                              │
│  Join 68+ members building bridges between                   │
│  Zambia and Northern California.                             │
│                                                              │
│  [Join ZANC ● copper button]  [Learn More ○ outlined]        │
└──────────────────────────────────────────────────────────────┘
NEW PAGE: Community Hub (/community)
This is the interactive engagement page. It encourages participation and makes members feel invested.

Sections:
1. Community Suggestions Box

text
┌──────────────────────────────────────────────────────────────┐
│  💡 HAVE A SUGGESTION FOR THE COMMUNITY?                     │
│                                                              │
│  We want to hear from you. Share ideas for events,           │
│  initiatives, or ways we can better serve our community.     │
│                                                              │
│  [Your Name          ]                                       │
│  [Your Email         ]                                       │
│  [Category: ▼ Event Idea | Community Service | Feedback ]    │
│  [Your suggestion...                                    ]    │
│  [                                                      ]    │
│  [Submit Suggestion ●]                                       │
└──────────────────────────────────────────────────────────────┘
Simple form that sends to a Supabase suggestions table

Categories: Event Idea, Community Service, Partnership, General Feedback

Admin can view suggestions in the admin panel

Public confirmation: "Thanks! Your suggestion has been received."

2. Opportunities Board

text
┌──────────────────────────────────────────────────────────────┐
│  🚀 OPPORTUNITIES                                            │
│                                                              │
│  Jobs, scholarships, and opportunities shared by and          │
│  for the Zambian-NorCal community.                           │
│                                                              │
│  ┌─────────────────────────────────────┐                     │
│  │ 🏢 Software Engineer — TechCorp    │  Posted 2d ago      │
│  │    Bay Area | Full-time             │  [View →]           │
│  ├─────────────────────────────────────┤                     │
│  │ 🎓 Zambia Study Abroad Scholarship │  Posted 5d ago      │
│  │    Open to NorCal students          │  [View →]           │
│  ├─────────────────────────────────────┤                     │
│  │ 🏠 Room Available — Sacramento     │  Posted 1w ago      │
│  │    $800/mo | Available April        │  [View →]           │
│  └─────────────────────────────────────┘                     │
│                                                              │
│  [Post an Opportunity ● — Members Only]                      │
└──────────────────────────────────────────────────────────────┘
Managed by admin via the admin panel for now

Categories: Jobs, Housing, Scholarships, Services, Other

Each listing shows: title, category icon, location, date posted

Future: paid members can self-post (comment out for now with TODO)

3. Community Exchange (Members Only — Future)

text
┌──────────────────────────────────────────────────────────────┐
│  🔄 COMMUNITY EXCHANGE — Coming Soon                         │
│                                                              │
│  A marketplace for ZANC members to list services,            │
│  sell goods, and connect professionally.                     │
│                                                              │
│  [Join ZANC to unlock when available ●]                      │
└──────────────────────────────────────────────────────────────┘
Teaser section — shows the concept, locked behind membership

Build anticipation without building the full feature yet

Clean "coming soon" card with copper accent

Supabase Schema Additions
Run this SQL in Supabase SQL Editor to support the new Community features:

sql
-- Community suggestions
CREATE TABLE suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',        -- new, reviewed, actioned
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Opportunities board
CREATE TABLE opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,           -- jobs, housing, scholarships, services, other
  description TEXT NOT NULL,
  location TEXT,
  link TEXT,                        -- external URL
  posted_by TEXT,                   -- admin name or "Community Member"
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Anyone can submit suggestions
CREATE POLICY "Anyone can insert suggestions" ON suggestions
  FOR INSERT WITH CHECK (true);

-- Only admins can read suggestions
CREATE POLICY "Admins can read suggestions" ON suggestions
  FOR SELECT USING (auth.uid() IN (SELECT id FROM admins));

-- Anyone can read active opportunities
CREATE POLICY "Public can read active opportunities" ON opportunities
  FOR SELECT USING (active = true);

-- Only admins can manage opportunities
CREATE POLICY "Admins can manage opportunities" ON opportunities
  FOR ALL USING (auth.uid() IN (SELECT id FROM admins));
Page-by-Page Design Updates
About Page
Add a hero section with a warm photo (community gathering or Zambian landscape)

Leadership section: circular headshot placeholders (use copper-glow bg with initials
if no photos available), name, title, in a clean grid

Add a "Our Reach" map or graphic showing NorCal + the 7 states

Add a timeline visual for history (1995 → key milestones → present)

End with a CTA: "Join our community" copper button

Events & News Page (renamed from News)
Tab interface: "Upcoming Events" | "Past Events" | "News"

Event cards with date badges (copper circle with month/day)

Each card: image (or copper-glow placeholder), title, date, location, excerpt

Add location tags showing NorCal venues: "Sacramento", "Bay Area", "Sonoma"

Upcoming events section gets priority placement at top

Gallery Page
Masonry or Pinterest-style grid layout

Image categories as filter chips: "Events", "Community", "Culture", "NorCal"

Lightbox overlay on click

Until real photos are loaded, show 6-8 copper-glow placeholder cards with
"Photos coming soon" and a camera icon

Add a CTA: "Share your photos — email gallery@zanc.org"

Join ZANC Page (renamed from Membership)
Two-tier pricing cards side by side:

┌─────────────────┐ ┌─────────────────┐
│ NorCal Member │ │ Nationwide │
│ $10/mo │ │ $5/mo │
│ $120/year SAVE │ │ $60/year SAVE │
│ • Benefit 1 │ │ • Benefit 1 │
│ • Benefit 2 │ │ • Benefit 2 │
│ [Join Now ●] │ │ [Join Now ●] │
└─────────────────┘ └─────────────────┘

"NorCal Member" card gets a copper border/badge ("RECOMMENDED")

Benefits listed clearly under each tier

Form downloads integrated below the pricing cards (not in a sidebar)

Social proof: "Join 68+ members across 7 states"

Insurance Page
Clean info section about Hartford Group Life Insurance

Pricing table (not a dropdown):

Category	Rate
Adult Only (18-64) In-State	$XX/period
Adult w/ Dependents (18-64) In-State	$XX/period
...	...
Each row has a "Pay Now" copper button

Prominent enrollment window banner with countdown or status:
"Open Enrollment: June 1 – July 31" or "Enrollment Closed — Opens June 1"

FAQ accordion below: "Who is eligible?", "What does it cover?", etc.

Forms Page → REMOVED as standalone page
Move membership form download into the Join ZANC page

Move insurance form download into the Insurance page

Remove Forms from nav entirely

Admin Panel
Add "Suggestions" section — view submitted suggestions, mark as reviewed/actioned

Add "Opportunities" section — CRUD for the opportunities board

Keep existing News and Gallery management

Interactive & Engagement Elements
Scroll animations: Cards fade-in-up on scroll, stats count up, sections reveal
Use CSS @keyframes + IntersectionObserver — no heavy libraries
Respect prefers-reduced-motion

Hover effects: Cards lift with shadow on hover, buttons darken, copper accents glow

Toast notifications: Copper-tinted success toasts for form submissions

Loading states: Skeleton cards with copper-glow shimmer while data loads

Back-to-top button: Copper circle that appears after scrolling past the fold

Mobile-first: All layouts must work beautifully on phone. Hamburger menu,
stacking cards, touch-friendly buttons (min 44px tap targets)

CSS Architecture Notes
Use Tailwind (already installed) with a custom theme extending the color palette above

Add the color palette to tailwind.config.js:

js
theme: {
  extend: {
    colors: {
      'zambia-green': { DEFAULT: '#1B5E20', light: '#2E7D32' },
      'copper': { DEFAULT: '#B87333', light: '#D4956B', glow: '#F5E6D3' },
      'golden': '#C8A951',
      'bay-blue': '#3D7B9E',
      'fog': '#F0EDE8',
      'redwood': '#5D2E0C',
      'mist': '#E8E4DD',
      'cloud': '#FAFAF7',
    },
    fontFamily: {
      'heading': ['"General Sans"', 'sans-serif'],
      'body': ['"Satoshi"', 'sans-serif'],
    }
  }
}
Load fonts from Fontshare CDN in index.html:

xml
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
Implementation Priority
Phase 1 — Foundation (do first)
Install fonts (Fontshare CDN link in index.html)

Update tailwind.config.js with new color palette

Redesign global nav (sticky, logo, renamed pages, mobile hamburger)

Redesign footer

Redesign hero section (full-width, overlay, new copy)

Apply new button styles globally (solid green primary, copper accent)

Phase 2 — Page Redesigns
Home page: stats bar, community highlights cards, NorCal section, CTA

About page: leadership grid, history timeline, hero image

Events & News page: tab interface, event cards with date badges

Join ZANC page: pricing cards, integrated form downloads

Insurance page: pricing table, enrollment banner, FAQ accordion

Gallery page: masonry grid, category filters, placeholders

Phase 3 — Community Features
Create /community page with suggestion form

Opportunities board (admin-managed)

Community Exchange teaser

Run Supabase SQL for suggestions + opportunities tables

Admin panel: add Suggestions and Opportunities sections

Phase 4 — Polish
Scroll animations (IntersectionObserver)

Loading skeletons

Back-to-top button

Mobile testing and responsive fixes

Accessibility audit (contrast, focus states, aria labels)

Do NOT:
Use stock photos of random African people — use real ZANC event photos or
placeholder cards until real photos are available

Use tribal patterns or stereotypical "African" design tropes — keep it modern

Make it look like a government website — it's a community, keep it warm

Over-animate — subtle reveals only, respect reduced motion preferences

Forget the Zambian-NorCal fusion — every design choice should feel like
it belongs in both worlds