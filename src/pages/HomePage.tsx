import { Helmet } from 'react-helmet-async';

export default function HomePage() {

    return (
        <section>
            <Helmet>
                <title>Accueil | Joutes</title>
                <html lang="fr" />
            </Helmet>

            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Joutes</h2>
            </header>
        </section>
    );
}