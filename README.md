# Assembly UI ⚡️

> **The AI-Ready, Premium Component & UX Design System Platform.** 

Assembly UI is a modern, high-fidelity component ecosystem and strict UX design framework. It bridges the gap between gorgeous visual styling and perfect user experience compliance, engineered specifically to be consumed by human developers and leveraged by AI coding agents.

Built on top of Radix UI primitives, styled with custom Vanilla CSS and modern Tailwind CSS coordinates, and backed by a comprehensive rule engine, Assembly UI ensures every interface looks stunning, feels premium, and operates with absolute usability.

---

## 🌟 Key Pillars

### 1. Premium & Visual Aesthetics
- **Modern Typography (Outfit)**: Features Outfit typography from Google Fonts, giving headers and body copy a clean, premium, state-of-the-art personality.
- **Harmonious Color Systems**: Curated Classic Dark, Deep Dark, and Light themes optimized for perfect contrast, glassmorphism, and elegant hover animations.
- **Rich Code Presentation**: In-app documentation and codeblocks feature Fira Code with full OpenType ligatures (`=>`, `===`, `!=`) for a highly polished editorial feel.
- **Interactive Sandboxes**: Large 450px viewport previews with segmented control selectors to seamlessly swap between interactive visual states and clean code views.

### 2. Assembly UX Rules Framework (v1.0.0)
Assembly defines a strict set of UX guidelines that are integrated directly into the development workflow:
- **Immediate Feedback**: Actions produce visible feedback within 100ms. Ambiguous clicked states are forbidden.
- **Psychological Laws of UX**: Built-in compliance with the Doherty Threshold (under 400ms feedback), Fitts's Law (sized tap targets), Jakob's Law (familiar patterns), Hick's Law (reduced choice friction), and Miller's Law (chunked content).
- **Form & Field Layout**: Proper label hierarchies, inline errors, automatic focus management, and smart textareas.
- **Accessibility (a11y)**: Focus rings (`inset-focus`), keyboard-navigable tables, `aria-*` attributes, and semantic HTML verified with DevTools auditing.

### 3. @assembly/cli & JSDoc AI Annotation
We believe that AI coding agents should not just copy-paste code—they should build it following strict design rules.
- **`assembly-ui init`**: Automatically initialize your Next.js project with our configuration, themes, and base CSS variables.
- **`assembly-ui ai`**: Generate and export the central `assembly-ux-rules.md` file for your AI agents, and automatically inject JSDoc compliance comments directly into the bottom of your component source files (e.g. `button.tsx`, `dialog.tsx`). This allows any LLM to automatically read and respect the rules of the component during generations.

---

## 🚀 Getting Started

### Installation

To add Assembly to your project, run:

```bash
# Initialize Assembly in your current Next.js project
npx @assembly/cli init
```

### Running the Design System locally

To preview the interactive components, themes, and documentation locally:

```bash
# Clone and install dependencies
git clone https://github.com/himTresor1/asssembly-ui.git
cd asssembly-ui
pnpm install

# Run the dev server and content compiler
pnpm dev:design-system
```

Open [http://localhost:3003](http://localhost:3003) to explore the system.

---

## 🤖 Empowering AI Coding Agents

Assembly UI is explicitly designed to be paired with AI coding assistants (like Claude, Cursor, Copilot, or Gemini). By utilizing the CLI or adding `.cursorrules` / agent system prompts, the AI has direct access to the design language rules:

1. **JSDoc Safety Nets**: Components carry specific JSDoc annotations outlining their exact UX constraints (e.g., "NEVER place more than two primary action buttons side by side").
2. **Context Injection**: Provide your agent with the generated `assembly-ux-rules.md` to ensure it automatically designs forms, loading states, and responsive tables without having to ask you.

---

## 📂 Repository Structure

- `apps/design-system`: The Next.js / Contentlayer documentation and interactive component preview playground.
- `packages/ui`: The core React component library built with Radix UI and Lucide icons.
- `packages/cli`: The `@assembly/cli` source code, template generators, and JSDoc rules injector.
- `packages/config`: Centralized themes, variables, and global CSS config systems.

---

## 📄 License

Licensed under the MIT License.
