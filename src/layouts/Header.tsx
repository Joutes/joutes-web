import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import CustomSelect, {type Option } from '../components/CustomSelect/CustomSelect';
import { useUserPreferences } from '@/store/userPreferences';
import { useTranslation } from '@/hooks/useTranslation';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from 'react-oidc-context';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { MenuCheesburgerOutlined, ExitOutlined, User4Outlined } from "@lineiconshq/free-icons";
import HeaderSelectors from './HeaderSelectors';
import { useGames } from '@/hooks/useGames';

interface HeaderProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

export default function Header({ onMenuToggle }: HeaderProps) {
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

    const handleGamesSelect = (value: string | undefined) => {
        setSelectedGame(value || null);
    };

    const handleLogout = () => {
        auth.signoutRedirect({
            extraQueryParams: {
                client_id: import.meta.env.VITE_AUTH_CLIENT_ID
            }
        });
    };

    return (
        <header className="main-header">
            <div className="nav-container">
                {/* Section Gauche : Logo + Texte */}
                <Link to="/" className="logo-group">
                    <img src={Logo} alt="Logo" className="logo-img" />
                    <h1 className="gradient-text">Joutes</h1>
                </Link>

                {/* Section Milieu : Select générique avec filtre */}
                <div className="search-container desktop-only">
                    <CustomSelect
                        options={gamesOptions}
                        placeholder={t.header.choose_game}
                        searchPlaceholder={t.header.search_game}
                        noResultsText={t.header.no_results}
                        withSearch={true}
                        isClearable={true}
                        showArrow={false}
                        defaultValue={selectedGame || undefined}
                        onSelect={handleGamesSelect}
                    />
                </div>

            </div>

            {/* Section Droite : Sélecteurs + Connexion */}
            <div className="auth-container desktop-only">
                <HeaderSelectors mini={true} variant="minimal" />
                
                {auth.isAuthenticated ? (
                    <div className="user-auth-info">
                        <div className="user-profile">
                            <Lineicons icon={User4Outlined} />
                            <span>{auth.user?.profile.name || auth.user?.profile.preferred_username}</span>
                        </div>
                        <button className="logout-btn" onClick={handleLogout} title={t.header.logout}>
                            <Lineicons icon={ExitOutlined} />
                        </button>
                    </div>
                ) : (
                    <button className="login-btn" onClick={openLoginModal}>{t.header.login}</button>
                )}
            </div>

            <button className="burger-menu-btn" onClick={onMenuToggle}>
                <Lineicons icon={MenuCheesburgerOutlined} />
            </button>
        </header>
    );
}