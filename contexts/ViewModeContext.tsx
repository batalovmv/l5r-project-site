'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type ViewMode = 'player' | 'developer'

type ViewModeContextValue = {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  isPlayerMode: boolean
  isDeveloperMode: boolean
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null)

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('player')

  useEffect(() => {
    const saved = window.localStorage.getItem('viewMode') as ViewMode | null
    if (saved === 'player' || saved === 'developer') {
      setViewModeState(saved)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('viewMode', viewMode)
  }, [viewMode])

  const value = useMemo<ViewModeContextValue>(
    () => ({
      viewMode,
      setViewMode: setViewModeState,
      isPlayerMode: viewMode === 'player',
      isDeveloperMode: viewMode === 'developer',
    }),
    [viewMode]
  )

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext)
  if (!ctx) throw new Error('useViewMode must be used within ViewModeProvider')
  return ctx
}
