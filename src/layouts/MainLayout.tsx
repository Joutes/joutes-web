import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Aside from './Aside';
import MobileMenu from './MobileMenu';

export default function MainLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`app-layout ${isMenuOpen ? 'menu-open' : ''}`}>
            <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
            
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="content-wrapper aside-container">
                <Aside />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}