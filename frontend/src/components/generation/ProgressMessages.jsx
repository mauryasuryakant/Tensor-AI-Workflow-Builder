import { useEffect, useRef } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { GENERATION_STEPS } from '../../constants/workflowConstants';

export default function ProgressMessages({ currentStep, progress }) {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // Animate progress bar width
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [progress]);

  useEffect(() => {
    // Initial stagger for steps
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.step-item');
      gsap.fromTo(items, 
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* Progress bar */}
      <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden shadow-inner">
        <div
          ref={progressBarRef}
          className="absolute inset-y-0 left-0 bg-primary rounded-full shadow-sm"
          style={{ width: '0%' }}
        />
        <div className="absolute inset-0 shimmer-bg" />
      </div>

      {/* Step list */}
      <div ref={containerRef} className="space-y-1">
        {GENERATION_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={step.id}
              className={`step-item flex items-center gap-2.5 py-1 transition-opacity duration-300 ${
                isPending ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {isCompleted ? (
                  <CheckCircle size={14} className="text-[#b5cea8]" />
                ) : isCurrent ? (
                  <Loader2 size={14} className="text-primary animate-spin" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                )}
              </div>

              <span
                className={`text-sm transition-colors duration-300 ${
                  isCompleted
                    ? 'text-muted-foreground line-through'
                    : isCurrent
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>

              {isCurrent && (
                <span className="text-primary text-sm animate-pulse">
                  •••
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
