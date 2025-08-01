import { useState, useEffect } from 'react';
import { Language } from '../types';
import { TranslationService } from '../services/translationService';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    TranslationService.getCurrentLanguage()
  );

  const changeLanguage = (language: Language) => {
    TranslationService.setLanguage(language);
    setCurrentLanguage(language);
    // Force re-render of the entire app
    window.location.reload();
  };

  const t = (key: string): string => {
    return TranslationService.translate(key);
  };

  useEffect(() => {
    // Set initial language
    TranslationService.setLanguage(currentLanguage);
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    t,
    languages: TranslationService.getLanguages()
  };
};