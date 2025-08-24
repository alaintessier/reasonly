import { translations } from '../translations'

export const useTranslation = (language = 'en') => {
  const currentTranslations = translations[language] || translations.en
  
  return {
    currentTranslations,
    t: (key) => currentTranslations[key] || key
  }
}
