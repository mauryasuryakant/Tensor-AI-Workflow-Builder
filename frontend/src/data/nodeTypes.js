/**
 * Node type definitions for the workflow builder.
 * Each type defines its appearance, handles, and default configuration.
 */
import {
  Zap,
  Play,
  GitBranch,
  CheckCircle,
  Mail,
  Database,
  Globe,
  MessageSquare,
  FileText,
  Clock,
  Webhook,
  Table,
} from 'lucide-react';

import { NODE_TYPES } from '../constants/workflowConstants';

const nodeTypeDefinitions = {
  [NODE_TYPES.TRIGGER]: {
    type: NODE_TYPES.TRIGGER,
    label: 'Trigger',
    description: 'Starts the workflow when an event occurs',
    icon: Zap,
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/40',
    handles: { sources: ['bottom'], targets: [] },
    subtypes: [
      { id: 'webhook', label: 'Webhook', icon: Webhook, description: 'HTTP webhook trigger' },
      { id: 'schedule', label: 'Schedule', icon: Clock, description: 'Time-based trigger' },
      { id: 'form', label: 'Form Submit', icon: FileText, description: 'Form submission trigger' },
    ],
  },
  [NODE_TYPES.ACTION]: {
    type: NODE_TYPES.ACTION,
    label: 'Action',
    description: 'Performs an operation or API call',
    icon: Play,
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/40',
    handles: { sources: ['bottom'], targets: ['top'] },
    subtypes: [
      { id: 'email', label: 'Send Email', icon: Mail, description: 'Send an email notification' },
      { id: 'database', label: 'Database', icon: Database, description: 'Read or write to database' },
      { id: 'api_call', label: 'API Call', icon: Globe, description: 'Make an HTTP request' },
      { id: 'sheets', label: 'Google Sheets', icon: Table, description: 'Add row to spreadsheet' },
      { id: 'slack', label: 'Slack Message', icon: MessageSquare, description: 'Send a Slack message' },
    ],
  },
  [NODE_TYPES.CONDITION]: {
    type: NODE_TYPES.CONDITION,
    label: 'Condition',
    description: 'Branch based on a condition',
    icon: GitBranch,
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    borderColor: 'border-cyan-500/40',
    handles: { sources: ['bottom-left', 'bottom-right'], targets: ['top'] },
    subtypes: [],
  },
  [NODE_TYPES.OUTPUT]: {
    type: NODE_TYPES.OUTPUT,
    label: 'Output',
    description: 'End point of the workflow',
    icon: CheckCircle,
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/40',
    handles: { sources: [], targets: ['top'] },
    subtypes: [],
  },
};

/**
 * Get definition for a specific node type.
 */
export function getNodeTypeDefinition(type) {
  return nodeTypeDefinitions[type] || nodeTypeDefinitions[NODE_TYPES.ACTION];
}

/**
 * Get all node types as an array for the palette.
 */
export function getAllNodeTypes() {
  return Object.values(nodeTypeDefinitions);
}

export default nodeTypeDefinitions;
