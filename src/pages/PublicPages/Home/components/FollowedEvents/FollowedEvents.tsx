import { useState, useEffect } from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Bookmark1Outlined, CalendarDaysOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {FollowedEvent} from '../../types/events';
import { getFollowedEvents } from '../../services/eventsService';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './FollowedEvents.scss';

export default function FollowedEvents() {
    const { t } = useTranslation();
    const [events, setEvents] = useState<FollowedEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getFollowedEvents()
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
        if (loading) return <SectionLoader />;
        if (error) return <SectionMessage message={t.home.error_loading} type="error" />;
        if (events.length === 0) return <SectionMessage message={t.home.no_followed_events} />;

        return (
            <div className="followed-list">
                {events.map(event => (
                    <div key={event.id} className="followed-card">
                        <div className="followed-info">
                            <h3>{event.title}</h3>
                            <p>{event.shop} • {event.date}</p>
                        </div>
                        <Lineicons icon={CalendarDaysOutlined} className="followed-icon" />
                    </div>
                ))}
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
