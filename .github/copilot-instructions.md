# Dota 2 Addon with Solid-JS Panorama UI

This is a Dota 2 custom game addon using Solid-JS for Panorama UI development with TypeScript compilation for both UI and VScripts.

## Architecture Overview

**Two-Part Build System:**
- **Panorama UI**: Solid-JS/TSX → Rollup → Panorama JS/XML/CSS (in `content/{addon_name}/panorama/`)
- **VScripts**: TypeScript → TypeScript-to-Lua (TSTL) → Lua files (in `game/{addon_name}/scripts/vscripts/`)

**Key Files:**
- `package.json`: Defines addon name, panorama components, and build scripts
- `rollup/build.ts`: Main build orchestrator for Panorama UI
- `rollup/build-rollup-config.ts`: Rollup configuration with custom plugins
- `src/ui/`: TSX components organized by UI type (hud_main, popups, context_menus, tooltips)

## Essential Development Workflows

**Build Commands:**
```bash
npm run build:solid     # Build Panorama UI once
npm run dev:solid       # Watch Panorama UI changes
npm run build:vscripts  # Compile TypeScript to Lua
npm run dev:vscripts    # Watch VScripts changes
npm run encrypt:vscripts # Encrypt Lua files for distribution
```

**Package.json Configuration:**
The `panorama` section defines which UI components to build:
- `Hud`: Main HUD panels (e.g., "hud_main")
- `Tooltip`: Tooltip components
- `ContextMenu`: Context menu components
- `Common`: Shared components

## Project-Specific Patterns

**Component Structure:**
Each UI component requires three files in `src/ui/{type}/{name}/`:
- `{name}.tsx` - Solid-JS component
- `{name}.xml` - Panorama layout (auto-generated)
- `{name}.less` - Styles

**EOMDesign System:**
Custom component library in `src/components/EOMDesign/` with categories:
- Container: Panels, Popups, Tooltips
- DataDisplay: Avatars, Labels, Progress bars
- Input: Buttons, TextEntry, Dropdowns
- Layout: Separators, Menu layouts

**Polyfills & Runtime:**
- Custom polyfill merging in `rollup/custom-polyfill.js`
- Solid runtime with Panorama compatibility via `@bigciba/solid-panorama-runtime`

**File Organization:**
- `content/{addon_name}/`: Dota 2 addon content (built output)
- `game/{addon_name}/`: Dota 2 game logic (Lua)
- `src/declarations/`: TypeScript definitions for Panorama APIs
- `rollup/`: Build system with custom plugins for XML, LESS, manifests

**Encryption Support:**
VScripts can be encrypted using AES with key from package.json `encryption.key` field.

## Integration Points

**Panorama Manifest Generation:**
`plugin-manifest.ts` auto-generates `custom_ui_manifest.xml` based on package.json panorama config.

**Cross-Component Communication:**
- Global popup system via `CustomUIConfig.showPopup()`
- Shared utilities in `src/utils/`

**Build Output Paths:**
All paths derived from addon name in package.json:
- UI: `content/{name}/panorama/`
- VScripts: `game/{name}/scripts/vscripts/`