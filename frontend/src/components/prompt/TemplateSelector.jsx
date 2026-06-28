/**
 * TemplateSelector — grid of pre-built workflow templates.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, ArrowRight, X } from 'lucide-react';
import { IconButton } from '../ui';
import templates from '../../data/templates';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function TemplateSelector({ isOpen, onClose, onSelect }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <LayoutTemplate size={15} className="text-accent-violet" />
              <h3 className="text-sm font-semibold text-text-primary">Templates</h3>
            </div>
            <IconButton icon={X} size="sm" onClick={onClose} aria-label="Close templates" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {templates.map((template) => (
              <motion.button
                key={template.id}
                variants={staggerItem}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
                className="
                  text-left p-4 group
                  bg-surface-secondary/50 border border-border-primary
                  rounded-[var(--radius-lg)]
                  hover:border-accent-violet/30 hover:bg-surface-hover
                  transition-all duration-200 cursor-pointer
                "
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium text-text-primary">{template.name}</h4>
                  <ArrowRight
                    size={14}
                    className="text-text-tertiary group-hover:text-accent-violet
                      group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                <p className="text-xs text-text-tertiary mt-1 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex gap-1.5 mt-2.5">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[9px] font-medium
                        text-text-tertiary bg-surface-primary
                        rounded-[var(--radius-full)] border border-border-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
