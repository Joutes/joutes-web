import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserPreferences } from '@/store/userPreferences';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    XOutlined,
    GamePadModern1Outlined,
    CalendarDaysOutlined,
    BasketShopping3Outlined,
    UserMultiple4Outlined,
    Megaphone1Outlined,
    TrendUp1Outlined,
    Layers1Outlined,
    PhotosOutlined,
    PlusOutlined,
    FileMultipleOutlined,
    Eraser1Outlined,
    BoxArchive1Outlined,
    AlignTextLeftOutlined,
    BarChart4Outlined,
    CheckSquare2Outlined,
    MenuCheesburgerOutlined,
    Notebook1Outlined
} from "@lineiconshq/free-icons";

export default function Aside() {
    const { t } = useTranslation();
    const location = useLocation();
    const { selectedGame } = useUserPreferences();

    const menuGroups = [
        {
            title: t.aside.community.title,
            items: [
                { icon: GamePadModern1Outlined, label: t.aside.community.games, path: '/games', disabled: false },
                { icon: CalendarDaysOutlined, label: t.aside.community.events, path: '/events', disabled: false },
                { icon: BasketShopping3Outlined, label: t.aside.community.shops, path: '/shops', disabled: false },
                { icon: Megaphone1Outlined, label: t.aside.community.news, path: '/news', disabled: false },
            ]
        },
        {
            title: t.aside.my_space.title,
            items: [
                { icon: Layers1Outlined, label: t.aside.my_space.decks, path: '/my-decks', disabled: false },
                { icon: BoxArchive1Outlined ,label: t.aside.my_space.collection, path: '/my-collection', disabled: false },
                { icon: Notebook1Outlined, label: t.aside.my_space.guides, path: '/my-guides', disabled: false },
                { icon: UserMultiple4Outlined, label: t.aside.my_space.group, path: '/my-group', disabled: false },
            ]
        },
        {
            title: t.aside.my_games.title,
            items: [
                { icon: PlusOutlined, label: t.aside.my_games.counter, path: '/counter', disabled: !selectedGame },
                { icon: AlignTextLeftOutlined , label: t.aside.my_games.history, path: '/history', disabled: false },
                { icon: BarChart4Outlined, label: t.aside.my_games.stats, path: '/stats', disabled: false },
            ]
        },
        {
            title: t.aside.cards.title,
            disabled: !selectedGame,
            items: [
                { icon: PhotosOutlined, label: t.aside.cards.database, path: '/cards', disabled: false },
                { icon: TrendUp1Outlined, label: t.aside.cards.meta, path: '/meta', disabled: false },
                { icon: Eraser1Outlined, label: t.aside.cards.erratas, path: '/erratas', disabled: false },
            ]
        },
        {
            title: t.aside.rules.title,
            disabled: !selectedGame,
            items: [
                { icon: FileMultipleOutlined, label: t.aside.rules.simplified, path: '/rules-simplified', disabled: false },
                { icon: MenuCheesburgerOutlined, label: t.aside.rules.official, path: '/rules-official', disabled: false },
                { icon: CheckSquare2Outlined, label: t.aside.rules.deck_checker, path: '/deck-checker', disabled: false },
            ]
        }
    ];

    return (
        <aside className="sidebar">
            {menuGroups.map((group, idx) => (
                <div key={idx} className={`sidebar-group ${group.disabled ? 'disabled' : ''}`}>
                    <h3 className="group-title">{group.title}</h3>
                    <ul className="sidebar-list">
                        {group.items.map((item, i) => {
                            const isDisabled = group.disabled || item?.disabled;
                            return (
                                <li key={i} className={`sidebar-item ${location.pathname === item.path ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}>
                                    {isDisabled ? (
                                        <div className="sidebar-link disabled">
                                            <Lineicons icon={item.icon ?? XOutlined} className="sidebar-icon" />
                                            <span className="sidebar-label">{item.label}</span>
                                        </div>
                                    ) : (
                                        <Link to={item.path} className="sidebar-link">
                                            <Lineicons icon={item.icon ?? XOutlined} className="sidebar-icon" />
                                            <span className="sidebar-label">{item.label}</span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </aside>
    );
}
