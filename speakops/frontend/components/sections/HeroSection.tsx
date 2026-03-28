'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { fadeUp, staggerContainer } from '@/animations/variants';

const REVEAL_RADIUS = 220;

// Base layer: normal dark-mode text colors
function BaseContent() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#38bdf8', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
          padding: '4px 14px', borderRadius: '100px',
        }}>
          AI Voice Agents for SMBs
        </span>
      </motion.div>

      <motion.h1 variants={fadeUp} style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 80px)',
        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
        color: '#f0f6fc', marginBottom: '24px',
      }}>
        Your front desk.{' '}
        <span style={{ color: '#38bdf8' }}>Always on.</span>
      </motion.h1>

      <motion.p variants={fadeUp} style={{
        fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65, color: '#8b949e',
        maxWidth: '560px', margin: '0 auto 40px',
      }}>
        SpeakOps answers every call, books appointments, sends SMS confirmations,
        and handles payments — while you focus on running your business.
      </motion.p>

      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#38bdf8', color: '#0d1117', fontWeight: 700,
          fontSize: '15px', padding: '14px 32px', borderRadius: '100px', textDecoration: 'none',
          boxShadow: '0 0 40px rgba(56,189,248,0.3)',
        }}>
          Start free trial
        </Link>
        <Link href="#demo" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.05)', color: '#f0f6fc', fontWeight: 600,
          fontSize: '15px', padding: '14px 32px', borderRadius: '100px', textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          Watch demo
        </Link>
      </motion.div>

      <motion.p variants={fadeUp} style={{ marginTop: '40px', fontSize: '13px', color: '#8b949e' }}>
        Trusted by 200+ clinics, salons & restaurants · No credit card required
      </motion.p>
    </motion.div>
  );
}

// Reveal layer: glowing / bright version shown inside the cursor circle
function GlowContent() {
  return (
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#0d1117', background: '#38bdf8', border: '1px solid rgba(56,189,248,0.5)',
          padding: '4px 14px', borderRadius: '100px',
        }}>
          AI Voice Agents for SMBs
        </span>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 80px)',
        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
        color: '#f0f6fc', marginBottom: '24px',
      }}>
        Your front desk.{' '}
        <span style={{
          color: '#ffffff',
          textShadow: '0 0 30px rgba(56,189,248,1), 0 0 70px rgba(56,189,248,0.6), 0 0 120px rgba(45,212,191,0.4)',
        }}>
          Always on.
        </span>
      </h1>

      <p style={{
        fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65, color: '#bae6fd',
        maxWidth: '560px', margin: '0 auto 40px',
      }}>
        SpeakOps answers every call, books appointments, sends SMS confirmations,
        and handles payments — while you focus on running your business.
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#ffffff', color: '#0d1117', fontWeight: 700,
          fontSize: '15px', padding: '14px 32px', borderRadius: '100px', textDecoration: 'none',
          boxShadow: '0 0 60px rgba(56,189,248,0.7), 0 0 120px rgba(56,189,248,0.3)',
        }}>
          Start free trial
        </Link>
        <Link href="#demo" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 600,
          fontSize: '15px', padding: '14px 32px', borderRadius: '100px', textDecoration: 'none',
          border: '1px solid rgba(56,189,248,0.4)',
        }}>
          Watch demo
        </Link>
      </div>

      <p style={{ marginTop: '40px', fontSize: '13px', color: '#7dd3fc' }}>
        Trusted by 200+ clinics, salons & restaurants · No credit card required
      </p>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Mouse tracking — start far off-screen so reveal is hidden on load
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const springX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  // Build the CSS clip-path string reactively
  const clipPath = useMotionTemplate`circle(${REVEAL_RADIUS}px at ${springX}px ${springY}px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 10,
      }}
    >
      <motion.div style={{ opacity: sectionOpacity, y: sectionY, pointerEvents: 'auto', width: '100%', maxWidth: '780px', padding: '0 24px' }}>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ position: 'relative', textAlign: 'center' }}
        >
          {/* Base layer — always visible */}
          <BaseContent />

          {/* Reveal layer — clipped to cursor circle, shows glowing version */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath,
              // Subtle blue tint inside the reveal circle
              background: 'radial-gradient(circle at center, rgba(56,189,248,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          >
            <GlowContent />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '40px', left: '50%',
          transform: 'translateX(-50%)', pointerEvents: 'none',
        }}
      >
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(56,189,248,0.6), transparent)' }} />
      </motion.div>
    </section>
  );
}
