import type {Shop} from '../types/shop';
import api from '@/services/api';

let cachedShops: Shop[] | null = null;
let shopsPromise: Promise<Shop[]> | null = null;

export const getShops = async (): Promise<Shop[]> => {
    if (cachedShops) {
        return cachedShops;
    }

    if (shopsPromise) {
        return shopsPromise;
    }

    shopsPromise = api.get<Shop[]>('/shops')
        .then(response => {
            cachedShops = response.data;
            return response.data;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des shops:", error);
            return [];
        })
        .finally(() => {
            shopsPromise = null;
        });

    return shopsPromise;
};
