import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { getAllNodeTypes } from '../../data/nodeTypes';
import { cn } from '../../lib/utils';

const NodePalette = memo(function NodePalette({ onDragStart }) {
  const nodeTypes = getAllNodeTypes();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.palette-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-1.5">
      {nodeTypes.map((nodeDef) => {
        const Icon = nodeDef.icon;

        return (
          <div key={nodeDef.type}>
            <PaletteItem
              icon={Icon}
              label={nodeDef.label}
              description={nodeDef.description}
              color={nodeDef.color}
              onDragStart={(e) => onDragStart?.(e, nodeDef.type, null)}
            />

            {nodeDef.subtypes.length > 0 && (
              <div className="ml-4 mt-1 space-y-0.5">
                {nodeDef.subtypes.map((sub) => {
                  const SubIcon = sub.icon;
                  return (
                     <PaletteItem
                      key={sub.id}
                      icon={SubIcon}
                      label={sub.label}
                      description={sub.description}
                      color={nodeDef.color}
                      compact
                      onDragStart={(e) => onDragStart?.(e, nodeDef.type, sub.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

function PaletteItem({ icon: Icon, label, description, color, compact, onDragStart }) {
  return (
    <motion.div
      draggable
      onDragStart={onDragStart}
      className={cn(
        "palette-item flex items-center gap-2.5 rounded-md bg-background border border-border hover:border-muted-foreground hover:bg-accent/50 transition-colors cursor-grab active:cursor-grabbing",
        compact ? "px-2.5 py-1.5" : "px-3 py-2"
      )}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={cn(
          "shrink-0 flex items-center justify-center rounded-sm bg-card border border-border",
          compact ? "w-5 h-5" : "w-6 h-6"
        )}
      >
        <Icon size={compact ? 10 : 12} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className={cn("font-medium text-foreground truncate", compact ? "text-[10px]" : "text-xs")}>
          {label}
        </p>
        {!compact && description && (
          <p className="text-[10px] text-muted-foreground truncate">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default NodePalette;
