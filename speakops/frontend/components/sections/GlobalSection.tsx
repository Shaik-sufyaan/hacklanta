'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/animations/variants';

const LANGUAGES = [
  { word: 'Hello', lang: 'English', flag: '🇺🇸' },
  { word: 'Hola', lang: 'Spanish', flag: '🇲🇽' },
  { word: 'Bonjour', lang: 'French', flag: '🇫🇷' },
  { word: 'مرحبا', lang: 'Arabic', flag: '🇸🇦' },
  { word: 'नमस्ते', lang: 'Hindi', flag: '🇮🇳' },
  { word: 'こんにちは', lang: 'Japanese', flag: '🇯🇵' },
  { word: 'Olá', lang: 'Portuguese', flag: '🇧🇷' },
  { word: '你好', lang: 'Mandarin', flag: '🇨🇳' },
  { word: 'Ciao', lang: 'Italian', flag: '🇮🇹' },
  { word: 'Merhaba', lang: 'Turkish', flag: '🇹🇷' },
];

export function GlobalSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20% 0px' });
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setLangIndex((i) => (i + 1) % LANGUAGES.length), 2200);
    return () => clearInterval(id);
  }, [isInView]);

  const current = LANGUAGES[langIndex];

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', maxWidth: '960px', width: '100%', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        {/* Language switcher visual */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {/* Main language display */}
          <div style={{ position: 'relative', width: '280px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={langIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', position: 'absolute' }}
              >
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>{current.flag}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 800, color: '#f0f6fc', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {current.word}
                </div>
                <div style={{ fontSize: '14px', color: '#38bdf8', marginTop: '8px', fontWeight: 500 }}>{current.lang}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Language dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {LANGUAGES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: i === langIndex ? 1 : 0.6, background: i === langIndex ? '#38bdf8' : 'rgba(56,189,248,0.2)' }}
                style={{ width: '8px', height: '8px', borderRadius: '50%' }}
              />
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {[{ val: '29+', label: 'Languages' }, { val: '140+', label: 'Countries' }, { val: '99.2%', label: 'Accuracy' }].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '16px' }}>
            Multilingual
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f6fc', marginBottom: '20px' }}>
            Speaks your customers'{' '}
            <span style={{ color: '#38bdf8' }}>language.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '16px', lineHeight: 1.7, color: '#8b949e' }}>
            SpeakOps automatically detects the caller's language and responds in kind — no configuration needed. Serve every customer in their native tongue.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: '28px', padding: '18px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '14px' }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Currently speaking with</div>
            <div style={{ fontSize: '16px', color: '#f0f6fc', fontWeight: 600 }}>
              {current.flag} {current.word} — {current.lang} caller detected
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
