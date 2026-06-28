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

Use JavaScript everywhere.

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

## UI, Theme & Motion Standards

### Design Philosophy

* Every interface must feel premium, polished, modern, and highly interactive—not just functional.
* Build experiences that feel like professionally designed desktop software rather than generic CRUD applications.
* Every interaction should provide meaningful visual feedback.
* Avoid static interfaces whenever motion or interaction can improve usability.

---

## Theme Guidelines

### Default Theme

Unless explicitly instructed otherwise, use a theme inspired by **Visual Studio 2017 Dark**.

Guidelines:

* Dark charcoal backgrounds
* Blue accent colors similar to Visual Studio
* High readability and proper contrast
* Minimalistic, developer-focused appearance
* Consistent spacing and typography
* Soft borders instead of harsh outlines
* Modern rounded corners (avoid excessive radius)
* Clean shadows and layered depth where appropriate

The interface should feel like a premium IDE rather than a typical website.

---

## Component Library

Default UI stack:

* **shadcn/ui** for components
* Tailwind CSS for styling
* Use Radix primitives where applicable
* Avoid building basic UI components from scratch when robust community solutions already exist.

---

## Motion & Animation Policy

Animations should feel intentional, smooth, and professional.

Prefer using established animation libraries instead of custom implementations.

Recommended libraries:

* **GSAP** — timelines, stagger animations, scroll animations, advanced motion
* **Framer Motion** — React component transitions and layout animations
* **Anime.js** — reusable animation patterns and inspiration
* **Locomotive Scroll** (or an equivalent maintained smooth-scroll library when appropriate) — smooth scrolling experiences
* Native CSS transitions for simple hover and state changes

Do not reinvent animation systems when proven solutions already exist.

When implementing animations:

* Reuse publicly available animation techniques and patterns whenever possible.
* Use Anime.js examples as inspiration before inventing new motion.
* Keep animations performant.
* Motion should improve usability instead of becoming decoration.
* Avoid distracting or overly flashy animations.

---

## Interactive Experience

Every interactive element should feel responsive.

Ensure:

* Smooth hover states
* Active states
* Focus states
* Button press animations
* Card hover effects
* Smooth page transitions
* Animated drawers
* Animated dialogs
* Animated dropdowns
* Smooth navigation
* Skeleton loading animations
* Success and error transitions
* Scroll-triggered reveals where appropriate
* Staggered list animations where appropriate

Nothing should appear abruptly unless intentionally designed.

---

## Performance

* Favor hardware-accelerated animations (`transform` and `opacity`) whenever possible.
* Avoid layout thrashing.
* Keep animations smooth even on lower-end devices.
* Respect reduced-motion preferences when appropriate.

---

## Completion Checklist

Before considering any UI task complete, verify:

* The interface feels premium.
* The theme consistently matches Visual Studio 2017 Dark.
* Components use shadcn/ui whenever suitable.
* Motion feels smooth and intentional.
* Interactive elements provide visual feedback.
* Loading states are polished.
* Empty states are designed.
* Error states are informative.
* Animations are consistent throughout the application.
* The interface feels alive without becoming distracting.

---

## Final Reminder

Before finishing any UI implementation, always ask:

> "Would this interface feel polished enough to be mistaken for a professionally designed desktop application?"

If the answer is **no**, continue refining the UI, interactions, and motion until it does.
