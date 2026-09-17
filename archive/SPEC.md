# DIGITAL LOGIC LAB — Shared Specification

This file defines the exact HTML structure, element IDs, class names, CSS variables,
and JavaScript interface that all three files (index.html, style.css, script.js) must follow.

## CSS Variables (defined in :root)

```
--bg-primary: #0a0e17
--bg-secondary: #111827
--bg-card: #1a1f2e
--bg-card-hover: #242a3d
--accent-purple: #8b5cf6
--accent-blue: #3b82f6
--accent-cyan: #06b6d4
--color-high: #22c55e
--color-low: #ef4444
--color-dontcare: #f59e0b
--text-primary: #f1f5f9
--text-secondary: #94a3b8
--text-muted: #64748b
--border-color: #1e293b
--sidebar-width: 260px
--header-height: 64px
--glow-green: 0 0 12px rgba(34,197,94,0.6)
--glow-red: 0 0 12px rgba(239,68,68,0.4)
--glow-purple: 0 0 15px rgba(139,92,246,0.3)
```

## HTML Structure (Exact IDs and Classes)

```html
<body>
  <div id="app">
    <!-- HEADER -->
    <header id="app-header">
      <button id="menu-toggle" class="menu-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>  <!-- 3 bars for hamburger -->
      </button>
      <div class="header-content">
        <h1 class="header-title">DIGITAL LOGIC LAB</h1>
        <p class="header-subtitle">Interactive Boolean Logic & Digital Circuit Simulator</p>
      </div>
      <div class="header-status">
        <span class="status-dot"></span>
        <span class="status-text">Simulation Ready</span>
      </div>
    </header>

    <!-- SIDEBAR -->
    <nav id="sidebar">
      <div class="nav-items">
        <button class="nav-item active" data-module="dashboard">
          <span class="nav-icon">📊</span><span class="nav-label">Dashboard</span>
        </button>
        <button class="nav-item" data-module="gates">
          <span class="nav-icon">⚡</span><span class="nav-label">Logic Gate Simulator</span>
        </button>
        <button class="nav-item" data-module="truthtable">
          <span class="nav-icon">📋</span><span class="nav-label">Truth Table Generator</span>
        </button>
        <button class="nav-item" data-module="universal">
          <span class="nav-icon">🔧</span><span class="nav-label">Universal Gates</span>
        </button>
        <button class="nav-item" data-module="kmap">
          <span class="nav-icon">🗺️</span><span class="nav-label">K-Map Solver</span>
        </button>
        <button class="nav-item" data-module="learn">
          <span class="nav-icon">📚</span><span class="nav-label">Learn / Reference</span>
        </button>
      </div>
    </nav>

    <!-- SIDEBAR OVERLAY for mobile -->
    <div id="sidebar-overlay"></div>

    <!-- MAIN CONTENT -->
    <main id="main-content">
      <!-- Each module is a <section> with class="module" and id="module-{name}" -->
      <!-- Only the active module has class "active" -->
      
      <section class="module active" id="module-dashboard">...</section>
      <section class="module" id="module-gates">...</section>
      <section class="module" id="module-truthtable">...</section>
      <section class="module" id="module-universal">...</section>
      <section class="module" id="module-kmap">...</section>
      <section class="module" id="module-learn">...</section>
    </main>
  </div>

  <!-- Toast notification container -->
  <div id="toast-container"></div>
</body>
```

## Module-Specific IDs

### Dashboard (#module-dashboard)
- `.dashboard-cards` — grid container for feature cards
- `.dash-card` — individual feature cards
- `#btn-start-sim` — "Start Simulation" button
- `.learn-section` — "What you will learn" section

### Logic Gate Simulator (#module-gates)
- `.gate-selector` — gate selection button group
- `.gate-btn[data-gate="X"]` — gate buttons (and, or, not, nand, nor, xor, xnor)
- `.gate-btn.active` — currently selected gate
- `#gate-workspace` — main simulation workspace
- `#gate-circuit-svg` — SVG element for circuit diagram (width 500, height 300)
- `.input-controls` — container for switches
- `#input-b-group` — input B container (hidden for NOT gate)
- `.switch-track` / `.switch-thumb` — inside switch buttons
- `#switch-a` — input A toggle button, has class "on" when high
- `#switch-b` — input B toggle button, has class "on" when high
- `#label-a` — shows "A = 0" or "A = 1"
- `#label-b` — shows "B = 0" or "B = 1"
- `.output-display` — output section
- `#output-led` — LED indicator div, has class "high" or "low"
- `#output-value` — text showing "OUTPUT: HIGH (1)" or "OUTPUT: LOW (0)"
- `#gate-truth-table` — truth table <table> element
- `#gate-info-panel` — gate info panel
- `#gate-info-name` — gate name heading
- `#gate-info-symbol` — small SVG showing gate symbol
- `#gate-info-expression` — boolean expression text
- `#gate-info-inputs` — number of inputs
- `#gate-info-description` — description paragraph
- `#gate-info-example` — real-world example
- `.sim-controls` — simulation control buttons container
- `#btn-reset-gate` — Reset button
- `#btn-random-gate` — Random Inputs button

### Truth Table Generator (#module-truthtable)
- `.tt-gate-selector` — gate selector for truth table module
- `.tt-gate-btn[data-gate="X"]` — gate buttons  
- `.tt-gate-btn.active` — selected gate
- `#tt-table-container` — container for the full truth table
- `#tt-expression` — boolean expression display
- `#tt-description` — gate description

### Universal Gates (#module-universal)
- `.universal-type-btns` — NAND/NOR type selector container
- `#btn-type-nand` — NAND button, has class "active"
- `#btn-type-nor` — NOR button
- `.universal-impl-btns` — implementation selector (NOT, AND, OR)
- `.impl-btn[data-impl="X"]` — implementation buttons (not, and, or)
- `.impl-btn.active` — selected implementation
- `#universal-circuit-svg` — SVG for universal gate circuit (width 600, height 350)
- `#universal-input-b-group` — input B group (hidden for NOT impl)
- `#universal-switch-a` — input A switch
- `#universal-switch-b` — input B switch
- `#universal-label-a` — "A = 0/1"
- `#universal-label-b` — "B = 0/1"
- `#universal-output-led` — output LED
- `#universal-output-value` — output text
- `#universal-truth-table` — truth table
- `#universal-expression` — boolean expression
- `#universal-explanation` — explanation panel
- `#universal-why` — "Why Universal?" explanation section

### K-Map Solver (#module-kmap)
- `.kmap-var-btns` — variable count selector
- `.var-btn[data-vars="X"]` — variable buttons (2, 3, 4)
- `.var-btn.active` — selected variable count
- `#kmap-minterms-input` — minterms text input
- `#kmap-dontcare-input` — don't care text input
- `#btn-generate-kmap` — Generate K-Map button
- `#btn-clear-kmap` — Clear button
- `#btn-random-kmap` — Random Example button
- `#btn-example-kmap` — Load Example button
- `#kmap-grid-container` — container for the K-map grid table
- `#kmap-result` — results section (hidden until generated)
- `#kmap-original-expr` — original function display
- `#kmap-simplified-expr` — simplified expression display
- `#kmap-groups-list` — list of groups found
- `#kmap-steps` — step-by-step explanation
- `.kmap-cell` — K-map cells in table
- `.kmap-cell.is-one` — cells with value 1
- `.kmap-cell.is-dontcare` — cells with don't care (X)
- `.kmap-cell.is-zero` — cells with value 0
- `.kmap-cell.group-N` — cell belongs to group N (for coloring)

### Learn / Reference (#module-learn)
- `.learn-content` — content container
- `.learn-section` — individual section blocks
- `.learn-section h2` — section headings
- `.gate-summary-table` — summary table of all gates

## Toast Notifications
- `#toast-container` — positioned fixed bottom-right
- `.toast` — individual toast, animated slide-in
- `.toast.success` — green border
- `.toast.error` — red border  
- `.toast.info` — blue border
- Auto-dismiss after 3 seconds

## Key CSS Classes
- `.card` — rounded card with bg-card background
- `.btn` — base button style
- `.btn-primary` — purple accent button
- `.btn-secondary` — outline/subtle button
- `.switch-btn` — toggle switch button
- `.switch-btn.on` — switch in ON position
- `.glow-high` — green glow effect
- `.glow-low` — red glow effect
- `.active-wire` — wire carrying logic 1 (green, animated)
- `.inactive-wire` — wire carrying logic 0 (gray)
- `.highlight-row` — highlighted truth table row
- `.module-title` — h2 title for each module
- `.module-subtitle` — description below title

## JavaScript State Object
```js
const state = {
  currentModule: 'dashboard',
  // Gate simulator
  selectedGate: 'and',
  inputA: 0,
  inputB: 0,
  // Universal gates
  universalType: 'nand',
  universalImpl: 'not',
  universalInputA: 0,
  universalInputB: 0,
  // K-Map
  kmapVars: 2,
  kmapMinterms: [],
  kmapDontcares: [],
  kmapGroups: [],
  kmapGenerated: false
};
```

## JavaScript Key Functions
- `switchModule(moduleName)` — show module, hide others, update nav
- `selectGate(gateName)` — select gate, update simulator
- `toggleInput(which)` — toggle 'a' or 'b' input in gate sim
- `calculateGateOutput(gate, a, b)` — returns 0 or 1
- `updateGateSimulator()` — full update of gate sim (circuit, table, output, info)
- `renderGateCircuit(gate, a, b, output)` — draw SVG circuit
- `renderTruthTable(gate, tableElement, highlightA, highlightB)` — build truth table
- `updateGateInfo(gate)` — populate gate info panel
- `selectUniversalType(type)` — 'nand' or 'nor'
- `selectUniversalImpl(impl)` — 'not', 'and', or 'or'
- `toggleUniversalInput(which)` — toggle universal sim inputs
- `calculateUniversalOutput(type, impl, a, b)` — calculate output
- `updateUniversalSimulator()` — full update
- `renderUniversalCircuit(type, impl, a, b, output)` — draw universal circuit SVG
- `setKmapVars(n)` — set number of variables
- `generateKmap()` — parse inputs, validate, render, solve
- `renderKmapGrid(numVars, minterms, dontcares)` — render K-map table
- `solveKmap(numVars, minterms, dontcares)` — find groups, simplify
- `findPrimeImplicants(numVars, onesSet)` — Quine-McCluskey style
- `generateExpression(groups, numVars)` — SOP expression from groups
- `validateKmapInput(mintermStr, dontcareStr, numVars)` — returns {valid, minterms, dontcares, error}
- `showToast(message, type)` — show toast notification ('success', 'error', 'info')
- `init()` — initialize everything, attach event listeners

## SVG Gate Drawing Conventions
- SVG viewBox for gate simulator: "0 0 500 300"
- SVG viewBox for universal gates: "0 0 600 350"
- Wire colors: active = var(--color-high) #22c55e, inactive = #475569
- Wire stroke-width: 2.5
- Gate body fill: #1e293b (dark), stroke: #8b5cf6 (purple accent)
- Gate body stroke-width: 2
- Input labels at left, output at right
- LED circle at output end

## K-Map Gray Code Ordering
- 2 vars: A (rows 0,1), B (cols 0,1) — just 2x2
- 3 vars: A (rows 0,1), BC cols in order: 00, 01, 11, 10
- 4 vars: AB rows in order: 00, 01, 11, 10; CD cols in order: 00, 01, 11, 10

Minterm-to-cell mapping:
- Given minterm number m, extract variable bits
- Map to row/col using gray code position lookup
- Gray positions: binary 00→pos 0, 01→pos 1, 11→pos 2, 10→pos 3

## K-Map Grouping Algorithm
Use enumeration approach (feasible for ≤16 cells):
1. Enumerate all valid rectangular groups (power-of-2 dimensions, with wraparound)
2. A group is valid if every cell in it is a minterm or don't-care
3. Find prime implicants (groups not contained in any larger valid group)
4. Select essential prime implicants first
5. Greedily cover remaining minterms
6. Generate SOP expression from selected groups

## Group Colors for K-Map Highlighting
```
Group 0: rgba(139, 92, 246, 0.3)  — purple
Group 1: rgba(59, 130, 246, 0.3)  — blue
Group 2: rgba(6, 182, 212, 0.3)   — cyan
Group 3: rgba(34, 197, 94, 0.3)   — green
Group 4: rgba(245, 158, 11, 0.3)  — amber
Group 5: rgba(239, 68, 68, 0.3)   — red
Group 6: rgba(236, 72, 153, 0.3)  — pink
Group 7: rgba(168, 85, 247, 0.3)  — violet
```

## Gate Data Reference
```
AND:  expression "Y = A · B", desc "Output HIGH only when BOTH inputs HIGH"
OR:   expression "Y = A + B", desc "Output HIGH when ANY input is HIGH"  
NOT:  expression "Y = A̅",     desc "Output is the INVERSE of input" (1 input)
NAND: expression "Y = (A · B)̅", desc "Output LOW only when BOTH inputs HIGH"
NOR:  expression "Y = (A + B)̅", desc "Output HIGH only when BOTH inputs LOW"
XOR:  expression "Y = A ⊕ B", desc "Output HIGH when inputs are DIFFERENT"
XNOR: expression "Y = (A ⊕ B)̅", desc "Output HIGH when inputs are SAME"
```

## Responsive Breakpoints
- Desktop: > 1024px — sidebar visible, full layout
- Tablet: 768px - 1024px — sidebar collapsible
- Mobile: < 768px — sidebar hidden, hamburger menu, stacked layout
