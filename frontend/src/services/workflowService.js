/**
 * Workflow API service.
 * Uses mock responses when the backend is not available.
 * Swap mock imports for real API calls when the backend is ready.
 */

import api from './api';
import env from '../config/env';
import { generateMockWorkflow } from '../data/mockWorkflows';

const USE_MOCKS = true;

/**
 * Generate a workflow from a natural language prompt.
 */
export async function generateWorkflow(prompt) {
  if (USE_MOCKS) {
    await simulateDelay(4000);
    return generateMockWorkflow(prompt);
  }

  return api.post('/workflows/generate', { prompt });
}

/**
 * Get a saved workflow by ID.
 */
export async function getWorkflow(id) {
  if (USE_MOCKS) {
    await simulateDelay(500);
    return {
      success: true,
      data: { id, name: 'Mock Workflow', nodes: [], edges: [] },
    };
  }

  return api.get(`/workflows/${id}`);
}

/**
 * Save or update a workflow.
 */
export async function saveWorkflow(data) {
  if (USE_MOCKS) {
    await simulateDelay(800);
    return {
      success: true,
      data: { ...data, id: data.id || `wf_${Date.now()}`, updatedAt: new Date().toISOString() },
    };
  }

  if (data.id) {
    return api.put(`/workflows/${data.id}`, data);
  }
  return api.post('/workflows', data);
}

/**
 * Export a workflow in the specified format.
 */
export async function exportWorkflow(id, format = 'n8n') {
  if (USE_MOCKS) {
    await simulateDelay(600);
    return {
      success: true,
      data: {
        format,
        content: JSON.stringify({ mock: true, workflowId: id }, null, 2),
      },
    };
  }

  return api.get(`/workflows/${id}/export`, { params: { format } });
}

function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  generateWorkflow,
  getWorkflow,
  saveWorkflow,
  exportWorkflow,
};
