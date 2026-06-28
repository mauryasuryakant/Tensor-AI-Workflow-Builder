/**
 * Pure utility functions for workflow operations.
 * No side effects, no React dependencies — pure logic only.
 */

let idCounter = 0;

/**
 * Generate a unique ID with an optional prefix.
 */
export function generateId(prefix = 'node') {
  idCounter += 1;
  return `${prefix}_${Date.now()}_${idCounter}`;
}

/**
 * Calculate automatic layout positions for a list of nodes.
 * Uses a simple top-down layout with horizontal centering.
 */
export function calculateNodePositions(nodes, startX = 400, startY = 80, gapY = 140) {
  return nodes.map((node, index) => ({
    ...node,
    position: node.position || {
      x: startX,
      y: startY + index * gapY,
    },
  }));
}

/**
 * Validate a workflow JSON structure from the API.
 * Returns { valid, errors } — never throws.
 */
export function validateWorkflowJSON(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    errors.push('Workflow data must be an object');
    return { valid: false, errors };
  }

  if (!Array.isArray(data.nodes)) {
    errors.push('Workflow must contain a nodes array');
  } else {
    data.nodes.forEach((node, i) => {
      if (!node.id) errors.push(`Node at index ${i} is missing an id`);
      if (!node.type) errors.push(`Node at index ${i} is missing a type`);
      if (!node.data?.label) errors.push(`Node at index ${i} is missing data.label`);
    });
  }

  if (!Array.isArray(data.edges)) {
    errors.push('Workflow must contain an edges array');
  } else {
    data.edges.forEach((edge, i) => {
      if (!edge.source) errors.push(`Edge at index ${i} is missing source`);
      if (!edge.target) errors.push(`Edge at index ${i} is missing target`);
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Create a node object compatible with React Flow.
 */
export function createNode({ id, type, label, position, config = {} }) {
  return {
    id: id || generateId(type),
    type,
    position: position || { x: 0, y: 0 },
    data: {
      label,
      config,
      status: 'idle',
    },
  };
}

/**
 * Create an edge object compatible with React Flow.
 */
export function createEdge({ source, target, sourceHandle, targetHandle, animated = true }) {
  return {
    id: generateId('edge'),
    source,
    target,
    sourceHandle: sourceHandle || null,
    targetHandle: targetHandle || null,
    type: 'animated',
    animated,
  };
}

/**
 * Find all downstream nodes from a given node ID.
 */
export function getDownstreamNodes(nodeId, edges, visited = new Set()) {
  if (visited.has(nodeId)) return [];
  visited.add(nodeId);

  const directChildren = edges
    .filter((edge) => edge.source === nodeId)
    .map((edge) => edge.target);

  const allDownstream = [...directChildren];
  directChildren.forEach((childId) => {
    allDownstream.push(...getDownstreamNodes(childId, edges, visited));
  });

  return allDownstream;
}

/**
 * Deep clone a workflow safely.
 */
export function cloneWorkflow(workflow) {
  return JSON.parse(JSON.stringify(workflow));
}
