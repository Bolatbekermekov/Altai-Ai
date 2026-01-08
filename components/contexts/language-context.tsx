"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

export type Language = "ru" | "en";
export type Translations = typeof ru;

const translationsMap: Record<Language, Translations> = {
  en,
  ru,
};

const languageMeta: Record<Language, (typeof ru)["language"]> = {
  en: en.language,
  ru: ru.language,
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  labels: Record<Language, (typeof ru)["language"]>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("language");
    const initial = stored === "en" || stored === "ru" ? stored : "ru";
    setLanguage(initial);
    document.documentElement.lang = initial;
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language, isReady]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "language" && (event.newValue === "en" || event.newValue === "ru")) {
        setLanguage(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "ru" ? "en" : "ru")),
      t: translationsMap[language],
      labels: languageMeta,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div style={{ visibility: isReady ? "visible" : "hidden" }}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return context;
}
