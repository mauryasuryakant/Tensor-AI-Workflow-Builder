/**
 * Workflow Context — global state for nodes, edges, and workflow metadata.
 * Uses useReducer for predictable state updates.
 */

import { createContext, useContext, useReducer, useCallback } from 'react';

const WorkflowContext = createContext(null);

const initialState = {
  id: null,
  name: 'Untitled Workflow',
  description: '',
  nodes: [],
  edges: [],
  selectedNodeId: null,
  metadata: null,
  validation: { valid: true, warnings: [] },
  isDirty: false,
  history: [],
  historyIndex: -1,
};

function workflowReducer(state, action) {
  switch (action.type) {
    case 'SET_WORKFLOW':
      return {
        ...state,
        ...action.payload,
        isDirty: false,
        history: [{ nodes: action.payload.nodes, edges: action.payload.edges }],
        historyIndex: 0,
      };

    case 'SET_NODES':
      return {
        ...state,
        nodes: action.payload,
        isDirty: true,
      };

    case 'SET_EDGES':
      return {
        ...state,
        edges: action.payload,
        isDirty: true,
      };

    case 'ADD_NODE': {
      const newNodes = [...state.nodes, action.payload];
      return pushHistory(state, { nodes: newNodes, edges: state.edges, isDirty: true });
    }

    case 'REMOVE_NODE': {
      const nodeId = action.payload;
      const newNodes = state.nodes.filter((n) => n.id !== nodeId);
      const newEdges = state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
      return pushHistory(state, {
        nodes: newNodes,
        edges: newEdges,
        selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        isDirty: true,
      });
    }

    case 'UPDATE_NODE': {
      const { id, data } = action.payload;
      const newNodes = state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      );
      return pushHistory(state, { nodes: newNodes, edges: state.edges, isDirty: true });
    }

    case 'SELECT_NODE':
      return { ...state, selectedNodeId: action.payload };

    case 'ADD_EDGE': {
      const newEdges = [...state.edges, action.payload];
      return pushHistory(state, { nodes: state.nodes, edges: newEdges, isDirty: true });
    }

    case 'REMOVE_EDGE': {
      const newEdges = state.edges.filter((e) => e.id !== action.payload);
      return pushHistory(state, { nodes: state.nodes, edges: newEdges, isDirty: true });
    }

    case 'SET_NAME':
      return { ...state, name: action.payload, isDirty: true };

    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      const prevIndex = state.historyIndex - 1;
      const prev = state.history[prevIndex];
      return {
        ...state,
        nodes: prev.nodes,
        edges: prev.edges,
        historyIndex: prevIndex,
        isDirty: true,
      };
    }

    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const nextIndex = state.historyIndex + 1;
      const next = state.history[nextIndex];
      return {
        ...state,
        nodes: next.nodes,
        edges: next.edges,
        historyIndex: nextIndex,
        isDirty: true,
      };
    }

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

function pushHistory(state, updates) {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push({ nodes: updates.nodes, edges: updates.edges });
  if (newHistory.length > 50) newHistory.shift();
  return {
    ...state,
    ...updates,
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
}

export function WorkflowProvider({ children }) {
  const [state, dispatch] = useReducer(workflowReducer, initialState);

  const value = {
    ...state,
    dispatch,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflowContext() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflowContext must be used within a WorkflowProvider');
  }
  return context;
}

export default WorkflowContext;
