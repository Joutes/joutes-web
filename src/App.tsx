import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './utils/authConfig';
import DevApiToaster from './components/DevApiToaster/DevApiToaster';

export default function App() {
    return (
        <AuthProvider {...oidcConfig}>
            <HelmetProvider>
                <BrowserRouter>
                    <AppRoutes />
                    <DevApiToaster />
                </BrowserRouter>
            </HelmetProvider>
        </AuthProvider>
    );
}