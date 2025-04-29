'use client'

import { NewsProvider } from '@/context/news-context'
import NewsHeader from './news-headser'


function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <NewsProvider>{children}</NewsProvider>
}



export default function NewsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>){
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <NewsHeader />
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

/*
export default function NewsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en"> 
            <body>
                <NewsProvider>
                    <NewsHeader />
                    <main className="min-h-screen font-sans">
                        {children}
                    </main>
                </NewsProvider>
            </body>
        </html>
    )
}*/