import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { ArrowLeftOutlined } from "@lineiconshq/free-icons";

interface ErrorPageProps {
    errorCode?: string | number;
    title?: string;
    subtitle?: string;
    message?: string;
    backLabel?: string;
    onBack?: () => void;
}

export default function ErrorPage({ 
    errorCode, 
    title, 
    subtitle, 
    message, 
    backLabel,
    onBack 
}: ErrorPageProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <section className="not-found-container error-page-container">
            <Helmet>
                <title>{errorCode ? `${errorCode} - ` : ''}{subtitle || title || t.errorPage.title} | Joutes</title>
                <html lang="fr" />
            </Helmet>

            <div className="not-found-content">
                {title && <h2 className="target-title">{title}</h2>}
                <h1 className="gradient-text">{errorCode || 'ERR'}</h1>
                <h3>{subtitle || t.errorPage.subtitle}</h3>
                {message && <p>{message}</p>}
                
                <button onClick={handleBack} className="home-link back-btn">
                    <Lineicons icon={ArrowLeftOutlined} /> {backLabel || t.errorPage.go_back}
                </button>
            </div>
        </section>
    );
}
