# Specification

## Summary
**Goal:** Build a responsive pink-and-gold marketing website for Tech Collective LLC with core business sections, a contact intake form, and an internal inquiries listing backed by Motoko storage.

**Planned changes:**
- Create a single-page marketing layout with top navigation jumping to Hero/Intro, Services, About, and Contact sections.
- Implement a Services section listing exactly: Notarial services; Simple phone configuration & setup; Website creation; Tech consultations (each with a short description).
- Apply a consistent pink-and-gold theme across typography, buttons, and section styling with basic readable contrast.
- Add a Contact inquiry form (name, email/phone, service interested in, message) with basic validation and a success confirmation state on submit.
- Add Motoko backend persistence for inquiries (including timestamp) and query methods to retrieve them.
- Create an internal “Inquiries” view/page that fetches and displays stored inquiries in a readable list/table.
- Add generated static brand assets (logo + hero background/illustration) from frontend static assets and render them in the header/hero.

**User-visible outcome:** Visitors can browse Tech Collective LLC’s services and about info, submit an inquiry through a contact form with confirmation, and an internal page can display saved inquiries retrieved from the backend.
