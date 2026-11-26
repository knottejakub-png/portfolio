'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './i18n';

/*
 * Cinematic hero.
 * Desktop: a scroll-scrubbed video (consultation -> into the monitor -> through
 * the code) then the finished app phone resolves and rotates.
 * Mobile: scroll-scrubbing is unreliable on phones, so we render a clean static
 * hero (headline, CTA, the finished app) that flows straight into the site.
 */
export default function HeroScroll() {
  const { t } = useLang();
  const h = t.hero;
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  // scroll-driven values (used on desktop)
  const cap1 = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.28], [1, 1, 1, 0]);
  const cap2 = useTransform(scrollYProgress, [0.3, 0.38, 0.52, 0.6], [0, 1, 1, 0]);
  const videoFade = useTransform(scrollYProgress, [0.56, 0.7], [1, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.58, 0.7], [0, 1]);
  const phoneScale = useTransform(scrollYProgress, [0.58, 0.92], [0.45, 1.02]);
  const phoneRotScroll = useTransform(scrollYProgress, [0.6, 1], [-30, 16]);
  const rotY = useTransform([phoneRotScroll, sx], ([r, p]) => r + p * 12);
  const rotX = useTransform(sy, v => v * -6);
  const cap3 = useTransform(scrollYProgress, [0.72, 0.82], [0, 1]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(min-width: 768px)');
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // Load the video as a blob for smooth seeking (desktop only).
  useEffect(() => {
    if (!isDesktop || !mounted) return;
    const v = videoRef.current;
    if (!v) return;
    let revoked = null;
    let cancelled = false;
    fetch('/hero/hero-scrub.mp4')
      .then(r => r.blob())
      .then(b => {
        if (cancelled) return;
        revoked = URL.createObjectURL(b);
        v.src = revoked;
        v.muted = true;
        v.playsInline = true;
      })
      .catch(() => { v.src = '/hero/hero-scrub.mp4'; });
    const onMeta = () => setReady(true);
    v.addEventListener('loadedmetadata', onMeta);
    return () => {
      cancelled = true;
      v.removeEventListener('loadedmetadata', onMeta);
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [isDesktop, mounted]);

  // Scrub loop (desktop only)
  useEffect(() => {
    if (!isDesktop || !ready) return;
    const v = videoRef.current;
    if (!v) return;
    let raf = 0, cur = 0, seeking = false;
    const onSeeked = () => { seeking = false; };
    v.addEventListener('seeked', onSeeked);
    const SCRUB_END = 0.66;
    const loop = () => {
      const p = scrollYProgress.get();
      const sp = Math.min(1, Math.max(0, p / SCRUB_END));
      const dur = v.duration || 1;
      const target = sp * (dur - 0.05);
      cur += (target - cur) * 0.18;
      if (!seeking && Math.abs(v.currentTime - cur) > 0.012) {
        seeking = true;
        try { v.currentTime = cur; } catch (e) {}
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); v.removeEventListener('seeked', onSeeked); };
  }, [ready, isDesktop, scrollYProgress]);

  useEffect(() => {
    const onMove = e => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [px, py]);

  // ---------- MOBILE: clean static hero ----------
  if (mounted && !isDesktop) {
    return (
      <section ref={sectionRef} id="top" className="relative min-h-[100svh] bg-[#070A12] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(77,163,255,0.14),transparent_60%)]" />
        <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-7 pt-28 pb-14">
          <h1 className="text-4xl xs:text-5xl font-light leading-[1.05] tracking-tight text-white">
            {h.h1a} {h.h1b} <span className="text-[#4DA3FF]">{h.h1c}</span>
          </h1>
          <p className="mt-5 text-base text-white/70 font-light max-w-sm leading-relaxed">
            {h.sub}
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase text-white bg-[#4DA3FF] px-8 py-4 rounded-full font-medium shadow-[0_0_30px_-6px_rgba(77,163,255,0.7)]"
            >
              {h.cta}
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="#projects" className="text-xs tracking-[0.2em] uppercase text-white/60 text-center py-2">
              {h.viewWork}
            </a>
          </div>
          <motion.img
            src="/hero/phone.png"
            alt=""
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mt-10 w-auto h-[42vh] max-h-[360px] drop-shadow-[0_30px_60px_rgba(77,163,255,0.25)]"
          />
        </div>
      </section>
    );
  }

  // ---------- DESKTOP: scroll-scrubbed hero ----------
  return (
    <section ref={sectionRef} className="relative h-[340vh] bg-[#070A12]" id="top">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: videoFade }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            preload="auto"
            muted
            playsInline
            poster="/hero/hero-poster.jpg"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/92 via-[#070A12]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/85 via-transparent to-[#070A12]/50" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none [perspective:1400px]"
          style={{ opacity: phoneOpacity }}
        >
          <motion.img
            src="/hero/phone.png"
            alt=""
            className="w-auto h-[min(80vh,680px)] translate-x-[14vw]"
            style={{
              scale: phoneScale,
              rotateY: rotY,
              rotateX: rotX,
              maskImage: 'radial-gradient(92% 96% at 50% 50%, #000 86%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(92% 96% at 50% 50%, #000 86%, transparent 100%)',
            }}
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <div className="max-w-xl">
            <motion.div style={{ opacity: cap1 }} className="absolute max-w-xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.03] tracking-tight text-white">
                {h.h1a} {h.h1b} <span className="text-[#4DA3FF]">{h.h1c}</span>
              </h1>
            </motion.div>
            <motion.div style={{ opacity: cap2 }} className="absolute max-w-xl">
              <p className="text-2xl md:text-4xl font-light text-white leading-snug">{h.sub}</p>
            </motion.div>
            <motion.div style={{ opacity: cap3 }} className="absolute max-w-xl pointer-events-auto">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6" translate="no">Buildary</h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 text-xs md:text-sm tracking-[0.2em] uppercase text-white bg-[#4DA3FF] px-8 py-4 rounded-full font-medium whitespace-nowrap hover:scale-[1.03] transition-transform duration-300 shadow-[0_0_30px_-6px_rgba(77,163,255,0.7)]"
                >
                  {h.cta}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="#projects" className="text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 px-2 py-3">
                  {h.viewWork}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ opacity: cap1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[0.6rem] tracking-[0.25em] uppercase">Scroll</span>
          <span className="block w-5 h-8 rounded-full border border-white/25 relative">
            <span className="absolute left-1/2 -translate-x-1/2 top-1.5 w-1 h-1.5 rounded-full bg-[#4DA3FF] animate-bounce" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
