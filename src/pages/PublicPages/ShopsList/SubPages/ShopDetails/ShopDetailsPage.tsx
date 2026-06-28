import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    Globe1Outlined,
    Buildings1Outlined,
    CalendarDaysOutlined,
    AlignTextLeftOutlined,
    TargetUserOutlined
} from "@lineiconshq/free-icons";
import { getShopBySlug } from '../../services/shopsService';
import type { Shop } from '@/types/shop';
import type { Event } from '@/pages/PublicPages/Home/types/event';
import type { Game } from '@/types/game';
import { useTranslation } from '@/hooks/useTranslation';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import ErrorPage from '@/pages/ErrorPages/ErrorPage';
import Banner from '@/components/Banner/Banner';
import InfoSection from '@/components/InfoSection/InfoSection';
import InfoItem from '@/components/InfoSection/InfoItem';
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
        let isMounted = true;
        if (slug) {
            getShopBySlug(slug).then(data => {
                if (isMounted) {
                    setShop(data);
                    setLoading(false);
                }
            });
        }
        return () => { isMounted = false; };
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
            <Banner 
                backgroundImage={shop.image}
                title={shop.name}
                onBack={() => navigate('/shops')}
                backLabel={t.errorPage.go_back}
            />

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
                    <InfoSection title={t.shops.details.info_title}>
                        <InfoItem 
                            icon={Buildings1Outlined} 
                            label={t.shops.details.address} 
                            value={<p>{shop.address.street}<br />{shop.address.postal_code} {shop.address.city}</p>} 
                        />
                        
                        {shop.website && (
                            <InfoItem 
                                icon={Globe1Outlined} 
                                label={t.shops.details.website} 
                                value={
                                    <a href={shop.website} target="_blank" rel="noopener noreferrer">
                                        {shop.website.replace(/^https?:\/\//, '')}
                                    </a>
                                } 
                            />
                        )}

                        {shop.coordinates && (
                            <InfoItem 
                                icon={TargetUserOutlined} 
                                label={t.shops.details.gps} 
                                value={<p>{shop.coordinates.latitude}, {shop.coordinates.longitude}</p>} 
                            />
                        )}
                    </InfoSection>

                    <section className="map-card section">
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

function CalendarView({ events, language, getGameByCode }: { events: Event[], language: string, getGameByCode: (code: string) => Game | undefined }) {
    const [viewDate, setViewDate] = useState(new Date());

    const days = useMemo(() => {
        const baseDate = new Date(2024, 0, 1);
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + i);
            const name = date.toLocaleString(language, { weekday: 'short' });
            // Capitalize first letter and remove potential trailing dot
            return name.charAt(0).toUpperCase() + name.slice(1).replace('.', '');
        });
    }, [language]);

    const currentMonth = viewDate.toLocaleString(language, { month: 'long', year: 'numeric' });

    // Handlers for month navigation
    const prevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    // Adjust first day (JS Sunday is 0, we want Monday to be 0)
    const startOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
    
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === viewDate.getMonth() && 
                   eventDate.getFullYear() === viewDate.getFullYear();
        });
    };

    const now = new Date();

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <button onClick={prevMonth} className="nav-btn" title="Mois précédent">
                    <Lineicons icon={ArrowLeftOutlined} />
                </button>
                <span className="month-name">{currentMonth}</span>
                <button onClick={nextMonth} className="nav-btn" title="Mois suivant">
                    <Lineicons icon={ArrowRightOutlined} />
                </button>
            </div>
            <div className="calendar-grid">
                {days.map(d => <div key={d} className="calendar-day-label">{d}</div>)}
                {Array.from({ length: startOffset }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const isToday = day === now.getDate() && 
                                   viewDate.getMonth() === now.getMonth() && 
                                   viewDate.getFullYear() === now.getFullYear();

                    return (
                        <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}>
                            <span className="day-number">{day}</span>
                            <div className="day-events">
                                {dayEvents.map(event => {
                                    const game = getGameByCode(event.game_code);
                                    const eventDate = new Date(event.date);
                                    const eventTime = eventDate.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <div 
                                            key={event.id} 
                                            className="calendar-event-mini" 
                                            style={{ '--game-color': game?.color || '#666' } as React.CSSProperties}
                                            title={`${event.title} - ${game?.name || event.game_code}`}
                                        >
                                            <div className="event-header">
                                                <span className="event-time">{eventTime}</span>
                                                <span className="event-game-tag">{game?.name || event.game_code}</span>
                                            </div>
                                            <div className="event-title">{event.title}</div>
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

function ListView({ events, language, getGameByCode }: { events: Event[], language: string, getGameByCode: (code: string) => Game | undefined }) {
    if (events.length === 0) {
        return <p className="no-events">Aucun événement prévu prochainement.</p>;
    }

    return (
        <div className="events-list-detailed">
            {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => {
                const game = getGameByCode(event.game_code);
                const eventDate = new Date(event.date);
                const weekday = eventDate.toLocaleString(language, { weekday: 'short' });
                const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).replace('.', '');
                
                return (
                    <div key={event.id} className="event-item-detailed" style={{ '--game-color': game?.color || '#666' } as React.CSSProperties}>
                        <div className="event-date-box">
                            <span className="weekday">{formattedWeekday}</span>
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
