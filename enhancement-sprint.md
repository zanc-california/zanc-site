# ZANC Website – Sprint: Phase 2 (Activation Layer)

## Objective

Enhance the current ZANC website with light-touch features that:
- Increase member engagement and participation
- Add human depth to leadership and community
- Lay groundwork for future programmatic and economic layers

This sprint focuses on **subtle UX/content enhancements**, not structural rewrites.

---

## 1. Leadership Profiles – Add Micro Context

### Goal
Make leadership feel accessible and relatable without expanding layout complexity.

### Instruction
For each board member card:
- Add a short 1-line descriptor under the title (max 120 characters)

### Example
Current:
President

Update to:
President  
"Focused on strengthening diaspora engagement and community growth"

### Implementation Notes
- Extend existing data model for board members:
  - `name`
  - `role`
  - `image`
  - `shortBio` (new field)

- Ensure:
  - Responsive layout remains intact
  - Text truncates cleanly if too long

---

## 2. “Get Involved” Section (Lightweight Module)

### Goal
Convert passive visitors into active participants.

### Placement
- Add as a section on the Home page (above footer or below highlights)

### Content Structure
Title:
**Get Involved**

Options (3–4 cards max):
- Join ZANC
- Volunteer at Events
- Join a Committee (placeholder for now)
- Partner / Sponsor

### Behavior
- Each card links to:
  - existing Join page OR
  - mailto link OR
  - placeholder route `/get-involved`

### Implementation Notes
- Reuse existing card components
- Keep styling consistent with Community Highlights section

---

## 3. Gallery – Improve Content Tagging

### Goal
Turn gallery into a lightweight storytelling tool.

### Instruction
Add optional tag labels to gallery items.

### Example Tags
- Community
- Events
- Roadshow
- Independence Day

### UI Behavior
- Display tag as small badge on image or below caption
- Allow filtering (already partially implemented — extend if needed)

### Data Model Update
Add:
- `tags: string[]`

---

## 4. Featured Business Section – Prep for Expansion

### Goal
Future-proof this section for growth into a directory or sponsorship layer.

### Instruction
Refactor current “Featured business / entity” block into a reusable component.

### Component Structure
- `name`
- `description`
- `image/logo`
- `ctaLink`

### Add Optional Support
- Allow multiple entries (carousel-ready, but default = single)

### UI
- Keep current layout
- Do not introduce carousel yet (just structure for it)

---

## 5. “ZANC Initiatives” Page (Stub Only)

### Goal
Create a placeholder for future strategic programs.

### Route
`/initiatives`

### Page Content (Minimal)
Title:
**ZANC Initiatives**

Body:
Short paragraph:
“This section will highlight key programs, partnerships, and initiatives connecting our community to broader opportunities.”

### Optional Sections (Commented / Placeholder)
- Diaspora Engagement
- Business & Investment Forums
- Community Programs
- Partnerships

### Implementation Notes
- Add link in footer OR About page (not main nav yet)

---

## 6. Join Flow – Add Post-Join Clarity

### Goal
Reduce ambiguity after sign-up.

### Instruction
On Join page:
Add a small section:

**What happens after you join?**

Bullet points:
- You’ll be added to our community communication channels
- You’ll receive updates on events and programs
- You can participate in committees and activities

### UI
- Simple text block
- No new components required

---

## 7. Content Consistency Pass

### Goal
Ensure tone and messaging are aligned across pages.

### Instruction
Review and lightly standardize:

- Use “ZANC community” consistently
- Keep tone:
  - warm
  - inclusive
  - forward-looking

### Do NOT:
- Overwrite existing content
- Change structure

---

## Non-Goals (Do Not Implement in This Sprint)

- No authentication system
- No database integration
- No payment systems
- No major redesigns
- No heavy animations

---

## Definition of Done

- All additions integrate seamlessly into current design
- No layout breakage on mobile
- No increase in page load time beyond acceptable range
- Site still feels simple, clean, and fast

---

## Guiding Principle

> Add depth, not weight.

Each change should feel like a natural extension of the existing site — not a new layer of complexity.