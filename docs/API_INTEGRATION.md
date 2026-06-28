# API Integration Guide

## Overview

The frontend API layer is designed for seamless swap between mock data and a real backend. All API calls go through a centralized Axios instance in `src/services/api.js`.

## Configuration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Set in `.env.local` (not committed) or `.env.example` (template).

Accessed via `src/config/env.js` — never use `import.meta.env` directly in components.

## Response Format

All API responses follow the format defined in CLAUDE.md:

### Success

```json
{
  "success": true,
  "data": {}
}
```

### Failure

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Axios Instance (`services/api.js`)

- Base URL from environment
- 30-second timeout
- Request interceptor: attaches auth token from localStorage
- Response interceptor: normalizes errors into the standard format

## Service Modules

### `workflowService.js`

| Method             | Endpoint                     | Description                     |
| ------------------ | ---------------------------- | ------------------------------- |
| `generateWorkflow` | `POST /workflows/generate`   | AI-generate a workflow from prompt |
| `getWorkflow`      | `GET /workflows/:id`         | Fetch a saved workflow          |
| `saveWorkflow`     | `POST/PUT /workflows`        | Create or update a workflow     |
| `exportWorkflow`   | `GET /workflows/:id/export`  | Export to n8n or JSON format    |

### `templateService.js`

| Method              | Endpoint              | Description                    |
| ------------------- | --------------------- | ------------------------------ |
| `fetchTemplates`    | `GET /templates`      | List all templates             |
| `fetchTemplateById` | `GET /templates/:id`  | Get a single template          |

## Mock Mode

Each service module has a `USE_MOCKS = true` flag at the top. When true:
- API calls return mock data from `src/data/`
- A simulated delay mimics network latency
- The response format matches the real API

### Switching to Real API

1. Set `USE_MOCKS = false` in the service file
2. Ensure `VITE_API_BASE_URL` points to the backend
3. Verify the backend returns the expected response format

No component code needs to change — the service interface is identical for mock and real.

## Error Handling

Errors are normalized by the Axios interceptor into:

| Error Type      | Code            | Message                              |
| --------------- | --------------- | ------------------------------------ |
| Network error   | `NETWORK_ERROR` | Network error. Check your connection. |
| Timeout         | `TIMEOUT`       | Request timed out. Please try again. |
| Server 400-503  | `HTTP_{status}` | Context-appropriate message          |
| Unknown         | `UNKNOWN_ERROR` | An unexpected error occurred.        |

Components should catch errors and display them using the Toast system:

```javascript
import { createToast } from '@/components/ui/Toast';

try {
  const result = await generateWorkflow(prompt);
} catch (error) {
  createToast(uiDispatch, {
    type: 'error',
    title: 'Generation Failed',
    message: error.error.message,
  });
}
```
