import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../lib/utils"

/**
 * Pure-React tooltip — no Radix dependency.
 * Renders in a portal for proper z-index stacking.
 */
export default function Tooltip({ children, content, placement = 'top', delay = 400 }) {
  const [visible, setVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef(null);
  const timeoutRef = React.useRef(null);

  if (!content) return children;

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const GAP = 6;
    let top, left;

    switch (placement) {
      case 'bottom':
        top = rect.bottom + GAP;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - GAP;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + GAP;
        break;
      case 'top':
      default:
        top = rect.top - GAP;
        left = rect.left + rect.width / 2;
        break;
    }

    setCoords({ top, left });
  };

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setVisible(true);
    }, delay);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Placement-specific transforms so the tooltip is centered on the correct axis
  const placementStyles = {
    top: { transform: 'translate(-50%, -100%)' },
    bottom: { transform: 'translate(-50%, 0)' },
    left: { transform: 'translate(-100%, -50%)' },
    right: { transform: 'translate(0, -50%)' },
  };

  return (
    <>
      {/* Clone children to attach ref and hover handlers */}
      {React.cloneElement(React.Children.only(children), {
        ref: triggerRef,
        onMouseEnter: (e) => {
          handleEnter();
          children.props.onMouseEnter?.(e);
        },
        onMouseLeave: (e) => {
          handleLeave();
          children.props.onMouseLeave?.(e);
        },
        onFocus: (e) => {
          handleEnter();
          children.props.onFocus?.(e);
        },
        onBlur: (e) => {
          handleLeave();
          children.props.onBlur?.(e);
        },
      })}

      {/* Portal-rendered tooltip */}
      {createPortal(
        <div
          role="tooltip"
          className={cn(
            "fixed z-[9999] pointer-events-none px-3 py-1.5 text-xs font-medium rounded-md",
            "bg-popover text-popover-foreground border border-border shadow-md",
            "transition-all duration-150 ease-out",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{
            top: coords.top,
            left: coords.left,
            ...placementStyles[placement] || placementStyles.top,
          }}
          aria-hidden={!visible}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}
