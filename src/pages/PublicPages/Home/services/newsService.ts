import type {NewsResponse} from '../types/news';
import api from '@/services/api';

const pendingRequests = new Map<string, Promise<NewsResponse>>();

export const getNews = async (page = 1, limit = 10): Promise<NewsResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const cacheKey = params.toString();
    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey)!;
    }

    const promise = api.get<NewsResponse>(`/news?${cacheKey}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des actualités:", error);
            return {
                data: [],
                meta: {
                    pagination: {
                        current_page: 1,
                        per_page: limit,
                        total_items: 0,
                        total_pages: 0,
                        has_next_page: false,
                        has_prev_page: false
                    }
                }
            };
        })
        .finally(() => {
            pendingRequests.delete(cacheKey);
        });

    pendingRequests.set(cacheKey, promise);
    return promise;
};
