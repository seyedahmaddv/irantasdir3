import { create } from 'zustand';

interface LanguageState {
  language: 'fa' | 'en';
  direction: 'rtl' | 'ltr';
  toggleLanguage: () => void;
  setLanguage: (lang: 'fa' | 'en') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'fa',
  direction: 'rtl',
  toggleLanguage: () =>
    set((state) => ({
      language: state.language === 'fa' ? 'en' : 'fa',
      direction: state.language === 'fa' ? 'ltr' : 'rtl',
    })),
  setLanguage: (lang) =>
    set({
      language: lang,
      direction: lang === 'fa' ? 'rtl' : 'ltr',
    }),
}));
