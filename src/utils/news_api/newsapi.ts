/**
 * NewsAPI TypeScript Utility for Next.js
 * Provides typed access to the NewsAPI (https://newsapi.org)
 * Author: Frost Edson
 */

interface NewsAPIOptions {
    corsProxyUrl?: string;
    noCache?: boolean;
    showHeaders?: boolean;
  }
  
  interface NewsAPIRequestOptions {
    noCache?: boolean;
    showHeaders?: boolean;
  }
  
  interface NewsAPIResponse<T> {
    status: string;
    totalResults?: number;
    articles?: T[];
    sources?: NewsAPISource[];
    code?: string;
    message?: string;
  }
  
  interface NewsAPIArticle {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }
  
  interface NewsAPISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  }
  
  interface NewsAPIError extends Error {
    code?: string;
    message: string;
  }
  
  class NewsAPIError extends Error {
    constructor(error: { code: string; message: string }) {
      super(error.message);
      this.name = `NewsAPIError: ${error.code}`;
      this.code = error.code;
    }
  }
  
  export class NewsAPI {
    private readonly apiKey: string;
    private readonly corsProxyUrl: string;
  
    constructor(apiKey: string, options: NewsAPIOptions = {}) {
      if (!apiKey) throw new Error('No API key specified');
      this.apiKey = apiKey;
      this.corsProxyUrl = options.corsProxyUrl || '';
    }
  
    private async fetchFromAPI<T>(
      endpoint: string,
      params: Record<string, any> = {},
      options: NewsAPIRequestOptions = {}
    ): Promise<T> {
      const query = new URLSearchParams(params).toString();
      const baseUrl = `${this.corsProxyUrl}https://newsapi.org${endpoint}`;
      const url = query ? `${baseUrl}?${query}` : baseUrl;
  
      const headers: Record<string, string> = {
        'X-Api-Key': this.apiKey,
      };
  
      if (options.noCache) {
        headers['X-No-Cache'] = 'true';
      }
  
      try {
        const response = await fetch(url, {
          headers,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new NewsAPIError({
            code: errorData.code || 'fetch_error',
            message: errorData.message || 'Failed to fetch from NewsAPI',
          });
        }
  
        const data: NewsAPIResponse<T> = await response.json();
  
        if (data.status === 'error') {
          throw new NewsAPIError({
            code: data.code || 'api_error',
            message: data.message || 'NewsAPI returned an error',
          });
        }
  
        if (options.showHeaders) {
          return {
            headers: Object.fromEntries(response.headers.entries()),
            body: data,
          } as T;
        }
  
        return data as T;
      } catch (error) {
        if (error instanceof NewsAPIError) {
          throw error;
        }
        throw new NewsAPIError({
          code: 'network_error',
          message: error instanceof Error ? error.message : 'Unknown network error',
        });
      }
    }
  
    // V2 API Methods
    readonly v2 = {
      topHeadlines: async (
        params: {
          q?: string;
          sources?: string;
          language?: string;
          country?: string;
          category?: string;
          pageSize?: number;
          page?: number;
        } = { language: 'en' },
        options: NewsAPIRequestOptions = {}
      ): Promise<NewsAPIResponse<NewsAPIArticle>> => {
        return this.fetchFromAPI<NewsAPIResponse<NewsAPIArticle>>(
          '/v2/top-headlines',
          params,
          options
        );
      },
  
      everything: async (
        params: {
          q?: string;
          sources?: string;
          domains?: string;
          excludeDomains?: string;
          from?: string;
          to?: string;
          language?: string;
          sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
          pageSize?: number;
          page?: number;
        },
        options: NewsAPIRequestOptions = {}
      ): Promise<NewsAPIResponse<NewsAPIArticle>> => {
        return this.fetchFromAPI<NewsAPIResponse<NewsAPIArticle>>(
          '/v2/everything',
          params,
          options
        );
      },
  
      sources: async (
        params: {
          category?: string;
          language?: string;
          country?: string;
        },
        options: NewsAPIRequestOptions = {}
      ): Promise<NewsAPIResponse<NewsAPISource>> => {
        return this.fetchFromAPI<NewsAPIResponse<NewsAPISource>>(
          '/v2/sources',
          params,
          options
        );
      },
    };
  
    // V1 API Methods (legacy)
    async sources(
      params: {
        category?: string;
        language?: string;
        country?: string;
      } = {},
      options: NewsAPIRequestOptions = {}
    ): Promise<NewsAPIResponse<NewsAPISource>> {
      return this.fetchFromAPI<NewsAPIResponse<NewsAPISource>>(
        '/v1/sources',
        params,
        options
      );
    }
  
    async articles(
      params: {
        source: string;
        sortBy?: 'top' | 'latest' | 'popular';
      },
      options: NewsAPIRequestOptions = {}
    ): Promise<NewsAPIResponse<NewsAPIArticle>> {
      return this.fetchFromAPI<NewsAPIResponse<NewsAPIArticle>>(
        '/v1/articles',
        params,
        options
      );
    }
  }
  
  // Utility function to create a singleton instance
  let newsAPIInstance: NewsAPI | null = null;
  
  export const initNewsAPI = (apiKey: string, options: NewsAPIOptions = {}): NewsAPI => {
    if (!newsAPIInstance) {
      newsAPIInstance = new NewsAPI(apiKey, options);
    }
    return newsAPIInstance;
  };
  
  export const getNewsAPI = (): NewsAPI => {
    if (!newsAPIInstance) {
      throw new Error('NewsAPI has not been initialized. Call initNewsAPI first.');
    }
    return newsAPIInstance;
  };