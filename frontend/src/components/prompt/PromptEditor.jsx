import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, LayoutTemplate, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import Kbd from '../ui/Kbd';
import { useAutoResize } from '../../hooks/useAutoResize';
import { cn } from '../../lib/utils';

export default function PromptEditor({
  onGenerate,
  onOpenTemplates,
  loading = false,
}) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useAutoResize(prompt, 200);

  const handleSubmit = () => {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;
    onGenerate(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className={cn(
          "relative bg-card/80 backdrop-blur-xl border border-border rounded-lg shadow-lg focus-within:border-ring focus-within:shadow-[0_0_15px_rgba(0,122,204,0.15)] transition-all duration-200 overflow-hidden"
        )}
      >
        <div className="relative">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your automation workflow..."
            rows={1}
            disabled={loading}
            className="w-full px-5 pt-4 pb-2 text-sm bg-transparent text-foreground placeholder:text-muted-foreground resize-none border-none outline-none disabled:opacity-50"
            aria-label="Workflow prompt"
          />

          {/* Bottom action bar */}
          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-1">
              <IconButton
                icon={LayoutTemplate}
                size="sm"
                tooltip="Browse templates"
                onClick={onOpenTemplates}
                aria-label="Open template gallery"
              />
              {prompt && (
                <IconButton
                  icon={Trash2}
                  size="sm"
                  tooltip="Clear prompt"
                  onClick={() => setPrompt('')}
                  aria-label="Clear prompt"
                  className="hover:text-destructive hover:bg-destructive/10"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span className="text-muted-foreground text-[10px]">+</span>
                <Kbd>↵</Kbd>
              </span>
              <Button
                variant="primary"
                size="sm"
                icon={loading ? undefined : Sparkles}
                loading={loading}
                onClick={handleSubmit}
                disabled={!prompt.trim()}
              >
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
