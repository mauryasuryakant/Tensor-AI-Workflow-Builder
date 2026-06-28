import { memo } from 'react';
import { Handle } from '@xyflow/react';
import { motion } from 'framer-motion';
import { getNodeTypeDefinition } from '../../../data/nodeTypes';
import { cn } from '../../../lib/utils';

const BaseNode = memo(function BaseNode({
  id,
  type,
  data,
  selected,
  children,
}) {
  const typeDef = getNodeTypeDefinition(type);
  const Icon = typeDef.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative min-w-[200px] max-w-[280px] bg-card border shadow-sm transition-all duration-200 overflow-hidden rounded-md",
        selected
          ? "border-ring shadow-md"
          : "border-border hover:border-muted-foreground"
      )}
    >
      {/* Left accent border instead of top gradient to mimic IDE structural elements */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1 opacity-80"
        style={{ backgroundColor: typeDef.color }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2">
        <div
          className="w-6 h-6 rounded flex items-center justify-center bg-background border border-border shrink-0"
        >
          <Icon size={14} style={{ color: typeDef.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate">
            {data.label}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {typeDef.label}
          </p>
        </div>
      </div>

      {/* Custom content from specific node types */}
      {children && (
        <div className="px-3.5 pb-3">
          {children}
        </div>
      )}

      {!children && <div className="pb-2.5" />}

      {/* Handles */}
      {typeDef.handles.targets.map((pos) => (
        <Handle
          key={`target-${pos}`}
          type="target"
          position={getHandlePosition(pos)}
          id={pos}
          className="!w-2.5 !h-2.5 !bg-background !border-2 !border-ring"
        />
      ))}
      {typeDef.handles.sources.map((pos) => (
        <Handle
          key={`source-${pos}`}
          type="source"
          position={getHandlePosition(pos)}
          id={pos}
          className="!w-2.5 !h-2.5 !bg-background !border-2 !border-ring"
          style={getHandleStyle(pos)}
        />
      ))}
    </motion.div>
  );
});

function getHandlePosition(pos) {
  if (pos.includes('top')) return 'top';
  if (pos.includes('bottom')) return 'bottom';
  if (pos.includes('left')) return 'left';
  if (pos.includes('right')) return 'right';
  return pos;
}

function getHandleStyle(pos) {
  if (pos === 'bottom-left') return { left: '30%' };
  if (pos === 'bottom-right') return { left: '70%' };
  return {};
}

export default BaseNode;
