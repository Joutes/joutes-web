import type {Game} from '@/types/game';
import api from '@/services/api';

// Cache simple pour éviter les appels redondants (notamment en StrictMode)
const gameCache = new Map<string, Promise<Game>>();

export const getGameByCode = (code: string): Promise<Game> => {
    if (gameCache.has(code)) {
        return gameCache.get(code)!;
    }

    const fetchPromise = (async () => {
        try {
            const response = await api.get<Game>(`/game/${code}`);
            return response.data;
        } catch (error) {
            gameCache.delete(code);
            throw error;
        }
    })();

    gameCache.set(code, fetchPromise);
    return fetchPromise;
};
