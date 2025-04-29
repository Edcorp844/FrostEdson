// src/context/news-context.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'

interface Category {
  label: string
  category: string
}

interface NewsContextType {
  activeCategory: Category
  setActiveCategory: React.Dispatch<React.SetStateAction<Category>>
  selectedLanguage: string
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<Category>({
    label: 'General',
    category: 'general'
  })
  
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  return (
    <NewsContext.Provider value={{
      activeCategory,
      setActiveCategory,
      selectedLanguage,
      setSelectedLanguage
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}