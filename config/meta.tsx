export const meta = {
  metadataBase: new URL('https://agentzero-doc.vercel.app'),
  title: 'Agent Zero - Documentation',
  description:
    'The official documentation for Agent Zero, a project by PaulGG-Code.',
  authors: [{ name: 'PaulGG-Code' }],
  keywords: [
    'Agent Zero',
    'documentation',
    'AI',
    'Next.js',
    'React',
    'JavaScript',
  ],
  publisher: 'PaulGG-Code',
  creator: 'PaulGG-Code',
  openGraph: {
    type: 'website',
    title: 'Agent Zero - Documentation',
    description:
      'The official documentation for Agent Zero, a project by PaulGG-Code.',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Zero Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image', // Type of Twitter card
    title: 'Agent Zero - Documentation', // Twitter card title
    description:
      'The official documentation for Agent Zero, a project by PaulGG-Code.', // Twitter card description
    images: ['/og_image.png'], // Image used in the Twitter card
    creator: '@PaulGGCode', // Twitter handle of the content creator (optional)
  },
  // SEO Enhancements
  alternates: {
    canonical: 'https://agentzero-doc.vercel.app', // Set the canonical URL
  },
  robots: 'index, follow', // Allows search engines to index and follow links
  // Optional: Hreflang for multilingual content (if applicable)
  hreflang: {
    en: 'https://agentzero-doc.vercel.app', // English version URL
    // Add more hreflang if you have other languages (example: Spanish)
    // "es": "https://pinexio.vercel.app/es",
  },
};
