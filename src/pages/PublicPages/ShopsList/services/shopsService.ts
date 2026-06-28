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

// Cache pour les promesses de récupération par slug
const shopBySlugPromises = new Map<string, Promise<Shop | null>>();

export const getShopBySlug = async (slug: string): Promise<Shop | null> => {
    if (shopBySlugPromises.has(slug)) {
        return shopBySlugPromises.get(slug)!;
    }

    const promise = api.get<Shop>(`/shop/${slug}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Erreur lors de la récupération de la boutique ${slug}:`, error);
            shopBySlugPromises.delete(slug);
            return null;
        });

    shopBySlugPromises.set(slug, promise);
    return promise;
};

