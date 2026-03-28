'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/animations/variants';

const MISSED_CALLS = [
  { time: '9:03 AM', name: 'Sarah M.', note: 'Appointment inquiry', lost: '$120' },
  { time: '10:17 AM', name: 'David K.', note: 'Pricing question', lost: '$85' },
  { time: '11:42 AM', name: 'Clinic HQ', note: 'Urgent reschedule', lost: '$200' },
  { time: '1:08 PM', name: 'Unknown', note: 'Left no voicemail', lost: '$—' },
  { time: '2:55 PM', name: 'Ana R.', note: 'New patient intake', lost: '$340' },
  { time: '4:31 PM', name: 'James T.', note: 'Payment dispute', lost: '$175' },
  { time: '5:48 PM', name: 'Marcus L.', note: 'Group booking', lost: '$460' },
];

function MissedCallCard({ call, index }: { call: typeof MISSED_CALLS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '12px 16px',
        background: 'rgba(239,68,68,0.06)',
        border: '1px solid rgba(239,68,68,0.15)',
        borderRadius: '12px',
        marginBottom: '8px',
      }}
    >
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '14px' }}>📵</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>{call.name}</div>
        <div style={{ fontSize: '11px', color: '#8b949e' }}>{call.note}</div>
      </div>
      <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>{call.lost}</div>
      <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 400 }}>{call.time}</div>
      <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>
        Missed
      </span>
    </motion.div>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '900px', width: '100%', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        {/* Left: copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ef4444', marginBottom: '16px' }}>
            The Problem
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc', marginBottom: '20px' }}>
            47 missed calls last week.{' '}
            <span style={{ color: '#ef4444' }}>Each one a lost booking.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '16px', lineHeight: 1.7, color: '#8b949e' }}>
            Your front desk can't be everywhere at once. Lunch breaks, busy rushes, after-hours — calls go unanswered. Every missed call is a customer lost to a competitor who picked up.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: '32px', display: 'flex', gap: '32px' }}>
            {[{ val: '62%', label: 'of callers don\'t call back' }, { val: '$240', label: 'avg lost booking value' }].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-display)' }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: missed calls list */}
        <div style={{ maxHeight: '420px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(to bottom, #0d1117, transparent)', zIndex: 2 }} />
          {isInView && MISSED_CALLS.map((call, i) => (
            <MissedCallCard key={i} call={call} index={i} />
          ))}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, #0d1117, transparent)', zIndex: 2 }} />
        </div>
      </div>
    </section>
  );
}
