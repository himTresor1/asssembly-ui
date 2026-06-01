'use client'

import { Slot as SlotPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-300 text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-control bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

/**
 * ==========================================
 * ASSEMBLY UX RULES FOR BUTTONS
 * ==========================================
 * - Loading state: When a button triggers an async action, it must enter a disabled + loading state immediately on click. Never let a user double-submit.
 * - Disabled buttons: Must have a tooltip or adjacent copy explaining why they are disabled. Never silently disable a button with no explanation.
 * - Icon-only buttons: Must always have an aria-label and a tooltip on hover.
 * - Button groups: (e.g., "Save" + "Save and publish") must clearly distinguish the primary from the secondary action through visual hierarchy.
 * - Universal Feedback: NEVER leave a button or interactive element in an ambiguous state after being clicked. Disable it, show a spinner, or change its label.
 * - Copywriting: Buttons use action verbs that describe the outcome (e.g. "Save changes", "Send invoice", "Delete account") — not "OK", "Submit", "Yes".
 */

