import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Layers1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {Deck} from '../../types/decks';
import { getMyDecks } from '../../services/decksService';
import SectionLoader from '../SectionLoader';
import './MyDecks.scss';

export default function MyDecks() {
    const { t } = useTranslation();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyDecks().then(data => {
            setDecks(data);
            setLoading(false);
        });
    }, []);

    return (
        <section className="home-section my-decks-widget">
            <div className="section-header">
                <h2><Lineicons icon={Layers1Outlined} /> {t.home.my_decks_reminder}</h2>
                <Link to="/my-decks" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {loading ? <SectionLoader /> : (
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
            )}
        </section>
    );
}
