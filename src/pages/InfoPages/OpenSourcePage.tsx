import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import {CheckCircle1Outlined, DiscordOutlined, GithubOutlined} from "@lineiconshq/free-icons";
import {Lineicons} from "@lineiconshq/react-lineicons";

export default function OpenSourcePage() {
    const { t, language } = useTranslation();

    return (
        <section className="info-page opensource-page">
            <Helmet>
                <title>{t.opensourcePage.title} | Joutes</title>
                <html lang={language} />
            </Helmet>

            <div className="info-container">
                <header className="info-header">
                    <h1 className="gradient-text">{t.opensourcePage.title}</h1>
                    <p className="subtitle">{t.opensourcePage.subtitle}</p>
                </header>

                <div className="info-content">
                    <section className="intro-section">
                        <p className="lead">{t.opensourcePage.description}</p>
                        <div className="thanks-box">
                            <h2>{t.opensourcePage.thanks}</h2>
                            <p>{t.opensourcePage.thanksText}</p>
                            <a href="https://github.com/Joutes" target="_blank" rel="noopener noreferrer" className="github-btn">
                                <Lineicons icon={GithubOutlined} /> {t.opensourcePage.viewSource}
                            </a>
                        </div>
                    </section>

                    <section className="dependencies-section">
                        <div className="section-title-group">
                            <h2>{t.opensourcePage.dependenciesTitle}</h2>
                            <p className="section-subtitle">{t.opensourcePage.dependenciesSubtitle}</p>
                        </div>
                        <div className="dependencies-grid">
                            {t.opensourcePage.dependencies.map((dep, index: number) => (
                                <div key={index} className="dependency-card">
                                    <h3>{dep.name}</h3>
                                    <p>{dep.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dev-tools-section">
                        <div className="section-title-group">
                            <h2>{t.opensourcePage.devToolsTitle}</h2>
                            <p className="section-subtitle">{t.opensourcePage.devToolsSubtitle}</p>
                        </div>
                        <div className="dependencies-grid">
                            {t.opensourcePage.devTools.map((tool, index: number) => (
                                <div key={index} className="dependency-card dev-tool">
                                    <h3>{tool.name}</h3>
                                    <p>{tool.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="contribute-section">
                        <h2>{t.opensourcePage.contributeTitle}</h2>
                        <p className="section-subtitle">{t.opensourcePage.contributeSubtitle}</p>
                        <p>{t.opensourcePage.contributeText}</p>
                        <ul className="contribute-list">
                            {t.opensourcePage.contributeItems.map((item: string, index: number) => (
                                <li key={index}>
                                    <Lineicons icon={CheckCircle1Outlined} /> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="contribute-links">
                            <a href="https://github.com/Joutes" target="_blank" rel="noopener noreferrer" className="contribute-link github">
                                <Lineicons icon={GithubOutlined} /> GitHub
                            </a>
                            <a href="https://discord.gg/dZEGkZwJGB" target="_blank" rel="noopener noreferrer" className="contribute-link discord">
                                <Lineicons icon={DiscordOutlined} /> Discord
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
