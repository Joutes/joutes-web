import { useState, useEffect } from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Bookmark1Outlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {Event} from '../../types/event';
import { getFollowedEvents } from '../../services/eventsService';
import { useShops } from '@/hooks/useShops';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './FollowedEvents.scss';

export default function FollowedEvents() {
    const { t, language } = useTranslation();
    const { getShopById, loading: shopsLoading } = useShops();
    const { getGameByCode, loading: gamesLoading } = useGames();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getFollowedEvents(3)
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
        if (events.length === 0) return <SectionMessage message={t.home.no_followed_events} />;

        return (
            <div className="followed-list">
                {events.map(event => {
                    const shop = getShopById(event.shop_id);
                    const game = getGameByCode(event.game_code);
                    const eventDate = new Date(event.date);
                    const formattedDate = language === 'fr' 
                        ? eventDate.toLocaleDateString('fr-FR') 
                        : eventDate.toISOString().split('T')[0];
                        
                    return (
                        <div key={event.id} className="followed-card">
                            <div className="followed-info">
                                <h3>{event.title}</h3>
                                <p>{shop?.name || t.home.unknown_shop} | {game?.name || event.game_code}</p>
                                <p className="date">{formattedDate}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section className="home-section followed-events-section">
            <div className="section-header">
                <h2><Lineicons icon={Bookmark1Outlined} /> {t.home.followed_events}</h2>
            </div>
            {renderContent()}
        </section>
    );
}
