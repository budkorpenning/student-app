import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import * as Localization from 'expo-localization';
import { strings, Language, StringKey } from './strings';

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: StringKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getDeviceLanguage(): Language {
  const locale = Localization.getLocales()[0]?.languageCode ?? 'sv';
  return locale.startsWith('sv') ? 'sv' : 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(getDeviceLanguage);

  const t = useCallback(
    (key: StringKey): string => {
      return strings[language][key];
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}
