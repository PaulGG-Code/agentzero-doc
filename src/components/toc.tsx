'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
  level: number;
  title: string;
  slug: string;
}

interface TocProps {
  doc: {
    headings: Heading[];
  };
}

const Toc: React.FC<TocProps> = ({ doc }) => {
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = doc.headings.slice(1).map((heading) => document.getElementById(heading.slug)).filter(Boolean);
    elements.forEach((el) => observer.observe(el!));

    return () => elements.forEach((el) => observer.unobserve(el!));
  }, [doc.headings]);

  const getPadding = (level: number) => {
    return { paddingLeft: `${(level - 1) * 1}rem` };
  };

  return (
    <aside className="fixed right-0 hidden xl:block w-64 p-6 top-16 border-l border-[var(--color-border)] h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="top-0 pb-2">
        <h2 className="font-semibold text-lg">On this page</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {doc.headings.slice(1).map((heading) => (
            <li key={heading.slug} style={getPadding(heading.level)}>
              <a
                href={`#${heading.slug}`}
                className={`transition-colors text-sm ${
                  currentId === heading.slug
                      ? 'text-primary font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                {heading.title}
              </a>
                        </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Toc;
