'use client'

import * as React from 'react'
import { Button, cn, Collapsible, CollapsibleContent, CollapsibleTrigger } from 'ui'

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string
}

export function CodeBlockWrapper({
  expandButtonTitle = 'View Code',
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn('relative overflow-hidden border border-border/80 rounded-lg bg-surface-75/30 shadow-2xs', className)} {...props}>
        <CollapsibleContent forceMount className={cn('overflow-hidden', !isOpened && 'max-h-32')}>
          <div
            className={cn(
              '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px] [&_pre]:rounded-none [&_pre]:border-0',
              !isOpened ? '[&_pre]:overflow-hidden' : '[&_pre]:overflow-auto]'
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            'absolute flex items-center justify-center bg-linear-to-b from-transparent via-background/75 to-background/98 p-4 backdrop-blur-[1px] transition-all duration-300',
            isOpened ? 'inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-background/10' : 'inset-0'
          )}
        >
          <CollapsibleTrigger asChild>
            <Button type="secondary" className="h-8 text-xs font-semibold px-4 border border-border/80 shadow-xs hover:bg-muted/80">
              {isOpened ? 'Collapse' : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  )
}
