import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Megaphone1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {News} from '../../types/news';
import { getNews } from '../../services/newsService';
import { useShops } from '@/hooks/useShops';
import { useGames } from '@/hooks/useGames';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './News.scss';

export default function News() {
    const { t, language } = useTranslation();
    const { getShopById, loading: shopsLoading } = useShops();
    const { getGameByCode, loading: gamesLoading } = useGames();
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getNews(1, 3)
            .then(response => {
                setNews(response.data);
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
        if (news.length === 0) return <SectionMessage message={t.home.no_news} />;

        return (
            <div className="news-list">
                {news.map(item => {
                    const shop = item.shop_id ? getShopById(Number(item.shop_id)) : null;
                    const game = item.game_code ? getGameByCode(item.game_code) : null;
                    const date = new Date(item.created_at);
                    const formattedDate = language === 'fr' 
                        ? date.toLocaleDateString('fr-FR') 
                        : date.toISOString().split('T')[0];

                    return (
                        <article key={item.id} className="news-item">
                            <div 
                                className="news-image" 
                                style={{ backgroundImage: `url(${item.image})` }}
                            >
                                {game && <span className="game-badge">{game.name}</span>}
                            </div>
                            <div className="news-body">
                                {item.tags && item.tags.length > 0 && (
                                    <div className="news-tags">
                                        {item.tags.map(tag => (
                                            <span key={tag} className={`tag tag-${tag}`}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <h3>{item.title}</h3>
                                <p className="news-description">{item.short_description}</p>
                                <div className="news-footer">
                                    <span className="news-shop">
                                        {shop?.name || (item.shop_id ? t.home.unknown_shop : '')}
                                    </span>
                                    <span className="news-date">{formattedDate}</span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    };

    return (
        <section className="home-section news-section">
            <div className="section-header">
                <h2><Lineicons icon={Megaphone1Outlined} /> {t.home.latest_news}</h2>
                <Link to="/news" className="see-all">{t.home.see_all} <Lineicons icon={ArrowRightOutlined} /></Link>
            </div>
            {renderContent()}
        </section>
    );
}
