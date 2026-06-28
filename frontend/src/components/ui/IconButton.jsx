import * as React from "react"
import Tooltip from "./Tooltip"
import { cn } from "../../lib/utils"

const sizes = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
}

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
}

const IconButton = React.forwardRef(({
  icon: Icon,
  size = "md",
  tooltip,
  active = false,
  className = "",
  disabled = false,
  ...props
}, ref) => {
  const button = (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        sizes[size],
        active
          ? "bg-accent text-accent-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <Icon size={iconSizes[size]} aria-hidden="true" />
    </button>
  )

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>
  }

  return button
})

IconButton.displayName = "IconButton"

export default IconButton
