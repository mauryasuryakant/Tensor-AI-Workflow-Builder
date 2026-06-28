/**
 * Auto-resize textarea to fit content.
 */

import { useCallback, useEffect, useRef } from 'react';

export function useAutoResize(value, maxHeight = 300) {
  const ref = useRef(null);

  const resize = useCallback(() => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [maxHeight]);

  useEffect(() => {
    resize();
  }, [value, resize]);

  return ref;
}

export default useAutoResize;
