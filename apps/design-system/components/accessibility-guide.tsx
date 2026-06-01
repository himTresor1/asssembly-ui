'use client'

import * as React from 'react'
import { cn } from 'ui'
import { Check, Keyboard, ShieldAlert, Sparkles } from 'lucide-react'

interface KeyCommand {
  key: string
  action: string
}

interface AriaAttribute {
  attribute: string
  purpose: string
}

interface AccessibilityGuideProps extends React.HTMLAttributes<HTMLDivElement> {
  roleName: string
  keyboardCommands: KeyCommand[]
  ariaAttributes: AriaAttribute[]
}

export function AccessibilityGuide({
  roleName,
  keyboardCommands,
  ariaAttributes,
  className,
  ...props
}: AccessibilityGuideProps) {
  return (
    <div
      className={cn(
        'my-6 overflow-hidden rounded-xl border border-border bg-surface-75/30 backdrop-blur-[1px] shadow-2xs',
        className
      )}
      {...props}
    >
      {/* Header bar with custom orange brand indicator */}
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-100/50 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-default/10 text-brand-default">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">Accessibility (a11y) Guide</h4>
            <p className="text-xs text-foreground-lighter">Built-in keyboard mapping and semantic standards</p>
          </div>
        </div>
        <div className="rounded-full bg-brand-default/10 border border-brand-default/20 px-2.5 py-0.5 text-2xs font-semibold text-brand-default">
          Role: {roleName}
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
        {/* Left Column: Keyboard Controls */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Keyboard size={16} className="text-foreground-muted" />
            <h5 className="font-medium text-xs text-foreground uppercase tracking-wider">Keyboard Navigation</h5>
          </div>
          <ul className="space-y-3">
            {keyboardCommands.map((cmd) => (
              <li key={cmd.key} className="flex items-start justify-between text-xs gap-3">
                <span className="text-foreground-light leading-relaxed">{cmd.action}</span>
                <kbd className="inline-flex h-5 max-h-5 select-none items-center justify-center rounded border border-border/80 bg-surface-100 px-1.5 font-mono text-[10px] font-medium text-foreground-muted shadow-2xs">
                  {cmd.key}
                </kbd>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Screen Reader Standards */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={16} className="text-foreground-muted" />
            <h5 className="font-medium text-xs text-foreground uppercase tracking-wider">ARIA Attributes</h5>
          </div>
          <ul className="space-y-3">
            {ariaAttributes.map((attr) => (
              <li key={attr.attribute} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Check size={12} className="text-brand-default shrink-0" />
                  <code className="rounded-sm bg-brand-default/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-brand-default">
                    {attr.attribute}
                  </code>
                </div>
                <p className="text-[11px] text-foreground-light leading-normal pl-4">
                  {attr.purpose}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
