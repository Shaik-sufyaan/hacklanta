import type { Variants } from 'framer-motion';
import { EASING, DURATIONS } from './config';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.slow, ease: EASING.spring },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.normal, ease: EASING.smooth },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.slow, ease: EASING.spring },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.slow, ease: EASING.spring },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATIONS.slow, ease: EASING.spring },
  },
};

export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(56, 189, 248, 0.15)',
      '0 0 60px rgba(56, 189, 248, 0.45)',
      '0 0 20px rgba(56, 189, 248, 0.15)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const textReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: EASING.smooth },
  },
};

export const cardFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 28 },
  },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATIONS.slow, ease: EASING.spring },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: DURATIONS.slow, ease: EASING.spring },
  },
};
