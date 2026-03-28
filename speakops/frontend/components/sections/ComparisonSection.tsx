'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp, slideInLeft, slideInRight } from '@/animations/variants';

const HUMAN = [
  { label: 'Monthly cost', value: '$4,200', sub: '2 receptionists' },
  { label: 'Availability', value: '9am–5pm', sub: 'Mon–Fri only' },
  { label: 'Response time', value: '3s hold', sub: 'When not busy' },
  { label: 'Error rate', value: '15%', sub: 'Avg human error' },
  { label: 'Languages', value: '1–2', sub: 'Limited' },
];

const AI = [
  { label: 'Monthly cost', value: '$0.08/call', sub: 'Pay per use' },
  { label: 'Availability', value: '24 / 7 / 365', sub: 'Zero downtime' },
  { label: 'Response time', value: 'Instant', sub: '< 1 second' },
  { label: 'Error rate', value: '0.3%', sub: 'Consistent' },
  { label: 'Languages', value: '29+', sub: 'Auto-detected' },
];

export function ComparisonSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '900px', width: '100%', padding: '0 24px' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '16px' }}>The Numbers</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc' }}>
              1 AI agent vs.{' '}
              <span style={{ color: '#ef4444' }}>2 receptionist salaries.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Human column */}
            <motion.div variants={slideInLeft} style={{
              background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: '24px', padding: '28px', backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <span style={{ fontSize: '24px' }}>👥</span>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc' }}>Human Team</div>
                  <div style={{ fontSize: '12px', color: '#8b949e' }}>Traditional front desk</div>
                </div>
              </div>
              {HUMAN.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < HUMAN.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ fontSize: '13px', color: '#8b949e' }}>{row.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444' }}>{row.value}</div>
                    <div style={{ fontSize: '10px', color: '#8b949e' }}>{row.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* AI column */}
            <motion.div variants={slideInRight} style={{
              background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: '24px', padding: '28px', backdropFilter: 'blur(12px)',
              boxShadow: '0 0 60px rgba(56,189,248,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <span style={{ fontSize: '24px' }}>🤖</span>
                </motion.div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc' }}>SpeakOps Agent</div>
                  <div style={{ fontSize: '12px', color: '#38bdf8' }}>AI-powered operations</div>
                </div>
              </div>
              {AI.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < AI.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ fontSize: '13px', color: '#8b949e' }}>{row.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#38bdf8' }}>{row.value}</div>
                    <div style={{ fontSize: '10px', color: '#8b949e' }}>{row.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
