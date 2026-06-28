/**
 * AppLayout — main application shell with resizable panels.
 * Uses CSS Grid for the layout structure.
 */

import Sidebar from '../components/layout/Sidebar';
import Toolbar from '../components/layout/Toolbar';
import PropertiesPanel from '../components/layout/PropertiesPanel';
import OutputPanel from '../components/layout/OutputPanel';
import { ToastContainer } from '../components/ui';
import { useUIContext } from '../context/UIContext';
import { useWorkflowContext } from '../context/WorkflowContext';

export default function AppLayout({ children, onDragStart, onTemplateSelect }) {
  const ui = useUIContext();
  const workflow = useWorkflowContext();

  const selectedNode = workflow.nodes.find((n) => n.id === workflow.selectedNodeId);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Toolbar
        workflowName={workflow.name}
        onNameChange={(name) => workflow.dispatch({ type: 'SET_NAME', payload: name })}
        onUndo={() => workflow.dispatch({ type: 'UNDO' })}
        onRedo={() => workflow.dispatch({ type: 'REDO' })}
        canUndo={workflow.canUndo}
        canRedo={workflow.canRedo}
        isDirty={workflow.isDirty}
        onSave={() => {}}
        onExport={() => {}}
        onRun={() => {}}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={ui.sidebarOpen}
          onToggle={() => ui.dispatch({ type: 'TOGGLE_SIDEBAR' })}
          onDragStart={onDragStart}
          onTemplateSelect={onTemplateSelect}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative overflow-hidden">
            {children}
          </div>
          <OutputPanel
            isOpen={ui.outputPanelOpen}
            onToggle={() => ui.dispatch({ type: 'TOGGLE_OUTPUT' })}
            activeTab={ui.activeOutputTab}
            onTabChange={(tab) => ui.dispatch({ type: 'SET_OUTPUT_TAB', payload: tab })}
            nodes={workflow.nodes}
            edges={workflow.edges}
          />
        </div>

        <PropertiesPanel
          isOpen={ui.propertiesPanelOpen && !!selectedNode}
          selectedNode={selectedNode}
          onClose={() => ui.dispatch({ type: 'CLOSE_PROPERTIES' })}
          onUpdateNode={(id, data) =>
            workflow.dispatch({ type: 'UPDATE_NODE', payload: { id, data } })
          }
        />
      </div>

      <ToastContainer />
    </div>
  );
}
