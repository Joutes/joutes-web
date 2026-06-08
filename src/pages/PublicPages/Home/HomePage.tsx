import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import EventList from './components/EventList/EventList';
import FollowedEvents from './components/FollowedEvents/FollowedEvents';
import MyDecks from './components/MyDecks/MyDecks';
import MyCollection from './components/MyCollection/MyCollection';
import GamesCarousel from './components/GamesCarousel/GamesCarousel';
import './HomePage.scss';

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="home-page">
            <Helmet>
                <title>{t.home.welcome} | Joutes</title>
            </Helmet>

            <header className="home-header">
                <h1 className="gradient-text">{t.home.welcome}</h1>
                <p className="welcome-subtitle">{t.home.welcomeSubtitle}</p>
            </header>

            <div className="home-grid">
                {/* Section Événements à venir */}
                <EventList />

                {/* Section Événements suivis */}
                <FollowedEvents />

                {/* Section Actualités */}
                {/*<News />*/}

                {/* Section Mes Decks */}
                <MyDecks />

                {/* Section Résumé Collection */}
                <MyCollection />

                {/* Section Carrousel des Jeux */}
                <GamesCarousel />
            </div>
        </div>
    );
}