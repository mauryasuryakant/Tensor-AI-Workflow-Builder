/**
 * Workflow-related constants used across the application.
 * Single source of truth for node types, edge types, and status values.
 */

export const NODE_TYPES = {
  TRIGGER: 'trigger',
  ACTION: 'action',
  CONDITION: 'condition',
  OUTPUT: 'output',
};

export const EDGE_TYPES = {
  ANIMATED: 'animated',
  DEFAULT: 'default',
};

export const WORKFLOW_STATUS = {
  IDLE: 'idle',
  GENERATING: 'generating',
  GENERATED: 'generated',
  ERROR: 'error',
};

export const GENERATION_STEPS = [
  { id: 'understand', label: 'Understanding Request', duration: 1200 },
  { id: 'analyze', label: 'Analyzing Intent', duration: 1000 },
  { id: 'plan', label: 'Planning Workflow', duration: 1400 },
  { id: 'build', label: 'Building Nodes', duration: 1600 },
  { id: 'json', label: 'Creating JSON', duration: 800 },
  { id: 'optimize', label: 'Optimizing Flow', duration: 1000 },
  { id: 'finalize', label: 'Finalizing', duration: 600 },
];

export const PANEL_MIN_WIDTH = 240;
export const PANEL_MAX_WIDTH = 480;
export const PANEL_DEFAULT_WIDTH = 320;
export const OUTPUT_PANEL_MIN_HEIGHT = 120;
export const OUTPUT_PANEL_DEFAULT_HEIGHT = 200;

export const GRID_SIZE = 20;
export const SNAP_GRID = [GRID_SIZE, GRID_SIZE];
