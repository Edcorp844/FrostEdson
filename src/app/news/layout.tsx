'use client'

import { NewsProvider } from '@/context/news-context'
import NewsHeader from './news-headser'


export default function NewsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en"> {/* Language will now be controlled by context */}
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
}