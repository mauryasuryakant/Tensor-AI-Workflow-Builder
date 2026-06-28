/**
 * Pre-built workflow templates for quick start.
 * Each template includes complete nodes, edges, and metadata.
 */

const templates = [
  {
    id: 'contact-form-sheets-email',
    name: 'Contact Form → Sheets + Email',
    description: 'Save form submissions to Google Sheets and send email notification',
    category: 'forms',
    tags: ['form', 'google-sheets', 'email', 'popular'],
    prompt: 'When a customer fills my contact form, save the information to Google Sheets and send me an email.',
    nodes: [
      {
        id: 'trigger_1',
        type: 'trigger',
        position: { x: 400, y: 60 },
        data: {
          label: 'Form Submitted',
          subtype: 'form',
          config: { formId: 'contact-form' },
          status: 'idle',
        },
      },
      {
        id: 'action_1',
        type: 'action',
        position: { x: 300, y: 220 },
        data: {
          label: 'Save to Google Sheets',
          subtype: 'sheets',
          config: { spreadsheetId: '', sheetName: 'Contacts' },
          status: 'idle',
        },
      },
      {
        id: 'action_2',
        type: 'action',
        position: { x: 500, y: 220 },
        data: {
          label: 'Send Email Notification',
          subtype: 'email',
          config: { to: '', subject: 'New Contact Form Submission' },
          status: 'idle',
        },
      },
      {
        id: 'output_1',
        type: 'output',
        position: { x: 400, y: 380 },
        data: { label: 'Done', status: 'idle' },
      },
    ],
    edges: [
      { id: 'e1', source: 'trigger_1', target: 'action_1', type: 'animated', animated: true },
      { id: 'e2', source: 'trigger_1', target: 'action_2', type: 'animated', animated: true },
      { id: 'e3', source: 'action_1', target: 'output_1', type: 'animated', animated: true },
      { id: 'e4', source: 'action_2', target: 'output_1', type: 'animated', animated: true },
    ],
  },
  {
    id: 'webhook-slack-notify',
    name: 'Webhook → Slack Notification',
    description: 'Receive webhook data and send a formatted message to Slack',
    category: 'notifications',
    tags: ['webhook', 'slack', 'notifications'],
    prompt: 'When I receive a webhook, send a notification to my Slack channel.',
    nodes: [
      {
        id: 'trigger_1',
        type: 'trigger',
        position: { x: 400, y: 60 },
        data: {
          label: 'Webhook Received',
          subtype: 'webhook',
          config: { url: '/api/webhooks/incoming' },
          status: 'idle',
        },
      },
      {
        id: 'action_1',
        type: 'action',
        position: { x: 400, y: 220 },
        data: {
          label: 'Send Slack Message',
          subtype: 'slack',
          config: { channel: '#notifications', message: '' },
          status: 'idle',
        },
      },
      {
        id: 'output_1',
        type: 'output',
        position: { x: 400, y: 380 },
        data: { label: 'Done', status: 'idle' },
      },
    ],
    edges: [
      { id: 'e1', source: 'trigger_1', target: 'action_1', type: 'animated', animated: true },
      { id: 'e2', source: 'action_1', target: 'output_1', type: 'animated', animated: true },
    ],
  },
  {
    id: 'schedule-api-database',
    name: 'Schedule → API Call → Database',
    description: 'Periodically fetch data from an API and store it in a database',
    category: 'data',
    tags: ['schedule', 'api', 'database', 'sync'],
    prompt: 'Every hour, fetch data from an external API and save it to my database.',
    nodes: [
      {
        id: 'trigger_1',
        type: 'trigger',
        position: { x: 400, y: 60 },
        data: {
          label: 'Every Hour',
          subtype: 'schedule',
          config: { cron: '0 * * * *' },
          status: 'idle',
        },
      },
      {
        id: 'action_1',
        type: 'action',
        position: { x: 400, y: 220 },
        data: {
          label: 'Fetch API Data',
          subtype: 'api_call',
          config: { method: 'GET', url: '' },
          status: 'idle',
        },
      },
      {
        id: 'condition_1',
        type: 'condition',
        position: { x: 400, y: 380 },
        data: {
          label: 'Has Data?',
          config: { field: 'response.data', operator: 'exists' },
          status: 'idle',
        },
      },
      {
        id: 'action_2',
        type: 'action',
        position: { x: 280, y: 540 },
        data: {
          label: 'Save to Database',
          subtype: 'database',
          config: { table: 'synced_data', operation: 'insert' },
          status: 'idle',
        },
      },
      {
        id: 'output_1',
        type: 'output',
        position: { x: 520, y: 540 },
        data: { label: 'Skip (No Data)', status: 'idle' },
      },
      {
        id: 'output_2',
        type: 'output',
        position: { x: 280, y: 700 },
        data: { label: 'Saved', status: 'idle' },
      },
    ],
    edges: [
      { id: 'e1', source: 'trigger_1', target: 'action_1', type: 'animated', animated: true },
      { id: 'e2', source: 'action_1', target: 'condition_1', type: 'animated', animated: true },
      { id: 'e3', source: 'condition_1', target: 'action_2', type: 'animated', animated: true, sourceHandle: 'true' },
      { id: 'e4', source: 'condition_1', target: 'output_1', type: 'animated', animated: true, sourceHandle: 'false' },
      { id: 'e5', source: 'action_2', target: 'output_2', type: 'animated', animated: true },
    ],
  },
  {
    id: 'email-conditional-response',
    name: 'Email → Condition → Response',
    description: 'Process incoming emails with conditional logic and auto-respond',
    category: 'email',
    tags: ['email', 'conditional', 'automation'],
    prompt: 'When I receive a support email, check if it is urgent and send an appropriate auto-reply.',
    nodes: [
      {
        id: 'trigger_1',
        type: 'trigger',
        position: { x: 400, y: 60 },
        data: {
          label: 'Email Received',
          subtype: 'webhook',
          config: { event: 'email.received' },
          status: 'idle',
        },
      },
      {
        id: 'condition_1',
        type: 'condition',
        position: { x: 400, y: 220 },
        data: {
          label: 'Is Urgent?',
          config: { field: 'subject', operator: 'contains', value: 'urgent' },
          status: 'idle',
        },
      },
      {
        id: 'action_1',
        type: 'action',
        position: { x: 250, y: 380 },
        data: {
          label: 'Send Urgent Reply',
          subtype: 'email',
          config: { template: 'urgent-response' },
          status: 'idle',
        },
      },
      {
        id: 'action_2',
        type: 'action',
        position: { x: 550, y: 380 },
        data: {
          label: 'Send Standard Reply',
          subtype: 'email',
          config: { template: 'standard-response' },
          status: 'idle',
        },
      },
      {
        id: 'output_1',
        type: 'output',
        position: { x: 400, y: 540 },
        data: { label: 'Complete', status: 'idle' },
      },
    ],
    edges: [
      { id: 'e1', source: 'trigger_1', target: 'condition_1', type: 'animated', animated: true },
      { id: 'e2', source: 'condition_1', target: 'action_1', type: 'animated', animated: true, sourceHandle: 'true' },
      { id: 'e3', source: 'condition_1', target: 'action_2', type: 'animated', animated: true, sourceHandle: 'false' },
      { id: 'e4', source: 'action_1', target: 'output_1', type: 'animated', animated: true },
      { id: 'e5', source: 'action_2', target: 'output_1', type: 'animated', animated: true },
    ],
  },
];

/**
 * Get all templates, optionally filtered by category.
 */
export function getTemplates(category = null) {
  if (!category) return templates;
  return templates.filter((t) => t.category === category);
}

/**
 * Get a single template by its ID.
 */
export function getTemplateById(id) {
  return templates.find((t) => t.id === id) || null;
}

/**
 * Get unique template categories.
 */
export function getTemplateCategories() {
  return [...new Set(templates.map((t) => t.category))];
}

export default templates;
