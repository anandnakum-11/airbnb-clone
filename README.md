# Airbnb Desktop Listing Page Prototype

A pixel-perfect, accessible desktop-only Airbnb listing page prototype built with **React 18 (Vite + TypeScript)** and **Node.js (Express + TypeScript)**.

---

## Architecture Diagram

```mermaid
flowchart LR
    User[User Browser] -->|Request UI| CDN(Content Delivery Network)
    CDN --> ReactApp{React Frontend (Vite build on CDN)}
    CDN --> StaticAssets[(Images CDN / Unsplash)]
    User -->|API calls| APIGateway[API Gateway / Load Balancer]
    APIGateway --> NodeServer{Express API Servers}
    NodeServer --> ListingService[Listing Service]
    NodeServer --> PhotoService[Photo Service]
    ListingService --> Database[(PostgreSQL / Mock Store)]
    PhotoService --> ObjectStore[(AWS S3 / Assets Store)]
    NodeServer -.-> Cache[(In-memory / Redis Cache)]
    Cache -->|caching| Database
```

---

## Features

- **Pixel-Perfect Desktop Layout (1440px Viewport)**:
  - Sticky Airbnb header with search pill, brand mark, language selector, and profile menu.
  - Title section with star rating, Superhost tag, location, and functional Share & Save toggles.
  - Signature **5-photo mosaic** (1 hero on left, 4 auxiliary in 2x2 grid on right) with exterior rounded corners and subtle hover zoom.
  - Floating **"Show all photos"** button with 9-dot grid icon.
  - Two-column layout (7:4 ratio) featuring Host Overview, Highlights, AirCover guarantee, Sleeping Arrangements, and Amenities list.
  - **Sticky Booking Sidebar** with interactive nights/guests calculator, pricing itemization (nights x rate, cleaning fee, Airbnb service fee, total), and Reserve CTA.
- **Photo Tour Modal ("Show all photos")**:
  - Fullscreen view with sticky navigation and room category filters (Living Room, Kitchen & Dining, Primary Bedroom, Exterior, etc.).
  - Clicking any room photo opens the Lightbox.
- **WAI-ARIA Compliant Lightbox Dialog**:
  - `role="dialog"` with `aria-modal="true"`.
  - Accessible focus trap (cycles Tab/Shift-Tab within dialog).
  - Keyboard navigation: `Escape` closes, `ArrowLeft` and `ArrowRight` cycle through photos.
  - Live photo counter (`aria-live="polite"`), room tag, caption, and descriptive alt text readout.
  - Background body scroll lock (`body.modal-open`).
  - Automatic focus restoration to trigger element upon closing.
- **Zero UI-Library Bloat**:
  - Pure CSS Modules with strict design tokens for typography, spacing (4px rhythm), elevation shadows, and colors (`#FF385C`, `#222222`, `#717171`, `#F7F7F7`).
- **Express + TypeScript Backend API**:
  - `GET /api/listings/:id`
  - `GET /api/listings`
  - `GET /api/photos/:id`
  - `GET /health`

---

## Project Structure

```
Airbnb-clone/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── listing.mock.ts       # Curated listing with high-res photos & alt text
│   │   ├── routes/
│   │   │   └── listing.routes.ts     # Express endpoints
│   │   ├── types/
│   │   │   └── listing.types.ts      # TypeScript interfaces
│   │   └── server.ts                 # Express entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/               # Sticky desktop navigation
│   │   │   ├── Gallery/              # GalleryGrid, PhotoCard, LightboxModal, PhotoTourModal
│   │   │   ├── ListingDetails/       # TitleSection, HostOverview, Highlights, etc.
│   │   │   ├── BookingCard/          # Sticky sidebar booking calculator
│   │   │   ├── Footer/               # Desktop footer
│   │   │   └── common/               # Icons.tsx, FocusTrap.tsx, IconButton.tsx
│   │   ├── styles/
│   │   │   ├── tokens.css            # CSS custom properties / design tokens
│   │   │   └── global.css            # Global resets & accessibility rules
│   │   ├── types/
│   │   │   └── listing.ts            # Frontend TypeScript types
│   │   ├── App.tsx                   # Main layout container
│   │   └── main.tsx                  # Vite React entry point
│   ├── tests/
│   │   ├── unit/                     # Vitest + RTL tests
│   │   └── e2e/                      # Playwright E2E tests
│   ├── playwright.config.ts
│   ├── vite.config.ts
│   └── package.json
├── .ai/                              # AI agent prompt history & design records
│   ├── 01-ui-analysis.md
│   ├── 02-component-architecture.md
│   ├── 03-code-generation.md
│   ├── 04-accessibility-review.md
│   └── 05-visual-qa-testgen.md
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 20 & 22)
- npm 9+

### 1. Backend Setup & Run

```bash
cd backend
npm install
npm run dev
```

The Express API will be running at `http://localhost:5000`.

### 2. Frontend Setup & Run

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Running Automated Tests

### Unit & Component Tests (Vitest + React Testing Library)

```bash
cd frontend
npm run test
```

Runs all 12 component tests covering:
- `GalleryGrid.test.tsx`: 5-photo mosaic layout, alt attributes, modal opening.
- `LightboxModal.test.tsx`: ARIA attributes, keyboard navigation (Escape, Arrow keys), next/prev buttons, counter.
- `BookingCard.test.tsx`: Nightly rate calculations, stay totals, and reserve CTA state.

### End-to-End Tests (Playwright)

```bash
cd frontend
npx playwright test
```

Verifies:
1. Full 1440px desktop page layout and descriptive alt texts on all images.
2. Photo Tour modal opening, room category filtering, and closing.
3. Lightbox modal opening from gallery cards, cycling with arrows/keys, and closing with Escape.
4. Amenities modal categorization and dismissal.

---

## API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/listings/:id` | `GET` | Returns full listing details and all photos. (e.g. `/api/listings/villa-serena-malibu`) |
| `GET /api/listings` | `GET` | Returns summaries for all listings. |
| `GET /api/photos/:id` | `GET` | Returns single photo metadata. |
| `GET /health` | `GET` | API health check. |

---

## AI-Assisted Development Workflow

The prototype was designed and engineered using a 5-agent AI pipeline documented in [`.ai/`](./.ai):
1. [**01-ui-analysis.md**](.ai/01-ui-analysis.md): Visual decomposition and design token extraction.
2. [**02-component-architecture.md**](.ai/02-component-architecture.md): Component hierarchy and state flow design.
3. [**03-code-generation.md**](.ai/03-code-generation.md): Express API and React TypeScript generation logs.
4. [**04-accessibility-review.md**](.ai/04-accessibility-review.md): WAI-ARIA compliance, focus trap, and screen-reader audit.
5. [**05-visual-qa-testgen.md**](.ai/05-visual-qa-testgen.md): Test generation for Vitest and Playwright.
