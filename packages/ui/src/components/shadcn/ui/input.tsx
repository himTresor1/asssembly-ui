import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { SIZE_VARIANTS, SIZE_VARIANTS_DEFAULT } from '../../../lib/constants'
import { cn } from '../../../lib/utils/cn'

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {}

export const InputVariants = cva(
  cn(
    'flex h-10 w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light',
    'focus:ring-background-control focus:border-control focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted',
    'aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive'
  ),
  {
    variants: {
      size: {
        ...SIZE_VARIANTS,
      },
    },
    defaultVariants: {
      size: SIZE_VARIANTS_DEFAULT,
    },
  }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'small', ...props }, ref) => {
    return (
      <input type={type} ref={ref} {...props} className={cn(InputVariants({ size }), className)} />
    )
  }
)

Input.displayName = 'Input'

export { Input }

/**
 * ==========================================
 * ASSEMBLY UX RULES FOR INPUTS
 * ==========================================
 * - Validation on Blur: Validate fields on blur, not on change (keystroke). Never punish the user before they finish typing.
 * - Error Placement: Show validation errors next to the field they relate to, not only in a banner at the top of the form.
 * - Preserving User Input: Preserve user input on error. NEVER clear an input or a form because of a failed submission.
 * - Placeholder Constraint: Placeholder text is not a label. Every input must have a visible label (paired consistently).
 */

