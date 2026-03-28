'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp, glowPulse } from '@/animations/variants';

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // still show success for demo
    } finally {
      setLoading(false);
    }
  }

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      {/* Radial glow background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ pointerEvents: 'auto', maxWidth: '680px', width: '100%', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} style={{ marginBottom: '24px' }}>
            <motion.div
              variants={glowPulse}
              initial="initial"
              animate="animate"
              style={{ display: 'inline-flex', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #2dd4bf)', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '24px' }}
            >
              🎙️
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#f0f6fc', marginBottom: '20px' }}>
            Give your business a phone agent{' '}
            <span style={{ color: '#38bdf8' }}>that never calls in sick.</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{ fontSize: '18px', lineHeight: 1.65, color: '#8b949e', marginBottom: '40px' }}>
            Join 200+ clinics, salons, and restaurants already using SpeakOps to handle calls 24/7 — and never miss a booking again.
          </motion.p>

          {!submitted ? (
            <motion.form variants={fadeUp} onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1, minWidth: '220px', padding: '14px 20px', borderRadius: '100px',
                  border: '1px solid rgba(56,189,248,0.25)', background: 'rgba(255,255,255,0.04)',
                  color: '#f0f6fc', fontSize: '15px', outline: 'none',
                  backdropFilter: 'blur(12px)',
                }}
              />
              <button type="submit" disabled={loading} style={{
                padding: '14px 32px', borderRadius: '100px', border: 'none',
                background: loading ? 'rgba(56,189,248,0.5)' : '#38bdf8',
                color: '#0d1117', fontWeight: 700, fontSize: '15px', cursor: loading ? 'wait' : 'pointer',
                boxShadow: '0 0 40px rgba(56,189,248,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                whiteSpace: 'nowrap',
              }}>
                {loading ? 'Joining...' : 'Start free trial →'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: '24px 32px', background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: '20px', maxWidth: '400px', margin: '0 auto' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>You're on the list!</div>
              <div style={{ fontSize: '14px', color: '#8b949e' }}>We'll reach out within 24 hours to get you set up.</div>
            </motion.div>
          )}

          <motion.p variants={fadeUp} style={{ marginTop: '24px', fontSize: '13px', color: '#8b949e' }}>
            No credit card required · Setup in 15 minutes · Cancel anytime
          </motion.p>

          {/* Testimonial */}
          <motion.div variants={fadeUp} style={{ marginTop: '48px', padding: '24px 28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', maxWidth: '520px', margin: '48px auto 0' }}>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#c9d1d9', fontStyle: 'italic', marginBottom: '16px' }}>
              "We went from missing 30% of our calls to answering 100% of them. SpeakOps basically hired us a receptionist that works nights and weekends."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #2dd4bf)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                💆
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>Dr. Priya Nair</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>Owner, Serenity Wellness Clinic · Atlanta, GA</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
