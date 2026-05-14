import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <section className="not-found-container">
            <Helmet>
                <title>{t.notfound.title} | Joutes</title>
                <html lang="fr" />
            </Helmet>

            <div className="not-found-content">
                <h1 className="gradient-text">404</h1>
                <h2>{t.notfound.subtitle}</h2>
                <p>{t.notfound.description}</p>
                <Link to="/" className="home-link">
                    {t.notfound.back_home}
                </Link>
            </div>
        </section>
    );
}
