import type {CollectionSummary} from '../types/collection';
import api from '@/services/api';

const pendingRequests = new Map<string, Promise<CollectionSummary[]>>();

export const getCollectionSummary = async (): Promise<CollectionSummary[]> => {
    const cacheKey = 'summary';
    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey)!;
    }

    const promise = api.get<CollectionSummary[]>('/collection/me/summary')
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération du résumé de la collection:", error);
            return [];
        })
        .finally(() => {
            pendingRequests.delete(cacheKey);
        });

    pendingRequests.set(cacheKey, promise);
    return promise;
};
