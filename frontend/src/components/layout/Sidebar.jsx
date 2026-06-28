import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutTemplate,
  Clock,
  ChevronDown,
} from 'lucide-react';
import IconButton from '../ui/IconButton';
import NodePalette from '../workflow/NodePalette';
import { cn } from '../../lib/utils';

const sections = [
  { id: 'nodes', label: 'Node Palette', icon: Layers },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'recent', label: 'Recent', icon: Clock },
];

export default function Sidebar({ isOpen, onToggle, onDragStart, onTemplateSelect }) {
  const [expandedSection, setExpandedSection] = useState('nodes');

  const toggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-full bg-card border-r border-border flex flex-col overflow-hidden shrink-0 shadow-sm"
            aria-label="Sidebar"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-card-foreground">Workflow Builder</h2>
              <IconButton
                icon={ChevronLeft}
                size="sm"
                tooltip="Collapse sidebar"
                onClick={onToggle}
                aria-label="Collapse sidebar"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {sections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSection === section.id;

                return (
                  <div key={section.id} className="border-b border-border">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors cursor-pointer outline-none focus-visible:bg-accent",
                        isExpanded ? "text-foreground bg-accent/50" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                      aria-expanded={isExpanded}
                    >
                      <Icon size={15} aria-hidden="true" />
                      <span className="font-medium">{section.label}</span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-auto opacity-50"
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <SectionContent
                            sectionId={section.id}
                            onDragStart={onDragStart}
                            onTemplateSelect={onTemplateSelect}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!isOpen && (
        <div className="absolute top-16 left-0 z-10 flex items-start pt-3 pl-2 shrink-0">
          <div className="bg-card border border-border shadow-md rounded-md">
            <IconButton
              icon={ChevronRight}
              size="md"
              tooltip="Open sidebar"
              onClick={onToggle}
              aria-label="Open sidebar"
            />
          </div>
        </div>
      )}
    </>
  );
}

function SectionContent({ sectionId, onDragStart, onTemplateSelect }) {
  if (sectionId === 'nodes') {
    return (
      <div className="px-3 pb-3 pt-1">
        <NodePalette onDragStart={onDragStart} />
      </div>
    );
  }

  if (sectionId === 'templates') {
    return (
      <div className="px-3 pb-3 pt-1 space-y-1">
        {[
          { id: 'contact-form-sheets-email', name: 'Form → Sheets + Email' },
          { id: 'webhook-slack-notify', name: 'Webhook → Slack' },
          { id: 'schedule-api-database', name: 'Schedule → API → DB' },
          { id: 'email-conditional-response', name: 'Email → Condition → Reply' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => onTemplateSelect?.(t.id)}
            className="w-full text-left px-3 py-2 text-xs text-muted-foreground
              hover:text-foreground hover:bg-accent
              rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {t.name}
          </button>
        ))}
      </div>
    );
  }

  if (sectionId === 'recent') {
    return (
      <div className="px-3 pb-3 pt-1">
        <p className="text-xs text-muted-foreground px-3 py-4 text-center">
          No recent workflows
        </p>
      </div>
    );
  }

  return null;
}
