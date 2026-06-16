'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Plus, X, Phone, Check } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { ParticleBackground } from '../shared';
import { db } from '../firebase';

const EMAILJS_SERVICE_ID = 'service_d916iek';
const EMAILJS_TEMPLATE_ID = 'template_tl54q86';
const EMAILJS_PUBLIC_KEY = 'rUytQhCFYQc6WeuFy';

const appTypes = [
  { id: 'website', label: 'Business Website', desc: 'A site for your company' },
  { id: 'web', label: 'Web App', desc: 'A custom web application' },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Online store & payments' },
  { id: 'internal', label: 'Internal Tool', desc: 'Dashboard for your team' },
  { id: 'pwa', label: 'Mobile / PWA', desc: 'Installable, mobile-first' },
  { id: 'other', label: 'Something else', desc: 'Tell me what you need' },
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

export default function BuildPage() {
  const [appType, setAppType] = useState(null);
  const [otherText, setOtherText] = useState('');
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wantsCall, setWantsCall] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [emailError, setEmailError] = useState('');

  const toggleFeature = f =>
    setFeatures(prev => (prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]));

  const addCustomFeature = () => {
    const v = newFeature.trim();
    if (v && !customFeatures.includes(v)) setCustomFeatures(prev => [...prev, v]);
    setNewFeature('');
  };

  const removeCustomFeature = f => setCustomFeatures(prev => prev.filter(x => x !== f));

  const baseType = appTypes.find(t => t.id === appType)?.label;
  const typeLabel = appType === 'other' ? otherText.trim() : baseType;
  const allFeatures = [...features, ...customFeatures];

  const typeReady = appType && (appType !== 'other' || otherText.trim());
  const ready = typeReady && (email.trim() || phone.trim());

  const handleSubmit = async () => {
    if (!ready || status === 'sending') return;
    setStatus('sending');
    try {
      await addDoc(collection(db, 'requests'), {
        type: typeLabel,
        typeId: appType,
        features: allFeatures,
        email: email.trim(),
        phone: phone.trim(),
        wantsCall,
        status: 'new',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Failed to send request:', err);
      setStatus('error');
      return;
    }

    setStatus('sent');

    // Notify by email (fire-and-forget — the request is already saved either way)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          type: typeLabel,
          features: allFeatures.length ? allFeatures.join(', ') : '—',
          reply_email: email.trim() || '—',
          phone: phone.trim() || '—',
          wants_call: wantsCall ? 'Yes' : 'No',
          time: new Date().toLocaleString('en-GB'),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
    } catch (err) {
      console.error('Email notification failed:', err);
      const detail = err?.text || err?.message || JSON.stringify(err);
      setEmailError(`Email notice failed (${err?.status || '?'}): ${detail}`);
    }
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

  const inputClass =
    'w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#4a90d9] outline-none px-4 py-3 text-sm text-white placeholder:text-[rgba(255,255,255,0.3)] transition-colors duration-300 font-light';

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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {appTypes.map(t => (
                <button key={t.id} onClick={() => setAppType(t.id)} className={cardClass(appType === t.id)}>
                  <span className="block text-lg font-light mb-1">{t.label}</span>
                  <span className="block text-xs text-[rgba(255,255,255,0.4)] font-light">{t.desc}</span>
                </button>
              ))}
            </div>
            {appType === 'other' && (
              <input
                type="text"
                value={otherText}
                onChange={e => setOtherText(e.target.value)}
                placeholder="Describe what you'd like to build…"
                className={`${inputClass} mt-3`}
              />
            )}
          </div>

          {/* Step 2 — features */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              02 — Which features do you need?
            </span>
            <div className="flex flex-wrap gap-3 mb-5">
              {featureOptions.map(f => (
                <button key={f} onClick={() => toggleFeature(f)} className={pillClass(features.includes(f))}>
                  {f}
                </button>
              ))}
              {customFeatures.map(f => (
                <span
                  key={f}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4a90d9] bg-[rgba(74,144,217,0.15)] text-white text-xs uppercase tracking-[0.06em]"
                >
                  {f}
                  <button onClick={() => removeCustomFeature(f)} aria-label="Remove" className="hover:text-[#4a90d9]">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-3 max-w-md">
              <input
                type="text"
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
                placeholder="Add something else…"
                className={inputClass}
              />
              <button
                onClick={addCustomFeature}
                className="shrink-0 inline-flex items-center gap-2 px-5 border border-[rgba(74,144,217,0.4)] text-[#4a90d9] text-xs uppercase tracking-[0.15em] hover:bg-[rgba(74,144,217,0.08)] transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Step 3 — contact */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              03 — How can I reach you?
            </span>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mb-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className={inputClass}
              />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Your phone (optional)"
                className={inputClass}
              />
            </div>
            <button
              onClick={() => setWantsCall(v => !v)}
              className={`${cardClass(wantsCall)} w-full max-w-2xl flex items-center gap-4`}
            >
              <Phone className="w-5 h-5 text-[#4a90d9] shrink-0" />
              <span>
                <span className="block text-base font-light mb-1">Let's configure it together</span>
                <span className="block text-xs text-[rgba(255,255,255,0.4)] font-light">
                  Prefer a call? I'll reach out and we'll plan it step by step.
                </span>
              </span>
            </button>
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
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">Features</span>
                <span className="text-white">{allFeatures.length ? allFeatures.join(', ') : '—'}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">Contact</span>
                <span className="text-white">
                  {[email.trim(), phone.trim()].filter(Boolean).join(' · ') || '—'}
                  {wantsCall && ' · prefers a call'}
                </span>
              </div>
            </div>

            {status === 'sent' ? (
              <div>
                <div className="flex items-center gap-3 text-[#4a90d9]">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(74,144,217,0.15)] border border-[rgba(74,144,217,0.4)]">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-light text-white">
                    Request sent — I'll get back to you soon. Thanks!
                  </span>
                </div>
                {emailError && (
                  <p className="text-xs text-[#e0796b] font-light mt-4 break-all">{emailError}</p>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={!ready || status === 'sending'}
                  className={`inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase px-8 py-3 border transition-all duration-300 ${
                    ready && status !== 'sending'
                      ? 'text-[#4a90d9] border-[rgba(74,144,217,0.4)] hover:bg-[rgba(74,144,217,0.08)]'
                      : 'text-[rgba(255,255,255,0.25)] border-[rgba(255,255,255,0.08)] cursor-not-allowed'
                  }`}
                >
                  {status === 'sending' ? 'Sending…' : 'Send my request'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                {!ready && (
                  <p className="text-xs text-[rgba(255,255,255,0.3)] font-light mt-4">
                    Pick what you're building and leave an email or phone so I can get back to you.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-[#e0796b] font-light mt-4">
                    Something went wrong sending your request. Please try again.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
