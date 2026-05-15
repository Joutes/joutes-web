import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Aside from './Aside';

export default function MainLayout() {
    return (
        <div className={`app-layout`}>
            <Header />

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