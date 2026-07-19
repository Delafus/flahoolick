'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface PageColorContextType {
  bg: string
  text: string
  accent: string
  setPageColor: (bg: string, text: string, accent: string) => void
}

const PageColorContext = createContext<PageColorContextType>({
  bg: '#000000',
  text: '#ffffff',
  accent: '#F09DB6',
  setPageColor: () => {},
})

export function PageColorProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState({
    bg: '#000000',
    text: '#ffffff',
    accent: '#F09DB6',
  })

  const setPageColor = useCallback((bg: string, text: string, accent: string) => {
    setColors({ bg, text, accent })
  }, [])

  return (
    <PageColorContext.Provider value={{ ...colors, setPageColor }}>
      {children}
    </PageColorContext.Provider>
  )
}

export function usePageColor() {
  return useContext(PageColorContext)
}
