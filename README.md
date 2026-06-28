# AI Workflow Builder

An AI-powered automation platform that converts natural language into visual, executable workflows.

> "When a customer fills my contact form, save the information to Google Sheets and send me an email."

The AI understands your intent and builds a complete workflow with triggers, actions, conditions, and outputs — all visualized on an interactive canvas.

## Features

- **Natural Language → Workflow**: Describe automations in plain English
- **Visual Canvas**: Drag-and-drop workflow editor built on React Flow
- **Custom Nodes**: Trigger, Action, Condition, and Output node types
- **Animated Edges**: Flowing dot animations along workflow connections
- **AI Generation Experience**: Premium loading with fluid + particle animations
- **Template Gallery**: Pre-built workflow templates for quick start
- **Properties Editor**: Click any node to edit its configuration
- **Undo/Redo**: Full history with Ctrl+Z / Ctrl+Shift+Z
- **Export**: Export workflows as JSON or n8n-compatible format
- **Dark Theme**: Premium dark UI with glassmorphism

## Tech Stack

| Layer    | Technology                                          |
| -------- | --------------------------------------------------- |
| Frontend | React 19, Vite 8, Tailwind CSS 4, React Flow 12    |
| Animation| Framer Motion, Canvas API                           |
| Backend  | FastAPI, Python *(planned)*                         |
| AI       | Gemini API *(planned)*                              |
| Database | SQLite / PostgreSQL *(planned)*                     |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Production Build

```bash
cd frontend
npm run build
npm run preview
```

## Project Structure

```
├── frontend/          # React application
├── backend/           # FastAPI application (planned)
├── docs/              # Architecture and API documentation
├── CLAUDE.md          # AI coding assistant rules
├── AGENTS.md          # Multi-agent development roles
└── PROJECT_RULES.md   # Project-wide coding standards
```

## Documentation

- [Frontend Architecture](docs/FRONTEND_ARCHITECTURE.md)
- [API Integration Guide](docs/API_INTEGRATION.md)
- [Project Flow](docs/PROJECT_FLOW.md)

## Architecture

```
User → Prompt → Frontend → FastAPI → Gemini AI → Workflow JSON → React Flow → n8n Export
```

## License

Private project.
