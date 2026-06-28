/**
 * Mock workflow responses for development.
 * Simulates the API response format defined in CLAUDE.md.
 */

import { getTemplateById } from './templates';

/**
 * Simulate AI-generated workflow from a user prompt.
 * In production, this is replaced by the real API call.
 */
export function generateMockWorkflow(prompt) {
  const promptLower = prompt.toLowerCase();

  if (promptLower.includes('form') && promptLower.includes('sheet')) {
    return createMockResponse(getTemplateById('contact-form-sheets-email'));
  }

  if (promptLower.includes('webhook') && promptLower.includes('slack')) {
    return createMockResponse(getTemplateById('webhook-slack-notify'));
  }

  if (promptLower.includes('schedule') || promptLower.includes('every')) {
    return createMockResponse(getTemplateById('schedule-api-database'));
  }

  if (promptLower.includes('email') && (promptLower.includes('condition') || promptLower.includes('urgent'))) {
    return createMockResponse(getTemplateById('email-conditional-response'));
  }

  return createMockResponse(getTemplateById('contact-form-sheets-email'));
}

function createMockResponse(template) {
  if (!template) {
    return {
      success: false,
      error: {
        code: 'TEMPLATE_NOT_FOUND',
        message: 'Could not generate workflow for the given prompt.',
      },
    };
  }

  return {
    success: true,
    data: {
      id: `wf_${Date.now()}`,
      name: template.name,
      description: template.description,
      nodes: template.nodes,
      edges: template.edges,
      metadata: {
        prompt: template.prompt,
        createdAt: new Date().toISOString(),
        nodeCount: template.nodes.length,
        edgeCount: template.edges.length,
        version: '1.0',
      },
      validation: {
        valid: true,
        warnings: [],
      },
    },
  };
}

/**
 * Mock saved workflows list.
 */
export const savedWorkflows = [
  {
    id: 'wf_001',
    name: 'Contact Form Automation',
    updatedAt: '2025-06-25T10:30:00Z',
    nodeCount: 4,
  },
  {
    id: 'wf_002',
    name: 'Slack Notifier',
    updatedAt: '2025-06-24T14:15:00Z',
    nodeCount: 3,
  },
  {
    id: 'wf_003',
    name: 'Data Sync Pipeline',
    updatedAt: '2025-06-23T09:00:00Z',
    nodeCount: 6,
  },
];
