/**
 * Template API service.
 */

import { getTemplates as getMockTemplates, getTemplateById as getMockById } from '../data/templates';

const USE_MOCKS = true;

export async function fetchTemplates(category = null) {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true, data: getMockTemplates(category) };
  }

  const { default: api } = await import('./api');
  const params = category ? { category } : {};
  return api.get('/templates', { params });
}

export async function fetchTemplateById(id) {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 200));
    const template = getMockById(id);
    if (!template) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Template not found' } };
    }
    return { success: true, data: template };
  }

  const { default: api } = await import('./api');
  return api.get(`/templates/${id}`);
}

export default { fetchTemplates, fetchTemplateById };
