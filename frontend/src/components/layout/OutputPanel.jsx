import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Terminal, FileJson, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

const tabs = [
  { id: 'logs', label: 'Logs', icon: Terminal },
  { id: 'json', label: 'JSON', icon: FileJson },
  { id: 'output', label: 'Output', icon: Play },
];

const OutputPanel = memo(function OutputPanel({
  isOpen,
  onToggle,
  activeTab = 'logs',
  onTabChange,
  nodes = [],
  edges = [],
  logs = [],
}) {
  return (
    <div className="border-t border-border bg-card shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer outline-none focus-visible:bg-accent"
        aria-expanded={isOpen}
        aria-controls="output-panel-content"
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        <span className="font-medium">Output</span>
        {logs.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-primary/20 text-primary rounded-full">
            {logs.length}
          </span>
        )}
        <div className="flex-1" />
        {isOpen && (
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-sm transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    activeTab === tab.id
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon size={11} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="output-panel-content"
            initial={{ height: 0 }}
            animate={{ height: 180 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden bg-background"
          >
            <div className="h-full overflow-y-auto px-4 py-2 font-mono text-xs">
              {activeTab === 'logs' && (
                <LogsView logs={logs} />
              )}
              {activeTab === 'json' && (
                <JsonView nodes={nodes} edges={edges} />
              )}
              {activeTab === 'output' && (
                <div className="text-muted-foreground py-4 text-center">
                  Run the workflow to see output here.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

function LogsView({ logs }) {
  if (logs.length === 0) {
    return (
      <div className="text-muted-foreground py-4 text-center">
        No logs yet. Generate or run a workflow to see logs.
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-muted-foreground shrink-0">{log.time}</span>
          <span className={cn(
            log.type === 'error' ? 'text-destructive' : 'text-foreground'
          )}>
            {log.message}
          </span>
        </div>
      ))}
    </div>
  );
}

function JsonView({ nodes, edges }) {
  const workflow = {
    nodes: nodes.map(({ id, type, position, data }) => ({
      id, type, position,
      data: { label: data.label, config: data.config },
    })),
    edges: edges.map(({ id, source, target, type }) => ({
      id, source, target, type,
    })),
  };

  return (
    <pre className="text-[#4ec9b0] whitespace-pre-wrap leading-relaxed">
      {JSON.stringify(workflow, null, 2)}
    </pre>
  );
}

export default OutputPanel;
