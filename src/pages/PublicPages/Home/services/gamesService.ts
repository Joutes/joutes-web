import type {Games} from '../types/games';
import api from '@/services/api';

let cachedGames: Games[] | null = null;
let gamesPromise: Promise<Games[]> | null = null;

export const getGames = async (): Promise<Games[]> => {
    if (cachedGames) {
        return cachedGames;
    }

    if (gamesPromise) {
        return gamesPromise;
    }

    gamesPromise = api.get<Games[]>('/games')
        .then(response => {
            cachedGames = response.data;
            return response.data;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des jeux:", error);
            return [];
        })
        .finally(() => {
            gamesPromise = null;
        });

    return gamesPromise;
};
