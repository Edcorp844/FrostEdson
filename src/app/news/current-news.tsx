'use client';

/**
 * CurrentNews Component
 * Fetches and displays news articles based on category and language
 * Uses NewsAPI utility with CORS proxy support for client-side rendering
 */

import { useEffect, useState } from 'react';
import FlameActivityIndicator from '../components/flame-activity-indicator';
import NewsTile from './news-tile';
import NewsErrorPage from './news-error-page';
import { News } from '@/models/news_model';
import { newsAPI } from '@/utils/news_api/newsapi-config';


interface NewsPageProps {
    category: Category;
    language: string;
}

const CurrentNews: React.FC<NewsPageProps> = ({ category, language }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newsErrorMessage, setNewsErrorMessage] = useState<string | null>(null);
    const [news, setNews] = useState<News[]>([]);


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await newsAPI.v2.topHeadlines({
                country: 'us',
                category: category.category.toLowerCase(),
                language: language,
                pageSize: 20,
            });

            console.log(response);

            if (response.status === 'ok' && response.articles) {
                const articles: News[] = response.articles.map((article) => ({
                    title: article.title ?? '',
                    description: article.description ?? '',
                    url: article.url ?? '',
                    imageUrl: article.urlToImage ?? 'https://dribbble.com/shots/6525705-Newspaper/attachments/6525705-Newspaper',
                    publishedAt: article.publishedAt ?? '',
                    content: article.content ?? '',
                    source: article.source?.name ?? '',
                }));
                setNews(articles);
                setNewsErrorMessage(null);
            } else {
                console.log(response.message);
                throw new Error(response.message || 'Failed to fetch news data');
            }
        } catch (error) {
            console.error('Exception: ', error);
            const message =
                error instanceof Error && error.message.includes('403')
                    ? 'Failed to access NewsAPI due to CORS proxy restrictions. Please check if the CORS proxy (api.allorigins.win) is operational or contact the administrator.'
                    : error instanceof Error
                        ? error.message
                        : 'An unknown error occurred';
            setNewsErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        setIsLoading(true);
        setNewsErrorMessage(null);
        fetchData();
    };

    const handleCopyError = () => {
        if (newsErrorMessage) {
            navigator.clipboard.writeText(newsErrorMessage);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <FlameActivityIndicator size={40} />
            </div>
        );
    }

    if (newsErrorMessage) {
        return (
            <NewsErrorPage
                handleRetry={handleRetry}
                handleCopyError={handleCopyError}
                newsErrorMessage={newsErrorMessage}
            />
        );
    }

    if (news.length === 0) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <p>No news articles found</p>
            </div>
        );
    }

    return (
        <section id="news">
            <div>
                <div className="mt-20 px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        <div className="shadow-lg rounded-3xl p-2 bg-black/5 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full">
                            <div className="relative w-full h-full">
                                <img
                                    src={news[0].imageUrl}
                                    className="w-full h-full rounded-3xl object-cover aspect-video"
                                    alt={news[0].title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://dribbble.com/shots/6525705-Newspaper/attachments/6525705-Newspaper';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-3xl">
                                    <h2 className="text-white text-3xl font-bold">{news[0].title}</h2>
                                    <p className="text-white text-lg">{news[0].description}</p>
                                    <a
                                        href={news[0].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 bg-[#ff375f] px-4 py-2 rounded-xl font-bold text-white hover:bg-[#e03154]"
                                    >
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-3xl">{category.label} News</h2>
                        <div className="mt-4 h-[70vh] overflow-y-auto pr-4">
                            <div className="space-y-6">
                                {news.slice(1).map((article, index) => (
                                    <NewsTile key={`${article.url}-${index}`} article={article} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CurrentNews;