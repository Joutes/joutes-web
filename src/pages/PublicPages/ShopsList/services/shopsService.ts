import type { Shop } from '@/types/shop';
import api from '@/services/api';

let cachedShops: Shop[] | null = null;
let shopsPromise: Promise<Shop[]> | null = null;

export const getShops = async (): Promise<Shop[]> => {
    if (cachedShops) return cachedShops;
    if (shopsPromise) return shopsPromise;

    shopsPromise = api.get<Shop[]>('/shops')
        .then(response => {
            cachedShops = response.data;
            return response.data;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des boutiques:", error);
            return [];
        })
        .finally(() => {
            shopsPromise = null;
        });

    return shopsPromise;
};

export const getShopBySlug = async (slug: string): Promise<Shop | null> => {
    // On essaie d'abord dans le cache
    if (cachedShops) {
        const found = cachedShops.find(s => s.slug === slug);
        if (found) return found;
    }

    return api.get<Shop>(`/shops/${slug}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Erreur lors de la récupération de la boutique ${slug}:`, error);
            return null;
        });
};

