import { Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { meta } from '../../config/meta';
import { SplashProvider } from '@/components/splash-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={geistSans.variable}>
      <body
        className={`
          ${geistSans.className}
          text-sm
          font-regular tracking-wide antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SplashProvider>{children}</SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
