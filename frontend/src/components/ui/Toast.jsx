/**
 * Toast — notification system with auto-dismiss and stack management.
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useUIContext } from '../../context/UIContext';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-accent-emerald/30 bg-accent-emerald/5',
  error: 'border-accent-rose/30 bg-accent-rose/5',
  warning: 'border-accent-amber/30 bg-accent-amber/5',
  info: 'border-accent-cyan/30 bg-accent-cyan/5',
};

const iconColors = {
  success: 'text-accent-emerald',
  error: 'text-accent-rose',
  warning: 'text-accent-amber',
  info: 'text-accent-cyan',
};

function ToastItem({ toast, onDismiss }) {
  const Icon = icons[toast.type] || icons.info;

  useEffect(() => {
    if (toast.autoDismiss !== false) {
      const timer = setTimeout(() => onDismiss(toast.id), toast.duration || 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        flex items-start gap-3 p-3.5 w-80
        bg-surface-elevated border rounded-[var(--radius-md)] shadow-lg
        ${colors[toast.type] || colors.info}
      `}
      role="alert"
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${iconColors[toast.type]}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        )}
        <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { toasts, dispatch } = useUIContext();

  const dismiss = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Helper to dispatch a toast from anywhere that has access to UI dispatch.
 */
export function createToast(dispatch, { type = 'info', title, message, duration }) {
  dispatch({
    type: 'ADD_TOAST',
    payload: { type, title, message, duration },
  });
}
