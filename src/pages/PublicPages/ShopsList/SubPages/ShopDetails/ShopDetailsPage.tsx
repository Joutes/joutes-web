import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    ArrowLeftOutlined,
    Globe1Outlined,
    Buildings1Outlined,
    CalendarDaysOutlined,
    AlignTextLeftOutlined,
    TargetUserOutlined
} from "@lineiconshq/free-icons";
import { getShopBySlug } from '../../services/shopsService';
import type { Shop } from '@/types/shop';
import { useTranslation } from '@/hooks/useTranslation';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import ErrorPage from '@/pages/ErrorPages/ErrorPage';
import './ShopDetailsPage.scss';

export default function ShopDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const { getGameByCode, loading: gamesLoading } = useGames();
    const [shop, setShop] = useState<Shop | null>(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

    useEffect(() => {
        if (slug) {
            getShopBySlug(slug).then(data => {
                setShop(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading || gamesLoading) return <SectionLoader />;

    if (!shop) {
        return (
            <ErrorPage 
                errorCode={404}
                title={t.shops.title}
                subtitle={t.notfound.subtitle}
                message={t.errorPage.message}
                onBack={() => navigate('/shops')}
                backLabel={t.errorPage.go_back}
            />
        );
    }

    const shopGames = (shop.games || []).map(code => getGameByCode(code)).filter(Boolean);

    return (
        <div className="shop-details-page">
            <div className="shop-banner" style={{ backgroundImage: `url(${shop.image})` }}>
                <div className="shop-banner-overlay">
                    <button onClick={() => navigate('/shops')} className="back-btn" title={t.errorPage.go_back}>
                        <Lineicons icon={ArrowLeftOutlined} />
                    </button>
                    <div className="shop-banner-content">
                        <h1 className="shop-title">{shop.name}</h1>
                    </div>
                </div>
            </div>

            <div className="content-container">
                <div className="main-content">
                    <section className="games-played-section section">
                        <h2>{t.shops.details.games_played}</h2>
                        <div className="games-grid-mini">
                            {shopGames.map(game => (
                                <div key={game?.code} className="game-mini-card" style={{ '--game-color': game?.color } as React.CSSProperties}>
                                    <img src={game?.images.icon} alt={game?.name} />
                                    <span>{game?.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="events-section section">
                        <div className="section-header">
                            <h2>{t.shops.details.upcoming_events}</h2>
                            <div className="view-switcher">
                                <button 
                                    className={`switch-btn ${viewMode === 'calendar' ? 'active' : ''}`} 
                                    onClick={() => setViewMode('calendar')}
                                    title={t.shops.details.views.calendar}
                                >
                                    <Lineicons icon={CalendarDaysOutlined} />
                                </button>
                                <button 
                                    className={`switch-btn ${viewMode === 'list' ? 'active' : ''}`} 
                                    onClick={() => setViewMode('list')}
                                    title={t.shops.details.views.list}
                                >
                                    <Lineicons icon={AlignTextLeftOutlined} />
                                </button>
                            </div>
                        </div>

                        <div className="events-content">
                            {viewMode === 'calendar' ? (
                                <CalendarView events={shop.events || []} language={language} getGameByCode={getGameByCode} />
                            ) : (
                                <ListView events={shop.events || []} language={language} getGameByCode={getGameByCode} />
                            )}
                        </div>
                    </section>
                </div>

                <aside className="side-content">
                    <section className="info-card section">
                        <h2>{t.shops.details.info_title}</h2>
                        <div className="info-list">
                            <div className="info-item">
                                <div className="icon-wrapper">
                                    <Lineicons icon={Buildings1Outlined} />
                                </div>
                                <div className="info-text">
                                    <h3>{t.shops.details.address}</h3>
                                    <p>{shop.address.street}<br />{shop.address.postal_code} {shop.address.city}</p>
                                </div>
                            </div>
                            
                            {shop.website && (
                                <div className="info-item">
                                    <div className="icon-wrapper">
                                        <Lineicons icon={Globe1Outlined} />
                                    </div>
                                    <div className="info-text">
                                        <h3>{t.shops.details.website}</h3>
                                        <a href={shop.website} target="_blank" rel="noopener noreferrer" className="shop-link">
                                            {shop.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {shop.coordinates && (
                                <div className="info-item">
                                    <div className="icon-wrapper">
                                        <Lineicons icon={TargetUserOutlined} />
                                    </div>
                                    <div className="info-text">
                                        <h3>{t.shops.details.gps}</h3>
                                        <p>{shop.coordinates.latitude}, {shop.coordinates.longitude}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {shop.coordinates && (
                            <div className="map-container">
                                <iframe 
                                    title="Shop Map"
                                    width="100%" 
                                    height="250" 
                                    style={{ border: 0, borderRadius: '8px' }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://maps.google.com/maps?q=${shop.coordinates.latitude},${shop.coordinates.longitude}&z=15&output=embed`}
                                />
                            </div>
                        )}
                    </section>
                </aside>
            </div>
        </div>
    );
}

function CalendarView({ events, language, getGameByCode }: { events: any[], language: string, getGameByCode: any }) {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const now = new Date();
    const currentMonth = now.toLocaleString(language, { month: 'long', year: 'numeric' });

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    // Adjust first day (JS Sunday is 0, we want Monday to be 0)
    const startOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
    
    const daysInMonth = getDaysInMonth(now.getFullYear(), now.getMonth());

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === now.getMonth() && 
                   eventDate.getFullYear() === now.getFullYear();
        });
    };

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <span className="month-name">{currentMonth}</span>
            </div>
            <div className="calendar-grid">
                {days.map(d => <div key={d} className="calendar-day-label">{d}</div>)}
                {Array.from({ length: startOffset }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const isToday = day === now.getDate();

                    return (
                        <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}>
                            <span className="day-number">{day}</span>
                            <div className="day-events">
                                {dayEvents.map(event => {
                                    const game = getGameByCode(event.game_code);
                                    return (
                                        <div 
                                            key={event.id} 
                                            className="calendar-event-mini" 
                                            style={{ '--game-color': game?.color || '#666' } as React.CSSProperties}
                                            title={`${event.title} - ${game?.name || event.game_code}`}
                                        >
                                            <span className="event-dot"></span>
                                            <span className="event-name">{game?.name || event.game_code}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ListView({ events, language, getGameByCode }: { events: any[], language: string, getGameByCode: any }) {
    if (events.length === 0) {
        return <p className="no-events">Aucun événement prévu prochainement.</p>;
    }

    return (
        <div className="events-list-detailed">
            {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => {
                const game = getGameByCode(event.game_code);
                const eventDate = new Date(event.date);
                
                return (
                    <div key={event.id} className="event-item-detailed" style={{ '--game-color': game?.color || '#666' } as React.CSSProperties}>
                        <div className="event-date-box">
                            <span className="day">{eventDate.getDate()}</span>
                            <span className="month">{eventDate.toLocaleString(language, { month: 'short' }).replace('.', '')}</span>
                        </div>
                        <div className="event-info">
                            <div className="event-game-badge">
                                {game?.name || event.game_code}
                            </div>
                            <h4>{event.title}</h4>
                            <p className="event-time">{eventDate.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
