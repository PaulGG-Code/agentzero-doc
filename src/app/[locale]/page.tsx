import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Both English and French should use the locale prefix
  const docsPath = `/${locale}/docs/readme`;
  redirect(docsPath);
}
