import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { BoxArchive1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {CollectionSummary} from '../../types/collection';
import { getCollectionSummary } from '../../services/collectionService';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './MyCollection.scss';

export default function MyCollection() {
    const { t } = useTranslation();
    const { getGameByCode, loading: gamesLoading } = useGames();
    const [summary, setSummary] = useState<CollectionSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionSummary()
            .then(data => {
                setSummary(data);
            })
            .catch(error => {
                console.error("Failed to load collection summary", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const renderContent = () => {
        if (loading || gamesLoading) return <SectionLoader />;
        if (summary.length === 0) return <SectionMessage message={t.home.collection_empty} />;

        return (
            <div className="collection-tcg-list">
                {summary.map((item) => {
                    const game = getGameByCode(item.game_code);
                    return (
                        <div key={item.game_code} className="collection-tcg-item">
                            <div className="tcg-info">
                                <span className="tcg-name">
                                    {game?.name || item.game_code}
                                </span>
                                <span
                                    className="tcg-count"
                                    style={{
                                        '--game-color': game?.color
                                    } as React.CSSProperties}
                                >
                                    {item.user_cards_count} / {item.total_game_cards}
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ 
                                        width: `${item.completion_percentage}%`,
                                        '--game-color': game?.color
                                    } as React.CSSProperties}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section className="home-section collection-widget">
            <div className="section-header">
                <h2><Lineicons icon={BoxArchive1Outlined} /> {t.home.collection_summary}</h2>
                <Link to="/collection" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {renderContent()}
        </section>
    );
}
