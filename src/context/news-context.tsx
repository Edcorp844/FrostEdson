// src/context/news-context.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Category {
  label: string
  category: string
}

interface NewsContextType {
  activeCategory: Category
  setActiveCategory: (category: Category) => void
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
}

const NewsContext = createContext<NewsContextType | null>(null)

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<Category>({
    label: 'General',
    category: 'general'
  })
  
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  // Optional: Sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem('newsSettings')
    if (saved) {
      const { category, language } = JSON.parse(saved)
      setActiveCategory(category)
      setSelectedLanguage(language)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('newsSettings', 
      JSON.stringify({ category: activeCategory, language: selectedLanguage })
    )
  }, [activeCategory, selectedLanguage])

  return (
    <NewsContext.Provider 
      value={{
        activeCategory,
        setActiveCategory,
        selectedLanguage,
        setSelectedLanguage
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}