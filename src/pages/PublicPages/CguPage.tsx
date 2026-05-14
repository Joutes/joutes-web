import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';

export default function CguPage() {
    const { t, language } = useTranslation();

    return (
        <section className="info-page cgu-page">
            <Helmet>
                <title>{t.cguPage.title} | Joutes</title>
                <html lang={language} />
            </Helmet>

            <div className="info-container">
                <header className="info-header">
                    <h1 className="gradient-text">{t.cguPage.title}</h1>
                    <p className="last-update">{t.cguPage.lastUpdate}</p>
                </header>

                <div className="info-content legal-text">
                    {t.cguPage.sections.map((section, index: number) => (
                        <section key={index} className="legal-section">
                            <h2>{section.title}</h2>
                            <div className="section-content">
                                {section.content.split('\n').map((paragraph: string, pIndex: number) => (
                                    paragraph.trim() ? <p key={pIndex}>{paragraph}</p> : <br key={pIndex} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
