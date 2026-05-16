import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Layers1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {Deck} from '../../types/decks';
import { getMyDecks } from '../../services/decksService';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './MyDecks.scss';

export default function MyDecks() {
    const { t } = useTranslation();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getMyDecks()
            .then(data => {
                setDecks(data);
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
        if (decks.length === 0) return <SectionMessage message={t.home.no_decks} />;

        return (
            <div className="decks-list-detailed">
                {decks.map(deck => (
                    <div key={deck.id} className="deck-card-detailed">
                        <div className="deck-image-container">
                            <div className="deck-image" style={{ backgroundImage: `url(${deck.image})` }} />
                            <span className="game-badge">{t.games[deck.game as keyof typeof t.games]}</span>
                        </div>
                        <div className="deck-info">
                            <h3>{deck.name}</h3>
                            <p className="champion-name">{deck.champion}</p>
                            <span className="last-edit">{t.home.last_edit}: {deck.lastEdit}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="home-section my-decks-widget">
            <div className="section-header">
                <h2><Lineicons icon={Layers1Outlined} /> {t.home.my_decks_reminder}</h2>
                <Link to="/my-decks" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {renderContent()}
        </section>
    );
}
