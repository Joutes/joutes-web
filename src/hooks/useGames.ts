import { useState, useEffect, useMemo } from 'react';
import { getGames } from '@/pages/PublicPages/Home/services/gamesService';
import type { Game } from '../pages/PublicPages/Home/types/game';
import { useUserPreferences } from '@/store/userPreferences';

export const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
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

    const getGameByCode = (code: string) => {
        return games.find(g => g.code === code);
    };

    return { games, loading, activeGame, getGameByCode };
};
