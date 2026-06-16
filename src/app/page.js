'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, ChevronDown } from 'lucide-react';

const skills = [
  'Next.js', 'React', 'TypeScript', 'JavaScript',
  'Tailwind CSS', 'PostgreSQL', 'Node.js', 'REST API',
  'Git', 'Framer Motion', 'PWA', 'Cloud Deploy',
];

const projects = [
  {
    id: '01',
    name: 'Rental Property Manager',
    category: 'Full-Stack Web App',
    description: 'A comprehensive management platform for short-term rental properties. Built for a private client — handles reservations, guest communication, cleaning schedules, invoicing, and reporting across multiple properties.',
    tech: ['Next.js 14', 'PostgreSQL', 'Tailwind CSS', 'PWA', 'REST API'],
    status: 'Live',
  },
  {
    id: '02',
    name: 'Enterprise Admin Platform',
    category: 'Internal Business Tool',
    description: 'An internal web application built for a technology company. Covers task management, order tracking, team communication, market data dashboards, and role-based access control for multiple user levels.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Cloud Deploy'],
    status: 'Live',
  },
];

const phrases = [
  { prefix: 'Web', suffix: 'developer.' },
  { prefix: 'Web', suffix: 'builder.' },
  { prefix: 'App', suffix: 'builder.' },
  { prefix: 'Web app', suffix: 'developer.' },
];

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initialising...');

  useEffect(() => {
    const texts = ['Initialising...', 'Loading portfolio...', 'Almost there...'];
    let i = 0;
    const textInterval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);

    return () => { clearInterval(progressInterval); clearInterval(textInterval); };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-64 text-center">
        <div className="mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#4a90d9]">JK</span>
        </div>
        <div className="mb-6">
          <div className="h-px bg-[#1a1a1a] w-full relative overflow-hidden">
            <motion.div
              className="h-full bg-[#4a90d9]"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
        <p className="text-xs tracking-[0.2em] text-[rgba(255,255,255,0.3)] uppercase">{text}</p>
      </div>
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-40 px-8 py-5 flex justify-between items-center transition-all duration-500 ${
        scrolled ? 'bg-[rgba(8,8,8,0.9)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]' : ''
      }`}
    >
      <span className="text-xs tracking-[0.3em] uppercase text-[#4a90d9] font-light">JK</span>
      <div className="flex gap-8">
        {['About', 'Projects', 'Skills', 'Contact'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
        ))}
      </div>
    </motion.nav>
  );
}

function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(i => (i + 1) % phrases.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 relative">
      <div className="max-w-5xl mx-auto w-full pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[rgba(74,144,217,0.6)]">
            Portfolio — 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl md:text-8xl font-light leading-[1.05] tracking-tight mb-4"
        >
          Make it<br />
          <span className="text-[rgba(255,255,255,0.15)]">work.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-baseline gap-3 text-3xl md:text-5xl font-light mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={phraseIndex + '-pre'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-[rgba(255,255,255,0.38)]"
            >
              {phrases[phraseIndex].prefix}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={phraseIndex + '-suf'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-[#4a90d9]"
            >
              {phrases[phraseIndex].suffix}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-base md:text-lg text-[rgba(255,255,255,0.45)] max-w-md leading-relaxed font-light"
        >
          IT student & web developer building modern, functional applications
          from concept to deployment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 flex gap-6 items-center"
        >
          <a
            href="#projects"
            className="text-xs tracking-[0.2em] uppercase text-[#4a90d9] border border-[rgba(255,255,255,0.12)] px-8 py-3 hover:bg-[rgba(74,144,217,0.08)] transition-all duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="text-xs tracking-[0.2em] uppercase text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-300"
          >
            Get in touch →
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-4 h-4 text-[rgba(74,144,217,0.4)] animate-bounce" />
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <span className="text-xs tracking-[0.3em] uppercase text-[rgba(255,255,255,0.3)] block mb-16">
            001 / About
          </span>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-20">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Building things<br />
              <span className="text-[rgba(255,255,255,0.15)]">that work.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-6 text-[rgba(255,255,255,0.55)] font-light leading-relaxed">
              <p>
                I'm an IT student and self-taught web developer from the Czech Republic.
                I combine academic knowledge with real-world project experience.
              </p>
              <p>
                I build full-stack web applications end-to-end: from database design and API development
                to polished user interfaces.
              </p>
              <p>
                Alongside my studies, I've delivered production applications for real clients —
                handling everything from requirements gathering to deployment and maintenance.
              </p>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.3} className="mt-20 pt-20 border-t border-[rgba(255,255,255,0.04)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { num: '2+', label: 'Years building' },
              { num: '5+', label: 'Projects shipped' },
              { num: '100%', label: 'Deployed & live' },
              { num: 'CZ', label: 'Based in Czech Republic' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-light text-[#4a90d9] mb-1">{stat.num}</div>
                <div className="text-xs tracking-[0.1em] uppercase text-[rgba(255,255,255,0.28)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-32 px-8 md:px-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <span className="text-xs tracking-[0.3em] uppercase text-[rgba(255,255,255,0.3)] block mb-16">
            002 / Projects
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-light mb-20">
            Selected<br />
            <span className="text-[rgba(255,255,255,0.15)]">work.</span>
          </h2>
        </FadeIn>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.15}>
              <div className="project-card p-8 md:p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs tracking-[0.2em] text-[rgba(74,144,217,0.6)] uppercase block mb-2">
                      {p.id} — {p.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light">{p.name}</h3>
                  </div>
                  <span className="text-xs tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)] border border-[rgba(255,255,255,0.06)] px-3 py-1 mt-1">
                    {p.status}
                  </span>
                </div>
                <p className="text-[rgba(255,255,255,0.45)] font-light leading-relaxed mb-8 max-w-2xl">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="skill-pill">{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-32 px-8 md:px-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <span className="text-xs tracking-[0.3em] uppercase text-[rgba(255,255,255,0.3)] block mb-16">
            003 / Skills
          </span>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Tech I<br />
              <span className="text-[rgba(255,255,255,0.15)]">work with.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[rgba(255,255,255,0.45)] font-light leading-relaxed">
              My stack is centered around the modern JavaScript ecosystem.
              I focus on tools that let me ship fast and build things that scale.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                className="skill-pill cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 px-8 md:px-20 border-t border-[rgba(255,255,255,0.04)]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <span className="text-xs tracking-[0.3em] uppercase text-[rgba(255,255,255,0.3)] block mb-16">
            004 / Contact
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-12">
            Let's work<br />
            <span className="text-[rgba(255,255,255,0.15)]">together.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href="mailto:jakubknotte17@gmail.com"
            className="group inline-flex items-center gap-4 text-xl md:text-2xl font-light text-[rgba(255,255,255,0.6)] hover:text-[#4a90d9] transition-colors duration-300"
          >
            <Mail className="w-5 h-5 text-[#4a90d9]" />
            jakubknotte17@gmail.com
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-8 md:px-20 border-t border-[rgba(255,255,255,0.04)]">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <span className="text-xs tracking-[0.3em] uppercase text-[rgba(255,255,255,0.2)]">
          Portfolio
        </span>
        <span className="text-xs tracking-[0.1em] text-[rgba(255,255,255,0.2)]">
          © 2025
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
