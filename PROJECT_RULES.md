# PROJECT_RULES.md

# Project Rules

## General

This project must always remain modular.

Never create monolithic components.

Never duplicate logic.

---

## Frontend

Use JavaScript only.

Never introduce TypeScript.

Prefer reusable components.

Never hardcode API URLs.

Always use the centralized API service.

---

## Backend

Keep routes thin.

Business logic belongs in services.

Always validate AI output.

Never expose API keys.

---

## Workflow Builder

Always use React Flow.

Nodes should remain reusable.

Edges should support animation.

Keep node rendering independent of backend implementation.

---

## UI

Dark mode first.

Responsive.

Smooth animations.

Premium SaaS design.

Accessibility is required.

---

## Documentation

Whenever architecture changes:

Update documentation.

Never leave outdated documentation.

---

## AI Integration

Never assume backend responses.

Gracefully handle:

* Loading
* Errors
* Timeouts
* Invalid JSON

---

## Git

One feature per commit.

Meaningful commit messages.

Never commit secrets.

Never commit broken code.

---

## Final Rule

Every commit should leave the project in a better state than before.
