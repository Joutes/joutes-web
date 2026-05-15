import { useTranslation } from '@/hooks/useTranslation';
import { useUserPreferences } from '@/store/userPreferences';
import CustomSelect, { type Option } from '../components/CustomSelect/CustomSelect';
import Aside from './Aside';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {XmarkOutlined} from "@lineiconshq/free-icons";
import HeaderSelectors from './HeaderSelectors';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
                    <button className="login-btn mobile">{t.header.login}</button>
                    
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
