import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-control bg-foreground/[.026] px-3 py-2 text-base md:text-sm ring-offset-background placeholder:text-foreground-muted focus:ring-background-control focus:border-control focus-visible:border-control focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-foreground-muted focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }

/**
 * ==========================================
 * ASSEMBLY UX RULES FOR TEXTAREAS
 * ==========================================
 * - Validation on Blur: Validate textareas on blur, not on keystroke. Never punish the user before they finish typing.
 * - Error Placement: Show validation errors next to the field they relate to, not only in a banner at the top of the form.
 * - Preserving User Input: Preserve user input on error. NEVER clear a textarea because of a failed submission.
 * - Placeholder Constraint: Placeholder text is not a label. Every textarea must have a visible label (paired consistently).
 */

