import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

/**
 * Pure-React dropdown menu — no Radix dependency.
 * Supports click-outside close, keyboard navigation, and portal rendering.
 */
export default function Dropdown({ trigger, items = [], align = 'left', className = '' }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [menuPos, setMenuPos] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef(null);
  const menuRef = React.useRef(null);

  // Calculate menu position based on trigger element
  const updatePosition = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const GAP = 4;

    setMenuPos({
      top: rect.bottom + GAP,
      left: align === 'right' ? rect.right : rect.left,
    });
  }, [align]);

  // Close on click outside
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Keyboard navigation inside the menu
  const handleKeyDown = (e) => {
    const actionableItems = items.filter((item) => !item.separator && !item.disabled);
    const actionableIndices = items.reduce((acc, item, i) => {
      if (!item.separator && !item.disabled) acc.push(i);
      return acc;
    }, []);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentPos = actionableIndices.indexOf(focusedIndex);
      const nextPos = currentPos < actionableIndices.length - 1 ? currentPos + 1 : 0;
      setFocusedIndex(actionableIndices[nextPos]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentPos = actionableIndices.indexOf(focusedIndex);
      const prevPos = currentPos > 0 ? currentPos - 1 : actionableIndices.length - 1;
      setFocusedIndex(actionableIndices[prevPos]);
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      const item = items[focusedIndex];
      if (item && item.onClick) {
        item.onClick();
        setIsOpen(false);
      }
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
      setFocusedIndex(-1);
    }
    setIsOpen((v) => !v);
  };

  return (
    <>
      {/* Trigger — clone to attach ref and click handler */}
      {React.cloneElement(trigger, {
        ref: triggerRef,
        onClick: (e) => {
          handleToggle();
          trigger.props.onClick?.(e);
        },
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
      })}

      {/* Portal-rendered dropdown menu */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              role="menu"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              onKeyDown={handleKeyDown}
              className={cn(
                "fixed z-[9999] min-w-[8rem] overflow-hidden rounded-md p-1",
                "border border-border bg-popover text-popover-foreground shadow-lg",
                className
              )}
              style={{
                top: menuPos.top,
                ...(align === 'right'
                  ? { right: window.innerWidth - menuPos.left }
                  : { left: menuPos.left }
                ),
              }}
            >
              {items.map((item, index) => {
                if (item.separator) {
                  return (
                    <div
                      key={`sep-${index}`}
                      className="-mx-1 my-1 h-px bg-muted"
                      role="separator"
                    />
                  );
                }

                const Icon = item.icon;
                const isFocused = focusedIndex === index;

                return (
                  <button
                    key={item.id || index}
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                      "disabled:pointer-events-none disabled:opacity-50",
                      isFocused ? "bg-accent text-accent-foreground" : "text-popover-foreground",
                      item.danger && "text-destructive focus:bg-destructive/10 focus:text-destructive",
                      item.danger && isFocused && "bg-destructive/10 text-destructive"
                    )}
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="ml-auto text-xs tracking-widest text-muted-foreground opacity-60">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
