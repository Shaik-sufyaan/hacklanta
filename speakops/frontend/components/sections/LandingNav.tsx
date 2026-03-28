'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

function SoundWaveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      {[3, 7, 11, 15].map((x, i) => (
        <motion.rect
          key={x}
          x={x} y={0} width="2.5" rx="1.25"
          fill="#38bdf8"
          animate={{ height: [6, 14, 6], y: [7, 3, 7] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

export function LandingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: '64px',
        background: 'rgba(13,17,23,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56,189,248,0.08)',
      }}
    >
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <SoundWaveIcon />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: '#f0f6fc', letterSpacing: '-0.02em' }}>
          SpeakOps
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {['Product', 'Pricing', 'Docs'].map((label) => (
          <span key={label} style={{ fontSize: '14px', color: '#8b949e', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f6fc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8b949e')}
          >
            {label}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Link href="/login" style={{ fontSize: '14px', color: '#8b949e', textDecoration: 'none' }}>
          Sign in
        </Link>
        <Link href="/signup" style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#0d1117',
          background: '#38bdf8',
          padding: '8px 20px',
          borderRadius: '100px',
          textDecoration: 'none',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#7dd3fc'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(56,189,248,0.4)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#38bdf8'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        >
          Get started
        </Link>
      </div>
    </motion.nav>
  );
}
