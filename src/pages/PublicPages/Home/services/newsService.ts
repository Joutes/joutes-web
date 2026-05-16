import type {NewsItem} from '../types/news';
import api from '@/services/api';

let newsPromise: Promise<NewsItem[]> | null = null;

export const getNews = async (): Promise<NewsItem[]> => {
    if (newsPromise) {
        return newsPromise;
    }

    newsPromise = api.get<NewsItem[]>('/news')
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des actualités:", error);
            return [];
        })
        .finally(() => {
            newsPromise = null;
        });

    return newsPromise;
};
