# Frontend Architecture

## Overview

The AI Workflow Builder frontend is a React application built with Vite, Tailwind CSS v4, React Flow, and Framer Motion. It converts natural language prompts into visual automation workflows.

## Technology Stack

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| React 19       | UI framework                     |
| Vite 8         | Build tool and dev server        |
| Tailwind CSS 4 | Utility-first styling            |
| React Flow 12  | Workflow canvas and node editor  |
| Framer Motion  | Animations and transitions       |
| Axios          | HTTP client                      |
| Lucide React   | Icon library                     |
| React Router   | Client-side routing              |

## Folder Structure

```
frontend/src/
├── animations/          # Framer Motion variants and configs
│   └── variants.js
├── assets/              # Static assets
├── components/
│   ├── generation/      # AI generation loading experience
│   │   ├── FluidAnimation.jsx
│   │   ├── ParticleAnimation.jsx
│   │   ├── ProgressMessages.jsx
│   │   └── GenerationOverlay.jsx
│   ├── layout/          # Shell layout components
│   │   ├── Sidebar.jsx
│   │   ├── Toolbar.jsx
│   │   ├── PropertiesPanel.jsx
│   │   └── OutputPanel.jsx
│   ├── prompt/          # AI prompt input components
│   │   ├── PromptEditor.jsx
│   │   ├── PromptSuggestions.jsx
│   │   └── TemplateSelector.jsx
│   ├── ui/              # Reusable UI primitives
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Dropdown.jsx
│   │   ├── IconButton.jsx
│   │   ├── Input.jsx
│   │   ├── Kbd.jsx
│   │   ├── Modal.jsx
│   │   ├── Textarea.jsx
│   │   ├── Toast.jsx
│   │   ├── Tooltip.jsx
│   │   └── index.js
│   └── workflow/        # React Flow canvas components
│       ├── edges/
│       │   └── AnimatedEdge.jsx
│       ├── nodes/
│       │   ├── ActionNode.jsx
│       │   ├── BaseNode.jsx
│       │   ├── ConditionNode.jsx
│       │   ├── OutputNode.jsx
│       │   └── TriggerNode.jsx
│       ├── NodePalette.jsx
│       └── WorkflowCanvas.jsx
├── config/
│   └── env.js
├── constants/
│   └── workflowConstants.js
├── context/             # React Context providers
│   ├── GenerationContext.jsx
│   ├── UIContext.jsx
│   └── WorkflowContext.jsx
├── data/                # Mock data and definitions
│   ├── mockWorkflows.js
│   ├── nodeTypes.js
│   └── templates.js
├── hooks/               # Custom React hooks
│   ├── useAutoResize.js
│   ├── useDragAndDrop.js
│   ├── useKeyboardShortcuts.js
│   └── useWorkflow.js
├── layouts/
│   └── AppLayout.jsx
├── pages/
│   ├── BuilderPage.jsx
│   ├── HomePage.jsx
│   └── NotFoundPage.jsx
├── services/            # API service layer
│   ├── api.js
│   ├── templateService.js
│   └── workflowService.js
├── styles/
│   └── (see src/index.css)
├── utils/
│   └── workflowUtils.js
├── App.jsx
├── main.jsx
└── index.css
```

## State Management

Three React Context providers manage global state:

### WorkflowContext

Manages workflow data: nodes, edges, selected node, metadata, undo/redo history.

Uses `useReducer` with a capped history stack (50 entries) for undo/redo.

### UIContext

Manages UI state: panel visibility, widths, active tabs, modal state, toast notifications.

### GenerationContext

Manages AI generation state: prompt, status, progress step, result/error.

## Component Architecture

### UI Primitives (`components/ui/`)

Inspired by shadcn/ui patterns but written in plain JavaScript. All components:
- Use Tailwind CSS classes
- Support Framer Motion animations
- Include ARIA attributes
- Follow consistent variant/size APIs

### Custom Nodes (`components/workflow/nodes/`)

All nodes extend `BaseNode.jsx` which provides:
- Consistent styling and animations
- React Flow handle placement
- Selection state visualization
- Gradient accent bars per node type

### Layout System

`AppLayout.jsx` composes:
- **Toolbar** (top): workflow name, undo/redo, save/run
- **Sidebar** (left): collapsible with node palette, templates, recent
- **Canvas** (center): React Flow with custom nodes and edges
- **PropertiesPanel** (right): contextual node property editor
- **OutputPanel** (bottom): collapsible logs/JSON/output tabs

## Routing

| Path       | Page        | Description                      |
| ---------- | ----------- | -------------------------------- |
| `/`        | HomePage    | Landing with prompt editor       |
| `/builder` | BuilderPage | Full workflow builder interface   |
| `*`        | NotFoundPage | 404 with navigation              |

All pages are lazy-loaded with `React.lazy()` and `Suspense`.

## Design System

Defined in `src/index.css` using Tailwind CSS v4's `@theme` directive:

- **Colors**: Dark-first palette with surface layers, accent colors (violet, cyan, amber, emerald, rose)
- **Glass effects**: `backdrop-blur` based glassmorphism
- **Typography**: Inter (sans) + JetBrains Mono (mono)
- **Animations**: CSS keyframes + Framer Motion variants

## API Layer

See `API_INTEGRATION.md` for details.
