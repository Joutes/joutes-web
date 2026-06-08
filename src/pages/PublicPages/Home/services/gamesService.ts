import type { Game } from '@/types/game';
import api from '@/services/api';

let cachedGames: Game[] | null = null;
let gamesPromise: Promise<Game[]> | null = null;

export const getGames = async (): Promise<Game[]> => {
    if (cachedGames) {
        return cachedGames;
    }

    if (gamesPromise) {
        return gamesPromise;
    }

    gamesPromise = api.get<Game[]>('/games')
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

