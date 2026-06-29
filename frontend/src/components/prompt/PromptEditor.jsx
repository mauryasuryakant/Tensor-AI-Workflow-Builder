import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Trash2 } from 'lucide-react';
import { useAutoResize } from '../../hooks/useAutoResize';
import { cn } from '../../lib/utils';

const MAX_CHARS = 2000;

export default function PromptEditor({
  onGenerate,
  onOpenTemplates,
  loading = false,
}) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setPrompt(value);
    }
  };

  const canSubmit = prompt.trim().length > 0 && !loading;
  const charCount = prompt.length;
  const charPercent = charCount / MAX_CHARS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="relative group">
        {/* Animated gradient border — glows subtly behind the box */}
        <div
          className={cn(
            'absolute -inset-[1px] rounded-xl opacity-0 blur-[2px] transition-opacity duration-500 pointer-events-none',
            'bg-[conic-gradient(from_var(--gradient-angle),#007acc,#4ec9b0,#c586c0,#007acc)]',
            isFocused && 'opacity-60',
            !isFocused && 'group-hover:opacity-30'
          )}
          style={{ '--gradient-angle': '0deg' }}
          aria-hidden="true"
        />

        {/* Main container */}
        <div
          className={cn(
            'relative flex flex-col rounded-xl transition-all duration-300',
            'border bg-[#0a0a0f]/90 backdrop-blur-xl',
            isFocused
              ? 'border-white/15 shadow-[0_0_30px_rgba(0,122,204,0.08)]'
              : 'border-white/[0.07] hover:border-white/10'
          )}
        >
          {/* Textarea area */}
          <div className="overflow-y-auto">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your automation workflow..."
              rows={3}
              disabled={loading}
              style={{ overflow: 'hidden', outline: 'none' }}
              className={cn(
                'w-full px-5 py-4 resize-none bg-transparent border-none',
                'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                'placeholder:text-white/30 placeholder:transition-colors',
                'align-top leading-relaxed min-h-[88px]',
                'text-white/90 text-sm tracking-wide',
                'disabled:opacity-40'
              )}
              aria-label="Workflow prompt"
              id="prompt-editor-textarea"
            />
          </div>

          {/* Bottom action bar */}
          <div className="h-14">
            <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between">
              {/* Left side action buttons */}
              <div className="flex items-center gap-1.5">
                {/* Browse Templates */}
                <button
                  className={cn(
                    'p-2 transition-all duration-200 rounded-lg border',
                    'text-white/40 border-white/[0.06]',
                    'hover:text-white/80 hover:border-white/15 hover:bg-white/[0.03]'
                  )}
                  aria-label="Browse templates"
                  type="button"
                  onClick={onOpenTemplates}
                  id="prompt-templates-btn"
                >
                  <LayoutTemplate size={15} aria-hidden="true" />
                </button>

                {/* Web link icon */}
                <button
                  className={cn(
                    'p-2 transition-all duration-200 rounded-lg border',
                    'text-white/40 border-white/[0.06]',
                    'hover:text-[#007acc] hover:border-[#007acc]/20 hover:bg-[#007acc]/5'
                  )}
                  aria-label="Attach web link"
                  type="button"
                  id="prompt-web-link-btn"
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="10" cy="12" cx="12" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </button>

                {/* Figma icon */}
                <button
                  className={cn(
                    'p-2 transition-all duration-200 rounded-lg border',
                    'text-white/40 border-white/[0.06]',
                    'hover:text-[#c586c0] hover:border-[#c586c0]/20 hover:bg-[#c586c0]/5'
                  )}
                  aria-label="Attach Figma link"
                  type="button"
                  id="prompt-figma-link-btn"
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                  </svg>
                </button>

                {/* Clear button — only shown when there's text */}
                <AnimatePresence>
                  {prompt && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        'p-2 transition-all duration-200 rounded-lg border',
                        'text-white/40 border-white/[0.06]',
                        'hover:text-[#f48771] hover:border-[#f48771]/20 hover:bg-[#f48771]/5'
                      )}
                      aria-label="Clear prompt"
                      type="button"
                      onClick={() => setPrompt('')}
                      id="prompt-clear-btn"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Divider + Character count */}
                <AnimatePresence>
                  {charCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 ml-1"
                    >
                      <div className="h-4 w-px bg-white/[0.06]" aria-hidden="true" />
                      <span
                        className={cn(
                          'text-[10px] font-mono tabular-nums transition-colors duration-200',
                          charPercent > 0.9 ? 'text-[#f48771]' :
                          charPercent > 0.75 ? 'text-[#dcdcaa]' :
                          'text-white/25'
                        )}
                      >
                        {charCount.toLocaleString()}/{MAX_CHARS.toLocaleString()}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right side — Send button + keyboard hint */}
              <div className="flex items-center gap-2">
                {/* Keyboard hint — shows when textarea is focused and has text */}
                <AnimatePresence>
                  {isFocused && canSubmit && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="hidden sm:flex items-center gap-1 text-white/20"
                    >
                      <kbd className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-white/[0.08] bg-white/[0.03]">
                        Ctrl
                      </kbd>
                      <span className="text-[9px]">+</span>
                      <kbd className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-white/[0.08] bg-white/[0.03]">
                        ↵
                      </kbd>
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Generate / Send button */}
                <motion.button
                  whileHover={canSubmit ? { scale: 1.05 } : {}}
                  whileTap={canSubmit ? { scale: 0.95 } : {}}
                  className={cn(
                    'relative p-2 rounded-lg transition-all duration-300',
                    canSubmit
                      ? 'text-[#007acc] cursor-pointer'
                      : 'text-white/15 cursor-not-allowed'
                  )}
                  aria-label="Generate workflow"
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  id="prompt-generate-btn"
                >
                  {/* Glow pulse behind the button when active */}
                  {canSubmit && (
                    <span
                      className="absolute inset-0 rounded-lg bg-[#007acc]/10 animate-pulse-glow"
                      aria-hidden="true"
                    />
                  )}

                  <span className="relative">
                    {loading ? (
                      <svg
                        className="w-6 h-6 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                          className="opacity-75"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle r="10" cy="12" cx="12" />
                        <path d="m16 12-4-4-4 4" />
                        <path d="M12 16V8" />
                      </svg>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
