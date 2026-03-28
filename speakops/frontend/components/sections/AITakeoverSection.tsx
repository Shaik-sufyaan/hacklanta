'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/animations/variants';

function WaveformBar({ index }: { index: number }) {
  return (
    <motion.div
      style={{ width: '3px', borderRadius: '2px', background: 'linear-gradient(to top, #2dd4bf, #38bdf8)', margin: '0 1px' }}
      animate={{ height: [4, Math.random() * 32 + 8, 4] }}
      transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: index * 0.04, ease: 'easeInOut' }}
    />
  );
}

function LiveCallCard() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const secs = (elapsed % 60).toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(13,17,23,0.85)',
        border: '1px solid rgba(56,189,248,0.25)',
        borderRadius: '20px',
        padding: '20px 24px',
        maxWidth: '320px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 40px rgba(56,189,248,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2dd4bf' }}
          />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live</span>
        </div>
        <span style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace', fontWeight: 700 }}>{mins}:{secs}</span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', color: '#8b949e', marginBottom: '4px' }}>Caller</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc' }}>Maria S. · (404) 555-2891</div>
      </div>

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', height: '40px', marginBottom: '16px' }}>
        {Array.from({ length: 40 }, (_, i) => <WaveformBar key={i} index={i} />)}
      </div>

      <div style={{ padding: '12px', background: 'rgba(56,189,248,0.06)', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.1)' }}>
        <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>AI Response</div>
        <div style={{ fontSize: '13px', color: '#f0f6fc', lineHeight: 1.5 }}>
          "Hi! I can book you in for Tuesday at 2pm. Shall I confirm that and send a reminder text?"
        </div>
      </div>
    </motion.div>
  );
}

export function AITakeoverSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '900px', width: '100%', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        {/* Live call card */}
        <div>{isInView && <LiveCallCard />}</div>

        {/* Copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '16px' }}>
            AI Takes Over
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc', marginBottom: '20px' }}>
            Every call answered.{' '}
            <span style={{ color: '#38bdf8' }}>Instantly.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '16px', lineHeight: 1.7, color: '#8b949e', marginBottom: '24px' }}>
            SpeakOps picks up in under 1 second. It knows your services, your schedule, and your business policies — handling calls the way you'd want them handled.
          </motion.p>
          {['Books appointments in real-time', 'Sends SMS confirmations instantly', 'Escalates urgent calls to you', 'Works nights, weekends, holidays'].map((item, i) => (
            <motion.div key={item} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', color: '#38bdf8' }}>✓</span>
              </div>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
