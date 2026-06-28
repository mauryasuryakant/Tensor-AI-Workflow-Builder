# Project Flow

## User Journey

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  Home Page   │ ──▷ │  Generation   │ ──▷ │ Workflow      │ ──▷ │  Export     │
│  (Prompt)    │     │  (AI Loading) │     │ Builder       │     │  (n8n/JSON) │
└─────────────┘     └──────────────┘     └───────────────┘     └─────────────┘
```

### Step 1: Describe Workflow

The user arrives at the Home Page and sees:
- A centered prompt editor (ChatGPT-style)
- Suggestion chips with common workflow ideas
- A template gallery accessible via button
- Feature highlights at the bottom

The user can:
- Type a natural language description
- Click a suggestion chip to auto-fill
- Select a pre-built template

### Step 2: AI Generation

When the user clicks "Generate" or presses Ctrl+Enter:
- A full-screen overlay appears
- Fluid animation plays at the top (interactive, mouse-reactive)
- Particle animation shows below (converges as progress increases)
- Status messages animate through 7 steps:
  1. Understanding Request
  2. Analyzing Intent
  3. Planning Workflow
  4. Building Nodes
  5. Creating JSON
  6. Optimizing Flow
  7. Finalizing

### Step 3: Workflow Builder

After generation completes, the user transitions to the Builder Page:
- **Left Sidebar**: Node palette (draggable), templates, recent workflows
- **Top Toolbar**: Workflow name, undo/redo, save, run, export
- **Center Canvas**: React Flow with custom nodes and animated edges
- **Right Panel**: Properties editor for selected node
- **Bottom Panel**: Logs, JSON output, execution status

The user can:
- Drag nodes from the palette onto the canvas
- Click nodes to edit properties
- Connect nodes by dragging between handles
- Zoom, pan, and use the minimap
- Undo/redo changes
- Rename the workflow

### Step 4: Export

The user exports the workflow:
- Export as JSON
- Export for n8n

## Data Flow

```
User Input (prompt)
    │
    ▼
Frontend Service Layer (workflowService.js)
    │
    ▼ (currently mock, future: real API)
Backend API
    │
    ▼
Gemini AI
    │
    ▼
Workflow JSON { nodes, edges, metadata, validation }
    │
    ▼
WorkflowContext (React state)
    │
    ▼
React Flow Canvas (visualization)
```

## State Flow

```
WorkflowContext ──▷ nodes, edges, selectedNodeId, undo/redo history
UIContext       ──▷ panel visibility, widths, tabs, toasts
GenerationContext ──▷ prompt, status, progress, result/error
```

All context providers wrap the application in `main.jsx`.
