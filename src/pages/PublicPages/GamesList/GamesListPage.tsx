import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '@/hooks/useGames';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserPreferences } from '@/store/userPreferences';
import type { Game } from '@/types/game';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import './GamesListPage.scss';

const CATEGORY_ORDER = ['TCG', 'DUEL', 'GROUP', 'SOLO', 'OTHER'];

export default function GamesListPage() {
    const { games, loading } = useGames();
    const { t } = useTranslation();

    const gamesByCategory = useMemo(() => {
        const grouped: Record<string, Game[]> = {};
        
        CATEGORY_ORDER.forEach(cat => {
            grouped[cat] = [];
        });

        games.forEach(game => {
            if (game.categories && Array.isArray(game.categories)) {
                game.categories.forEach(cat => {
                    if (grouped[cat]) {
                        grouped[cat].push(game);
                    } else {
                        // Fallback for categories not in the predefined list
                        if (grouped['OTHER']) {
                            grouped['OTHER'].push(game);
                        }
                    }
                });
            } else {
                // No categories defined
                if (grouped['OTHER']) {
                    grouped['OTHER'].push(game);
                }
            }
        });

        return grouped;
    }, [games]);

    if (loading) return <SectionLoader />;

    return (
        <div className="games-list-page">
            <header className="page-header">
                <h1 className="gradient-text">{t.gamesList.title}</h1>
            </header>

            <div className="categories-container">
                {CATEGORY_ORDER.map(category => {
                    const gamesInCat = gamesByCategory[category];
                    if (gamesInCat.length === 0) return null;

                    return (
                        <section key={category} className="category-section">
                            <h2 className="category-title">
                                {t.gamesList.categories[category as keyof typeof t.gamesList.categories]}
                            </h2>
                            <div className="games-grid">
                                {gamesInCat.map((game, index) => (
                                    <GameCard key={`${category}-${game.code}-${index}`} game={game} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

function GameCard({ game }: { game: Game }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { selectedGame, setSelectedGame } = useUserPreferences();
    
    const isActive = selectedGame === game.code;

    const handleSelect = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedGame(isActive ? null : game.code);
    };

    const handleCardClick = () => {
        navigate(`/games/${game.code}`);
    };
    
    return (
        <div 
            className={`game-card ${isActive ? 'active' : ''}`} 
            style={{ '--game-color': game.color } as React.CSSProperties}
            onClick={handleCardClick}
        >
            <div className="game-image-container">
                <img src={game.images.vertical} alt={game.name} className="game-image" />
                
                {game.note && (
                    <div className="game-notes-badge">
                        {Object.entries(game.note).map(([key, value]) => {
                            if (value === null || value === undefined) return null;
                            return (
                                <div key={key} className="note-badge-item">
                                    <span className="note-label">{t.gamesList.notes[key as keyof typeof t.gamesList.notes]}:</span>
                                    <span className="note-value">{value}/5</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="game-overlay">
                    <div className="game-content-bottom">
                        <div className="game-description">
                            <p>{game.description}</p>
                        </div>
                        <div className="game-actions">
                            <button 
                                className={`select-btn ${isActive ? 'active' : ''}`}
                                onClick={handleSelect}
                            >
                                {isActive ? t.gamesList.deselect : t.gamesList.select}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="game-info">
                <h3 className="game-name">{game.name}</h3>
            </div>
        </div>
    );
}
