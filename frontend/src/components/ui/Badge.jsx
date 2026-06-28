import * as React from "react"
import { cn } from "../../lib/utils"

const badgeVariants = {
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      outline: "text-foreground",
    },
    // Map existing colors for backwards compatibility
    color: {
      violet: "border-transparent bg-accent-violet/20 text-[#c586c0] hover:bg-accent-violet/30",
      cyan: "border-transparent bg-accent-cyan/20 text-[#4ec9b0] hover:bg-accent-cyan/30",
      amber: "border-transparent bg-accent-amber/20 text-[#dcdcaa] hover:bg-accent-amber/30",
      emerald: "border-transparent bg-accent-emerald/20 text-[#b5cea8] hover:bg-accent-emerald/30",
      rose: "border-transparent bg-accent-rose/20 text-[#f48771] hover:bg-accent-rose/30",
      gray: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
    }
  },
  defaultVariants: {
    variant: "default",
    color: "gray"
  },
}

function Badge({ className, variant, color, dot = false, children, ...props }) {
  const isColorMapped = !!color;
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isColorMapped 
          ? badgeVariants.variants.color[color] || badgeVariants.variants.color.gray
          : badgeVariants.variants.variant[variant || "default"],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            color === 'amber' && 'bg-[#dcdcaa]',
            color === 'violet' && 'bg-[#c586c0]',
            color === 'cyan' && 'bg-[#4ec9b0]',
            color === 'emerald' && 'bg-[#b5cea8]',
            color === 'rose' && 'bg-[#f48771]',
            !color && 'bg-current'
          )}
        />
      )}
      {children}
    </div>
  )
}

export default Badge
