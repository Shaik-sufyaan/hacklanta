'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/animations/variants';

const DATA_SOURCES = [
  { icon: '📄', label: 'Service menu.pdf', size: '124 KB' },
  { icon: '🌐', label: 'yourwebsite.com', size: 'Crawled' },
  { icon: '📋', label: 'Booking policies.docx', size: '48 KB' },
  { icon: '💬', label: 'FAQ document', size: '32 KB' },
  { icon: '💳', label: 'Pricing sheet.pdf', size: '88 KB' },
];

function FloatingDataCard({ src, index, total }: { src: typeof DATA_SOURCES[0]; index: number; total: number }) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 160;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, x: x * 0.3, y: y * 0.3 }}
      animate={{ opacity: 1, x, y }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4, ease: 'easeInOut' }}
        style={{
          background: 'rgba(13,17,23,0.9)',
          border: '1px solid rgba(56,189,248,0.2)',
          borderRadius: '12px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{ fontSize: '16px' }}>{src.icon}</span>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#f0f6fc' }}>{src.label}</div>
          <div style={{ fontSize: '9px', color: '#8b949e' }}>{src.size}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TrainingSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '960px', width: '100%', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        {/* Orbital data visualization */}
        <div style={{ position: 'relative', width: '340px', height: '340px', margin: '0 auto' }}>
          {/* Center AI brain */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 30px rgba(56,189,248,0.2)', '0 0 60px rgba(56,189,248,0.4)', '0 0 30px rgba(56,189,248,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9, #2dd4bf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '32px', zIndex: 2,
            }}
          >
            🧠
          </motion.div>
          {/* Orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(56,189,248,0.15)' }}
          />
          {/* Data cards */}
          {isInView && DATA_SOURCES.map((src, i) => (
            <FloatingDataCard key={i} src={src} index={i} total={DATA_SOURCES.length} />
          ))}
        </div>

        {/* Copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: '16px' }}>
            Instant Intelligence
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc', marginBottom: '20px' }}>
            Trained on your business.{' '}
            <span style={{ color: '#2dd4bf' }}>Ready in minutes.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '16px', lineHeight: 1.7, color: '#8b949e' }}>
            Upload your menu, policies, and FAQs. Point it at your website. SpeakOps learns everything about your business and starts answering calls like your best employee.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: '32px', padding: '20px', background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.15)', borderRadius: '16px' }}>
            <div style={{ fontSize: '12px', color: '#2dd4bf', fontWeight: 600, marginBottom: '8px' }}>Setup time</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#f0f6fc', fontFamily: 'var(--font-display)' }}>15 min</div>
            <div style={{ fontSize: '13px', color: '#8b949e', marginTop: '4px' }}>From signup to first answered call</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
