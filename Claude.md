# AI Workflow Builder

## Project Overview

AI Workflow Builder is an AI-powered automation platform that converts natural language into executable automation workflows.

Example:

> "When a customer fills my contact form, save the information to Google Sheets and send me an email."

The backend converts the request into a structured workflow JSON using Gemini AI.

The frontend visualizes the workflow using React Flow.

Later the workflow can be exported into n8n JSON.

The project focuses on AI Automation, Workflow Orchestration and Intelligent Solutions.

---

# Project Goals

The codebase must always prioritize:

* Clean Architecture
* Readability
* Reusable Components
* Scalability
* Type Safety
* Performance
* Developer Experience

Never generate quick prototype code.

Always generate production-quality code.

---

# Technology Stack

Frontend

- React
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- React Flow
- Framer Motion
- shadcn/ui
- Axios

Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

AI

- Gemini API

Database

- SQLite during development
- PostgreSQL ready

Deployment

* Frontend: Vercel
* Backend: Render or Railway

---

# Architecture

User

↓

Frontend

↓

FastAPI

↓

Gemini API

↓

Workflow Generator

↓

Workflow JSON

↓

React Flow Visualization

↓

n8n Export

Maintain clear separation between frontend, backend and AI layers.

Never mix responsibilities.

---

# Folder Structure

frontend/

backend/

docs/

README.md

CLAUDE.md

---

# Frontend Rules

Use functional React components.

Use TypeScript everywhere.

Keep components small.

Prefer composition over large components.

Never duplicate code.

Extract reusable hooks whenever possible.

Keep business logic outside UI components.

Animations should use Framer Motion.

Workflow visualization must use React Flow.

Avoid inline styles.

Prefer Tailwind utilities.

---

# Backend Rules

Follow FastAPI best practices.

Routes should only validate requests and responses.

Business logic belongs inside services.

Never place AI logic directly inside routes.

Prompt templates should be stored separately.

Return structured JSON only.

Never return raw LLM responses.

Always validate AI output.

---

# API Design

Every API should follow:

Success

{
success: true,
data: {}
}

Failure

{
success: false,
error: {
code,
message
}
}

Never return inconsistent response formats.

---

# AI Rules

Never hardcode workflow generation.

Gemini should always receive structured prompts.

Workflow output must always contain:

Nodes

Edges

Metadata

Validation status

Warnings

Never trust AI output without validation.

---

# React Flow Rules

Nodes must be reusable.

Edges should support animation.

Support:

Zoom

Pan

MiniMap

Controls

Background Grid

Editable Nodes

Future node connection support.

---

# UI Philosophy

The interface should feel like:

Figma

Linear

Notion

n8n

Vercel

Modern AI SaaS

Use dark theme.

Glassmorphism where appropriate.

Smooth animations.

Professional spacing.

Rounded corners.

Consistent typography.

Avoid clutter.

---

# Loading Experience

Never use simple spinners.

During workflow generation:

Display the interactive water animation at the top.

Display the particle generation animation below it.

Animate progress messages such as:

Understanding Request

Analyzing Intent

Finding Services

Building Workflow

Creating JSON

Optimizing Flow

Preparing Visualization

Finalizing

Transition smoothly into the workflow canvas after generation.

---

# Documentation

Whenever major features are added:

Update

README.md

PROJECT_FLOW.md

API_INTEGRATION.md

FRONTEND_ARCHITECTURE.md

BACKEND_ARCHITECTURE.md

Do not leave documentation outdated.

---

# Code Style

Prefer descriptive variable names.

Avoid unnecessary comments.

Functions should have one responsibility.

Avoid deeply nested code.

Prefer async/await.

Never leave TODOs without explanation.

---

# Git Workflow

Main Branch

Stable code only.

Feature branches

One feature per branch.

Small commits.

Meaningful commit messages.

Examples

feat: add workflow generation endpoint

fix: correct node rendering

refactor: simplify API service

docs: update architecture guide

Never commit broken code.

---

# Error Handling

Always handle:

Network failures

Timeouts

Invalid AI responses

Invalid JSON

Unexpected backend responses

Display user-friendly error messages.

No browser alerts.

---

# Security

Never expose API keys.

Always use environment variables.

Validate every backend request.

Sanitize user input.

Never trust client-side validation.

---

# Performance

Lazy load pages.

Memoize expensive components.

Avoid unnecessary re-renders.

Optimize React Flow rendering.

Use code splitting where appropriate.

---

# Accessibility

Keyboard navigation.

Proper focus states.

ARIA labels.

Semantic HTML.

Responsive layouts.

---

# Testing

Write code that is testable.

Avoid tightly coupled modules.

Keep logic independent from UI.

---

# Before Completing Any Task

Always ask yourself:

Is this reusable?

Is this scalable?

Can another developer understand this?

Does it match the project architecture?

Will it make future development easier?

If the answer is no, improve the implementation before considering it complete.

---

# Final Principle

Build software that feels like a commercial AI product, not a college assignment.

Every feature should be modular, documented, maintainable and visually polished.

Prioritize long-term quality over short-term speed.
