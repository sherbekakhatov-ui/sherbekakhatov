'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export function PremiumScrollEffects() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '36%']);
  const [pointer, setPointer] = useState({ x: -200, y: -200, active: false });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section:not(#home)'));

    sections.forEach((section, index) => {
      section.classList.add('premium-section-reveal');
      section.style.setProperty('--premium-reveal-delay', `${Math.min(index * 55, 220)}ms`);
    });

    if (shouldReduceMotion) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (event: PointerEvent) => {
      setPointer({ x: event.clientX, y: event.clientY, active: true });
    };

    const handleLeave = () => {
      setPointer((current) => ({ ...current, active: false }));
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_24px_rgba(212,175,55,0.55)]"
        style={{ scaleX }}
      />

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed right-[-16rem] top-[12vh] z-[1] hidden h-[34rem] w-[34rem] rounded-full bg-[#d4af37]/[0.055] blur-3xl lg:block"
          style={{ y: orbY }}
        />
      )}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="premium-cursor-orb"
          animate={{
            x: pointer.x - 112,
            y: pointer.y - 112,
            opacity: pointer.active ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 115, damping: 28, mass: 0.45 }}
        />
      )}
    </>
  );
}
