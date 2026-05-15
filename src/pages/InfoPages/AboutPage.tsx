import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import {
    CalendarDaysOutlined,
    DiscordOutlined,
    GithubOutlined,
    Layers1Outlined,
    MapMarker1Outlined,
    UserMultiple4Outlined,
    XOutlined
} from "@lineiconshq/free-icons";
import {Lineicons} from "@lineiconshq/react-lineicons";

export default function AboutPage() {
    const { t, language } = useTranslation();

    return (
        <section className="info-page about-page">
            <Helmet>
                <title>{t.aboutPage.title} | Joutes</title>
                <html lang={language} />
            </Helmet>

            <div className="info-container">
                <header className="info-header">
                    <h1 className="gradient-text">{t.aboutPage.title}</h1>
                    <p className="subtitle">{t.aboutPage.subtitle}</p>
                </header>

                <div className="info-content">
                    <section className="mission-section">
                        <h2>{t.aboutPage.mission.title}</h2>
                        <p>{t.aboutPage.mission.text1}</p>
                        <p>{t.aboutPage.mission.text2}</p>
                    </section>

                    <div className="features-grid">
                        <div className="feature-card">
                            <Lineicons icon={CalendarDaysOutlined} />
                            <h3>{t.aboutPage.features.events.title}</h3>
                            <p>{t.aboutPage.features.events.text}</p>
                        </div>
                        <div className="feature-card">
                            <Lineicons icon={MapMarker1Outlined} />
                            <h3>{t.aboutPage.features.geo.title}</h3>
                            <p>{t.aboutPage.features.geo.text}</p>
                        </div>
                        <div className="feature-card">
                            <Lineicons icon={Layers1Outlined} />
                            <h3>{t.aboutPage.features.multigames.title}</h3>
                            <p>{t.aboutPage.features.multigames.text}</p>
                        </div>
                        <div className="feature-card">
                            <Lineicons icon={UserMultiple4Outlined} />
                            <h3>{t.aboutPage.features.community.title}</h3>
                            <p>{t.aboutPage.features.community.text}</p>
                        </div>
                    </div>

                    <section className="values-section">
                        <h2>{t.aboutPage.values.title}</h2>
                        <p className="section-subtitle">{t.aboutPage.values.subtitle}</p>
                        <div className="values-list">
                            {t.aboutPage.values.items.map((item, index: number) => (
                                <div key={index} className="value-item">
                                    <strong>{item.title} :</strong> {item.text}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="join-section">
                        <h2>{t.aboutPage.join.title}</h2>
                        <p>{t.aboutPage.join.text}</p>
                        <div className="social-links">
                            <a href="https://discord.gg/dZEGkZwJGB" target="_blank" rel="noopener noreferrer" className="social-link discord">
                                <Lineicons icon={DiscordOutlined} /> {t.aboutPage.join.discord} →
                            </a>
                            <a href="https://github.com/Joutes" target="_blank" rel="noopener noreferrer" className="social-link github">
                                <Lineicons icon={GithubOutlined} /> {t.aboutPage.join.github} →
                            </a>
                            <a href="https://x.com/Joutes" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                                <Lineicons icon={XOutlined} /> {t.aboutPage.join.twitter} →
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
