import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferencesState {
  language: string;
  currency: string;
  priceSource: string;
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
  setPriceSource: (source: string) => void;
}

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      language: 'fr',
      currency: 'eur',
      priceSource: 'cardnexus',
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (currency) => set({ currency: currency }),
      setPriceSource: (source) => set({ priceSource: source }),
    }),
    {
      name: 'user-preferences',
    }
  )
);
