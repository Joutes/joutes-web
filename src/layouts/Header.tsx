import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import CustomSelect, {type Option } from '../components/CustomSelect/CustomSelect';
import { useUserPreferences } from '@/store/userPreferences';
import { useTranslation } from '@/hooks/useTranslation';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { MenuCheesburgerOutlined } from "@lineiconshq/free-icons";
import HeaderSelectors from './HeaderSelectors';

interface HeaderProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

export default function Header({ onMenuToggle }: HeaderProps) {
    const { t } = useTranslation();
    const {
        selectedGame, setSelectedGame
    } = useUserPreferences();

    const gamesOptions: Option[] = [
        { value: "magic", label: t.games.magic },
        { value: "pokemon", label: t.games.pokemon },
        { value: "yugioh", label: t.games.yugioh },
        { value: "lorcana", label: t.games.lorcana },
        { value: "onepiece", label: t.games.onepiece },
    ];

    const handleGamesSelect = (value: string | undefined) => {
        setSelectedGame(value || null);
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
                <button className="login-btn">{t.header.login}</button>
            </div>

            <button className="burger-menu-btn" onClick={onMenuToggle}>
                <Lineicons icon={MenuCheesburgerOutlined} />
            </button>
        </header>
    );
}