'use client';

import { useEffect } from 'react';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  return (
    <div data-theme="landing" className="min-h-screen" style={{ background: '#0d1117', color: '#f0f6fc' }}>
      {children}
    </div>
  );
}
