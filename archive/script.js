'use strict';

// ========================
// STATE
// ========================
const state = {
  currentModule: 'dashboard',
  selectedGate: 'and',
  inputA: 0,
  inputB: 0,
  universalType: 'nand',
  universalImpl: 'not',
  universalInputA: 0,
  universalInputB: 0,
  kmapVars: 2,
  kmapMinterms: [],
  kmapDontcares: [],
  kmapGroups: [],
  kmapGenerated: false
};

// ========================
// GATE DATA
// ========================
const GATE_DATA = {
  and:  { name: 'AND Gate',  expr: 'Y = A · B',       inputs: 2, desc: 'The output is HIGH (1) only when BOTH inputs are HIGH (1).', example: 'Two switches in series — both must be ON for the light to turn ON.' },
  or:   { name: 'OR Gate',   expr: 'Y = A + B',       inputs: 2, desc: 'The output is HIGH (1) when ANY input is HIGH (1).', example: 'Two switches in parallel — either can turn the light ON.' },
  not:  { name: 'NOT Gate',  expr: 'Y = A\'',         inputs: 1, desc: 'The output is the INVERSE of the input. If input is 1, output is 0, and vice versa.', example: 'A normally-closed relay — when energized, it opens (inverts).' },
  nand: { name: 'NAND Gate', expr: 'Y = (A · B)\'',   inputs: 2, desc: 'The output is LOW (0) only when BOTH inputs are HIGH (1). It is the inverse of AND.', example: 'An alarm system — alarm stops only when all sensors detect normally.' },
  nor:  { name: 'NOR Gate',  expr: 'Y = (A + B)\'',   inputs: 2, desc: 'The output is HIGH (1) only when BOTH inputs are LOW (0). It is the inverse of OR.', example: 'A standby indicator — lights up only when all systems are OFF.' },
  xor:  { name: 'XOR Gate',  expr: 'Y = A ⊕ B',       inputs: 2, desc: 'The output is HIGH (1) when the inputs are DIFFERENT.', example: 'A staircase light — toggling either switch changes the light state.' },
  xnor: { name: 'XNOR Gate', expr: 'Y = (A ⊕ B)\'',  inputs: 2, desc: 'The output is HIGH (1) when the inputs are the SAME.', example: 'An equality checker — output is ON when both inputs match.' }
};

// ========================  
// NAVIGATION
// ========================
function switchModule(moduleName) {
  // Hide all .module sections
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
  // Show the target module
  const target = document.getElementById(`module-${moduleName}`);
  if (target) target.classList.add('active');
  
  // Update .nav-item active states
  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.dataset.module === moduleName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  state.currentModule = moduleName;
  
  // Close mobile sidebar if open
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const menuToggle = document.getElementById('menu-toggle');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    if(sidebarOverlay) sidebarOverlay.classList.remove('active');
    if(menuToggle) menuToggle.classList.remove('active');
  }
  
  // Call specific update functions
  if (moduleName === 'gates') updateGateSimulator();
  else if (moduleName === 'truthtable') updateTruthTableModule();
  else if (moduleName === 'universal') updateUniversalSimulator();
}

// ========================
// LOGIC GATE SIMULATOR
// ========================
function calculateGateOutput(gate, a, b) {
  switch (gate) {
    case 'and': return (a && b) ? 1 : 0;
    case 'or': return (a || b) ? 1 : 0;
    case 'not': return a ? 0 : 1;
    case 'nand': return (a && b) ? 0 : 1;
    case 'nor': return (a || b) ? 0 : 1;
    case 'xor': return (a !== b) ? 1 : 0;
    case 'xnor': return (a === b) ? 1 : 0;
    default: return 0;
  }
}

function selectGate(gateName) {
  state.selectedGate = gateName;
  document.querySelectorAll('.gate-btn').forEach(btn => {
    if (btn.dataset.gate === gateName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  const inputBGroup = document.getElementById('input-b-group');
  if (inputBGroup) {
    inputBGroup.style.display = gateName === 'not' ? 'none' : '';
  }
  
  updateGateSimulator();
}

function toggleInput(which) {
  if (which === 'a') {
    state.inputA = state.inputA ? 0 : 1;
  } else if (which === 'b') {
    state.inputB = state.inputB ? 0 : 1;
  }
  updateGateSimulator();
}

function updateGateSimulator() {
  const gate = state.selectedGate;
  const a = state.inputA;
  const b = state.inputB;
  const output = calculateGateOutput(gate, a, b);
  
  const switchA = document.getElementById('switch-a');
  if (switchA) switchA.classList.toggle('on', a === 1);
  const labelA = document.getElementById('label-a');
  if (labelA) labelA.textContent = `A = ${a}`;
  
  const switchB = document.getElementById('switch-b');
  if (switchB) switchB.classList.toggle('on', b === 1);
  const labelB = document.getElementById('label-b');
  if (labelB) labelB.textContent = `B = ${b}`;
  
  const outputLed = document.getElementById('output-led');
  if (outputLed) outputLed.className = output ? 'high' : 'low';
  const outputValue = document.getElementById('output-value');
  if (outputValue) outputValue.textContent = `OUTPUT: ${output ? 'HIGH (1)' : 'LOW (0)'}`;
  
  renderGateCircuit(gate, a, b, output);
  
  const ttElement = document.getElementById('gate-truth-table');
  if (ttElement) renderTruthTable(gate, ttElement, a, b);
  
  updateGateInfo(gate);
}

function renderGateCircuit(gate, a, b, output) {
  const svg = document.getElementById('gate-circuit-svg');
  if (!svg) return;
  svg.innerHTML = '';
  
  const drawWire = (x1, y1, x2, y2, val) => {
    const color = val ? '#22c55e' : '#475569';
    const activeClass = val ? 'active-wire' : 'inactive-wire';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.5" class="${activeClass}" />`;
  };
  
  const drawText = (x, y, text, color = '#f1f5f9') => {
    return `<text x="${x}" y="${y}" fill="${color}" font-family="monospace" font-size="16" alignment-baseline="middle" text-anchor="middle">${text}</text>`;
  };
  
  const drawNode = (x, y, val) => {
    const color = val ? '#22c55e' : '#ef4444';
    return `<circle cx="${x}" cy="${y}" r="8" fill="${color}" />
            ${drawText(x, y, val, '#fff')}`;
  };
  
  let html = '';
  const gateX = 220;
  const gateY = 150;
  
  const drawGateSymbol = (g) => {
    let path = '';
    let hasBubble = false;
    let isXOR = false;
    
    if (g === 'and' || g === 'nand') {
      path = `M ${gateX},${gateY-50} L ${gateX},${gateY+50} L ${gateX+60},${gateY+50} A 50,50 0 0,0 ${gateX+60},${gateY-50} Z`;
      hasBubble = (g === 'nand');
    } else if (g === 'or' || g === 'nor') {
      path = `M ${gateX},${gateY-50} Q ${gateX+30},${gateY} ${gateX},${gateY+50} Q ${gateX+60},${gateY+50} ${gateX+100},${gateY} Q ${gateX+60},${gateY-50} ${gateX},${gateY-50} Z`;
      hasBubble = (g === 'nor');
    } else if (g === 'xor' || g === 'xnor') {
      path = `M ${gateX+10},${gateY-50} Q ${gateX+40},${gateY} ${gateX+10},${gateY+50} Q ${gateX+70},${gateY+50} ${gateX+110},${gateY} Q ${gateX+70},${gateY-50} ${gateX+10},${gateY-50} Z`;
      isXOR = true;
      hasBubble = (g === 'xnor');
    } else if (g === 'not') {
      path = `M ${gateX},${gateY-40} L ${gateX},${gateY+40} L ${gateX+70},${gateY} Z`;
      hasBubble = true;
    }
    
    let gHtml = `<path d="${path}" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" />`;
    if (isXOR) {
      gHtml += `<path d="M ${gateX-5},${gateY-50} Q ${gateX+25},${gateY} ${gateX-5},${gateY+50}" fill="none" stroke="#8b5cf6" stroke-width="2" />`;
    }
    
    let outX = gateX + (g === 'and' || g === 'nand' ? 110 : (g === 'not' ? 70 : 100));
    if (hasBubble) {
      gHtml += `<circle cx="${outX + 8}" cy="${gateY}" r="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" />`;
      outX += 16;
    }
    return { gHtml, outX };
  };
  
  const { gHtml, outX } = drawGateSymbol(gate);
  
  if (gate === 'not') {
    html += drawWire(50, gateY, gateX, gateY, a);
    html += drawText(30, gateY, 'A');
    html += drawNode(80, gateY, a);
  } else {
    let inX = (gate === 'xor' || gate === 'xnor') ? gateX+5 : gateX;
    if(gate==='or' || gate==='nor') inX = gateX+10;
    
    html += drawWire(50, gateY-25, inX, gateY-25, a);
    html += drawText(30, gateY-25, 'A');
    html += drawNode(80, gateY-25, a);
    
    html += drawWire(50, gateY+25, inX, gateY+25, b);
    html += drawText(30, gateY+25, 'B');
    html += drawNode(80, gateY+25, b);
  }
  
  html += gHtml;
  html += drawWire(outX, gateY, 420, gateY, output);
  
  const outColor = output ? '#22c55e' : '#ef4444';
  const glow = output ? 'filter: drop-shadow(0 0 12px rgba(34,197,94,0.6));' : 'filter: drop-shadow(0 0 12px rgba(239,68,68,0.4));';
  html += `<circle cx="430" cy="${gateY}" r="10" fill="${outColor}" style="${glow}" />`;
  html += drawText(460, gateY, 'Y');
  html += drawText(430, gateY-25, output.toString(), '#fff');
  
  svg.innerHTML = html;
}

function renderTruthTable(gate, tableElement, highlightA, highlightB) {
  let thead = tableElement.querySelector('thead');
  let tbody = tableElement.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    tableElement.appendChild(tbody);
  }
  if (!thead) {
    thead = document.createElement('thead');
    tableElement.appendChild(thead);
  }
  
  tbody.innerHTML = '';
  
  if (gate === 'not') {
    thead.innerHTML = '<tr><th>A</th><th>Output (Y)</th></tr>';
    for (let i = 0; i < 2; i++) {
      const out = calculateGateOutput(gate, i, 0);
      const isHighlight = (highlightA !== undefined && highlightA === i);
      const rowClass = isHighlight ? 'class="highlight-row"' : '';
      const outClass = out ? 'val-1' : 'val-0';
      tbody.innerHTML += `<tr ${rowClass}><td>${i}</td><td class="${outClass}">${out}</td></tr>`;
    }
  } else {
    thead.innerHTML = '<tr><th>A</th><th>B</th><th>Output (Y)</th></tr>';
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const out = calculateGateOutput(gate, i, j);
        const isHighlight = (highlightA !== undefined && highlightB !== undefined && highlightA === i && highlightB === j);
        const rowClass = isHighlight ? 'class="highlight-row"' : '';
        const outClass = out ? 'val-1' : 'val-0';
        tbody.innerHTML += `<tr ${rowClass}><td>${i}</td><td>${j}</td><td class="${outClass}">${out}</td></tr>`;
      }
    }
  }
}

function updateGateInfo(gate) {
  const data = GATE_DATA[gate];
  if (!data) return;
  
  const elName = document.getElementById('gate-info-name');
  if (elName) elName.textContent = data.name;
  const elExpr = document.getElementById('gate-info-expression');
  if (elExpr) elExpr.textContent = data.expr;
  const elInputs = document.getElementById('gate-info-inputs');
  if (elInputs) elInputs.textContent = `Inputs: ${data.inputs}`;
  const elDesc = document.getElementById('gate-info-description');
  if (elDesc) elDesc.textContent = data.desc;
  const elEx = document.getElementById('gate-info-example');
  if (elEx) elEx.textContent = `Example: ${data.example}`;
}

// ========================
// TRUTH TABLE GENERATOR
// ========================
function updateTruthTableModule() {
  const activeBtn = document.querySelector('.tt-gate-btn.active');
  const gate = activeBtn ? activeBtn.dataset.gate : 'and';
  
  const ttContainer = document.getElementById('tt-table-container');
  if (ttContainer) {
    let table = ttContainer.querySelector('table');
    if (!table) {
      table = document.createElement('table');
      table.id = 'full-truth-table';
      ttContainer.appendChild(table);
    }
    renderTruthTable(gate, table);
  }
  
  const data = GATE_DATA[gate];
  if (data) {
    const elExpr = document.getElementById('tt-expression');
    if (elExpr) elExpr.textContent = `Expression: ${data.expr}`;
    const elDesc = document.getElementById('tt-description');
    if (elDesc) elDesc.textContent = data.desc;
  }
}

// ========================
// UNIVERSAL GATES
// ========================
function selectUniversalType(type) {
  state.universalType = type;
  const btnNand = document.getElementById('btn-type-nand');
  const btnNor = document.getElementById('btn-type-nor');
  if(btnNand) btnNand.classList.toggle('active', type === 'nand');
  if(btnNor) btnNor.classList.toggle('active', type === 'nor');
  updateUniversalSimulator();
}

function selectUniversalImpl(impl) {
  state.universalImpl = impl;
  document.querySelectorAll('.impl-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.impl === impl);
  });
  
  const bGroup = document.getElementById('universal-input-b-group');
  if (bGroup) {
    bGroup.style.display = impl === 'not' ? 'none' : '';
  }
  updateUniversalSimulator();
}

function toggleUniversalInput(which) {
  if (which === 'a') {
    state.universalInputA = state.universalInputA ? 0 : 1;
  } else if (which === 'b') {
    state.universalInputB = state.universalInputB ? 0 : 1;
  }
  updateUniversalSimulator();
}

function calculateUniversalOutput(type, impl, a, b) {
  const nand = (x, y) => (x && y) ? 0 : 1;
  const nor = (x, y) => (x || y) ? 0 : 1;
  
  if (type === 'nand') {
    if (impl === 'not') return nand(a, a);
    if (impl === 'and') return nand(nand(a, b), nand(a, b));
    if (impl === 'or') return nand(nand(a, a), nand(b, b));
  } else if (type === 'nor') {
    if (impl === 'not') return nor(a, a);
    if (impl === 'or') return nor(nor(a, b), nor(a, b));
    if (impl === 'and') return nor(nor(a, a), nor(b, b));
  }
  return 0;
}

function updateUniversalSimulator() {
  const { universalType: type, universalImpl: impl, universalInputA: a, universalInputB: b } = state;
  const output = calculateUniversalOutput(type, impl, a, b);
  
  const swA = document.getElementById('universal-switch-a');
  if (swA) swA.classList.toggle('on', a === 1);
  const lblA = document.getElementById('universal-label-a');
  if (lblA) lblA.textContent = `A = ${a}`;
  
  const swB = document.getElementById('universal-switch-b');
  if (swB) swB.classList.toggle('on', b === 1);
  const lblB = document.getElementById('universal-label-b');
  if (lblB) lblB.textContent = `B = ${b}`;
  
  const outLed = document.getElementById('universal-output-led');
  if (outLed) outLed.className = output ? 'high' : 'low';
  const outVal = document.getElementById('universal-output-value');
  if (outVal) outVal.textContent = `OUTPUT: ${output ? 'HIGH (1)' : 'LOW (0)'}`;
  
  renderUniversalCircuit(type, impl, a, b, output);
  
  const ttElement = document.getElementById('universal-truth-table');
  if (ttElement) {
    let tbody = ttElement.querySelector('tbody');
    let thead = ttElement.querySelector('thead');
    if(!thead) { thead = document.createElement('thead'); ttElement.appendChild(thead); }
    if(!tbody) { tbody = document.createElement('tbody'); ttElement.appendChild(tbody); }
    tbody.innerHTML = '';
    
    if (impl === 'not') {
      thead.innerHTML = '<tr><th>A</th><th>Output (Y)</th></tr>';
      for(let i=0; i<2; i++) {
        const out = calculateUniversalOutput(type, impl, i, 0);
        const rowClass = (i === a) ? 'class="highlight-row"' : '';
        const outClass = out ? 'val-1' : 'val-0';
        tbody.innerHTML += `<tr ${rowClass}><td>${i}</td><td class="${outClass}">${out}</td></tr>`;
      }
    } else {
      thead.innerHTML = '<tr><th>A</th><th>B</th><th>Output (Y)</th></tr>';
      for(let i=0; i<2; i++) {
        for(let j=0; j<2; j++) {
          const out = calculateUniversalOutput(type, impl, i, j);
          const rowClass = (i === a && j === b) ? 'class="highlight-row"' : '';
          const outClass = out ? 'val-1' : 'val-0';
          tbody.innerHTML += `<tr ${rowClass}><td>${i}</td><td>${j}</td><td class="${outClass}">${out}</td></tr>`;
        }
      }
    }
  }
  
  updateUniversalExpression(type, impl);
  updateUniversalExplanation(type, impl);
}

function renderUniversalCircuit(type, impl, a, b, output) {
  const svg = document.getElementById('universal-circuit-svg');
  if (!svg) return;
  svg.innerHTML = '';
  
  const drawWire = (x1, y1, x2, y2, val) => {
    const color = val ? '#22c55e' : '#475569';
    const activeClass = val ? 'active-wire' : 'inactive-wire';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.5" class="${activeClass}" />`;
  };
  
  const drawText = (x, y, text, color = '#f1f5f9') => {
    return `<text x="${x}" y="${y}" fill="${color}" font-family="monospace" font-size="14" alignment-baseline="middle" text-anchor="middle">${text}</text>`;
  };

  const drawGate = (gx, gy, gateType, label) => {
    let path = '';
    let isNor = gateType === 'nor';
    if (!isNor) {
      path = `M ${gx},${gy-30} L ${gx},${gy+30} L ${gx+40},${gy+30} A 30,30 0 0,0 ${gx+40},${gy-30} Z`;
    } else {
      path = `M ${gx},${gy-30} Q ${gx+20},${gy} ${gx},${gy+30} Q ${gx+40},${gy+30} ${gx+65},${gy} Q ${gx+40},${gy-30} ${gx},${gy-30} Z`;
    }
    let html = `<path d="${path}" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" />`;
    let outX = gx + (isNor ? 65 : 70);
    html += `<circle cx="${outX + 6}" cy="${gy}" r="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="2" />`;
    outX += 12;
    html += drawText(gx + 30, gy, label, '#94a3b8');
    return { html, outX };
  };

  let html = '';
  const G = type.toUpperCase();
  const op = (type === 'nand') ? ((x, y) => (x && y) ? 0 : 1) : ((x, y) => (x || y) ? 0 : 1);
  
  if (impl === 'not') {
    const g = drawGate(250, 175, type, G);
    html += g.html;
    html += drawWire(100, 175, 180, 175, a);
    html += drawWire(180, 175, 180, 160, a);
    html += drawWire(180, 175, 180, 190, a);
    html += drawWire(180, 160, 250, 160, a);
    html += drawWire(180, 190, 250, 190, a);
    html += drawWire(g.outX, 175, 450, 175, output);
    html += drawText(80, 175, `A(${a})`);
    html += drawText(470, 175, `Y(${output})`);
    
  } else if ((type === 'nand' && impl === 'and') || (type === 'nor' && impl === 'or')) {
    const g1 = drawGate(200, 175, type, G + '₁');
    const mid = op(a, b);
    const g2 = drawGate(350, 175, type, G + '₂');
    
    html += g1.html;
    html += g2.html;
    
    html += drawWire(100, 160, 200, 160, a);
    html += drawWire(100, 190, 200, 190, b);
    html += drawWire(g1.outX, 175, 300, 175, mid);
    html += drawWire(300, 175, 300, 160, mid);
    html += drawWire(300, 175, 300, 190, mid);
    html += drawWire(300, 160, 350, 160, mid);
    html += drawWire(300, 190, 350, 190, mid);
    html += drawWire(g2.outX, 175, 500, 175, output);
    
    html += drawText(80, 160, `A(${a})`);
    html += drawText(80, 190, `B(${b})`);
    html += drawText(g1.outX + 15, 160, mid.toString());
    html += drawText(520, 175, `Y(${output})`);
    
  } else if ((type === 'nand' && impl === 'or') || (type === 'nor' && impl === 'and')) {
    const g1 = drawGate(200, 100, type, G + '₁');
    const g2 = drawGate(200, 250, type, G + '₂');
    const g3 = drawGate(400, 175, type, G + '₃');
    
    const m1 = op(a, a);
    const m2 = op(b, b);
    
    html += g1.html;
    html += g2.html;
    html += g3.html;
    
    html += drawWire(100, 100, 150, 100, a);
    html += drawWire(150, 100, 150, 85, a);
    html += drawWire(150, 100, 150, 115, a);
    html += drawWire(150, 85, 200, 85, a);
    html += drawWire(150, 115, 200, 115, a);
    
    html += drawWire(100, 250, 150, 250, b);
    html += drawWire(150, 250, 150, 235, b);
    html += drawWire(150, 250, 150, 265, b);
    html += drawWire(150, 235, 200, 235, b);
    html += drawWire(150, 265, 200, 265, b);
    
    html += drawWire(g1.outX, 100, 350, 100, m1);
    html += drawWire(350, 100, 350, 160, m1);
    html += drawWire(350, 160, 400, 160, m1);
    
    html += drawWire(g2.outX, 250, 350, 250, m2);
    html += drawWire(350, 250, 350, 190, m2);
    html += drawWire(350, 190, 400, 190, m2);
    
    html += drawWire(g3.outX, 175, 500, 175, output);
    
    html += drawText(80, 100, `A(${a})`);
    html += drawText(80, 250, `B(${b})`);
    html += drawText(g1.outX + 15, 85, m1.toString());
    html += drawText(g2.outX + 15, 235, m2.toString());
    html += drawText(520, 175, `Y(${output})`);
  }
  
  svg.innerHTML = html;
}

function updateUniversalExpression(type, impl) {
  const el = document.getElementById('universal-expression');
  if (!el) return;
  if (type === 'nand') {
    if (impl === 'not') el.textContent = "Y = A NAND A = A'";
    if (impl === 'and') el.textContent = "Y = (A NAND B) NAND (A NAND B) = A · B";
    if (impl === 'or') el.textContent = "Y = (A NAND A) NAND (B NAND B) = A + B";
  } else {
    if (impl === 'not') el.textContent = "Y = A NOR A = A'";
    if (impl === 'or') el.textContent = "Y = (A NOR B) NOR (A NOR B) = A + B";
    if (impl === 'and') el.textContent = "Y = (A NOR A) NOR (B NOR B) = A · B";
  }
}

function updateUniversalExplanation(type, impl) {
  const el = document.getElementById('universal-explanation');
  if (!el) return;
  if (type === 'nand') {
    if (impl === 'not') {
      el.innerHTML = "<p>By tying both inputs of a NAND gate together, it effectively acts as a NOT gate. If A=1, 1 NAND 1 = 0. If A=0, 0 NAND 0 = 1.</p>";
    } else if (impl === 'and') {
      el.innerHTML = "<p>An AND gate is simply a NAND gate followed by a NOT gate. We use the first NAND gate to compute A NAND B, then pass the result into a second NAND gate (configured as NOT) to invert it, yielding A AND B.</p>";
    } else if (impl === 'or') {
      el.innerHTML = "<p>By De Morgan's Law, A + B = (A' · B')'. We use two NAND gates to invert A and B separately, then pass their outputs into a third NAND gate. This gives (A' NAND B') = (A' · B')' = A + B.</p>";
    }
  } else {
    if (impl === 'not') {
      el.innerHTML = "<p>By tying both inputs of a NOR gate together, it acts as a NOT gate. If A=1, 1 NOR 1 = 0. If A=0, 0 NOR 0 = 1.</p>";
    } else if (impl === 'or') {
      el.innerHTML = "<p>An OR gate is a NOR gate followed by a NOT gate. We use the first NOR gate to compute A NOR B, then invert it with a second NOR gate (configured as NOT) to get A OR B.</p>";
    } else if (impl === 'and') {
      el.innerHTML = "<p>By De Morgan's Law, A · B = (A' + B')'. We invert A and B using two NOR gates, then pass them into a third NOR gate. This gives (A' NOR B') = (A' + B')' = A · B.</p>";
    }
  }
}

// ========================
// K-MAP SOLVER
// ========================
function setKmapVars(n) {
  state.kmapVars = n;
  document.querySelectorAll('.var-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.vars) === n);
  });
  clearKmap();
}

function validateKmapInput(mintermStr, dontcareStr, numVars) {
  const maxVal = Math.pow(2, numVars) - 1;
  const parseList = (str) => {
    if (!str.trim()) return [];
    const parts = str.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const nums = [];
    for (let p of parts) {
      if (!/^\d+$/.test(p)) throw new Error(`Invalid number format: "${p}"`);
      const n = parseInt(p, 10);
      if (n < 0 || n > maxVal) throw new Error(`Value ${n} out of range for ${numVars} variables (0-${maxVal})`);
      nums.push(n);
    }
    return nums;
  };

  try {
    const minterms = parseList(mintermStr);
    const dontcares = parseList(dontcareStr);
    
    if (minterms.length === 0 && mintermStr.trim() !== '') {
        throw new Error("Invalid format in minterms");
    }

    const minSet = new Set(minterms);
    if (minSet.size !== minterms.length) throw new Error("Duplicate minterms found");
    
    const dcSet = new Set(dontcares);
    if (dcSet.size !== dontcares.length) throw new Error("Duplicate don't-cares found");
    
    for (let m of minterms) {
      if (dcSet.has(m)) throw new Error(`Overlap: ${m} cannot be both a minterm and a don't-care`);
    }

    return { valid: true, minterms, dontcares, error: '' };
  } catch (e) {
    return { valid: false, minterms: [], dontcares: [], error: e.message };
  }
}

function generateKmap() {
  const mInput = document.getElementById('kmap-minterms-input');
  const dInput = document.getElementById('kmap-dontcare-input');
  if (!mInput || !dInput) return;
  
  const mintermStr = mInput.value;
  const dontcareStr = dInput.value;
  
  const res = validateKmapInput(mintermStr, dontcareStr, state.kmapVars);
  if (!res.valid) {
    showToast(res.error, 'error');
    return;
  }
  
  state.kmapMinterms = res.minterms;
  state.kmapDontcares = res.dontcares;
  state.kmapGenerated = true;
  
  const solveRes = solveKmap(state.kmapVars, res.minterms, res.dontcares);
  state.kmapGroups = solveRes.groups;
  
  renderKmapGrid(state.kmapVars, res.minterms, res.dontcares, state.kmapGroups);
  
  const resSection = document.getElementById('kmap-result');
  if (resSection) {
    resSection.style.display = 'block';
    
    let varStr = state.kmapVars === 2 ? "A, B" : state.kmapVars === 3 ? "A, B, C" : "A, B, C, D";
    let orig = `F(${varStr}) = Σm(${res.minterms.join(', ')})`;
    if (res.dontcares.length > 0) orig += ` + d(${res.dontcares.join(', ')})`;
    
    const elOrig = document.getElementById('kmap-original-expr');
    if (elOrig) elOrig.textContent = orig;
    
    const elSimp = document.getElementById('kmap-simplified-expr');
    if (elSimp) elSimp.textContent = solveRes.expression;
    
    const elGroups = document.getElementById('kmap-groups-list');
    if (elGroups) {
      elGroups.innerHTML = '';
      solveRes.groups.forEach((g, idx) => {
        const div = document.createElement('div');
        div.className = `group-item group-${idx % 8}`;
        div.textContent = `Group ${idx}: Cells [${g.cells.join(', ')}] → ${g.term}`;
        elGroups.appendChild(div);
      });
    }
    
    const elSteps = document.getElementById('kmap-steps');
    if (elSteps) {
      elSteps.innerHTML = '';
      solveRes.steps.forEach(step => {
        const div = document.createElement('div');
        div.className = 'step-item';
        div.textContent = step;
        elSteps.appendChild(div);
      });
    }
  }
}

function renderKmapGrid(numVars, minterms, dontcares, groups = []) {
  const container = document.getElementById('kmap-grid-container');
  if (!container) return;
  container.innerHTML = '';
  
  const table = document.createElement('table');
  table.className = 'kmap-table';
  
  const minSet = new Set(minterms);
  const dcSet = new Set(dontcares);
  
  const getCellClass = (m) => {
    let classes = ['kmap-cell'];
    if (minSet.has(m)) classes.push('is-one');
    else if (dcSet.has(m)) classes.push('is-dontcare');
    else classes.push('is-zero');
    
    if (groups && groups.length > 0) {
      const gIndex = groups.findIndex(g => g.cells.includes(m));
      if (gIndex !== -1) {
        classes.push(`group-${gIndex % 8}`);
      }
    }
    return classes.join(' ');
  };
  
  const getCellText = (m) => {
    if (minSet.has(m)) return '1';
    if (dcSet.has(m)) return 'X';
    return '0';
  };
  
  let thead = '<thead>';
  let tbody = '<tbody>';
  
  if (numVars === 2) {
    thead += '<tr><th>A \\ B</th><th>0</th><th>1</th></tr></thead>';
    for (let r = 0; r < 2; r++) {
      tbody += `<tr><th>${r}</th>`;
      for (let c = 0; c < 2; c++) {
        const m = r * 2 + c;
        tbody += `<td class="${getCellClass(m)}">${getCellText(m)}<sub>m${m}</sub></td>`;
      }
      tbody += '</tr>';
    }
  } else if (numVars === 3) {
    const cols = ['00', '01', '11', '10'];
    const grayCols = [0, 1, 3, 2];
    thead += `<tr><th>A \\ BC</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>`;
    for (let r = 0; r < 2; r++) {
      tbody += `<tr><th>${r}</th>`;
      for (let c = 0; c < 4; c++) {
        const m = r * 4 + grayCols[c];
        tbody += `<td class="${getCellClass(m)}">${getCellText(m)}<sub>m${m}</sub></td>`;
      }
      tbody += '</tr>';
    }
  } else if (numVars === 4) {
    const rc = ['00', '01', '11', '10'];
    const gray = [0, 1, 3, 2];
    thead += `<tr><th>AB \\ CD</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>`;
    for (let r = 0; r < 4; r++) {
      tbody += `<tr><th>${rc[r]}</th>`;
      for (let c = 0; c < 4; c++) {
        const m = gray[r] * 4 + gray[c];
        tbody += `<td class="${getCellClass(m)}">${getCellText(m)}<sub>m${m}</sub></td>`;
      }
      tbody += '</tr>';
    }
  }
  
  tbody += '</tbody>';
  table.innerHTML = thead + tbody;
  container.appendChild(table);
}

function solveKmap(numVars, minterms, dontcares) {
  if (minterms.length === 0) {
    return { groups: [], expression: '0', steps: ['No minterms provided, output is 0.'] };
  }
  
  const R = numVars === 2 ? 2 : numVars === 3 ? 2 : 4;
  const C = numVars === 2 ? 2 : 4;
  const grayRows = numVars === 4 ? [0,1,3,2] : [0,1];
  const grayCols = numVars === 2 ? [0,1] : [0,1,3,2];
  
  const getMinterm = (r, c) => {
    if (numVars === 2) return grayRows[r] * 2 + grayCols[c];
    if (numVars === 3) return grayRows[r] * 4 + grayCols[c];
    return grayRows[r] * 4 + grayCols[c];
  };

  const onSet = new Set([...minterms, ...dontcares]);
  
  let validGroups = [];
  const heights = [1, 2, 4].filter(h => h <= R);
  const widths = [1, 2, 4].filter(w => w <= C);
  
  for (let h of heights) {
    for (let w of widths) {
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          let cells = [];
          let allOn = true;
          for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
              let rr = (r + i) % R;
              let cc = (c + j) % C;
              let m = getMinterm(rr, cc);
              cells.push(m);
              if (!onSet.has(m)) allOn = false;
            }
          }
          if (allOn) {
            cells.sort((a,b)=>a-b);
            validGroups.push(cells);
          }
        }
      }
    }
  }
  
  // Remove duplicates
  const uniqueGroups = [];
  const seen = new Set();
  for (let g of validGroups) {
    const key = g.join(',');
    if (!seen.has(key)) {
      seen.add(key);
      uniqueGroups.push(g);
    }
  }
  
  // Find prime implicants
  const PIs = [];
  for (let i = 0; i < uniqueGroups.length; i++) {
    let isPrime = true;
    for (let j = 0; j < uniqueGroups.length; j++) {
      if (i === j) continue;
      if (uniqueGroups[i].every(val => uniqueGroups[j].includes(val))) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) PIs.push(uniqueGroups[i]);
  }
  
  // Essential PIs
  const uncoveredMinterms = new Set(minterms);
  const selectedPIs = [];
  
  for (let m of minterms) {
    const coveringPIs = PIs.filter(pi => pi.includes(m));
    if (coveringPIs.length === 1) {
      const epi = coveringPIs[0];
      if (!selectedPIs.includes(epi)) {
        selectedPIs.push(epi);
        epi.forEach(val => uncoveredMinterms.delete(val));
      }
    }
  }
  
  // Greedy cover remaining
  while (uncoveredMinterms.size > 0) {
    let bestPI = null;
    let maxCover = 0;
    for (let pi of PIs) {
      if (selectedPIs.includes(pi)) continue;
      let cover = pi.filter(m => uncoveredMinterms.has(m)).length;
      if (cover > maxCover) {
        maxCover = cover;
        bestPI = pi;
      }
    }
    if (bestPI) {
      selectedPIs.push(bestPI);
      bestPI.forEach(val => uncoveredMinterms.delete(val));
    } else {
      break; 
    }
  }
  
  if (selectedPIs.length === 1 && selectedPIs[0].length === Math.pow(2, numVars)) {
     return { groups: [{cells: selectedPIs[0], term: '1'}], expression: '1', steps: ['Group 0 covers all cells. Expression is 1.'] };
  }

  const varNames = numVars === 2 ? ['A','B'] : numVars === 3 ? ['A','B','C'] : ['A','B','C','D'];
  
  const generateTerm = (cells) => {
    let term = '';
    let elim = [];
    for (let bit = 0; bit < numVars; bit++) {
      let mask = 1 << (numVars - 1 - bit);
      let bitVal = (cells[0] & mask) ? 1 : 0;
      let isConstant = true;
      for (let i = 1; i < cells.length; i++) {
        if (((cells[i] & mask) ? 1 : 0) !== bitVal) {
          isConstant = false;
          break;
        }
      }
      if (isConstant) {
        term += varNames[bit] + (bitVal === 0 ? "'" : '');
      } else {
        elim.push(varNames[bit]);
      }
    }
    return { term: term === '' ? '1' : term, elim };
  };
  
  const groupsOut = [];
  const steps = [];
  const terms = [];
  
  selectedPIs.forEach((cells, idx) => {
    const { term, elim } = generateTerm(cells);
    groupsOut.push({ cells, term });
    terms.push(term);
    let elimStr = elim.length > 0 ? `eliminates {${elim.join(', ')}}` : `eliminates nothing`;
    steps.push(`Group ${idx}: cells {${cells.join(', ')}} → ${elimStr} → term = ${term}`);
  });
  
  const expression = terms.length > 0 ? terms.join(' + ') : '0';
  steps.push(`Final SOP Expression: ${expression}`);
  
  return { groups: groupsOut, expression, steps };
}

function clearKmap() {
  const mInput = document.getElementById('kmap-minterms-input');
  const dInput = document.getElementById('kmap-dontcare-input');
  if(mInput) mInput.value = '';
  if(dInput) dInput.value = '';
  
  const resSection = document.getElementById('kmap-result');
  if (resSection) resSection.style.display = 'none';
  
  state.kmapGenerated = false;
  state.kmapMinterms = [];
  state.kmapDontcares = [];
  state.kmapGroups = [];
  renderKmapGrid(state.kmapVars, [], []);
}

function randomKmapExample() {
  const max = Math.pow(2, state.kmapVars);
  const numMinterms = Math.floor(Math.random() * 5) + 2; 
  const minterms = new Set();
  while(minterms.size < numMinterms && minterms.size < max) {
    minterms.add(Math.floor(Math.random() * max));
  }
  
  const numDc = Math.floor(Math.random() * 3);
  const dontcares = new Set();
  let tries = 0;
  while(dontcares.size < numDc && tries < 20) {
    let r = Math.floor(Math.random() * max);
    if (!minterms.has(r)) dontcares.add(r);
    tries++;
  }
  
  const mInput = document.getElementById('kmap-minterms-input');
  const dInput = document.getElementById('kmap-dontcare-input');
  if(mInput) mInput.value = Array.from(minterms).join(', ');
  if(dInput) dInput.value = Array.from(dontcares).join(', ');
  generateKmap();
}

function loadKmapExample() {
  const mInput = document.getElementById('kmap-minterms-input');
  const dInput = document.getElementById('kmap-dontcare-input');
  if(!mInput || !dInput) return;
  
  if (state.kmapVars === 2) {
    mInput.value = '1, 2, 3';
    dInput.value = '';
  } else if (state.kmapVars === 3) {
    mInput.value = '1, 3, 5, 7';
    dInput.value = '2';
  } else if (state.kmapVars === 4) {
    mInput.value = '0, 2, 8, 10';
    dInput.value = '';
  }
  generateKmap();
}

// ========================
// TOAST NOTIFICATIONS
// ========================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3000);
}

// ========================
// INITIALIZATION
// ========================
function init() {
  // Mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if(sidebar) sidebar.classList.toggle('open');
      if(sidebarOverlay) sidebarOverlay.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if(sidebar) sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      if(menuToggle) menuToggle.classList.remove('active');
    });
  }

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const moduleName = item.dataset.module;
      if (moduleName) switchModule(moduleName);
    });
  });

  const btnStartSim = document.getElementById('btn-start-sim');
  if (btnStartSim) btnStartSim.addEventListener('click', () => switchModule('gates'));
  
  document.querySelectorAll('.dash-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.target;
      if (target) switchModule(target);
    });
  });
  
  // Logic Gate Simulator
  document.querySelectorAll('.gate-btn').forEach(btn => {
    btn.addEventListener('click', () => selectGate(btn.dataset.gate));
  });
  
  const swA = document.getElementById('switch-a');
  if (swA) swA.addEventListener('click', () => toggleInput('a'));
  
  const swB = document.getElementById('switch-b');
  if (swB) swB.addEventListener('click', () => toggleInput('b'));
  
  const btnReset = document.getElementById('btn-reset-gate');
  if (btnReset) btnReset.addEventListener('click', () => {
    state.inputA = 0; state.inputB = 0;
    updateGateSimulator();
  });
  
  const btnRand = document.getElementById('btn-random-gate');
  if (btnRand) btnRand.addEventListener('click', () => {
    state.inputA = Math.random() < 0.5 ? 0 : 1;
    state.inputB = Math.random() < 0.5 ? 0 : 1;
    updateGateSimulator();
  });
  
  // Truth Table Generator
  document.querySelectorAll('.tt-gate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tt-gate-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTruthTableModule();
    });
  });
  
  // Universal Gates
  const btnNand = document.getElementById('btn-type-nand');
  if (btnNand) btnNand.addEventListener('click', () => selectUniversalType('nand'));
  
  const btnNor = document.getElementById('btn-type-nor');
  if (btnNor) btnNor.addEventListener('click', () => selectUniversalType('nor'));
  
  document.querySelectorAll('.impl-btn').forEach(btn => {
    btn.addEventListener('click', () => selectUniversalImpl(btn.dataset.impl));
  });
  
  const uSwA = document.getElementById('universal-switch-a');
  if (uSwA) uSwA.addEventListener('click', () => toggleUniversalInput('a'));
  
  const uSwB = document.getElementById('universal-switch-b');
  if (uSwB) uSwB.addEventListener('click', () => toggleUniversalInput('b'));
  
  // K-Map Solver
  document.querySelectorAll('.var-btn').forEach(btn => {
    btn.addEventListener('click', () => setKmapVars(parseInt(btn.dataset.vars)));
  });
  
  const btnGenKmap = document.getElementById('btn-generate-kmap');
  if (btnGenKmap) btnGenKmap.addEventListener('click', generateKmap);
  
  const btnClearKmap = document.getElementById('btn-clear-kmap');
  if (btnClearKmap) btnClearKmap.addEventListener('click', clearKmap);
  
  const btnRandKmap = document.getElementById('btn-random-kmap');
  if (btnRandKmap) btnRandKmap.addEventListener('click', randomKmapExample);
  
  const btnExKmap = document.getElementById('btn-example-kmap');
  if (btnExKmap) btnExKmap.addEventListener('click', loadKmapExample);
  
  // Initial renders
  updateGateSimulator();
  updateTruthTableModule();
  updateUniversalSimulator();
}

document.addEventListener('DOMContentLoaded', init);
