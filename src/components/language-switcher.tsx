'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    let newPath = pathname;
    // If current path starts with a locale, replace it
    if (newPath.match(/^\/(en|fr|it|es)(\/|$)/)) {
      newPath = newPath.replace(/^\/(en|fr|it|es)/, `/${newLocale}`);
    } else if (newPath === '/') {
      newPath = `/${newLocale}`;
    } else {
      newPath = `/${newLocale}${newPath}`;
    }
    router.push(newPath);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-foreground border-border hover:bg-muted/20 min-w-[40px] h-9 px-2 flex items-center justify-center bg-background"
        onClick={() => setOpen(!open)}
        title={t('switchLanguage')}
      >
        <Languages className="h-[1.2rem] w-[1.2rem] text-foreground" />
        <span className="hidden sm:inline-block text-sm font-medium">
          {locale === 'en'
            ? 'EN'
            : locale === 'fr'
              ? 'FR'
              : locale === 'it'
                ? 'IT'
                : locale === 'es'
                  ? 'ES'
                  : locale.toUpperCase()}
        </span>
      </Button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="space-y-2 p-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-1">
              {t('switchLanguage')}
            </div>
            <div className="space-y-1">
              <Button
                variant={locale === 'en' ? 'primary' : 'none'}
                size="sm"
                className={`w-full justify-start ${
                  locale === 'en'
                    ? 'text-primary-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleLanguageChange('en')}
              >
                {t('en')}
              </Button>
              <Button
                variant={locale === 'fr' ? 'primary' : 'none'}
                size="sm"
                className={`w-full justify-start ${
                  locale === 'fr'
                    ? 'text-primary-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleLanguageChange('fr')}
              >
                {t('fr')}
              </Button>
              <Button
                variant={locale === 'it' ? 'primary' : 'none'}
                size="sm"
                className={`w-full justify-start ${
                  locale === 'it'
                    ? 'text-primary-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleLanguageChange('it')}
              >
                {t('it')}
              </Button>
              <Button
                variant={locale === 'es' ? 'primary' : 'none'}
                size="sm"
                className={`w-full justify-start ${
                  locale === 'es'
                    ? 'text-primary-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleLanguageChange('es')}
              >
                {t('es')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
