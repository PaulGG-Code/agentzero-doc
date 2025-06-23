import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  // If locale is undefined, use default locale
  const currentLocale = locale || defaultLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(currentLocale as any)) {
    throw new Error(
      `Locale '${currentLocale}' is not supported. Supported locales: ${locales.join(', ')}`
    );
  }

  return {
    locale: currentLocale as string,
    messages: (await import(`../messages/${currentLocale}.json`)).default,
  };
});
