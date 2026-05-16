import type {CollectionSummary} from '../types/collection';
import api from '@/services/api';

let collectionPromise: Promise<CollectionSummary> | null = null;

export const getCollectionSummary = async (): Promise<CollectionSummary> => {
    if (collectionPromise) {
        return collectionPromise;
    }

    collectionPromise = api.get<CollectionSummary>('/collection/summary')
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération du résumé de la collection:", error);
            throw error;
        })
        .finally(() => {
            collectionPromise = null;
        });

    return collectionPromise;
};
