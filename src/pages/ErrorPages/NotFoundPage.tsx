import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import ErrorPage from './ErrorPage';

export default function NotFoundPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <ErrorPage 
            errorCode="404"
            subtitle={t.notfound.subtitle}
            message={t.notfound.description}
            backLabel={t.notfound.back_home}
            onBack={() => navigate('/')}
        />
    );
}
