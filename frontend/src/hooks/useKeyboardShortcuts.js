/**
 * Global keyboard shortcut handler.
 * Registers and cleans up shortcuts at the document level.
 */

import { useEffect, useCallback } from 'react';

const SHORTCUTS = {
  'ctrl+enter': 'GENERATE',
  'meta+enter': 'GENERATE',
  'ctrl+z': 'UNDO',
  'meta+z': 'UNDO',
  'ctrl+shift+z': 'REDO',
  'meta+shift+z': 'REDO',
  'ctrl+s': 'SAVE',
  'meta+s': 'SAVE',
  'ctrl+e': 'EXPORT',
  'meta+e': 'EXPORT',
  escape: 'ESCAPE',
};

export function useKeyboardShortcuts(handlers = {}) {
  const handleKeyDown = useCallback(
    (event) => {
      if (isTypingInInput(event)) {
        if (event.key === 'Escape') {
          event.target.blur();
          return;
        }
        const key = buildKeyString(event);
        if (key === 'ctrl+enter' || key === 'meta+enter') {
          event.preventDefault();
          handlers.onGenerate?.();
          return;
        }
        return;
      }

      const key = buildKeyString(event);
      const action = SHORTCUTS[key];

      if (!action) return;

      event.preventDefault();

      switch (action) {
        case 'GENERATE':
          handlers.onGenerate?.();
          break;
        case 'UNDO':
          handlers.onUndo?.();
          break;
        case 'REDO':
          handlers.onRedo?.();
          break;
        case 'SAVE':
          handlers.onSave?.();
          break;
        case 'EXPORT':
          handlers.onExport?.();
          break;
        case 'ESCAPE':
          handlers.onEscape?.();
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

function buildKeyString(event) {
  const parts = [];
  if (event.ctrlKey) parts.push('ctrl');
  if (event.metaKey) parts.push('meta');
  if (event.shiftKey) parts.push('shift');
  if (event.altKey) parts.push('alt');
  parts.push(event.key.toLowerCase());
  return parts.join('+');
}

function isTypingInInput(event) {
  const tag = event.target?.tagName?.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    event.target?.isContentEditable
  );
}

export default useKeyboardShortcuts;
