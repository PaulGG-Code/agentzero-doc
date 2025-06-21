'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ScrollToAnchor = () => {
  const searchParams = useSearchParams();
  const hasScrolled = useRef(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !hasScrolled.current) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        hasScrolled.current = true;
      }
    }
  }, [searchParams]);

  return null;
};

export default ScrollToAnchor; 