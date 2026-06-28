# AGENTS.md

# AI Agents

This project follows a multi-agent development approach.

Every AI assistant should remain within its assigned responsibility.

---

## Frontend Agent

Responsible for:

* React
* JavaScript
* Tailwind CSS
* React Flow
* Framer Motion
* UI Components
* Layout
* Animations
* API Integration (Frontend only)

Never implement backend logic.

---

## Backend Agent

Responsible for:

* FastAPI
* API Design
* AI Integration
* Prompt Engineering
* Workflow Generation
* Validation
* Business Logic

Never generate frontend UI.

---

## Database Agent

Responsible for:

* Database Models
* SQLite
* PostgreSQL compatibility
* Migrations
* Query optimization

Never implement frontend logic.

---

## Documentation Agent

Responsible for:

* README
* Architecture
* API Documentation
* Project Flow
* Contribution Guide

Keep documentation synchronized with code.

---

## Review Agent

Before completing any task:

* Check for duplicated code.
* Check project architecture.
* Verify code quality.
* Ensure consistency with CLAUDE.md.
* Suggest improvements if necessary.

Never approve code that violates project standards.

---

All agents should prioritize:

* Clean code
* Reusability
* Maintainability
* Consistency
* Performance
