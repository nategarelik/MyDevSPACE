'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dashboard } from '@/components/dashboard/dashboard'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { CommandMenu } from '@/components/ui/command-menu'
import { useHotkeys } from '@/hooks/use-hotkeys'

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Global hotkeys
  useHotkeys([
    ['mod+k', () => setIsCommandOpen(true)],
    ['mod+\\\\', () => setIsSidebarCollapsed(!isSidebarCollapsed)],
    ['mod+1', () => setCurrentSection('dashboard')],
    ['mod+2', () => setCurrentSection('projects')],
    ['mod+3', () => setCurrentSection('agents')],
    ['mod+4', () => setCurrentSection('storage')],
    ['mod+5', () => setCurrentSection('extensions')],
  ])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          currentSection={currentSection}
          onCommandOpen={() => setIsCommandOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="h-full"
            >
              <Dashboard currentSection={currentSection} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Command Menu */}
      <CommandMenu
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        onSectionChange={setCurrentSection}
      />
    </div>
  )
}