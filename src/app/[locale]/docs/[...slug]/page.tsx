import { allDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx-components';
import Toc from '@/components/toc';

type tParams = Promise<{ slug: string[]; locale: string }>;

export const generateStaticParams = async () => {
  return allDocs.map((doc) => {
    // For a path like "getting-started/introduction",
    // this creates { slug: ['getting-started', 'introduction'] }
    const slugArray = doc._raw.flattenedPath.split('/');
    return { slug: slugArray };
  });
};

export const generateMetadata = async ({ params }: { params: tParams }) => {
  // Join the slug array back into a path string
  const awaitedParams = await params;
  const path = awaitedParams.slug.join('/');
  const locale = awaitedParams.locale;

  // Filter docs by locale
  const docsForLocale = allDocs.filter((doc) => {
    let docLocale = 'en';
    if (doc._raw.flattenedPath.startsWith('fr/')) docLocale = 'fr';
    else if (doc._raw.flattenedPath.startsWith('it/')) docLocale = 'it';
    else if (doc._raw.flattenedPath.startsWith('es/')) docLocale = 'es';
    return docLocale === locale;
  });

  const doc = docsForLocale.find((doc) => {
    let docPath = doc._raw.flattenedPath;
    if (docPath.startsWith('fr/')) docPath = docPath.substring(3);
    else if (docPath.startsWith('it/')) docPath = docPath.substring(3);
    else if (docPath.startsWith('es/')) docPath = docPath.substring(3);
    return docPath === path;
  });

  if (!doc) throw new Error(`Doc not found for slug: ${path}`);
  return {
    title: doc.title,
    description: doc.description || 'A detailed guide to the topic.',
    openGraph: {
      title: doc.title,
      description: doc.description || 'A detailed guide to the topic.',
    },
  };
};

const DocsPage = async ({ params }: { params: tParams }) => {
  const awaitedParams = await params;
  // Join the slug array back into a path string
  const path = awaitedParams.slug.join('/');
  const locale = awaitedParams.locale;

  // Filter docs by locale
  const docsForLocale = allDocs.filter((doc) => {
    let docLocale = 'en';
    if (doc._raw.flattenedPath.startsWith('fr/')) docLocale = 'fr';
    else if (doc._raw.flattenedPath.startsWith('it/')) docLocale = 'it';
    else if (doc._raw.flattenedPath.startsWith('es/')) docLocale = 'es';
    return docLocale === locale;
  });

  const doc = docsForLocale.find((doc) => {
    let docPath = doc._raw.flattenedPath;
    if (docPath.startsWith('fr/')) docPath = docPath.substring(3);
    else if (docPath.startsWith('it/')) docPath = docPath.substring(3);
    else if (docPath.startsWith('es/')) docPath = docPath.substring(3);
    return docPath === path;
  });

  if (!doc) notFound();
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0">
        <Mdx code={doc.body.code} />
      </div>
      <aside className="lg:w-64 lg:flex-shrink-0">
        <div className="lg:sticky lg:top-6">
          <Toc doc={doc} />
        </div>
      </aside>
    </div>
  );
};

export default DocsPage;
