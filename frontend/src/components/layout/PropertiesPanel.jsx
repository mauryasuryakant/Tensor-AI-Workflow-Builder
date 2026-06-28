import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2 } from 'lucide-react';
import IconButton from '../ui/IconButton';
import Input from '../ui/Input';
import Badge from '../ui/Badge';
import { getNodeTypeDefinition } from '../../data/nodeTypes';
import { cn } from '../../lib/utils';

export default function PropertiesPanel({ isOpen, selectedNode, onClose, onUpdateNode }) {
  if (!selectedNode) return null;

  const nodeTypeDef = getNodeTypeDefinition(selectedNode.type);
  const Icon = nodeTypeDef.icon;

  const handleFieldChange = (field, value) => {
    onUpdateNode?.(selectedNode.id, {
      config: { ...selectedNode.data.config, [field]: value },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full bg-card border-l border-border flex flex-col overflow-hidden shrink-0 shadow-sm"
          aria-label="Node properties"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Settings2 size={15} className="text-muted-foreground" />
              <h2 className="text-sm font-semibold text-card-foreground">Properties</h2>
            </div>
            <IconButton icon={X} size="sm" onClick={onClose} aria-label="Close properties" />
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-md bg-gradient-to-br flex items-center justify-center border",
                  nodeTypeDef.gradient,
                  nodeTypeDef.borderColor
                )}
              >
                <Icon size={18} style={{ color: nodeTypeDef.color }} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selectedNode.data.label}</p>
                <Badge color={getColorForType(selectedNode.type)} className="mt-1">
                  {nodeTypeDef.label}
                </Badge>
              </div>
            </div>

            <div className="h-px bg-border" />

            <Input
              label="Label"
              value={selectedNode.data.label || ''}
              onChange={(e) =>
                onUpdateNode?.(selectedNode.id, { label: e.target.value })
              }
            />

            {selectedNode.data.config && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Configuration
                </p>
                {Object.entries(selectedNode.data.config).map(([key, value]) => (
                  <Input
                    key={key}
                    label={formatFieldName(key)}
                    value={typeof value === 'string' ? value : JSON.stringify(value)}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                  />
                ))}
              </div>
            )}

            <div className="h-px bg-border" />

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Info
              </p>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Node ID</span>
                <span className="text-foreground font-mono">{selectedNode.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Type</span>
                <span className="text-foreground">{selectedNode.type}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Position</span>
                <span className="text-foreground font-mono">
                  {Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)}
                </span>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function formatFieldName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function getColorForType(type) {
  const map = { trigger: 'amber', action: 'violet', condition: 'cyan', output: 'emerald' };
  return map[type] || 'gray';
}
