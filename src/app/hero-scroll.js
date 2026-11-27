'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './i18n';
import { RentalDemo } from './demos';

/*
 * Cinematic hero. One continuous video tells the story: consultation -> into
 * the monitor -> through the code -> the finished app. Desktop scrubs the video
 * with scroll; at the end the product turns into the real interactive demo,
 * which slides to the right with a caption on the left. Mobile just plays the
 * video (autoplay loop) with the headline and CTA on top.
 */
export default function HeroScroll() {
  const { t, lang } = useLang();
  const h = t.hero;
  const cs = lang === 'cs';
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [small, setSmall] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fit, setFit] = useState(1);

  // Scroll progress (0..1) driven manually from the section's live position in
  // the rAF loop below, instead of framer's useScroll. useScroll can fail to
  // re-measure after a client-side route change and freeze every transform;
  // reading getBoundingClientRect each frame always self-corrects.
  const prog = useMotionValue(0);

  const cap1 = useTransform(prog, [0.0, 0.04, 0.18, 0.25], [1, 1, 1, 0]);
  const cap2 = useTransform(prog, [0.28, 0.36, 0.5, 0.58], [0, 1, 1, 0]);

  // end-of-hero demo handoff
  const videoOpacity = useTransform(prog, [0.72, 0.82], [1, 0]);
  const demoOpacity = useTransform(prog, [0.74, 0.86], [0, 1]);
  const demoX = useTransform(prog, [0.74, 0.98], [-150, 0]);
  const demoScale = useTransform(prog, [0.74, 0.95], [0.92, 1]);
  const demoPE = useTransform(demoOpacity, o => (o > 0.6 ? 'auto' : 'none'));
  const capDemo = useTransform(prog, [0.82, 0.9], [0, 1]);

  useEffect(() => {
    setMounted(true);
    // Treat phones (portrait AND landscape) and small touch tablets as "mobile":
    // scroll-scrubbing is unreliable on touch and the sideways layout breaks, so
    // those just autoplay the video instead.
    const mqs = [
      window.matchMedia('(max-width: 767px)'),
      // Any touch device up to large-tablet width (covers every iPad, portrait
      // AND landscape up to the 12.9" Pro at 1366px). Scroll-scrubbing is
      // unreliable on touch, so these get the autoplay version instead.
      window.matchMedia('(pointer: coarse) and (max-width: 1366px)'),
    ];
    const set = () => setSmall(mqs.some(m => m.matches));
    set();
    mqs.forEach(m => m.addEventListener('change', set));
    // Demo renders at its natural 580px width (where its layout is comfortable)
    // and the whole thing scales down to fit smaller desktops, so the internals
    // never cramp, overlap, or clip. Only the overall size changes.
    const NATURAL = 580;
    const fitDemo = () => {
      const target = Math.min(580, Math.max(300, window.innerWidth * 0.4));
      setFit(Math.min(1, target / NATURAL));
    };
    fitDemo();
    window.addEventListener('resize', fitDemo);
    return () => {
      mqs.forEach(m => m.removeEventListener('change', set));
      window.removeEventListener('resize', fitDemo);
    };
  }, []);

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
    return () => { cancelled = true; if (revoked) URL.revokeObjectURL(revoked); };
  }, [mounted, small]);

  useEffect(() => {
    if (!mounted || small) return;
    const v = videoRef.current;
    if (!v) return;
    let raf = 0, cur = -1, seeking = false;
    const onSeeked = () => { seeking = false; };
    v.addEventListener('seeked', onSeeked);
    const SCRUB_END = 0.72;
    const loop = () => {
      const sec = sectionRef.current;
      if (sec) {
        // Scroll progress straight from the section's live position, every
        // frame. This both drives all the transforms (via prog) and the video
        // scrub. After a client-side route change and back, framer's own
        // measurement can freeze at 0; reading getBoundingClientRect here
        // always self-corrects, so the frame never gets stuck.
        const rect = sec.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        prog.set(p);
        const dur = v.duration;
        if (dur && !isNaN(dur) && isFinite(dur)) {
          const sp = Math.min(1, Math.max(0, p / SCRUB_END));
          const target = sp * (dur - 0.05);
          cur = cur < 0 ? target : cur + (target - cur) * 0.2;
          if (!seeking && Math.abs(v.currentTime - cur) > 0.012) {
            seeking = true;
            try { v.currentTime = cur; } catch (e) { seeking = false; }
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); v.removeEventListener('seeked', onSeeked); };
  }, [mounted, small, prog]);

  // ---------- MOBILE: the whole video just plays ----------
  if (mounted && small) {
    return (
      <>
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
              <a href="#projects" className="text-xs tracking-[0.2em] uppercase text-white/75 text-center py-2">
                {h.viewWork}
              </a>
            </div>
          </div>
        </section>

        {/* finished product -> the real demo, on mobile too */}
        <section className="relative bg-[#070A12] px-5 pt-8 pb-16 border-t border-[rgba(234,240,251,0.06)]">
          <div className="text-[0.66rem] tracking-[0.22em] uppercase text-[#4DA3FF] mb-3">
            {cs ? 'Živá ukázka' : 'Live demo'}
          </div>
          <h2 className="text-2xl font-light text-white leading-tight mb-2">
            {cs ? 'Vyzkoušej si reálnou appku.' : 'Try a real app we built.'}
          </h2>
          <p className="text-sm text-white/75 font-light mb-6 max-w-sm">
            {cs ? 'Tohle je skutečná aplikace, kterou jsme postavili.' : 'This is a real application we built.'}
          </p>
          <div className="overflow-x-auto -mx-5 px-5 pb-2">
            <div className="min-w-[300px] origin-top" style={{ zoom: 0.78 }}>
              <RentalDemo />
            </div>
          </div>
        </section>
      </>
    );
  }

  // ---------- DESKTOP: scrubbed video -> interactive demo ----------
  return (
    <section ref={sectionRef} className="relative h-[460vh] bg-[#070A12]" id="top">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            preload="auto"
            muted
            playsInline
            poster="/hero/hero-poster.jpg"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/92 via-[#070A12]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-[#070A12]/55" />

        {/* interactive demo, slides in from the right */}
        <div className="absolute inset-0 flex items-center justify-end pr-[2.5vw] pointer-events-none">
          <motion.div
            className="origin-right"
            style={{ opacity: demoOpacity, x: demoX, scale: demoScale, pointerEvents: demoPE }}
          >
            <div style={{ width: 580, zoom: fit }}>
              <RentalDemo />
            </div>
          </motion.div>
        </div>

        {/* captions on the left */}
        <div className="absolute inset-0 flex items-center px-8 md:px-20 pointer-events-none">
          <div className="max-w-md lg:max-w-lg relative w-full">
            <motion.div style={{ opacity: cap1 }} className="absolute left-0 max-w-xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.03] tracking-tight text-white">
                {h.h1a} {h.h1b} <span className="text-[#4DA3FF]">{h.h1c}</span>
              </h1>
            </motion.div>
            <motion.div style={{ opacity: cap2 }} className="absolute left-0 max-w-xl">
              <p className="text-2xl md:text-4xl font-light text-white leading-snug">{h.sub}</p>
            </motion.div>
            <motion.div style={{ opacity: capDemo }} className="absolute left-0 max-w-md pointer-events-auto">
              <div className="text-[0.7rem] tracking-[0.22em] uppercase text-[#4DA3FF] mb-4">
                {cs ? 'Živá ukázka' : 'Live demo'}
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-5">
                {cs ? 'Vyzkoušej si reálnou appku.' : 'Try a real app we built.'}
              </h2>
              <p className="text-base text-white/85 font-light leading-relaxed mb-7">
                {cs
                  ? 'Tohle je skutečná aplikace, kterou jsme postavili. Proklikej si ji napravo.'
                  : 'This is a real application we built. Click through it on the right.'}
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] uppercase text-white bg-[#4DA3FF] px-8 py-4 rounded-full font-medium shadow-[0_0_30px_-6px_rgba(77,163,255,0.7)] hover:scale-[1.03] transition-transform duration-300"
              >
                {h.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ opacity: cap1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/75"
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
