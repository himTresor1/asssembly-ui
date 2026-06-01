import { cn } from '../../../lib/utils/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}

export { Skeleton }

/**
 * ==========================================
 * ASSEMBLY UX RULES FOR LOADING & SKELETONS
 * ==========================================
 * - Skeletons over Spinners: Use skeleton screens (not spinners) for any content area larger than 200×200px. Skeletons are preferred for layout-heavy content.
 * - Structure Matching: Loading states must reflect the actual structure of the content that will appear. A skeleton for a list of cards must look like cards, not a generic grey rectangle.
 * - Layout Shift Prevention: Loading states must not cause layout shift. Reserve space for content before it loads.
 * - Viewport Blocking: NEVER block the entire viewport with a full-screen spinner for more than 3 seconds.
 */

