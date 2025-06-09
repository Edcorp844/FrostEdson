'use client';

/**
 * CurrentNews Component
 * Fetches and displays news articles with a web view for article content
 * Uses NewsAPI utility with CORS proxy support for client-side rendering
 * Adjusted image dimensions for mobile compatibility
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
  const [selectedArticle, setSelectedArticle] = useState<News | null>(null);
  const [iframeError, setIframeError] = useState<boolean>(false);

 

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
    setIframeError(false); // Reset iframe error state
  };

  const closeWebView = () => {
    setSelectedArticle(null);
    setIframeError(false);
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
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <section id="news" className="flex-grow">
        <div className="mt-20 px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Article (Left-side) */}
          <div className="flex justify-center">
            <div className="shadow-lg rounded-3xl p-2 bg-black/5 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full border border-separator">
              <div className="relative w-full h-64 sm:h-80 lg:h-96">
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
                    onReadMore={()=>openWebView(article)} // Pass openWebView to NewsTile
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Web View Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">{selectedArticle.title}</h2>
                <button
                  onClick={closeWebView}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ✕
                </button>
              </div>
              <div className="flex-grow overflow-auto p-4">
                {iframeError ? (
                  <div className="text-center">
                    <p className="text-red-500 mb-4">
                      This article cannot be embedded due to website restrictions. Showing available content:
                    </p>
                    <div className="prose dark:prose-invert">
                      <h3>{selectedArticle.title}</h3>
                      <p>{selectedArticle.description}</p>
                      <p>{selectedArticle.content}</p>
                      <a
                        href={selectedArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit original article
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={selectedArticle.url}
                    className="w-full h-full border-0"
                    title={selectedArticle.title}
                    onError={() => setIframeError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CurrentNews;