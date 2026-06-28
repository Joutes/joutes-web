import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    Globe1Outlined,
    DiscordOutlined,
    Book1Outlined,
    User4Outlined,
    Alarm1Outlined,
    CalendarDaysOutlined,
    Buildings1Outlined, XOutlined, XmarkOutlined
} from "@lineiconshq/free-icons";
import { getGameByCode } from '../../services/gameDetailsService';
import type { Game } from '@/types/game';
import { useTranslation } from '@/hooks/useTranslation';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import ErrorPage from '@/pages/ErrorPages/ErrorPage';
import Banner from '@/components/Banner/Banner';
import InfoSection from '@/components/InfoSection/InfoSection';
import InfoItem from '@/components/InfoSection/InfoItem';
import './GameDetailsPage.scss';

export default function GameDetailsPage() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ status?: number; message?: string } | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        if (code) {
            getGameByCode(code)
                .then(data => {
                    if (isMounted) {
                        setGame(data);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        setError({
                            status: err.response?.status,
                            message: err.response?.data?.message || err.message
                        });
                        setLoading(false);
                    }
                });
        }
        return () => {
            isMounted = false;
        };
    }, [code]);

    if (loading) return <SectionLoader />;

    if (error || !game) {
        console.log('Error fetching game details:', error);
        return (
            <ErrorPage 
                errorCode={error?.status || 404}
                title={t.aside.community.games}
                subtitle={error?.status === 404 ? t.notfound.subtitle : t.home.error_loading}
                message={t.errorPage.message + ' : ' + error?.message}
                onBack={() => navigate('/games')}
                backLabel={t.errorPage.go_back}
            />
        );
    }

    return (
        <div className="game-details-page" style={{ '--game-color': game.color, '--banner-color': game.color } as React.CSSProperties}>
            <Banner 
                backgroundImage={game.images.banner}
                iconImage={game.images.icon}
                title={game.name}
                onBack={() => navigate('/games')}
                backLabel={t.notfound.back_home}
                color={game.color}
            />

            <div className="content-container">
                <div className="main-content">
                    <section className="description-section">
                        <h2>{t.gameDetails.description}</h2>
                        <div className="long-description">
                            {game.longDescription || game.description}
                        </div>
                    </section>

                    {game.gallery && game.gallery.length > 0 && (
                        <section className="gallery-section">
                            <h2>{t.gameDetails.gallery}</h2>
                            <div className="gallery-grid">
                                {game.gallery.map((url, i) => (
                                    <div key={url + i} className="gallery-item" onClick={() => setSelectedImage(url)}>
                                        <img src={url} alt={`${game.name} screenshot ${i}`} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {game.formats && game.formats.length > 0 && (
                        <section className="formats-section">
                            <h2>{t.gameDetails.formats}</h2>
                            <div className="formats-list">
                                {game.formats.map((format, index) => (
                                    <div key={`${format.code}-${index}`} className="format-item">
                                        <div className="format-header">
                                            <div className="format-title-group">
                                                <h3>{format.name}</h3>
                                                <span className="format-type">{format.type}</span>
                                            </div>
                                        </div>
                                        <p className="format-description">{format.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="game-sidebar">
                    <InfoSection title={t.gameDetails.information}>
                        {game.metadata?.publisher && (
                            <InfoItem label={t.gameDetails.infos.publisher} icon={Buildings1Outlined} value={game.metadata.publisher} />
                        )}
                        {game.metadata?.release_date && (
                            <InfoItem
                                label={t.gameDetails.infos.date}
                                icon={CalendarDaysOutlined} 
                                value={language === 'fr'
                                    ? new Date(game.metadata.release_date).toLocaleDateString('fr-FR')
                                    : new Date(game.metadata.release_date).toISOString().split('T')[0]} 
                            />
                        )}
                        {game.metadata?.players && (
                            <InfoItem
                                label={t.gameDetails.infos.players}
                                icon={User4Outlined} 
                                value={t.gameDetails.players
                                    .replace('{min}', String(game.metadata.players.min))
                                    .replace('{max}', String(game.metadata.players.max))} 
                            />
                        )}
                        {game.metadata?.playing_time_minutes && (
                            <InfoItem
                                label={t.gameDetails.infos.duration}
                                icon={Alarm1Outlined} 
                                value={t.gameDetails.playing_time
                                    .replace('{min}', String(game.metadata.playing_time_minutes.min))
                                    .replace('{max}', String(game.metadata.playing_time_minutes.max))} 
                            />
                        )}
                    </InfoSection>

                    {game.links && (
                        <div className="sidebar-section links-section">
                            <h3>{t.gameDetails.links}</h3>
                            <div className="links-grid">
                                {game.links.official_website && (
                                    <a href={game.links.official_website} target="_blank" rel="noopener noreferrer" className="link-item">
                                        <Lineicons icon={Globe1Outlined} /> {t.gameDetails.official_website}
                                    </a>
                                )}
                                {game.links.discord && (
                                    <a href={game.links.discord} target="_blank" rel="noopener noreferrer" className="link-item">
                                        <Lineicons icon={DiscordOutlined} /> Discord
                                    </a>
                                )}
                                {game.links.x && (
                                    <a href={game.links.x} target="_blank" rel="noopener noreferrer" className="link-item">
                                        <Lineicons icon={XOutlined} /> X
                                    </a>
                                )}
                                {game.links.rules && (
                                    <a href={game.links.rules} target="_blank" rel="noopener noreferrer" className="link-item">
                                        <Lineicons icon={Book1Outlined} /> {t.gameDetails.rules}
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {game.stats && (
                        <div className="sidebar-section stats-section">
                            <h3>{t.gameDetails.stats}</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-label">{t.gameDetails.community_rating}</span>
                                    <div className="stat-value-container">
                                        <span className="stat-value">{game.stats.community_rating?.toFixed(1)}/5</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">{t.gameDetails.popularity}</span>
                                    <div className="stat-value-container">
                                        <span className="stat-value">{game.stats.popularity_score?.toFixed(1)}/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {game.note && (
                        <div className="sidebar-section notes-section">
                            <h3>Notes</h3>
                            <div className="notes-list">
                                {Object.entries(game.note).map(([key, value]) => {
                                    if (value === null || value === undefined) return null;
                                    return (
                                        <div key={key} className="note-item">
                                            <div className="note-header">
                                                <span className="note-label">{t.gamesList.notes[key as keyof typeof t.gamesList.notes]}</span>
                                                <span className="note-value">{value}/5</span>
                                            </div>
                                            <div className="note-bar-bg">
                                                <div 
                                                    className="note-bar-fill" 
                                                    style={{ width: `${(value / 5) * 100}%` } as React.CSSProperties}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>
                            <Lineicons icon={XmarkOutlined} />
                        </button>
                        <img src={selectedImage} alt="Full size" />
                    </div>
                </div>
            )}
        </div>
    );
}
