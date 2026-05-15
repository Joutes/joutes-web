import { useState, useEffect } from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Bookmark1Outlined, CalendarDaysOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {FollowedEvent} from '../../types/events';
import { getFollowedEvents } from '../../services/eventsService';
import SectionLoader from '../SectionLoader';
import './FollowedEvents.scss';

export default function FollowedEvents() {
    const { t } = useTranslation();
    const [events, setEvents] = useState<FollowedEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFollowedEvents().then(data => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    return (
        <section className="home-section followed-events-section">
            <div className="section-header">
                <h2><Lineicons icon={Bookmark1Outlined} /> {t.home.followed_events}</h2>
            </div>
            {loading ? <SectionLoader /> : (
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
            )}
        </section>
    );
}
