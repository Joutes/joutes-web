import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { BoxArchive1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {CollectionSummary} from '../../types/collection';
import { getCollectionSummary } from '../../services/collectionService';
import SectionLoader from '../SectionLoader';
import './MyCollection.scss';

export default function MyCollection() {
    const { t } = useTranslation();
    const [summary, setSummary] = useState<CollectionSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionSummary().then(data => {
            setSummary(data);
            setLoading(false);
        });
    }, []);

    return (
        <section className="home-section collection-widget">
            <div className="section-header">
                <h2><Lineicons icon={BoxArchive1Outlined} /> {t.home.collection_summary}</h2>
                <Link to="/collection" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {loading || !summary ? <SectionLoader /> : (
                <div className="collection-tcg-list">
                    {Object.entries(summary.byGame).map(([gameId, data]) => (
                        <div key={gameId} className="collection-tcg-item">
                            <div className="tcg-info">
                                <span className="tcg-name">{t.games[gameId as keyof typeof t.games]}</span>
                                <span className="tcg-count">{data.cards} / {data.total}</span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${(data.cards / data.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
