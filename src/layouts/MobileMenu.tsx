import { useTranslation } from '@/hooks/useTranslation';
import { useUserPreferences } from '@/store/userPreferences';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from 'react-oidc-context';
import CustomSelect, { type Option } from '../components/CustomSelect/CustomSelect';
import Aside from './Aside';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {XmarkOutlined, ExitOutlined, User4Outlined} from "@lineiconshq/free-icons";
import HeaderSelectors from './HeaderSelectors';
import { useGames } from '@/hooks/useGames';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { t } = useTranslation();
    const { 
        selectedGame, setSelectedGame
    } = useUserPreferences();
    const { openLoginModal } = useUIStore();
    const auth = useAuth();
    const { games } = useGames();

    const gamesOptions: Option[] = games.map(game => ({
        value: game.code,
        label: game.name,
        icon: <img src={game.images.icon} alt={game.name} />
    }));

    const handleLoginClick = () => {
        onClose();
        openLoginModal();
    };

    const handleLogoutClick = () => {
        auth.signoutRedirect({
            extraQueryParams: {
                client_id: import.meta.env.VITE_AUTH_CLIENT_ID
            }
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="mobile-menu-overlay">
            <div className="mobile-menu-content">
                <div className="mobile-menu-header">
                    <button className="close-btn" onClick={onClose}>
                        <Lineicons icon={XmarkOutlined} />
                    </button>
                </div>

                <div className="mobile-menu-body">
                    {auth.isAuthenticated ? (
                        <div className="mobile-user-info">
                            <div className="user-profile">
                                <Lineicons icon={User4Outlined} />
                                <span>{auth.user?.profile.name || auth.user?.profile.preferred_username}</span>
                            </div>
                            <button className="logout-btn mobile" onClick={handleLogoutClick}>
                                <Lineicons icon={ExitOutlined} /> {t.header.logout}
                            </button>
                        </div>
                    ) : (
                        <button className="login-btn mobile" onClick={handleLoginClick}>{t.header.login}</button>
                    )}
                    
                    <div className="mobile-selectors">
                        <div className="selector-group">
                            <label>{t.header.choose_game}</label>
                            <CustomSelect
                                options={gamesOptions}
                                placeholder={t.header.choose_game}
                                searchPlaceholder={t.header.search_game}
                                noResultsText={t.header.no_results}
                                withSearch={true}
                                isClearable={true}
                                showArrow={true}
                                defaultValue={selectedGame || undefined}
                                onSelect={(v) => setSelectedGame(v || null)}
                            />
                        </div>

                        <HeaderSelectors showLabels={true} showInternalLabels={false} showArrows={true} />
                    </div>

                    <div className="mobile-aside-section">
                        <Aside onItemClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}
