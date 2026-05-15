import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { CalendarDaysOutlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {UpcomingEvent} from '../../types/events';
import { getUpcomingEvents } from '../../services/eventsService';
import SectionLoader from '../SectionLoader';
import './EventList.scss';

export default function EventList() {
    const { t } = useTranslation();
    const [events, setEvents] = useState<UpcomingEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUpcomingEvents().then(data => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    return (
        <section className="home-section main-events">
            <div className="section-header">
                <h2><Lineicons icon={CalendarDaysOutlined} /> {t.home.upcoming_events}</h2>
                <Link to="/events" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {loading ? <SectionLoader /> : (
                <div className="events-list">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <div className="event-date">
                                <span className="day">{event.date.split(' ')[0]}</span>
                                <span className="month">{event.date.split(' ')[1]}</span>
                            </div>
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p>{event.type} • {t.games[event.game as keyof typeof t.games]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
