import '../globals.css';
import { Metadata } from 'next';
import { meta } from '../../../config/meta';
import { SplashProvider } from '@/components/splash-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = meta;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SplashProvider>{children}</SplashProvider>
    </NextIntlClientProvider>
  );
}
