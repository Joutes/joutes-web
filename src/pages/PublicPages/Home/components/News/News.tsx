import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { Megaphone1Outlined, ArrowRightOutlined } from "@lineiconshq/free-icons";
import { useTranslation } from '@/hooks/useTranslation';
import type {NewsItem} from '../../types/news';
import { getNews } from '../../services/newsService';
import SectionLoader from '../SectionLoader';
import SectionMessage from '../SectionMessage';
import './News.scss';

export default function News() {
    const { t } = useTranslation();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getNews()
            .then(data => {
                setNews(data);
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
        if (news.length === 0) return <SectionMessage message={t.home.no_news} />;

        return (
            <div className="news-list">
                {news.map(item => (
                    <article key={item.id} className="news-item">
                        <div 
                            className="news-image" 
                            style={{ backgroundImage: `url(${item.image})` }}
                        >
                            <span className="game-badge">{t.games[item.game as keyof typeof t.games]}</span>
                        </div>
                        <div className="news-body">
                            <div className="news-tags">
                                {item.tags.map(tag => (
                                    <span key={tag} className={`tag tag-${tag}`}>{tag}</span>
                                ))}
                            </div>
                            <h3>{item.title}</h3>
                            <p className="news-description">{item.description}</p>
                            <div className="news-footer">
                                <span className="news-time">{item.timeAgo} ({item.fullDate})</span>
                            </div>
                        </div>
                    </article>
                ))}
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
