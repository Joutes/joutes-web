import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { CalendarDaysOutlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {Event} from '../../types/event';
import { getUpcomingEvents } from '../../services/eventsService';
import { useShops } from '@/hooks/useShops';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import SectionMessage from '../SectionMessage';
import './EventList.scss';

export default function EventList() {
    const { t, language } = useTranslation();
    const { getShopById, loading: shopsLoading } = useShops();
    const { getGameByCode, loading: gamesLoading } = useGames();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getUpcomingEvents(5)
            .then(data => {
                setEvents(data);
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
        if (loading || shopsLoading || gamesLoading) return <SectionLoader />;
        if (error) return <SectionMessage message={t.home.error_loading} type="error" />;
        if (events.length === 0) return <SectionMessage message={t.home.no_events} />;

        return (
            <div className="events-list">
                {events.map(event => {
                    const shop = getShopById(event.shop_id);
                    const game = getGameByCode(event.game_code);
                    const eventDate = new Date(event.date);
                    const weekday = eventDate.toLocaleString(language, { weekday: 'long' });
                    const month = eventDate.toLocaleString(language, { month: 'short' }).replace('.', '');
                    
                    return (
                        <div key={event.id} className="event-card">
                            <div className="event-date">
                                <span className="weekday">{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</span>
                                <span className="day">{eventDate.getDate()}</span>
                                <span className="month">{month}</span>
                            </div>
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p>{shop?.name || t.home.unknown_shop} | {game?.name || event.game_code}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section className="home-section main-events">
            <div className="section-header">
                <h2><Lineicons icon={CalendarDaysOutlined} /> {t.home.upcoming_events}</h2>
                <Link to="/events" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {renderContent()}
        </section>
    );
}
