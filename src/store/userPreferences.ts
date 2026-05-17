import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferencesState {
  language: string;
  currency: string;
  priceSource: string;
  selectedGame: string | null;
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
  setPriceSource: (source: string) => void;
  setSelectedGame: (game: string | null) => void;
}

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      language: 'fr',
      currency: 'eur',
      priceSource: 'cardnexus',
      selectedGame: null,
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (currency) => set({ currency: currency }),
      setPriceSource: (source) => set({ priceSource: source }),
      setSelectedGame: (game) => set({ selectedGame: game }),
    }),
    {
      name: 'user-preferences',
    }
  )
);
