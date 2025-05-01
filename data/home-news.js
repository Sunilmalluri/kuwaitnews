import gulfNews from './news-gulf.js';
import internationalNews from './news-international.js';
import nationalNews from './news-national.js';

const allNews = [
    ...gulfNews,
    ...internationalNews,
    ...nationalNews
];

// Featured news: Articles with featured: true, limited to 3
const featuredNews = allNews
    .filter(article => article.featured === true)
    .slice(0, 3);

// Latest news: Most recent articles, limited to 6
const latestNews = allNews
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

export { featuredNews, latestNews };
