import type {Games} from '../types/games';
import type { TranslationKeys } from '@/translations';

export const getGames = (t: TranslationKeys): Promise<Games[]> => {
    const games: Games[] = [
        { id: "magic", name: t.games.magic, color: "#1a1a1a" },
        { id: "pokemon", name: t.games.pokemon, color: "#ffcb05" },
        { id: "yugioh", name: t.games.yugioh, color: "#b30000" },
        { id: "lorcana", name: t.games.lorcana, color: "#002b5c" },
        { id: "onepiece", name: t.games.onepiece, color: "#00a0e9" },
    ];

    return new Promise((resolve) => {
        setTimeout(() => resolve(games), 500);
    });
};
