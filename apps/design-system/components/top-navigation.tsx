'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from 'ui'

import { CommandMenu } from './command-menu'
import { HomepageSvgHandler } from './homepage-svg-handler'
import { ThemeSwitcherDropdown } from './theme-switcher-dropdown'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'

export const TopNavigation = () => {
  const { toggle } = useMobileSidebar()

  return (
    <header className="sticky top-0 z-50 w-full bg-studio/95 backdrop-blur-sm supports-backdrop-filter:bg-studio/60 border-b border-l border-r">
      <nav className="py-3 w-full flex">
        <div className="max-w-site w-full flex flex-row items-center gap-6 mx-auto md:px-6 px-4 justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              size="tiny"
              className="px-1 md:hidden"
              onClick={toggle}
              icon={<Menu size={16} />}
              aria-label="Toggle navigation menu"
            />
            <Link href="/" className="select-none">
              <h1 className="font-extrabold tracking-tight lg:text-2xl text-xl text-foreground">
                Assembly
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <CommandMenu />
            <ThemeSwitcherDropdown />
          </div>
        </div>
      </nav>
    </header>
  )
}
