/**
 * Drag and drop hook for adding nodes from sidebar to the React Flow canvas.
 */

import { useCallback, useRef } from 'react';
import { createNode } from '../utils/workflowUtils';

export function useDragAndDrop(reactFlowInstance, onNodeAdd) {
  const dragDataRef = useRef(null);

  const onDragStart = useCallback((event, nodeType, subtype) => {
    dragDataRef.current = { nodeType, subtype };
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, subtype }));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      const { nodeType, subtype } = JSON.parse(rawData);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const node = createNode({
        type: nodeType,
        label: subtype
          ? subtype.charAt(0).toUpperCase() + subtype.slice(1).replace(/_/g, ' ')
          : nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
        position,
        config: subtype ? { subtype } : {},
      });

      if (onNodeAdd) {
        onNodeAdd(node);
      }
    },
    [reactFlowInstance, onNodeAdd]
  );

  return { onDragStart, onDragOver, onDrop };
}

export default useDragAndDrop;
