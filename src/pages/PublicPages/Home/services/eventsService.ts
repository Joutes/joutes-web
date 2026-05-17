import type {Event, EventsResponse} from '../types/event';
import api from '@/services/api';

const pendingRequests = new Map<string, Promise<EventsResponse>>();

export const getEvents = async (page = 1, limit = 10, followed?: boolean): Promise<EventsResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (followed !== undefined) {
        params.append('followed', followed.toString());
    }

    const cacheKey = params.toString();
    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey)!;
    }

    const promise = api.get<EventsResponse>(`/events?${cacheKey}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des événements:", error);
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

export const getUpcomingEvents = async (limit = 10): Promise<Event[]> => {
    return getEvents(1, limit).then(res => res.data);
};

export const getFollowedEvents = async (limit = 10): Promise<Event[]> => {
    return getEvents(1, limit, true).then(res => res.data);
};
