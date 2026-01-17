'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface HintsContextType {
  hintsActive: boolean
  toggleHints: () => void
}

const HintsContext = createContext<HintsContextType | undefined>(undefined)

export function HintsProvider({ children }: { children: ReactNode }) {
  const [hintsActive, setHintsActive] = useState(false)

  const toggleHints = () => {
    setHintsActive(!hintsActive)
  }

  return (
    <HintsContext.Provider value={{ hintsActive, toggleHints }}>
      <div className={hintsActive ? 'hints-active' : ''}>
        {children}
      </div>
    </HintsContext.Provider>
  )
}

export function useHints() {
  const context = useContext(HintsContext)
  if (context === undefined) {
    throw new Error('useHints must be used within a HintsProvider')
  }
  return context
}

