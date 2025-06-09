import { initNewsAPI } from './newsapi';

const NEWS_API_KEY = '8468d3e24f614f959062cd9645b04e9d';
/*process.env.NEXT_PUBLIC_NEWS_API_KEY || '';*/

export const newsAPI = initNewsAPI(NEWS_API_KEY, {
  // Optional: Add CORS proxy URL if needed
  corsProxyUrl: 'https://corsproxy.io/?',//'https://cors-anywhere.herokuapp.com/'
});

