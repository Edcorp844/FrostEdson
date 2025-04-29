'use client'
import { useNews } from "@/context/news-context"
import CurrentNews from "./current-news"

export default function NewsPage() {
    const { activeCategory, selectedLanguage } = useNews()

    return (
        <div>
            <CurrentNews category={activeCategory} language={selectedLanguage} />
        </div>
    )
}