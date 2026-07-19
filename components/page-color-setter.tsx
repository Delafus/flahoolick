'use client'

import { useEffect } from 'react'
import { usePageColor } from '@/context/page-color'

export function PageColorSetter({ bg, text }: { bg: string; text: string }) {
  const { setPageColor } = usePageColor()
  useEffect(() => { setPageColor(bg, text, '') }, [bg, text, setPageColor])
  return null
}
