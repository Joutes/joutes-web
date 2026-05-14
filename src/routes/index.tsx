import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '../pages/PublicPages/HomePage';
import AboutPage from '../pages/PublicPages/AboutPage';
import CguPage from '../pages/PublicPages/CguPage';
import OpenSourcePage from '../pages/PublicPages/OpenSourcePage';
import NotFoundPage from '../pages/ErrorPages/NotFoundPage';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="cgu" element={<CguPage />} />
                <Route path="opensource" element={<OpenSourcePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};