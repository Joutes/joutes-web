import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import CustomSelect, {type Option } from '@/components/CustomSelect';
import { useUserPreferences } from '@/store/userPreferences';
import { useTranslation } from '@/hooks/useTranslation';

export default function Header() {
    const { t } = useTranslation();
    const { 
        language, setLanguage, 
        currency, setCurrency, 
        priceSource, setPriceSource 
    } = useUserPreferences();

    const tcgsOptions: Option[] = [
        { value: "magic", label: t.tcgs.magic },
        { value: "pokemon", label: t.tcgs.pokemon },
        { value: "yugioh", label: t.tcgs.yugioh },
        { value: "lorcana", label: t.tcgs.lorcana },
        { value: "onepiece", label: t.tcgs.onepiece },
    ];

    const sourceOptions: Option[] = [
        { value: "cardnexus", label: "CardNexus" },
        { value: "cardmarket", label: "Cardmarket" },
        { value: "tcgplayer", label: "TCGplayer" },
    ];

    const currencyOptions: Option[] = [
        { value: "eur", label: "EUR" },
        { value: "usd", label: "USD" },
        { value: "cad", label: "CAD" },
        { value: "chf", label: "CHF" },
    ];

    const languageOptions: Option[] = [
        { value: "fr", label: t.language.french },
        { value: "en", label: t.language.english },
    ];

    const handleTcgSelect = (value: string | undefined) => {
        console.log("Selected TCG:", value);
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
                <div className="search-container">
                    <CustomSelect
                        options={tcgsOptions}
                        placeholder={t.header.choose_tcg}
                        searchPlaceholder={t.header.search_tcg}
                        noResultsText={t.header.no_results}
                        withSearch={true}
                        isClearable={true}
                        showArrow={false}
                        onSelect={handleTcgSelect}
                    />
                </div>

            </div>

            {/* Section Droite : Sélecteurs + Connexion */}
            <div className="auth-container">
                <CustomSelect
                    options={languageOptions}
                    placeholder={t.header.language}
                    className="header-select mini"
                    variant="minimal"
                    showLabel={true}
                    showArrow={false}
                    defaultValue={language}
                    onSelect={(v) => v && setLanguage(v)}
                />
                <CustomSelect
                    options={currencyOptions}
                    placeholder={t.header.currency}
                    noResultsText={t.header.no_results}
                    withSearch={true}
                    className="header-select mini"
                    variant="minimal"
                    showLabel={true}
                    showArrow={false}
                    defaultValue={currency}
                    onSelect={(v) => v && setCurrency(v)}
                />
                <CustomSelect
                    options={sourceOptions}
                    placeholder={t.header.price_source}
                    className="header-select"
                    variant="minimal"
                    showLabel={true}
                    showArrow={false}
                    defaultValue={priceSource}
                    onSelect={(v) => v && setPriceSource(v)}
                />
                <button className="login-btn">{t.header.login}</button>
            </div>
        </header>
    );
}