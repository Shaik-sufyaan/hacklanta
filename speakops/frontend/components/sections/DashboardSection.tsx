'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/animations/variants';

interface LiveStats {
  calls: number;
  booked: number;
  resolution: string;
}

const FALLBACK_STATS: LiveStats = { calls: 47, booked: 12, resolution: '91%' };

function useLiveStats() {
  const [stats, setStats] = useState<LiveStats>(FALLBACK_STATS);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/stats`,
        );
        if (!res.ok) throw new Error(`stats fetch failed: ${res.status}`);
        const data = await res.json();
        setStats({
          calls: data.liveCalls ?? FALLBACK_STATS.calls,
          booked: data.agents ?? FALLBACK_STATS.booked,
          resolution: '91%',
        });
      } catch (err) {
        console.error('[DashboardSection] Error loading live stats:', err);
        setFetchError(true);
      }
    }
    load();
  }, []);

  return { stats, fetchError };
}

export function DashboardSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const { stats, fetchError } = useLiveStats();

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '700px', width: '100%', padding: '0 24px', textAlign: 'center' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '16px' }}>
            Live Dashboard
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc', marginBottom: '20px' }}>
            Your business, at a glance.{' '}
            <span style={{ color: '#38bdf8' }}>Always.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '16px', lineHeight: 1.7, color: '#8b949e' }}>
            Real-time call logs, transcripts, booking analytics, and AI performance — all in one beautiful dashboard. The floating panels you see are live data from your agents.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: '32px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { val: String(stats.calls), label: 'Calls today', color: '#38bdf8' },
              { val: String(stats.booked), label: 'Booked', color: '#2dd4bf' },
              { val: stats.resolution, label: 'Resolution rate', color: '#7dd3fc' },
            ].map((s) => (
              <div key={s.label} style={{ padding: '20px 28px', background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '16px', backdropFilter: 'blur(12px)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
          {fetchError && (
            <motion.p variants={fadeUp} style={{ marginTop: '12px', fontSize: '11px', color: '#8b949e', textAlign: 'center' }}>
              Showing demo data · Live stats unavailable
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
