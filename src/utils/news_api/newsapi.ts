/**
 * NewsAPI TypeScript Utility for Next.js
 * Reimagined to sing through a Cloudflare Worker proxy
 * Author: Frost Edson
 */

interface NewsAPIOptions {
  corsProxyUrl?: string;  // Cloudflare Worker URL here
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

class NewsAPIError extends Error {
  code?: string;

  constructor(error: { code: string; message: string }) {
    super(error.message);
    this.name = `NewsAPIError: ${error.code}`;
    this.code = error.code;
  }
}

export class NewsAPI {
  private readonly apiKey: string;
  private readonly proxyBase: string;

  constructor(apiKey: string, options: NewsAPIOptions = {}) {
    if (!apiKey) throw new Error('No API key specified');
    this.apiKey = apiKey;
    this.proxyBase = options.corsProxyUrl || 'https://super-wildflower-a341.edsonchan6.workers.dev/?url=';
  }

  private async fetchFromAPI<T>(
    endpoint: string,
    params: Record<string, any> = {},
    options: NewsAPIRequestOptions = {}
  ): Promise<T> {
    const query = new URLSearchParams({ ...params, apiKey: this.apiKey }).toString();
    const targetUrl = `https://newsapi.org${endpoint}?${query}`;
    const url = `${this.proxyBase}${encodeURIComponent(targetUrl)}`;

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    const reqOptions: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers,
      cache: options.noCache ? 'no-store' : 'default',
    };

    try {
      const response = await fetch(url, reqOptions);

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new NewsAPIError({
            code: errorData.code || 'fetch_error',
            message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          });
        } catch {
          throw new NewsAPIError({
            code: 'network_error',
            message: `HTTP ${response.status}: ${response.statusText}`,
          });
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        throw new NewsAPIError({
          code: 'invalid_content_type',
          message: `Expected JSON, got ${contentType}. Response: ${text.slice(0, 100)}...`,
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
        } as unknown as T;
      }

      return data as T;
    } catch (error) {
      if (error instanceof NewsAPIError) throw error;
      throw new NewsAPIError({
        code: 'network_error',
        message: error instanceof Error ? error.message : 'Unknown network error',
      });
    }
  }

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
      return this.fetchFromAPI<NewsAPIResponse<NewsAPIArticle>>('/v2/top-headlines', params, options);
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
      } = {},
      options: NewsAPIRequestOptions = {}
    ): Promise<NewsAPIResponse<NewsAPIArticle>> => {
      return this.fetchFromAPI<NewsAPIResponse<NewsAPIArticle>>('/v2/everything', params, options);
    },

    sources: async (
      params: {
        category?: string;
        language?: string;
        country?: string;
      } = {},
      options: NewsAPIRequestOptions = {}
    ): Promise<NewsAPIResponse<NewsAPISource>> => {
      return this.fetchFromAPI<NewsAPIResponse<NewsAPISource>>('/v2/sources', params, options);
    },
  };
}

// Singleton management
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
