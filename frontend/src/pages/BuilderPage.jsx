/**
 * BuilderPage — the main workflow builder with full panel layout.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';
import WorkflowCanvas from '../components/workflow/WorkflowCanvas';
import { useWorkflowContext } from '../context/WorkflowContext';
import { useUIContext } from '../context/UIContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { getTemplateById } from '../data/templates';

export default function BuilderPage() {
  const workflow = useWorkflowContext();
  const ui = useUIContext();
  const navigate = useNavigate();

  useKeyboardShortcuts({
    onUndo: () => workflow.dispatch({ type: 'UNDO' }),
    onRedo: () => workflow.dispatch({ type: 'REDO' }),
    onSave: () => {
      ui.dispatch({
        type: 'ADD_TOAST',
        payload: { type: 'success', title: 'Saved', message: 'Workflow saved successfully.' },
      });
    },
    onEscape: () => {
      workflow.dispatch({ type: 'SELECT_NODE', payload: null });
      ui.dispatch({ type: 'CLOSE_PROPERTIES' });
    },
    onGenerate: () => navigate('/'),
  });

  const handleDragStart = useCallback((event, nodeType, subtype) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType, subtype })
    );
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleTemplateSelect = useCallback(
    (templateId) => {
      const template = getTemplateById(templateId);
      if (!template) return;

      workflow.dispatch({
        type: 'SET_WORKFLOW',
        payload: {
          id: template.id,
          name: template.name,
          description: template.description,
          nodes: template.nodes,
          edges: template.edges,
          metadata: { prompt: template.prompt },
          validation: { valid: true, warnings: [] },
        },
      });
    },
    [workflow.dispatch]
  );

  return (
    <AppLayout
      onDragStart={handleDragStart}
      onTemplateSelect={handleTemplateSelect}
    >
      <WorkflowCanvas />
    </AppLayout>
  );
}
