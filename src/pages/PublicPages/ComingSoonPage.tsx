import { useTranslation } from '@/hooks/useTranslation';
import { Helmet } from 'react-helmet-async';

interface ComingSoonPageProps {
    title: string;
    description: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
    const { t } = useTranslation();

    return (
        <div className="info-page">
            <Helmet>
                <title>{title} - Joutes</title>
            </Helmet>
            <div className="info-container">
                <span className="coming-soon-label" style={{ 
                    color: '#08aeca', 
                    textTransform: 'uppercase', 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '10px'
                }}>
                    {t.comingSoon.label}
                </span>
                <h1 className="info-title">{title}</h1>
                <p className="info-subtitle">{description}</p>
                
                <div className="info-section">
                    <p>
                        {t.comingSoon.description.replace('{title}', title)}
                    </p>
                </div>
            </div>
        </div>
    );
}
