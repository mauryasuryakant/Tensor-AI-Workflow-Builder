import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const buttonVariants = {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      // Legacy variants mapped
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
      // Legacy variants mapped
      md: "h-9 px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
}

function getVariantClass(variant = "default", size = "default") {
  return cn(
    buttonVariants.variants.variant[variant] || buttonVariants.variants.variant.default,
    buttonVariants.variants.size[size] || buttonVariants.variants.size.default
  )
}

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, icon: Icon, iconRight: IconRight, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading;
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          getVariantClass(variant, size),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              className="opacity-75"
            />
          </svg>
        ) : Icon ? (
          <Icon className={cn("h-4 w-4", children ? "mr-2" : "")} aria-hidden="true" />
        ) : null}
        {children}
        {IconRight && !loading && (
          <IconRight className={cn("h-4 w-4", children ? "ml-2" : "")} aria-hidden="true" />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export default Button
