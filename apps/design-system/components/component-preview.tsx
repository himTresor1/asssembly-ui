'use client'

import { ChevronRight, Expand } from 'lucide-react'
import * as React from 'react'
import {
  Button,
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  NavMenu,
  NavMenuItem
} from 'ui'

import { Index } from '@/__registry__'
import { useConfig } from '@/hooks/use-config'
import { styles } from '@/registry/styles'

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: 'center' | 'start' | 'end'
  peekCode?: boolean
  showGrid?: boolean
  showDottedGrid?: boolean
  wide?: boolean
  hideCode?: boolean
  padded?: boolean
}

export function ComponentPreview({
  name,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = 'center',
  peekCode = false,
  showGrid = false,
  showDottedGrid = true,
  wide = false,
  hideCode = false,
  padded = true,
  ...props
}: ComponentPreviewProps) {
  const [config] = useConfig()
  const index = styles.findIndex((style) => style.name === config.style)

  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const [expand, setExpandState] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'preview' | 'code'>('preview')
  const previewClassName = className

  const Preview = React.useMemo(() => {
    const Component = Index[config.style][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{' '}
          <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{' '}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, config.style])

  const ComponentPreview = React.useMemo(() => {
    return (
      <>
        <div
          className={cn(
            'preview flex min-h-[450px] w-full justify-center',
            padded && 'p-10',
            {
              'items-center': align === 'center',
              'items-start': align === 'start',
              'items-end': align === 'end',
            },
            previewClassName
          )}
        >
          <React.Suspense
            fallback={
              <div className="flex items-center text-sm text-muted-foreground">Loading...</div>
            }
          >
            {Preview}
          </React.Suspense>
        </div>
      </>
    )
  }, [Preview, align, padded, previewClassName])

  const wideClasses = ''

  if (hideCode) {
    return (
      <div className={cn('mt-4 mb-12', wideClasses)}>
        <div className="relative bg-studio rounded-md border overflow-hidden">
          {showGrid && (
            <div className="pointer-events-none absolute h-full w-full bg-[linear-gradient(to_right,hsla(var(--foreground-default)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          )}
          {showDottedGrid && (
            <div className="z-0 pointer-events-none absolute h-full w-full bg-[radial-gradient(hsla(var(--foreground-default)/0.02)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          )}
          <div className="z-10 relative">{ComponentPreview}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mt-4 mb-12', wideClasses)}>
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <NavMenu className="border-b-0 pb-1">
          <NavMenuItem active={activeTab === 'preview'}>
            <button onClick={() => setActiveTab('preview')} className="text-xs font-medium cursor-pointer">
              Preview
            </button>
          </NavMenuItem>
          <NavMenuItem active={activeTab === 'code'}>
            <button onClick={() => setActiveTab('code')} className="text-xs font-medium cursor-pointer">
              Code
            </button>
          </NavMenuItem>
        </NavMenu>
      </div>

      {activeTab === 'preview' && (
        <div className="mt-3 relative bg-studio rounded-md border overflow-hidden">
          {showGrid && (
            <div className="pointer-events-none absolute h-full w-full bg-[linear-gradient(to_right,hsla(var(--foreground-default)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          )}
          {showDottedGrid && (
            <div className="z-0 pointer-events-none absolute h-full w-full bg-[radial-gradient(hsla(var(--foreground-default)/0.02)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          )}
          <div className="z-10 relative">{ComponentPreview}</div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="mt-3 relative w-full overflow-hidden [&_pre]:my-0 [&_pre]:overflow-auto [&_pre]:max-h-[350px]">
          {Code}
        </div>
      )}
    </div>
  )
}
