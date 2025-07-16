import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-primary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
        outline:
          "border hover:text-accent-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // FF14-inspired cosmic button variants
        cosmic: "bg-gradient-to-r from-[#1e3a8a] to-[#1e1b4b] hover:from-[#1e3a8a]/90 hover:to-[#1e1b4b]/90 text-white border border-[#38bdf8]/30 shadow-md shadow-[#38bdf8]/10",
        gold: "bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#f59e0b]/90 hover:to-[#d97706]/90 text-white border border-[#f59e0b]/30 shadow-md",
        ethereal: "bg-gradient-to-r from-[#38bdf8] to-[#818cf8] hover:from-[#38bdf8]/90 hover:to-[#818cf8]/90 text-white border border-[#38bdf8]/30 shadow-md",
      },
      size: {
        default: "h-10 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        size: "default",
        className: "px-4 py-2"
      },
      {
        variant: "default",
        className: "dark:bg-[#38bdf8] dark:text-[#0f172a] dark:hover:bg-[#38bdf8]/90"
      },
      {
        variant: "secondary",
        className: "dark:bg-[#1e293b] dark:text-white dark:hover:bg-[#1e293b]/80"
      },
      {
        variant: "outline",
        className: "dark:border-[#38bdf8]/30 dark:text-white dark:hover:bg-[#1e293b]/80"
      },
      {
        variant: "ghost",
        className: "dark:hover:bg-[#1e293b]/80 dark:hover:text-white"
      },
      {
        variant: "link",
        className: "dark:text-[#38bdf8]"
      },
    ]
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
