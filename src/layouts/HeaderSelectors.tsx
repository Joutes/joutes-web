import CustomSelect, { type Option } from '../components/CustomSelect/CustomSelect';
import { useUserPreferences } from '@/store/userPreferences';
import { useTranslation } from '@/hooks/useTranslation';

interface HeaderSelectorsProps {
    mini?: boolean;
    variant?: "minimal" | "default";
    showLabels?: boolean;
    showInternalLabels?: boolean;
    showArrows?: boolean;
}

export default function HeaderSelectors({ 
    mini = false, 
    variant = "default", 
    showLabels = false,
    showInternalLabels = true,
    showArrows = false
}: HeaderSelectorsProps) {
    const { t } = useTranslation();
    const { 
        language, setLanguage, 
        currency, setCurrency, 
        priceSource, setPriceSource,
    } = useUserPreferences();

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

    return (
        <>
            <div className="selector-group">
                {showLabels && <label>{t.header.language}</label>}
                <CustomSelect
                    options={languageOptions}
                    placeholder={t.header.language}
                    className={`header-select ${mini ? 'mini' : ''}`}
                    variant={variant}
                    showLabel={showInternalLabels}
                    showArrow={showArrows}
                    defaultValue={language}
                    onSelect={(v) => v && setLanguage(v)}
                />
            </div>
            <div className="selector-group">
                {showLabels && <label>{t.header.currency}</label>}
                <CustomSelect
                    options={currencyOptions}
                    placeholder={t.header.currency}
                    noResultsText={t.header.no_results}
                    withSearch={true}
                    className={`header-select ${mini ? 'mini' : ''}`}
                    variant={variant}
                    showLabel={showInternalLabels}
                    showArrow={showArrows}
                    defaultValue={currency}
                    onSelect={(v) => v && setCurrency(v)}
                />
            </div>
            <div className="selector-group">
                {showLabels && <label>{t.header.price_source}</label>}
                <CustomSelect
                    options={sourceOptions}
                    placeholder={t.header.price_source}
                    className="header-select"
                    variant={variant}
                    showLabel={showInternalLabels}
                    showArrow={showArrows}
                    defaultValue={priceSource}
                    onSelect={(v) => v && setPriceSource(v)}
                />
            </div>
        </>
    );
}
