import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { GamePadModern1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import { useUserPreferences } from '@/store/userPreferences';
import type {Game} from '../../types/game';
import { getGames } from '../../services/gamesService';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './GamesCarousel.scss';

export default function GamesCarousel() {
    const { t } = useTranslation();
    const { selectedGame, setSelectedGame } = useUserPreferences();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getGames()
            .then(data => {
                setGames(data);
                setError(false);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const renderContent = () => {
        if (loading) return <SectionLoader />;
        if (error) return <SectionMessage message={t.home.error_loading} type="error" />;
        if (games.length === 0) return <SectionMessage message={t.home.no_games} />;

        return (
            <div className="games-carousel">
                {games.map(game => (
                    <button 
                        key={game.code}
                        className={`game-card-btn ${selectedGame === game.code ? 'active' : ''}`}
                        onClick={() => setSelectedGame(game.code)}
                        style={{ 
                            backgroundImage: `url(${game.images.horizontal})`,
                            '--game-color': game.color 
                        } as React.CSSProperties}
                    >
                        <div className="game-card-inner">
                            <span className="game-name">{game.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <section className="home-section games-carousel-section">
            <div className="section-header">
                <h2><Lineicons icon={GamePadModern1Outlined} /> {t.home.games_carousel}</h2>
                <Link to="/games" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {renderContent()}
        </section>
    );
}
