# CLAUDE.md — Student App (Neutral Product UI, iOS-first, Android-safe, TypeScript, SV/EN)

## Overview
You are a senior mobile engineer building a polished student app UI using React Native with TypeScript.
Primary goal: ship a premium-feeling UI prototype using mock data first.

We will build 3 flagship tabs:
1) Today — chronological agenda + "Next up" hero + upcoming assignments
2) Week — day picker + chronological agenda list for selected day
3) Assignments — list with filters (All/Open/Overdue/Completed) + (later) details

We will ignore the company's current UX/design system and build our own coherent UI.

---

## UI Direction: Neutral Product UI (must-follow)
Design should look like a modern product app, not iOS-native or Android-native.
- Same visual language across platforms (iOS and Android)
- Consistent spacing/typography/cards/borders everywhere
- Avoid platform-specific styling quirks unless required for usability
- Prefer subtle borders over heavy shadows; use shadows/elevation sparingly and consistently

Support **system theme** (light/dark).

---

## The Soul of the App: "Next up" (must-follow)
The "Next up" hero on Today is not just a component — it is the core product promise:
**reduce cognitive load by telling the student what matters right now**.

Rules:
- "Next up" must be visually dominant and instantly legible.
- Show only essential info: subject/title, time range, room, and (optional) teacher + status.
- Status handling (changed/cancelled) must be unmistakable but not noisy.
- Everything else on Today ("Later today", "Due soon") supports this core moment.

---

## Platform & Workflow
Use **Expo (managed workflow)** unless there is a hard blocker.
- Expo simplifies setup, device testing, and builds.
- Optimize for **iPhone** first, but keep everything cross-platform and Android-safe.
- Sanity-check Android periodically to avoid late surprises (layout + navigation + fonts).

---

## Tech Stack (default)
- Expo + React Native + **TypeScript (from day 1)**
- React Navigation:
  - Bottom Tabs for main navigation
  - Stack per tab for future detail screens
- Styling: `StyleSheet` + theme tokens (no heavy styling frameworks by default).
- Theme: system default light/dark via `useColorScheme()`.
- Copy: built-in lightweight SV/EN dictionary (no heavy i18n frameworks initially).
- Locale detection: device language with Swedish fallback.
- Data: mock JSON locally; keep shapes realistic for later API integration.

Do NOT add additional UI frameworks (NativeWind/Tamagui/Paper/etc.) unless there is a concrete need.
If introducing a new dependency, explain why it's worth it.

---

## Package Manager
Use **npm** for all install commands.

- Prefer Expo-safe installs for RN deps:
  - `npx expo install <package>`
- Use npm only when necessary:
  - `npm i <package>`

---

## Non-goals (for now)
- Real backend integration
- Authentication/IdP integration
- Push notifications
- Offline sync
- Complex timetable grid view
- Full-featured i18n framework (plural rules, ICU formatting, RTL, etc.)

---

## Quality Bar
This is a GUI showcase. The bar is:
- consistent spacing and typography hierarchy
- excellent states (loading / empty / error)
- responsive layout (small/large iPhones)
- smooth lists (FlatList, no jank)
- sensible accessibility (contrast, tap targets, font scaling)
- no one-off hacks per screen; use reusable components

---

## Project Structure (preferred)
/src
  /navigation
    RootTabs.tsx
    (optional) TodayStack.tsx, WeekStack.tsx, AssignmentsStack.tsx
  /screens
    TodayScreen.tsx
    WeekScreen.tsx
    AssignmentsScreen.tsx
    SettingsScreen.tsx
    (later) AssignmentDetailScreen.tsx
  /components
    Screen.tsx
    Card.tsx
    SectionHeader.tsx
    ListRow.tsx
    Badge.tsx
    Chip.tsx
    (later) Skeleton.tsx, EmptyState.tsx, ErrorState.tsx
  /theme
    colors.ts
    spacing.ts
    typography.ts
    theme.ts          # light/dark resolver (semantic tokens)
  /i18n
    strings.ts        # SV/EN dictionary + types
    i18n.tsx          # LanguageProvider + useI18n()
  /data
    types.ts
    mock.ts
  /utils
    date.ts

Keep components small and composable.

---

## TypeScript Rules (must-follow)
- Use TypeScript everywhere (`.ts` / `.tsx`) from day 1.
- Avoid `any`. If unavoidable, isolate it and justify with a short comment.
- Define domain types in `src/data/types.ts` and reuse them across screens/components.
- Prefer explicit prop types for components.

---

## Theme & Tokens (must-follow)
Support system theme:
- Use `useColorScheme()` (or equivalent) to select light/dark tokens.
- Do NOT hardcode random hex values across the app.
- Put colors in theme files and reference them semantically:
  - `bg`, `surface`, `surface2`, `text`, `textMuted`, `border`,
  - `primary`, `danger`, `warning`, `success`

Spacing:
- Use a fixed scale from `/theme/spacing.ts` and reuse consistently.

Typography:
- Define a small set of text styles in `/theme/typography.ts`.
- Use them consistently for hierarchy (title, section header, body, caption).

Important: "Clean natural" must remain easy to restyle later.
Therefore: keep UI dependent on tokens + reusable components, not scattered style rules.

---

## Localization: Swedish + English (must-follow)
We support **SV/EN** from the start with a lightweight, type-safe dictionary.

Rules:
- All user-facing UI strings must come from the dictionary (`t("key")`).
- Do NOT hardcode user-facing text inside screens/components.
- Keep localization lightweight: a dictionary + `LanguageProvider` + `useI18n()`.
- Default language: **device language with Swedish fallback** (A).
- Implement a manual language toggle in Settings (SV/EN).
- Do not introduce a full i18n framework unless specifically requested.

Device language handling:
- If device language starts with `sv`, default to `sv`.
- Otherwise default to `en`.
- If detection is unavailable in the current setup, default to `sv` and document the TODO.
- Optional: use `expo-localization` if needed (keep it minimal).

Scope of localization (MVP):
- Tab labels, screen titles, section headers
- Filter labels, badges/status labels
- Empty/Loading/Error messages

Non-goal for localization (MVP):
- Full localization of subject/course names in mock data (optional later)

---

## Copy Tone (must-follow)
Copy matters. Keep it calm, human, and consistent in both languages.

Defaults:
- Swedish should be plain, neutral, and readable.
- English should be equally calm and non-robotic.
- Avoid jargon and "alerty" copy.
- Prefer short phrases and consistent verbs.

---

## Data Modeling (Mock) — Swedish Realism (recommended)
Mock data should feel like Swedish school reality:
- Subjects/courses: "Matematik", "Svenska", "Engelska", "Historia", "Biologi", "Fysik"
- Optional course codes: MA1, SV1, EN5, HI1, etc. (keep consistent)
- Rooms: "Sal 214", "Aulan", "Labbsal 1"
- Scheduling: realistic lesson blocks and breaks (e.g., 08:15–09:00, 09:15–10:00, lunch gap)
- Use ISO timestamps; keep date formatting in `src/utils/date.ts`

Types in `src/data/types.ts`:
Lesson:
- id: string
- start/end: ISO string
- title: string
- course?: string
- location?: string
- teacher?: string
- status?: "normal" | "changed" | "cancelled"

Assignment:
- id: string
- title: string
- course?: string
- dueAt: ISO string
- status: "open" | "overdue" | "completed"

Mock data in `src/data/mock.ts`.

---

## Components (build first, reuse everywhere)
Required components:
- Screen (SafeArea + standard padding + background)
- Card (surface container)
- SectionHeader
- ListRow
- Badge
- Chip

Add later when needed:
- LoadingSkeleton
- EmptyState
- ErrorState

All screens should primarily be composition of these components.

---

## Navigation Requirements
- Bottom tabs: Today / Week / Assignments / Settings
- Prefer custom in-screen titles initially (headerShown: false)
- Keep routing simple and predictable
- When adding details screens, add a stack navigator for that tab

---

## Lists & Performance
- Use `FlatList` for Week and Assignments; avoid nesting scroll views incorrectly.
- Use stable keys.
- Keep row renderers lightweight.
- Avoid expensive inline object creation in hot paths when it matters.

---

## Accessibility
- Comfortable tap targets (padding)
- Text should remain readable with larger system font sizes
- Muted text must remain readable (don't go too low contrast)

---

## States: Empty / Loading / Error
Even with mock data, implement at least:
- Empty list messages (no lessons / no assignments)
- A loading placeholder (can be a simple skeleton or "loading" state)

All messages must be localized through the dictionary.

---

## Claude Code Working Style
When implementing changes:
1) Propose a plan in 3–7 bullets.
2) Make small, reviewable edits.
3) Prefer incremental steps: navigation shell → components → screens → polish.
4) If a choice significantly changes architecture/deps, ask before proceeding.

Ask only if blocking:
- Switching styling approach (NativeWind/Tamagui/etc.)
- Navigation redesign
- Adding global state management beyond local state
- Major change to theme direction
- Introducing a full i18n framework

Otherwise proceed with sensible defaults.

---

## Commands
- Start: `npx expo start`
- Install Expo-supported packages: `npx expo install <pkg>`
- Install other packages (only if needed): `npm i <pkg>`

---

## Definition of Done (MVP v1)
Today:
- Page title (localized)
- "Next up" hero card (dominant, readable)
- "Later today" list
- "Assignments due soon" list (top 3 not completed)

Week:
- day picker chips (localized if desired)
- agenda list for selected day (mocked)

Assignments:
- filter chips (localized)
- list with badges and due dates

Settings:
- language toggle (SV/EN)

All:
- consistent spacing/typography
- empty states
- no layout glitches on small iPhones
- Android should run without crashes and without obvious broken layouts (occasional sanity checks)

---

## Stretch Goals (only after MVP is clean)
- Tap assignment → Assignment detail screen
- Pull-to-refresh (mocked)
- Loading skeleton component
- Refinement of "changed/cancelled" visuals
- Very subtle animations if they add polish without complexity

---

## Avoid These Traps
- Don't recreate a full design system.
- Don't add auth/backend/analytics now.
- Don't introduce multiple styling frameworks.
- Don't build a timetable grid.
- Don't chase pixel-perfect parity across platforms; aim for consistent quality.
