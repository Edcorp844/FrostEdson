'use client';

import { useEffect, useState } from 'react';
import FlameActivityIndicator from '../components/flame-activity-indicator';
import NewsTile from './news-tile';
import NewsErrorPage from './news-error-page';
import { News } from '@/models/news_model';
import { newsAPI } from '@/utils/news_api/newsapi-config';
import { ExternalLink, X } from 'lucide-react';
import { languages } from './language-selector';


interface NewsPageProps {
    category: Category;
    language: string;
}

const CurrentNews: React.FC<NewsPageProps> = ({ category, language }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newsErrorMessage, setNewsErrorMessage] = useState<string | null>(null);
    const [news, setNews] = useState<News[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<News | null>(null);

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

    const openWebView = (article: News) => {
        setSelectedArticle(article);
    };

    const closeWebView = () => {
        setSelectedArticle(null);
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
                <p>
                    {`No news articles found in ${languages.find(lang => lang.code === language)?.label || language
                        }`}
                </p>

            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">

            {/* Main Content */}
            <section id="news" className="flex-grow">
                <div className="mt-20 px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Featured Article (Left-side) */}
                    <div className="flex justify-center">
                        <div className="shadow-lg rounded-3xl p-2 bg-black/5 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full border border-separator">
                            <div className="relative w-full h-60 sm:h-80 md:h-full">
                                <img
                                    src={news[0].imageUrl}
                                    className="w-full h-full rounded-3xl object-cover"
                                    alt={news[0].title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://dribbble.com/shots/6525705-Newspaper/attachments/6525705-Newspaper';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-3xl">
                                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold line-clamp-2">{news[0].title}</h2>
                                    <p className="text-white text-sm sm:text-base lg:text-lg line-clamp-3">{news[0].description}</p>
                                    <button
                                        onClick={() => openWebView(news[0])}
                                        className="inline-block mt-2 bg-[#ff375f] px-4 py-2 rounded-xl font-bold text-white text-sm sm:text-base hover:bg-[#e03154]"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* News List (Right-side) */}
                    <div>
                        <h2 className="font-bold text-3xl">{category.label} News</h2>
                        <div className="mt-4 h-[70vh] overflow-y-auto pr-4">
                            <div className="space-y-6">
                                {news.slice(1).map((article, index) => (
                                    <NewsTile
                                        key={`${article.url}-${index}`}
                                        article={article}
                                        index={index}
                                        onReadMore={() => openWebView(article)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Web View Modal */}
                {selectedArticle && (
                    <div className="fixed inset-0 bg-black/5 backdrop-blur-md flex items-center justify-center z-50 p-4 border border-separator">
                        <div className="bg-backdrop rounded-xl w-full max-w-4xl h-[80vh] flex flex-col shadow-lg border border-separator">
                            <div className="flex justify-start gap-8 items-center p-4 border-b border-separator">
                                <span className="size-4 rounded-full bg-red-500/80 cursor-pointer justify-center items-center" onClick={closeWebView}></span>
                                <h2 className="line-clamp-1">{selectedArticle.title}</h2>
                            </div>
                            <div className="flex-grow overflow-auto p-6">
                                <div className="prose dark:prose-invert max-w-none">
                                    <h2 className="text-2xl sm:text-3xl font-bold">{selectedArticle.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                                        Source: {selectedArticle.source} | Published: {new Date(selectedArticle.publishedAt.toString()).toLocaleDateString() /*selectedArticle.publishedAt*/}
                                    </p>
                                    {selectedArticle.imageUrl && (
                                        <img
                                            src={selectedArticle.imageUrl}
                                            alt={selectedArticle.title}
                                            className="w-full h-auto rounded-lg mb-4"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    'https://dribbble.com/shots/6525705-Newspaper/attachments/6525705-Newspaper';
                                            }}
                                        />
                                    )}
                                    <p className="text-lg">{selectedArticle.description}</p>
                                    <p>{selectedArticle.content}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                        Note: Full article content may be truncated due to API limitations. Visit the original article for more details.
                                    </p>
                                    <a
                                        href={selectedArticle.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='inline-block mt-4 '

                                    >
                                        <div className="bg-[#ff375f] px-4 py-2 rounded-xl font-bold text-white text-sm sm:text-base hover:bg-[#e03154]  flex gap-3 items-center">
                                            Read Full Article
                                            <ExternalLink />
                                        </div>

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CurrentNews;