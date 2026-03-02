import { headers } from 'next/headers';

// Supported languages
export const supportedLanguages = ['en', 'vi'] as const;
export type Language = typeof supportedLanguages[number];

// Default language
export const defaultLanguage: Language = 'en';

// Language detection
export function getLanguageFromHeaders(): Language {
  try {
    const headersList = headers();
    const acceptLanguage = headersList.get('accept-language');
    
    if (acceptLanguage) {
      // Extract preferred language from Accept-Language header
      const preferredLanguage = acceptLanguage
        .split(',')[0]
        .split('-')[0]
        .toLowerCase();
      
      // Check if supported
      if (supportedLanguages.includes(preferredLanguage as Language)) {
        return preferredLanguage as Language;
      }
    }
  } catch (error) {
    console.error('Error detecting language:', error);
  }
  
  return defaultLanguage;
}

// Get translations for a language
export async function getTranslations(lang: Language = defaultLanguage) {
  try {
    const translations = await import(`@/lib/locales/${lang}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    // Fallback to default language
    const fallbackTranslations = await import(`@/lib/locales/${defaultLanguage}.json`);
    return fallbackTranslations.default;
  }
}

// Translation function for server components
export function t(translations: any, key: string, fallback?: string) {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof value === 'string' ? value : fallback || key;
}
