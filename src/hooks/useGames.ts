import { useState, useEffect, useMemo } from 'react';
import { getGames } from '@/pages/PublicPages/Home/services/gamesService';
import type { Games } from '@/pages/PublicPages/Home/types/games';
import { useUserPreferences } from '@/store/userPreferences';

export const useGames = () => {
    const [games, setGames] = useState<Games[]>([]);
    const [loading, setLoading] = useState(true);
    const { selectedGame } = useUserPreferences();

    useEffect(() => {
        getGames().then(data => {
            setGames(data);
            setLoading(false);
        });
    }, []);

    const activeGame = useMemo(() => {
        return games.find(g => g.code === selectedGame) || null;
    }, [games, selectedGame]);

    return { games, loading, activeGame };
};
