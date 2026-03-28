'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp, scaleIn } from '@/animations/variants';

const ACTIONS = [
  {
    icon: '📅',
    title: 'Appointment Booked',
    desc: 'Tue, Apr 8 · 2:00 PM',
    detail: 'Maria S. · Cut & Color',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.12)',
  },
  {
    icon: '💬',
    title: 'SMS Confirmation Sent',
    desc: 'To: (404) 555-2891',
    detail: '"See you Tuesday! Reply CANCEL to reschedule."',
    color: '#2dd4bf',
    glow: 'rgba(45,212,191,0.12)',
  },
  {
    icon: '💳',
    title: 'Refund Processed',
    desc: '$85.00 · Stripe',
    detail: 'James K. · Appointment cancellation',
    color: '#7dd3fc',
    glow: 'rgba(125,211,252,0.12)',
  },
  {
    icon: '🗂️',
    title: 'CRM Updated',
    desc: 'HubSpot · Contact synced',
    detail: 'Visit reason, duration & outcome logged',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.12)',
  },
  {
    icon: '📝',
    title: 'Call Transcript Saved',
    desc: '3m 42s · Full transcript',
    detail: 'Keyword flags: "reschedule", "discount", "urgent"',
    color: '#2dd4bf',
    glow: 'rgba(45,212,191,0.12)',
  },
  {
    icon: '🔔',
    title: 'Owner Notified',
    desc: 'Push + Email sent',
    detail: 'High-priority callback flagged by AI',
    color: '#7dd3fc',
    glow: 'rgba(125,211,252,0.12)',
  },
];

function ActionCard({ action, index }: { action: typeof ACTIONS[0]; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.03, y: -4 }}
      style={{
        background: 'rgba(13,17,23,0.8)',
        border: `1px solid ${action.color}28`,
        borderRadius: '20px',
        padding: '20px',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 4px 40px ${action.glow}`,
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${action.glow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
          {action.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: action.color, flexShrink: 0 }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#f0f6fc' }}>{action.title}</span>
          </div>
          <div style={{ fontSize: '12px', color: action.color, marginBottom: '6px' }}>{action.desc}</div>
          <div style={{ fontSize: '11px', color: '#8b949e', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{action.detail}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function ActionsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '960px', width: '100%', padding: '0 24px' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '16px' }}>Real Actions</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc', marginBottom: '16px' }}>
              Not just answering calls.{' '}
              <span style={{ color: '#38bdf8' }}>Getting things done.</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              SpeakOps connects to your existing tools and takes real action — no manual follow-up needed.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {ACTIONS.map((action, i) => (
              <ActionCard key={i} action={action} index={i} />
            ))}
          </div>

          {/* Integrations row */}
          <motion.div variants={fadeUp} style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '16px' }}>Works with your existing stack</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {['Google Calendar', 'Stripe', 'HubSpot', 'Gmail', 'Twilio', 'Vapi'].map((tool) => (
                <span key={tool} style={{ fontSize: '12px', color: '#8b949e', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
