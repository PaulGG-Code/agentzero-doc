'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './splash-screen';

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('splashShown')) {
      setIsLoading(false);
    }
  }, []);

  const handleComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  return (
    <>
      {isLoading ? <SplashScreen onAnimationComplete={handleComplete} /> : null}
      {children}
    </>
  );
} 