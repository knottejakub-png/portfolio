'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { ParticleBackground } from '../shared';

const appTypes = [
  { id: 'web', label: 'Web App', desc: 'A custom web application' },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Online store & payments' },
  { id: 'internal', label: 'Internal Tool', desc: 'Dashboard for your team' },
  { id: 'pwa', label: 'Mobile / PWA', desc: 'Installable, mobile-first' },
];

const featureOptions = [
  'User accounts & login',
  'Payments / subscriptions',
  'Admin dashboard',
  'Notifications',
  'Multi-language',
  'Analytics & reporting',
  'API integration',
  'File uploads',
  'Booking / reservations',
  'Real-time updates',
];

const scopeOptions = [
  { id: 'mvp', label: 'MVP', desc: 'A quick first version' },
  { id: 'full', label: 'Full product', desc: 'Complete, polished build' },
  { id: 'ongoing', label: 'Ongoing', desc: 'Build + maintenance' },
];

export default function BuildPage() {
  const [appType, setAppType] = useState(null);
  const [features, setFeatures] = useState([]);
  const [scope, setScope] = useState(null);

  const toggleFeature = f =>
    setFeatures(prev => (prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]));

  const typeLabel = appTypes.find(t => t.id === appType)?.label;
  const scopeLabel = scopeOptions.find(s => s.id === scope)?.label;
  const ready = appType && scope;

  const mailHref = () => {
    const lines = [
      'Hi Jakub,',
      '',
      "I'd like to build an application. Here's what I have in mind:",
      '',
      `• Type: ${typeLabel || '—'}`,
      `• Scope: ${scopeLabel || '—'}`,
      `• Features: ${features.length ? features.join(', ') : '—'}`,
      '',
      'Looking forward to hearing from you.',
    ];
    const subject = `App request${typeLabel ? ' — ' + typeLabel : ''}`;
    return `mailto:jakubknotte17@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const cardClass = selected =>
    `text-left p-6 border transition-all duration-300 ${
      selected
        ? 'border-[#4a90d9] bg-[rgba(74,144,217,0.08)]'
        : 'border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.18)]'
    }`;

  const pillClass = selected =>
    `px-4 py-2 rounded-full border text-xs uppercase tracking-[0.06em] transition-all duration-300 ${
      selected
        ? 'border-[#4a90d9] bg-[rgba(74,144,217,0.15)] text-white'
        : 'border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.7)] hover:border-[rgba(74,144,217,0.4)]'
    }`;

  return (
    <>
      <ParticleBackground />
      <main className="relative z-10 min-h-screen px-8 md:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] hover:text-white transition-colors duration-300 mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[rgba(74,144,217,0.6)] block mb-6">
              Build your own app
            </span>
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-4">
              Let's build<br />
              <span className="text-[rgba(255,255,255,0.15)]">your app.</span>
            </h1>
            <p className="text-[rgba(255,255,255,0.45)] font-light leading-relaxed max-w-md mb-16">
              Pick what you need and I'll send you back a tailored plan. No commitment — just a starting point.
            </p>
          </motion.div>

          {/* Step 1 — type */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              01 — What are you building?
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {appTypes.map(t => (
                <button key={t.id} onClick={() => setAppType(t.id)} className={cardClass(appType === t.id)}>
                  <span className="block text-lg font-light mb-1">{t.label}</span>
                  <span className="block text-xs text-[rgba(255,255,255,0.4)] font-light">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — features */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              02 — Which features do you need?
            </span>
            <div className="flex flex-wrap gap-3">
              {featureOptions.map(f => (
                <button key={f} onClick={() => toggleFeature(f)} className={pillClass(features.includes(f))}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — scope */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              03 — What's the scope?
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              {scopeOptions.map(s => (
                <button key={s.id} onClick={() => setScope(s.id)} className={cardClass(scope === s.id)}>
                  <span className="block text-lg font-light mb-1">{s.label}</span>
                  <span className="block text-xs text-[rgba(255,255,255,0.4)] font-light">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="project-card p-8 md:p-10">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-6">
              Your configuration
            </span>
            <div className="space-y-3 text-sm font-light mb-8">
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">Type</span>
                <span className="text-white">{typeLabel || '—'}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">Scope</span>
                <span className="text-white">{scopeLabel || '—'}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">Features</span>
                <span className="text-white">{features.length ? features.join(', ') : '—'}</span>
              </div>
            </div>

            <a
              href={ready ? mailHref() : undefined}
              aria-disabled={!ready}
              onClick={e => !ready && e.preventDefault()}
              className={`inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase px-8 py-3 border transition-all duration-300 ${
                ready
                  ? 'text-[#4a90d9] border-[rgba(74,144,217,0.4)] hover:bg-[rgba(74,144,217,0.08)]'
                  : 'text-[rgba(255,255,255,0.25)] border-[rgba(255,255,255,0.08)] cursor-not-allowed'
              }`}
            >
              Send my request
              <ArrowUpRight className="w-4 h-4" />
            </a>
            {!ready && (
              <p className="text-xs text-[rgba(255,255,255,0.3)] font-light mt-4">
                Pick a type and a scope to continue.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
