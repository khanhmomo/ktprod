'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supportedLanguages, type Language } from '@/lib/i18n-server';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const languageNames = {
    en: 'English',
    vi: 'Tiếng Việt'
  };

  return (
    <div className="flex items-center space-x-2">
      {supportedLanguages.map((lang) => (
        <Button
          key={lang}
          variant={currentLanguage === lang ? 'default' : 'outline'}
          size="sm"
          onClick={() => onLanguageChange(lang)}
          className="min-w-[80px]"
        >
          {languageNames[lang]}
        </Button>
      ))}
    </div>
  );
}
