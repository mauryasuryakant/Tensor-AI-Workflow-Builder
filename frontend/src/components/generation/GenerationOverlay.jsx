/**
 * GenerationOverlay — full-screen premium AI generation experience.
 * Orchestrates FluidAnimation, ParticleAnimation, and ProgressMessages.
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FluidAnimation from './FluidAnimation';
import ParticleAnimation from './ParticleAnimation';
import ProgressMessages from './ProgressMessages';
import { useGenerationContext } from '../../context/GenerationContext';
import { WORKFLOW_STATUS, GENERATION_STEPS } from '../../constants/workflowConstants';

export default function GenerationOverlay() {
  const {
    status,
    currentStep,
    progress,
    advanceStep,
  } = useGenerationContext();

  const intervalRef = useRef(null);
  const isVisible = status === WORKFLOW_STATUS.GENERATING;

  useEffect(() => {
    if (status !== WORKFLOW_STATUS.GENERATING) {
      clearInterval(intervalRef.current);
      return;
    }

    let stepIndex = 0;

    intervalRef.current = setInterval(() => {
      stepIndex++;
      if (stepIndex < GENERATION_STEPS.length) {
        advanceStep();
      } else {
        clearInterval(intervalRef.current);
      }
    }, GENERATION_STEPS[stepIndex]?.duration || 1000);

    return () => clearInterval(intervalRef.current);
  }, [status, advanceStep]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="
            fixed inset-0 z-50
            bg-surface-primary/95 backdrop-blur-xl
            flex flex-col items-center justify-center
            px-6
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-lg flex flex-col items-center gap-6"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={20} className="text-accent-violet" />
              </motion.div>
              <h2 className="text-lg font-semibold gradient-text">
                Building Your Workflow
              </h2>
            </div>

            {/* Fluid Animation */}
            <FluidAnimation progress={progress} />

            {/* Particle Animation */}
            <ParticleAnimation progress={progress} />

            {/* Progress Messages */}
            <ProgressMessages currentStep={currentStep} progress={progress} />

            {/* Ambient text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1 }}
              className="text-xs text-text-tertiary text-center"
            >
              AI is analyzing your request and creating an optimized workflow
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
