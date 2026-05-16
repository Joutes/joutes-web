import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '../pages/PublicPages/Home/HomePage';
import AboutPage from '../pages/InfoPages/AboutPage';
import CguPage from '../pages/InfoPages/CguPage';
import OpenSourcePage from '../pages/InfoPages/OpenSourcePage';
import NotFoundPage from '../pages/ErrorPages/NotFoundPage';
import ComingSoonPage from '../pages/PublicPages/ComingSoonPage';
import AuthCallback from '../pages/PublicPages/AuthCallback';
import { useTranslation } from '@/hooks/useTranslation';

export const AppRoutes = () => {
    const { t } = useTranslation();

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="cgu" element={<CguPage />} />
                <Route path="opensource" element={<OpenSourcePage />} />
                <Route path="auth/callback" element={<AuthCallback />} />
                
                <Route path="games" element={<ComingSoonPage title={t.aside.community.games} description={t.comingSoon.descriptions.games} />} />
                <Route path="events" element={<ComingSoonPage title={t.aside.community.events} description={t.comingSoon.descriptions.events} />} />
                <Route path="shops" element={<ComingSoonPage title={t.aside.community.shops} description={t.comingSoon.descriptions.shops} />} />
                <Route path="news" element={<ComingSoonPage title={t.aside.community.news} description={t.comingSoon.descriptions.news} />} />
                
                <Route path="my-decks" element={<ComingSoonPage title={t.aside.my_space.decks} description={t.comingSoon.descriptions.decks} />} />
                <Route path="my-collection" element={<ComingSoonPage title={t.aside.my_space.collection} description={t.comingSoon.descriptions.collection} />} />
                <Route path="my-guides" element={<ComingSoonPage title={t.aside.my_space.guides} description={t.comingSoon.descriptions.guides} />} />
                <Route path="my-group" element={<ComingSoonPage title={t.aside.my_space.group} description={t.comingSoon.descriptions.group} />} />

                <Route path="counter" element={<ComingSoonPage title={t.aside.my_games.counter} description={t.comingSoon.descriptions.counter} />} />
                <Route path="history" element={<ComingSoonPage title={t.aside.my_games.history} description={t.comingSoon.descriptions.history} />} />
                <Route path="stats" element={<ComingSoonPage title={t.aside.my_games.stats} description={t.comingSoon.descriptions.stats} />} />

                <Route path="cards" element={<ComingSoonPage title={t.aside.cards.database} description={t.comingSoon.descriptions.database} />} />
                <Route path="meta" element={<ComingSoonPage title={t.aside.cards.meta} description={t.comingSoon.descriptions.meta} />} />
                <Route path="erratas" element={<ComingSoonPage title={t.aside.cards.erratas} description={t.comingSoon.descriptions.erratas} />} />

                <Route path="rules-simplified" element={<ComingSoonPage title={t.aside.rules.simplified} description={t.comingSoon.descriptions.simplified} />} />
                <Route path="rules-official" element={<ComingSoonPage title={t.aside.rules.official} description={t.comingSoon.descriptions.official} />} />
                <Route path="deck-checker" element={<ComingSoonPage title={t.aside.rules.deck_checker} description={t.comingSoon.descriptions.deck_checker} />} />
            </Route>

            <Route path="*" element={<MainLayout />}>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};