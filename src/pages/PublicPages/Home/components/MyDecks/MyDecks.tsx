import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Layers1Outlined, ArrowRightOutlined, PhotosOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {Deck} from '../../types/decks';
import { getMyDecks } from '../../services/decksService';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './MyDecks.scss';

export default function MyDecks() {
    const { t, language } = useTranslation();
    const { getGameByCode, loading: gamesLoading } = useGames();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getMyDecks(1, 4)
            .then(response => {
                setDecks(response.data);
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
        if (loading || gamesLoading) return <SectionLoader />;
        if (error) return <SectionMessage message={t.home.error_loading} type="error" />;
        if (decks.length === 0) return <SectionMessage message={t.home.no_decks} />;

        return (
            <div className="decks-list-detailed">
                {decks.map(deck => {
                    const game = getGameByCode(deck.game_code);
                    const updateDate = new Date(deck.updated_at);
                    const formattedDate = language === 'fr' 
                        ? updateDate.toLocaleDateString('fr-FR') 
                        : updateDate.toISOString().split('T')[0];

                    return (
                        <div key={deck.id} className="deck-card-detailed">
                            <div className="deck-image-container">
                                {/* Pour l'instant on affiche toujours le placeholder car l'API des cartes n'est pas dispo */}
                                <div className="deck-image-placeholder">
                                    <Lineicons icon={PhotosOutlined} />
                                    <span>{t.home.no_image_available}</span>
                                </div>
                                {game && <span className="game-badge">{game.name}</span>}
                            </div>
                            <div className="deck-info">
                                <h3>{deck.name}</h3>
                                <span className="last-edit">{t.home.last_edit}: {formattedDate}</span>
                            </div>
                        </div>
                    );
                })}
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
