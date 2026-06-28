/**
 * Convenience hook wrapping WorkflowContext with action creators.
 */

import { useCallback } from 'react';
import { useWorkflowContext } from '../context/WorkflowContext';
import { createNode, createEdge } from '../utils/workflowUtils';

export function useWorkflow() {
  const context = useWorkflowContext();
  const { dispatch } = context;

  const setWorkflow = useCallback((data) => {
    dispatch({ type: 'SET_WORKFLOW', payload: data });
  }, [dispatch]);

  const addNode = useCallback((nodeConfig) => {
    const node = createNode(nodeConfig);
    dispatch({ type: 'ADD_NODE', payload: node });
    return node;
  }, [dispatch]);

  const removeNode = useCallback((nodeId) => {
    dispatch({ type: 'REMOVE_NODE', payload: nodeId });
  }, [dispatch]);

  const updateNode = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_NODE', payload: { id, data } });
  }, [dispatch]);

  const selectNode = useCallback((nodeId) => {
    dispatch({ type: 'SELECT_NODE', payload: nodeId });
  }, [dispatch]);

  const addEdge = useCallback((edgeConfig) => {
    const edge = createEdge(edgeConfig);
    dispatch({ type: 'ADD_EDGE', payload: edge });
    return edge;
  }, [dispatch]);

  const removeEdge = useCallback((edgeId) => {
    dispatch({ type: 'REMOVE_EDGE', payload: edgeId });
  }, [dispatch]);

  const setName = useCallback((name) => {
    dispatch({ type: 'SET_NAME', payload: name });
  }, [dispatch]);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const onNodesChange = useCallback((changes) => {
    const { nodes } = context;
    const updatedNodes = applyNodeChanges(changes, nodes);
    dispatch({ type: 'SET_NODES', payload: updatedNodes });
  }, [context.nodes, dispatch]);

  const onEdgesChange = useCallback((changes) => {
    const { edges } = context;
    const updatedEdges = applyEdgeChanges(changes, edges);
    dispatch({ type: 'SET_EDGES', payload: updatedEdges });
  }, [context.edges, dispatch]);

  return {
    ...context,
    setWorkflow,
    addNode,
    removeNode,
    updateNode,
    selectNode,
    addEdge,
    removeEdge,
    setName,
    undo,
    redo,
    reset,
    onNodesChange,
    onEdgesChange,
  };
}

/**
 * Minimal implementation of React Flow's applyNodeChanges.
 */
function applyNodeChanges(changes, nodes) {
  let result = [...nodes];
  for (const change of changes) {
    if (change.type === 'position' && change.position) {
      result = result.map((n) =>
        n.id === change.id ? { ...n, position: change.position } : n
      );
    } else if (change.type === 'remove') {
      result = result.filter((n) => n.id !== change.id);
    } else if (change.type === 'select') {
      result = result.map((n) =>
        n.id === change.id ? { ...n, selected: change.selected } : n
      );
    }
  }
  return result;
}

function applyEdgeChanges(changes, edges) {
  let result = [...edges];
  for (const change of changes) {
    if (change.type === 'remove') {
      result = result.filter((e) => e.id !== change.id);
    } else if (change.type === 'select') {
      result = result.map((e) =>
        e.id === change.id ? { ...e, selected: change.selected } : e
      );
    }
  }
  return result;
}

export default useWorkflow;
