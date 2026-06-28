import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import LocomotiveScroll from 'locomotive-scroll';

import PromptEditor from '../components/prompt/PromptEditor';
import PromptSuggestions from '../components/prompt/PromptSuggestions';
import TemplateSelector from '../components/prompt/TemplateSelector';
import GenerationOverlay from '../components/generation/GenerationOverlay';

import { useGenerationContext } from '../context/GenerationContext';
import { useWorkflowContext } from '../context/WorkflowContext';
import { generateWorkflow } from '../services/workflowService';
import { WORKFLOW_STATUS } from '../constants/workflowConstants';

export default function HomePage() {
  const [showTemplates, setShowTemplates] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const generation = useGenerationContext();
  const workflow = useWorkflowContext();

  useEffect(() => {
    let scroll;
    if (scrollRef.current) {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: 'is-revealed',
      });
    }
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  const handleGenerate = useCallback(
    async (prompt) => {
      generation.startGeneration(prompt);

      try {
        const response = await generateWorkflow(prompt);

        if (response.success) {
          generation.completeGeneration(response.data);

          workflow.dispatch({
            type: 'SET_WORKFLOW',
            payload: {
              id: response.data.id,
              name: response.data.name,
              description: response.data.description,
              nodes: response.data.nodes,
              edges: response.data.edges,
              metadata: response.data.metadata,
              validation: response.data.validation,
            },
          });

          setTimeout(() => {
            generation.resetGeneration();
            navigate('/builder');
          }, 800);
        } else {
          generation.failGeneration(response.error);
        }
      } catch (error) {
        generation.failGeneration(
          error?.error || { code: 'UNKNOWN', message: 'Generation failed' }
        );
      }
    },
    [generation, workflow, navigate]
  );

  const handleTemplateSelect = useCallback(
    (template) => {
      workflow.dispatch({
        type: 'SET_WORKFLOW',
        payload: {
          id: template.id,
          name: template.name,
          description: template.description,
          nodes: template.nodes,
          edges: template.edges,
          metadata: { prompt: template.prompt },
          validation: { valid: true, warnings: [] },
        },
      });
      navigate('/builder');
    },
    [workflow, navigate]
  );

  const isGenerating = generation.status === WORKFLOW_STATUS.GENERATING;

  return (
    <>
      <GenerationOverlay />

      <div ref={scrollRef} data-scroll-container className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
        {/* Background ambient effect */}
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4ec9b0]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-3xl" data-scroll data-scroll-speed="1">
          {/* Logo + Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#007acc] to-[#4ec9b0] flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Zap size={26} className="text-white" />
            </motion.div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                AI Workflow Builder
              </h1>
              <p className="text-muted-foreground mt-2 text-base max-w-md mx-auto">
                Describe your automation in plain English. We'll build the workflow for you.
              </p>
            </div>
          </motion.div>

          {/* Prompt Editor */}
          <PromptEditor
            onGenerate={handleGenerate}
            onOpenTemplates={() => setShowTemplates((v) => !v)}
            loading={isGenerating}
          />

          {/* Error display */}
          {generation.status === WORKFLOW_STATUS.ERROR && generation.error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive text-center"
              role="alert"
            >
              {generation.error.message}
            </motion.div>
          )}

          {/* Template Selector */}
          <TemplateSelector
            isOpen={showTemplates}
            onClose={() => setShowTemplates(false)}
            onSelect={handleTemplateSelect}
          />

          {/* Suggestions */}
          {!showTemplates && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <p className="text-xs text-muted-foreground text-center mb-3">
                Try a suggestion
              </p>
              <PromptSuggestions
                onSelect={(text) => handleGenerate(text)}
              />
            </motion.div>
          )}

          {/* Features hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 text-[11px] text-muted-foreground"
          >
            {[
              'Natural Language → Workflow',
              'Drag & Drop Editor',
              'Export to n8n',
            ].map((feature) => (
              <span key={feature} className="flex items-center gap-1.5">
                <Sparkles size={10} className="text-primary" />
                {feature}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
