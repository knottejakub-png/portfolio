'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './i18n';

/*
 * Cinematic hero. One continuous video tells the whole story:
 * consultation -> into the monitor -> through the code -> the finished app.
 * Desktop scrubs the video with scroll. Mobile just plays it (autoplay loop),
 * which phones handle reliably, with the headline and CTA on top.
 */
export default function HeroScroll() {
  const { t } = useLang();
  const h = t.hero;
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [small, setSmall] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const cap1 = useTransform(scrollYProgress, [0.0, 0.05, 0.22, 0.3], [1, 1, 1, 0]);
  const cap2 = useTransform(scrollYProgress, [0.34, 0.42, 0.56, 0.64], [0, 1, 1, 0]);
  const cap3 = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 767px)');
    const set = () => setSmall(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // Desktop: load the video as a blob for smooth scroll seeking.
  useEffect(() => {
    if (!mounted || small) return;
    const v = videoRef.current;
    if (!v) return;
    let revoked = null, cancelled = false;
    fetch('/hero/hero-scrub.mp4')
      .then(r => r.blob())
      .then(b => {
        if (cancelled) return;
        revoked = URL.createObjectURL(b);
        v.src = revoked; v.muted = true; v.playsInline = true; v.load();
      })
      .catch(() => { v.src = '/hero/hero-scrub.mp4'; });
    return () => {
      cancelled = true;
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [mounted, small]);

  // Desktop scrub loop — runs continuously and self-corrects, so it is never
  // left stuck after navigating away and back.
  useEffect(() => {
    if (!mounted || small) return;
    const v = videoRef.current;
    if (!v) return;
    let raf = 0, cur = -1, seeking = false;
    const onSeeked = () => { seeking = false; };
    v.addEventListener('seeked', onSeeked);
    const SCRUB_END = 0.85;
    const loop = () => {
      const dur = v.duration;
      if (dur && !isNaN(dur) && isFinite(dur)) {
        const p = scrollYProgress.get();
        const sp = Math.min(1, Math.max(0, p / SCRUB_END));
        const target = sp * (dur - 0.05);
        cur = cur < 0 ? target : cur + (target - cur) * 0.2;
        if (!seeking && Math.abs(v.currentTime - cur) > 0.012) {
          seeking = true;
          try { v.currentTime = cur; } catch (e) { seeking = false; }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); v.removeEventListener('seeked', onSeeked); };
  }, [mounted, small, scrollYProgress]);

  // ---------- MOBILE: the whole video just plays ----------
  if (mounted && small) {
    return (
      <section ref={sectionRef} id="top" className="relative min-h-[100svh] bg-[#070A12] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero/hero-mobile.mp4"
          poster="/hero/hero-poster.jpg"
          autoPlay muted loop playsInline preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/35 to-[#070A12]/70" />
        <div className="relative z-10 min-h-[100svh] flex flex-col justify-end px-7 pt-28 pb-14">
          <h1 className="text-4xl font-light leading-[1.05] tracking-tight text-white">
            {h.h1a} {h.h1b} <span className="text-[#4DA3FF]">{h.h1c}</span>
          </h1>
          <p className="mt-4 text-base text-white/75 font-light max-w-sm leading-relaxed">{h.sub}</p>
          <div className="mt-7 flex flex-col gap-3">
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
        </div>
      </section>
    );
  }

  // ---------- DESKTOP: scroll-scrubbed video ----------
  return (
    <section ref={sectionRef} className="relative h-[360vh] bg-[#070A12]" id="top">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          muted
          playsInline
          poster="/hero/hero-poster.jpg"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/92 via-[#070A12]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/85 via-transparent to-[#070A12]/55" />

        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <div className="max-w-xl relative w-full">
            <motion.div style={{ opacity: cap1 }} className="absolute left-0 max-w-xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.03] tracking-tight text-white">
                {h.h1a} {h.h1b} <span className="text-[#4DA3FF]">{h.h1c}</span>
              </h1>
            </motion.div>
            <motion.div style={{ opacity: cap2 }} className="absolute left-0 max-w-xl">
              <p className="text-2xl md:text-4xl font-light text-white leading-snug">{h.sub}</p>
            </motion.div>
            <motion.div style={{ opacity: cap3 }} className="absolute left-0 max-w-xl pointer-events-auto">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-5" translate="no">Buildary</h2>
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
