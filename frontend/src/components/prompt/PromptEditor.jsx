import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutTemplate, Trash2 } from 'lucide-react';
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

  const canSubmit = prompt.trim().length > 0 && !loading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      className="w-full max-w-2xl mx-auto p-4"
    >
      <div className="relative">
        {/* Outer glow effect on focus-within */}
        <div
          className={cn(
            'relative flex flex-col rounded-xl transition-all duration-300',
            'border border-white/10 bg-[#0a0a0a]',
            'focus-within:border-[#007acc]/40 focus-within:shadow-[0_0_20px_rgba(0,122,204,0.12)]'
          )}
        >
          {/* Textarea area */}
          <div className="overflow-y-auto">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your automation workflow..."
              rows={3}
              disabled={loading}
              style={{ overflow: 'hidden', outline: 'none' }}
              className={cn(
                'w-full px-4 py-3 resize-none bg-transparent border-none',
                'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                'placeholder:text-white/40 align-top leading-normal min-h-[80px]',
                'text-white text-sm',
                'disabled:opacity-50'
              )}
              aria-label="Workflow prompt"
              id="prompt-editor-textarea"
            />
          </div>

          {/* Bottom action bar */}
          <div className="h-14">
            <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between">
              {/* Left side action buttons */}
              <div className="flex items-center gap-2">
                {/* Attach file / Browse Templates */}
                <button
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                  aria-label="Browse templates"
                  type="button"
                  onClick={onOpenTemplates}
                  id="prompt-templates-btn"
                >
                  <LayoutTemplate size={16} aria-hidden="true" />
                </button>

                {/* Web link icon */}
                <button
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                  aria-label="Attach web link"
                  type="button"
                  id="prompt-web-link-btn"
                >
                  <svg
                    className="w-4 h-4 text-[#007acc]"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="10" cy="12" cx="12" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </button>

                {/* Figma icon */}
                <button
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                  aria-label="Attach Figma link"
                  type="button"
                  id="prompt-figma-link-btn"
                >
                  <svg
                    className="w-4 h-4 text-pink-500"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="16"
                    width="16"
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
                {prompt && (
                  <button
                    className="p-2 text-white/50 hover:text-red-400 transition-colors rounded-lg border border-white/10 hover:border-red-400/30"
                    aria-label="Clear prompt"
                    type="button"
                    onClick={() => setPrompt('')}
                    id="prompt-clear-btn"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Right side — Send / Generate button */}
              <button
                className={cn(
                  'p-2 transition-all duration-200 rounded-lg',
                  canSubmit
                    ? 'text-[#007acc] hover:text-[#007acc] hover:bg-[#007acc]/10 cursor-pointer'
                    : 'text-white/20 cursor-not-allowed'
                )}
                aria-label="Generate workflow"
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                id="prompt-generate-btn"
              >
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
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="10" cy="12" cx="12" />
                    <path d="m16 12-4-4-4 4" />
                    <path d="M12 16V8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
