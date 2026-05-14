import { useUserPreferences } from '@/store/userPreferences';
import { translations, type Language } from '@/translations';

export const useTranslation = () => {
  const language = useUserPreferences((state) => state.language) as Language;
  
  // Si la langue n'existe pas dans les traductions, on fallback sur 'fr'
  const t = translations[language] || translations.fr;

  return { t, language };
};
