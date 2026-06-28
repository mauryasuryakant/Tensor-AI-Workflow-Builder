/**
 * WorkflowCanvas — main React Flow canvas with custom nodes, edges, and controls.
 */

import { useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import OutputNode from './nodes/OutputNode';
import AnimatedEdge from './edges/AnimatedEdge';
import { useWorkflowContext } from '../../context/WorkflowContext';
import { useUIContext } from '../../context/UIContext';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { GRID_SIZE, SNAP_GRID } from '../../constants/workflowConstants';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  output: OutputNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

const defaultEdgeOptions = {
  type: 'animated',
  animated: true,
};

function WorkflowCanvasInner() {
  const reactFlowInstance = useReactFlow();
  const workflow = useWorkflowContext();
  const ui = useUIContext();
  const reactFlowWrapper = useRef(null);

  const onNodeAdd = useCallback(
    (node) => {
      workflow.dispatch({ type: 'ADD_NODE', payload: node });
    },
    [workflow.dispatch]
  );

  const { onDragOver, onDrop } = useDragAndDrop(reactFlowInstance, onNodeAdd);

  const onNodesChange = useCallback(
    (changes) => {
      const updated = applyChanges(workflow.nodes, changes, 'node');
      workflow.dispatch({ type: 'SET_NODES', payload: updated });
    },
    [workflow.nodes, workflow.dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const updated = applyChanges(workflow.edges, changes, 'edge');
      workflow.dispatch({ type: 'SET_EDGES', payload: updated });
    },
    [workflow.edges, workflow.dispatch]
  );

  const onConnect = useCallback(
    (connection) => {
      const newEdges = addEdge(
        { ...connection, type: 'animated', animated: true },
        workflow.edges
      );
      workflow.dispatch({ type: 'SET_EDGES', payload: newEdges });
    },
    [workflow.edges, workflow.dispatch]
  );

  const onNodeClick = useCallback(
    (_event, node) => {
      workflow.dispatch({ type: 'SELECT_NODE', payload: node.id });
      ui.dispatch({ type: 'OPEN_PROPERTIES' });
    },
    [workflow.dispatch, ui.dispatch]
  );

  const onPaneClick = useCallback(() => {
    workflow.dispatch({ type: 'SELECT_NODE', payload: null });
    ui.dispatch({ type: 'CLOSE_PROPERTIES' });
  }, [workflow.dispatch, ui.dispatch]);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={workflow.nodes}
        edges={workflow.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        defaultEdgeOptions={defaultEdgeOptions}
        snapToGrid
        snapGrid={SNAP_GRID}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={proOptions}
        deleteKeyCode={['Backspace', 'Delete']}
        className="bg-surface-primary"
      >
        <Background
          variant="dots"
          gap={GRID_SIZE}
          size={1}
          color="rgba(255, 255, 255, 0.04)"
        />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            const colors = {
              trigger: '#f59e0b',
              action: '#8b5cf6',
              condition: '#06b6d4',
              output: '#10b981',
            };
            return colors[node.type] || '#8b5cf6';
          }}
          maskColor="rgba(139, 92, 246, 0.08)"
          position="bottom-right"
          pannable
          zoomable
        />
        <Controls
          position="bottom-left"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

/**
 * Apply React Flow changes to nodes or edges.
 */
function applyChanges(items, changes, type) {
  let result = [...items];

  for (const change of changes) {
    switch (change.type) {
      case 'position':
        if (change.position) {
          result = result.map((item) =>
            item.id === change.id
              ? { ...item, position: change.position, dragging: change.dragging }
              : item
          );
        }
        break;
      case 'dimensions':
        if (change.dimensions) {
          result = result.map((item) =>
            item.id === change.id
              ? {
                  ...item,
                  measured: { width: change.dimensions.width, height: change.dimensions.height },
                }
              : item
          );
        }
        break;
      case 'select':
        result = result.map((item) =>
          item.id === change.id ? { ...item, selected: change.selected } : item
        );
        break;
      case 'remove':
        result = result.filter((item) => item.id !== change.id);
        break;
      case 'add':
        result.push(change.item);
        break;
      default:
        break;
    }
  }

  return result;
}

/**
 * Wrapped with ReactFlowProvider for useReactFlow hook access.
 */
export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  );
}
