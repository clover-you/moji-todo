'use client'

import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'


export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <NextThemesProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
    >
      {children}
    </NextThemesProvider>
  )
}
