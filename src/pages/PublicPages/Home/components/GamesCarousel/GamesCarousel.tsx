import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { GamePadModern1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import { useUserPreferences } from '@/store/userPreferences';
import type {Games} from '../../types/games';
import { getGames } from '../../services/gamesService';
import SectionLoader from '../SectionLoader';
import './GamesCarousel.scss';

export default function GamesCarousel() {
    const { t } = useTranslation();
    const { selectedGame, setSelectedGame } = useUserPreferences();
    const [games, setGames] = useState<Games[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGames(t).then(data => {
            setGames(data);
            setLoading(false);
        });
    }, [t]);

    return (
        <section className="home-section games-carousel-section">
            <div className="section-header">
                <h2><Lineicons icon={GamePadModern1Outlined} /> {t.home.games_carousel}</h2>
                <Link to="/games" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {loading ? <SectionLoader /> : (
                <div className="games-carousel">
                    {games.map(game => (
                        <button 
                            key={game.id} 
                            className={`game-card-btn ${selectedGame === game.id ? 'active' : ''}`}
                            onClick={() => setSelectedGame(game.id)}
                        >
                            <div className="game-card-inner">
                                <span className="game-name">{game.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
