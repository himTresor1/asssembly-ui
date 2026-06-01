export function getRulesTemplate(config: { cssPath: string; componentsDir: string; utilsDir: string }) {
  // Normalize directories for import paths
  const componentsImportPath = `@/${config.componentsDir.replace(/\\/g, '/')}`;
  const utilsImportPath = `@/${config.utilsDir.replace(/\\/g, '/')}/cn`;

  return `# Assembly Design System - AI Agent Instructions
# Version: 1.0.0
# DO NOT EDIT MANUALLY — extend via rules-template.ts and regenerate with \`npx assembly-ui ai\`

You are a world-class frontend engineering AI agent tasked with building high-fidelity web features in this Next.js project. This project is configured to use the **Assembly Design System** (built on Tailwind CSS v4, React, and Radix UI). 

To ensure visually stunning interfaces and flawless user experience (UX), you MUST strictly follow the design and engineering rules described below.

---

## 1. Project Architecture & Setup

### Import Paths
When creating or modifying components, import Assembly primitives and utilities using these configured paths:
- **Assembly Components:** \`${componentsImportPath}/<component-name>\`
- **Tailwind Merge Utility (\`cn\`):** \`${utilsImportPath}\`

### Component Lifecycle (How to Add Components)
Assembly uses a copy/paste approach rather than a rigid packaged dependency. 
If you need a component that is not yet installed in \`${config.componentsDir}\`, you must instruct the developer to install it first:
\`\`\`bash
npx assembly-ui add <component-name>
\`\`\`
*Available Components include:* button, dialog, alert-dialog, sheet, input, select, switch, checkbox, card, table, accordion, breadcrumb, calendar, command, popover, tabs, tooltip, admonition, empty-state, metric-card, multi-select, form-item-layout, etc.

---

## 2. UNIVERSAL UX RULES

These rules apply to every product, every domain, every screen. They are non-negotiable.

### Feedback
- EVERY user action must produce visible feedback within 100ms. If a result takes longer, show a loading indicator immediately.
- NEVER leave a button or interactive element in an ambiguous state after being clicked. Disable it, show a spinner, or change its label.
- Success and error states must be visually distinct from each other and from the default state. Never rely on color alone — pair it with an icon or text.
- Destructive actions (delete, remove, revoke) MUST require a confirmation step. The confirmation must clearly state what will be destroyed and whether it is reversible.
- NEVER use a generic "Something went wrong." Every error message must tell the user: what failed, why it failed (if known), and what they can do next.

### Loading & Empty States
- Every screen that loads data MUST have a defined loading state. Skeleton screens are preferred over spinners for layout-heavy content.
- Every screen that can be empty MUST have a defined empty state. Empty states must explain why it's empty and offer a primary action to fill it.
- NEVER show a blank white screen at any point in a user flow.
- Loading states must not cause layout shift. Reserve space for content before it loads.

### Hierarchy & Focus
- Every screen must have exactly ONE primary action. Never show two equal-weight calls to action side by side.
- The most important action must be the most visually prominent. Never bury a primary CTA below the fold or in a secondary visual treatment.
- Destructive actions must never be the primary action on any screen. They must be visually de-emphasized (secondary button, text link, or require extra steps).

### Accessibility
- Every interactive element must be reachable and operable via keyboard alone. No exceptions.
- Every image, icon, and non-text element must have a meaningful alt text or aria-label.
- Focus states must be visible. Never remove the browser default focus ring without replacing it with a custom visible alternative.
- Color contrast must meet WCAG AA at minimum (4.5:1 for body text, 3:1 for large text and UI components).
- Touch targets must be at least 44×44px on mobile. Never make tap targets smaller to save space.

### Copywriting
- All UI text uses sentence case. Never Title Case on labels, buttons, or headings unless it is a proper noun.
- Buttons use action verbs that describe the outcome: "Save changes", "Send invoice", "Delete account" — not "OK", "Submit", "Yes".
- Error messages are written in plain language. Never expose raw error codes or technical strings to end users.
- Placeholder text is not a label. Every input must have a visible label. Placeholder text may supplement but never replace a label.
- Avoid negative phrasing in interface copy. "Add a card to get started" is better than "No payment methods found."

### Navigation
- Users must always know where they are. The current location must be clearly indicated (active nav item, breadcrumb, page title).
- Navigation must be consistent across all screens. Never move or hide navigation elements based on user state unless absolutely necessary.
- Back navigation must always be predictable. The back button or gesture must return the user to where they came from — not a default home screen.
- External links must open in a new tab and be visually marked as external.

### Forms
- Inline validation: validate fields on blur, not on keystroke. Never punish the user before they finish typing.
- Show validation errors next to the field they relate to, not only in a banner at the top of the form.
- Preserve user input on error. NEVER clear a form because of a failed submission.
- Multi-step forms must show progress. The user must always know how many steps remain.
- Required fields must be marked consistently. If most fields are required, mark the optional ones instead.
- Auto-fill must be enabled on all relevant fields. Never disable browser auto-fill without a strong reason.

---

## 3. FORMS & DATA ENTRY

### Validation
- Validate on blur (field loses focus), not on change (every keystroke). Exception: password strength meters, which validate on change.
- For fields with hard character limits (usernames, codes), show the remaining character count when the user is within 20% of the limit.
- Never show a success state on a field that has not been validated yet. Empty ≠ valid.
- When a form submission fails server-side validation, scroll to and focus the first errored field automatically.
- Credit card, phone, and date fields must auto-format as the user types. Never make users type dashes or spaces manually.

### Layout
- Single-column forms are always preferred on mobile. Two-column forms are only acceptable on desktop for logically related field pairs (first name / last name, city / postcode).
- Field width should reflect the expected input length. A postcode field should not be as wide as a full-name field.
- Grouped fields (address blocks, date ranges) must be visually grouped with a label for the group, not just individual field labels.
- Submit buttons must be placed at the end of the form, left-aligned or full-width on mobile — never at the top.

### Dirty State
- If a user has unsaved changes and attempts to navigate away, they MUST be shown a confirmation dialog (DiscardChangesConfirmationDialog). Do not let them silently lose work.
- Auto-save must be indicated. If a form auto-saves, show a subtle "Saved" confirmation. If it has not saved, show a "Unsaved changes" indicator.
- Reset / Clear actions must always require confirmation. Never clear a form silently.

---

## 4. LOADING & ERROR STATES

### Loading
- Use skeleton screens (not spinners) for any content area larger than 200×200px.
- Use spinners only for small, inline loading indicators (button loading state, inline data refresh).
- NEVER block the entire viewport with a full-screen spinner for more than 3 seconds. If it takes longer, show meaningful progress with a message.
- Loading states must reflect the actual structure of the content that will appear. A skeleton for a list of cards should look like cards — not a generic grey rectangle.

### Errors
- Network errors must distinguish between "no connection" and "server error". The user response to each is different.
- 404 pages must include navigation back to a safe place (home, dashboard) and a search input where relevant.
- 500 pages must include a way to report the issue and a retry option.
- API error messages must be translated to human language before being shown. Never surface raw API responses to end users.
- For partial failures (e.g., 3 of 5 items saved successfully), show both what worked and what failed. Never silently drop failed items.

---

## 5. AUTHENTICATION UX RULES

### Login & Signup
- NEVER show a generic "Invalid credentials" error on login. Distinguish between: email not found, wrong password, account locked, email not verified, account disabled.
  - Exception: if security policy explicitly requires ambiguity to prevent account enumeration, document this decision clearly.
- Passwords must always have a visible toggle to show/hide. Place it inside the input field on the right.
- "Remember me" must default to OFF on shared or public devices. On personal device flows it may default to ON.
- After successful login, redirect to the page the user originally requested, not a hardcoded dashboard. Store the intended destination before the auth redirect.
- Login forms must support browser password managers and auto-fill. Never disable autocomplete on login fields.
- Rate limiting must be communicated to the user when triggered. Never silently block a login attempt — show "Too many attempts. Try again in X minutes."

### Multi-Factor Authentication
- MFA setup must be optional unless policy requires it. If optional, clearly communicate the security benefit, not just that it exists.
- MFA prompts must show which method is being used (SMS, authenticator app, email).
- Always provide a recovery path (backup codes, alternative methods). Never lock a user out permanently.
- MFA code inputs must auto-submit when the correct number of digits is entered. Never require the user to click "Confirm" after typing a 6-digit code.
- OTP inputs must be a single field that accepts paste. Never split a code into 6 individual character inputs unless each auto-advances on input.

### Session & Security
- Session expiry must be communicated BEFORE it happens. Show a warning at 5 minutes remaining: "Your session will expire in 5 minutes. Stay signed in?"
- After session expiry, preserve the user's current page/state and redirect them back after re-authentication.
- Password reset emails must expire after a reasonable window (15 minutes to 1 hour). Clearly state the expiry in the email.
- Password reset flows must invalidate all previous reset links as soon as a new one is issued.
- NEVER log users out mid-flow without explanation. If a forced logout is required (security event, role change), show a clear message before redirecting.

### OAuth / Social Login
- Show clearly which accounts are connected to a social login. If a user signs up via Google, their profile should reflect this.
- If an email already exists via a different auth method, never silently merge accounts. Prompt the user to confirm account linking.
- Social login buttons must use recognizable provider branding and be clearly labeled ("Continue with Google", not "OAuth Login").

---

## 6. AI AGENT UX RULES

### Transparency & Trust
- AI-generated content must always be clearly identified as AI-generated. Never present AI output as if it were human-authored without disclosure.
- Confidence must be communicated honestly. If the AI is uncertain, say so. Do not present low-confidence results with the same visual weight as high-confidence results.
- Show what data the AI is using to generate a result. Users should be able to audit the inputs, especially in high-stakes contexts.
- AI limitations must be surfaced proactively. If a query is outside the model's capabilities or knowledge cutoff, say so immediately — don't hallucinate.

### Interaction Patterns
- AI responses must stream progressively. Never make users stare at a loading indicator while the full response is generated before showing anything.
- Every AI action that changes data (create, update, delete) MUST use a "click to apply" pattern. Never auto-apply AI suggestions without user confirmation.
- Show a diff or preview before applying AI-generated edits to existing content. The user must be able to see exactly what will change.
- Provide an "Undo last AI action" option for at least 30 seconds after any AI-applied change. This is non-negotiable.
- Long AI tasks that run in the background must have a visible progress indicator and a way to cancel mid-process.

### Prompting & Input
- Prompt input areas must have a clear affordance that distinguishes them from regular text inputs (visual treatment, placeholder, or label).
- Show example prompts or suggestions for empty/first-use states. Never show a blank prompt input with no guidance.
- Preserve the user's last prompt in the input field after a result is returned, so they can easily refine it.
- For multi-turn AI conversations, show the conversation history. Never lose context between turns without warning the user.
- If a user prompt is ambiguous, ask a single clarifying question before proceeding. Never guess and generate a long incorrect response.

### Results & Output
- AI results must be editable. Never show AI-generated content in a read-only state where the user cannot modify it.
- When AI results contain multiple options or suggestions, display them in a scannable, comparable format. Never force the user to read a wall of text to find the best option.
- Citation and sources must be shown for any AI-generated factual claims, links, or references. Never make up citations.
- Token/usage limits must be surfaced transparently. If a user is approaching a context limit, warn them before they hit it.
- Empty results (no output, no suggestions) must include a reason and a suggested next action. Never show an empty AI result panel with no context.

### Agentic Flows (Multi-step AI Tasks)
- Each step of a multi-step agentic task must be visible to the user as it executes. Never run a chain of actions silently.
- Before executing an agentic flow that has side effects (sending emails, writing to a database, making API calls), show a plain-language summary of what will happen and require explicit user approval.
- Agentic tasks must support pause and resume. If an agent is mid-task, the user must be able to pause it without losing progress.
- When an agentic flow fails mid-way, show exactly which step failed, what the current state is, and what the user's options are (retry, skip, abort).
- Never allow an agent to exceed its defined scope without explicit user approval for each expansion.

---

## 7. FINTECH UX RULES

### Trust & Credibility
- Security indicators must be visible on all screens that handle financial data (SSL badge, security copy, encryption indicators). Users need to feel safe — reassure them proactively.
- Display full terms, fees, and conditions before any financial commitment. Never hide fees in fine print or disclose them only on the confirmation screen.
- Regulatory compliance messaging (FDIC insured, FCA regulated, etc.) must be visible on key transactional screens — not just in the footer.
- Never use dark patterns to encourage financial actions. No artificial urgency, no hidden pre-selected checkboxes for subscriptions, no confusing opt-out flows.

### Transactions
- All transaction amounts must show the full precision (e.g., $1,204.50 not $1,204). Never round displayed amounts unless explicitly a summary view.
- Currency must always be explicitly shown. Never display a number without its currency symbol or code.
- Before executing any financial transaction (transfer, payment, investment), show a confirmation screen with: amount, recipient/destination, fees, and the exact effect on the user's account.
- Transaction confirmation screens must have a clear, unambiguous "Confirm" action AND a clearly visible "Cancel" or "Go back" action. Never make cancellation difficult.
- After a transaction, show an immediate receipt or confirmation — not just "Success". Include: transaction ID, amount, destination, date/time, and a way to save or share the receipt.
- Failed transactions must explain why they failed (insufficient funds, card declined, limit exceeded) and what the user's options are (retry, use a different method, contact support).

### Sensitive Data
- Mask sensitive data by default (account numbers, card numbers, SSNs). Provide a "Show" toggle that requires deliberate action.
- After inactivity, re-mask any data that was unmasked. Do not keep sensitive data visible indefinitely.
- Never pre-fill full card or bank account numbers in form fields. Show only the last 4 digits as context.
- Data export / statement downloads must require re-authentication on shared device sessions.

### Friction by Design
- High-value or irreversible transactions (large transfers, account closure, subscription cancellation) must include intentional friction: confirmation dialogs, re-authentication, or typed confirmation (e.g., "Type CONFIRM to proceed").
- "Quick pay" or one-click flows are appropriate for low-value, recurring, familiar transactions. High-value or new transactions must never be one-click.
- Instant loan approvals or high-limit credit decisions must include a mandatory review period screen, even if automated. Never make a significant credit event feel instant.

### Notifications & Alerts
- Transaction alerts must be sent in real-time (push notification, email, or SMS) for every outbound transaction above a user-configurable threshold.
- Unusual activity alerts must be specific: "A $2,400 transfer to a new account was made from your account at 3:14 AM." Never use vague security alerts.
- All financial alerts must include a one-click way to flag the transaction as fraudulent or report it to support.

---

## 8. CMS UX RULES

### Editing Experience
- The editing experience must match the output format as closely as possible. WYSIWYG is the default for content editors; raw code/markdown is opt-in.
- Auto-save must be enabled by default for all content drafts. The save state (saving, saved, unsaved changes) must always be visible.
- Version history must be accessible from within the editor. Users must be able to compare any two versions and restore any previous version.
- Never delete a version unless the user explicitly requests it. Drafts and revisions must be preserved.
- Collaborative editing (multiple users editing simultaneously) must show the presence of other editors in real-time. Use cursors, avatars, or locked-section indicators.

### Content Structure
- Content types must be clearly defined and named. Editors should never have to guess which content type to use for a given piece of content.
- Required fields must be enforced at publish time, not just at save time. A draft may be incomplete; a published item may not.
- Media management must be integrated directly in the editor. Never force editors to leave the editing context to find or upload media.
- Slug / URL fields must auto-generate from the title but remain editable. Warn the user if changing a slug will break existing links.

### Publishing & Workflow
- Every content item must have a clear status indicator: Draft, In Review, Scheduled, Published, Archived.
- Scheduled publishing must show a clear preview of the scheduled date/time in the user's local timezone, plus UTC.
- Unpublishing content must require confirmation and a reason. Content should move to "Archived" state, not be deleted.
- Preview must open in a new tab showing exactly how the content will appear in production, including current styles and layout.
- Publishing workflow (Draft → Review → Approved → Published) must be configurable per content type. Not all content requires review.

### Media & Assets
- Image uploads must show a progress indicator and allow the user to continue editing while the upload completes.
- Image alt text must be required (or explicitly marked as decorative) before an asset can be saved. Never allow alt-text-free images in the media library.
- Show image dimensions and file size in the asset manager. Warn if an image is larger than recommended for web use.
- Bulk operations (bulk publish, bulk delete, bulk tag) must always require a confirmation step showing the exact number of items affected.

---

## 9. EDTECH UX RULES

### Motivation & Progress
- Progress must always be visible. Whether it's a progress bar, a lesson counter, or a streak indicator — learners must always know how far they've come and how far they have to go.
- Celebrate small wins. Completing a lesson, finishing a module, or hitting a streak must produce a moment of positive reinforcement — visual, haptic, or both.
- NEVER show a learner how far behind they are without immediately offering a path to catch up. Deficit framing without a next action is demotivating.
- Streaks and gamification must have a "grace period" mechanism (e.g., streak freeze). Users who miss one day due to life circumstances must not feel punished.
- Avoid leaderboards that only show rank — they demotivate the bottom 80%. If rankings are used, show personal progress alongside rank.

### Learning Flow
- Lessons must have a clear, predictable structure. Learners should know what type of content to expect in each lesson (video, quiz, reading, exercise).
- Never interrupt a learning flow with a paywall, upsell, or promotional message. Monetization must happen at natural break points, not mid-lesson.
- Exit intent mid-lesson must save progress. The learner must be able to resume exactly where they left off — down to the question or video timestamp.
- Question and quiz feedback must be immediate. Never batch quiz results to the end of a session if individual feedback helps learning.
- Correct answers must show explanation, not just confirmation. "Correct!" is less valuable than "Correct! Here's why this is the right answer."
- Wrong answers must never feel punishing. Frame them as learning opportunities. Avoid negative language ("Wrong!"). Use "Not quite — here's what to know" or similar.

### Accessibility in Learning
- All video content must have captions / subtitles. This is both a legal requirement and a learning accessibility requirement.
- Audio-based content must have a transcript available. Never make content only accessible via audio.
- Reading levels must be appropriate for the target audience and stated explicitly. Do not use complex language for beginner-level content.
- Allow learners to control pacing. Video players must support speed control (0.5× to 2×). Reading content must support font size adjustment.

### Assessment
- Time limits on assessments must be clearly communicated before the assessment begins, not discovered mid-way.
- Auto-submit at time limit must be clearly warned: "Your quiz will submit automatically in 2 minutes."
- Partial credit where appropriate. Never give 0 for a response that shows understanding of part of the concept.
- After assessment, show detailed results — which questions were correct, which were wrong, and what the correct answer is with explanation. Never hide results.
- Retake policies must be transparent. If a learner can retake an assessment, tell them so and tell them how many times.

### Personalization
- Learner path recommendations must be explained. "Based on your performance in Module 3, we recommend starting here" is better than an unexplained recommendation.
- Never silently change a learner's curriculum path. If the system adapts their path, notify them and explain why.
- Onboarding assessments that determine a learner's starting point must tell the learner what they determined. Never silently place a learner in a track without explanation.

---

## 10. DASHBOARD & DATA-HEAVY UI RULES

### Data Display
- Tables with more than 5 columns must support horizontal scrolling on mobile. Never let table content overflow or truncate silently.
- Numeric columns in tables must be right-aligned. Text columns must be left-aligned. Never mix alignment within a column type.
- Every data table must support sorting on at least the most important columns. The sorted column must be visually indicated.
- Pagination must show total count and current range ("Showing 21–40 of 847"). Never show pagination without context.
- For datasets over 1000 rows, offer filtering and search. Don't rely on pagination alone.
- Empty cells must be marked explicitly (em dash —, "N/A", or "—"). Never leave a cell blank without meaning.

### Charts & Visualizations
- Every chart must have a title that states what it shows and the time period. "Revenue" is not a complete chart title. "Monthly revenue, Jan–Dec 2024" is.
- Axis labels must include units. "$" or "%" or "Users" — never unitless axes.
- Color in charts must be accessible. Never use red/green as the only way to distinguish two data series (colorblind users cannot distinguish them).
- Interactive charts must have a tooltip on hover showing the exact value, not just a position on the axis.
- When a chart has no data for a period, explicitly show the gap — don't connect the line across a missing data point as if the data exists.

### Filters & Search
- Applied filters must be visible and removable from the view they affect. Never hide active filters.
- Filter changes must update results immediately (or within 300ms), not require a separate "Apply filters" action — unless the filter combination is expensive and a manual apply is genuinely necessary.
- Search must search across the most important content fields by default. Advanced search for field-specific queries can be progressive disclosure.
- "No results" from a filter or search must explain what was searched and offer next steps (clear filters, broaden search, contact support).

---

## 11. COMPONENT BEHAVIOR RULES

### Modals & Dialogs
- Modals must be closable by: clicking the × button, pressing Escape, or clicking the backdrop. Never trap a user in a modal.
- Modals must not open other modals (no stacked modals). If additional confirmation is needed, use inline messaging within the existing modal.
- Destructive confirmation dialogs must default focus to the "Cancel" button, not the "Confirm" button.
- Modals that contain forms must save draft state if closed accidentally. Never lose a user's input because they accidentally pressed Escape.

### Toasts & Notifications
- Toasts for non-critical success messages must auto-dismiss after 4–5 seconds.
- Toasts for errors must NOT auto-dismiss. The user must explicitly acknowledge an error.
- Never stack more than 3 toasts simultaneously. Queue them.
- Toasts must be positioned consistently (top-right on desktop, top-center on mobile). Never move them between screens.
- Action toasts ("File deleted. Undo") must give the user at least 5 seconds to act before the action becomes permanent.

### Dropdowns & Selects
- Dropdowns with more than 10 options must have an inline search filter.
- Selected option must always be visible in the dropdown trigger (not just a generic placeholder after selection).
- Multi-select dropdowns must show a count of selected items in the trigger when multiple items are selected.
- Long option labels must truncate with a tooltip revealing the full label on hover.

### Buttons
- Loading state: When a button triggers an async action, it must enter a disabled + loading state immediately on click. Never let a user double-submit.
- Disabled buttons must have a tooltip or adjacent copy explaining why they are disabled. Never silently disable a button with no explanation.
- Icon-only buttons must always have an aria-label and a tooltip on hover.
- Button groups (e.g., "Save" + "Save and publish") must clearly distinguish the primary from the secondary action through visual hierarchy.

---

## 12. PSYCHOLOGICAL LAWS OF UX

These core cognitive psychology laws must guide all design and interaction decisions:

### Aesthetic-Usability Effect
- Users often perceive aesthetically pleasing design as design that's more usable.
- **Rule:** Spend effort on premium animations, Outfit typography, and balanced orange scale styling—a polished, premium look makes users more tolerant of minor system delays or bugs.

### Doherty Threshold
- Productivity soars when a computer and its users interact at a pace (<400ms) that ensures neither has to wait on the other.
- **Rule:** Keep response times under 400ms. For operations taking longer, immediately show feedback or micro-skeletons to keep the user engaged.

### Fitts's Law
- The time to acquire a target is a function of the distance to and size of the target.
- **Rule:** Standard touch targets must be at least 44x44px. Critical or high-frequency buttons must be physically larger and placed in highly accessible screen coordinates.

### Hick's Law
- The time it takes to make a decision increases with the number and complexity of choices.
- **Rule:** Minimize active choices to prevent decision paralysis. Group advanced options under progressive disclosure (e.g. Accordions, "Advanced" tabs).

### Jakob's Law
- Users spend most of their time on other sites. They prefer your site to work the same way as all the other sites they already know.
- **Rule:** Conform strictly to common visual conventions. Use standard icons (gear for settings, folder for projects, trash for delete) and familiar layouts.

### Miller's Law
- The average person can only keep 7 (plus or minus 2) items in their working memory.
- **Rule:** Do not show more than 7 ± 2 distinct elements or text blocks in one visual group. Use borders, white space, and dividers to chunk complex dashboards.

### Peak-End Rule
- People judge an experience largely based on how they felt at its peak and at its end, rather than the total sum or average of every moment.
- **Rule:** Deliver exceptional high-fidelity visual and haptic feedback during key peaks (e.g., successful database deploy) and the final exit interaction (receipts, success toasts).

### Postel's Law (Robustness Principle)
- Be liberal in what you accept, and conservative in what you send.
- **Rule:** Be highly tolerant of user input variations (e.g., accept spaces or dashes in inputs, trim whitespace, ignore casing in codes), but output clean, strictly structured data.

### Serial Position Effect
- Users have a tendency to best remember the first and last items in a series.
- **Rule:** Place the most critical nav items or main action buttons at the absolute start or end of lists and button groups.

### Tesler's Law (Conservation of Complexity)
- For any system, there is a certain amount of complexity which cannot be reduced.
- **Rule:** Do not over-simplify forms to the point of hiding crucial context. Move the complexity load to the system, but represent any irreducible complexity clearly.

### Von Restorff Effect (Isolation Effect)
- When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.
- **Rule:** Make distinct actions (like destructive "Delete" buttons or active billing alert badges) visually unique to instantly isolate and call attention.

### Zeigarnik Effect
- People remember uncompleted or interrupted tasks better than completed tasks.
- **Rule:** Show clear visual cues for incomplete workflows (e.g. "Draft", "2 of 4 steps completed", or a persistent progress bar) to motivate completion.
`;
}

