import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </HelmetProvider>
    );
}