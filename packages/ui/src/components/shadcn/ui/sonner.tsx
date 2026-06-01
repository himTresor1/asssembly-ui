'use client'

import { Toaster as Sonner } from 'sonner'

import { cn } from '../../../lib/utils'
import { buttonVariants } from '../../Button'
import { StatusIcon } from './../../StatusIcon'

export const SONNER_DEFAULT_DURATION = 4000

type ToasterProps = React.ComponentProps<typeof Sonner> & { theme: 'light' | 'dark' | 'system' }

const SonnerToaster = ({ toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      icons={{
        warning: <StatusIcon variant="warning" />,
        error: <StatusIcon variant="destructive" />,
        info: <StatusIcon variant="default" />,
      }}
      // pointer-events-auto is needed to fix the toast when above radix modals. Set the width to 420px to fix the toast
      // progress component (bottom row rendered in two lines).
      className="toaster group pointer-events-auto"
      // fontFamily: 'inherit' is needed to use the same font as the rest of the app
      style={{ fontFamily: 'inherit' }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'group',
            'toast',
            'w-full',
            'rounded-md',
            'py-3',
            'px-5',
            'flex',
            'gap-2',
            'items-start',
            'font-normal',
            'text-sm',
            'group-[.toaster]:bg-overlay group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-overlay group-[.toaster]:shadow-lg'
          ),
          icon: 'mt-0.5',
          title: 'font-normal!',
          description:
            'text-xs group-[.toast]:text-foreground-lighter transition-opacity group-data-[expanded=false]:opacity-0 group-data-[front=true]:opacity-100!',
          actionButton: cn('block', buttonVariants({ type: 'primary', size: 'tiny' })),
          cancelButton: cn('block', buttonVariants({ type: 'default', size: 'tiny' })),
          // success: 'group toast group-[.toaster]:!bg-brand-200 group-[.toaster]:border-brand-500',
          warning:
            'group toast group-[.toaster]:!bg-warning-200 group-[.toaster]:!border-warning-500',
          error:
            'group toast group-[.toaster]:!bg-destructive-200 group-[.toaster]:!border-destructive-500',
          closeButton: cn(
            // unset all styles set from sonner
            'absolute right-2 top-2 size-6 flex items-center justify-center rounded-md text-foreground-light opacity-0 transition',
            'hover:text-foreground hover:bg-surface-200 focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100',
            'group-[.destructive]:text-destructive-300 group-[.destructive]:hover:text-destructive-50',
            'group-[.destructive]:focus:ring-destructive-400 group-[.destructive]:focus:ring-offset-destructive-600',
            'left-auto transform-none border-0 border-transparent'
          ),
          content: 'grow',
          //group-[.toaster]:bg-overlay group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-overlay
        },
        duration: SONNER_DEFAULT_DURATION,
        closeButton: true,
        ...toastOptions,
      }}
      cn={cn}
      {...props}
    />
  )
}

export { SonnerToaster }

/**
 * ==========================================
 * ASSEMBLY UX RULES FOR TOASTS & NOTIFICATIONS
 * ==========================================
 * - Non-Critical Auto-Dismiss: Toasts for non-critical success messages must auto-dismiss after 4–5 seconds.
 * - Critical Errors Stay Open: Toasts for errors must NOT auto-dismiss. The user must explicitly acknowledge/close an error.
 * - Queue Limits: Never stack more than 3 toasts simultaneously. Queue additional notifications.
 * - Consistent Placement: Toasts must be positioned consistently (top-right on desktop, top-center on mobile). Never move them around.
 * - Action Window: Action toasts (e.g. "File deleted. [Undo]") must give the user at least 5 seconds to act before the option fades.
 */

