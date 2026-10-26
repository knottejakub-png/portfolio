'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Plus, X, Phone, Check } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { ParticleBackground } from '../shared';
import { db } from '../firebase';
import { LangProvider, useLang } from '../i18n';

const EMAILJS_SERVICE_ID = 'service_d916iek';
const EMAILJS_TEMPLATE_ID = 'template_fjtsc0s';
const EMAILJS_PUBLIC_KEY = 'rUytQhCFYQc6WeuFy';

function BuildPageInner() {
  const { t, lang, setLang } = useLang();
  const tb = t.build;
  const appTypes = tb.types;
  const featureOptions = tb.features;
  const [appType, setAppType] = useState(null);
  const [otherText, setOtherText] = useState('');
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wantsCall, setWantsCall] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState(''); // honeypot — must stay empty
  const mountedAt = useRef(Date.now());

  const toggleFeature = f =>
    setFeatures(prev => (prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]));

  const addCustomFeature = () => {
    const v = newFeature.trim();
    if (v && !customFeatures.includes(v)) setCustomFeatures(prev => [...prev, v]);
    setNewFeature('');
  };

  const removeCustomFeature = f => setCustomFeatures(prev => prev.filter(x => x !== f));

  const baseType = appTypes.find(at => at.id === appType)?.label;
  const typeLabel = appType === 'other' ? otherText.trim() : baseType;
  const allFeatures = [...features, ...customFeatures];

  const typeReady = appType && (appType !== 'other' || otherText.trim());
  const ready = typeReady && (email.trim() || phone.trim());

  const handleSubmit = async () => {
    if (!ready || status === 'sending') return;

    // Anti-spam: honeypot filled, or form submitted suspiciously fast → silently drop.
    if (botField || Date.now() - mountedAt.current < 2500) {
      setStatus('sent');
      return;
    }

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
          <div className="flex items-center justify-between mb-16">
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {tb.back}
            </motion.a>
            <button
              onClick={() => setLang(lang === 'en' ? 'cs' : 'en')}
              aria-label="Switch language"
              className="text-xs tracking-[0.15em] uppercase text-[rgba(255,255,255,0.6)] hover:text-white transition-colors duration-300"
            >
              {lang === 'en' ? 'CZ' : 'EN'}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[rgba(74,144,217,0.6)] block mb-6">
              {tb.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-4">
              {tb.h1a}<br />
              <span className="text-[rgba(255,255,255,0.15)]">{tb.h1b}</span>
            </h1>
            <p className="text-[rgba(255,255,255,0.45)] font-light leading-relaxed max-w-md mb-16">
              {tb.intro}
            </p>
          </motion.div>

          {/* Step 1 — type */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              {tb.step1}
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {appTypes.map(at => (
                <button key={at.id} onClick={() => setAppType(at.id)} className={cardClass(appType === at.id)}>
                  <span className="block text-lg font-light mb-1">{at.label}</span>
                  <span className="block text-xs text-[rgba(255,255,255,0.4)] font-light">{at.desc}</span>
                </button>
              ))}
            </div>
            {appType === 'other' && (
              <input
                type="text"
                value={otherText}
                onChange={e => setOtherText(e.target.value)}
                placeholder={tb.otherPlaceholder}
                className={`${inputClass} mt-3`}
              />
            )}
          </div>

          {/* Step 2 — features */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              {tb.step2}
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
                placeholder={tb.addPlaceholder}
                className={inputClass}
              />
              <button
                onClick={addCustomFeature}
                className="shrink-0 inline-flex items-center gap-2 px-5 border border-[rgba(74,144,217,0.4)] text-[#4a90d9] text-xs uppercase tracking-[0.15em] hover:bg-[rgba(74,144,217,0.08)] transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                {tb.add}
              </button>
            </div>
          </div>

          {/* Honeypot — hidden from humans, bots tend to fill it */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={e => setBotField(e.target.value)}
            aria-hidden="true"
            className="absolute -left-[9999px] top-0 w-px h-px opacity-0"
          />

          {/* Step 3 — contact */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-5">
              {tb.step3}
            </span>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mb-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tb.emailPlaceholder}
                className={inputClass}
              />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={tb.phonePlaceholder}
                className={inputClass}
              />
            </div>
            <button
              onClick={() => setWantsCall(v => !v)}
              className={`${cardClass(wantsCall)} w-full max-w-2xl flex items-center gap-4`}
            >
              <Phone className="w-5 h-5 text-[#4a90d9] shrink-0" />
              <span>
                <span className="block text-base font-light mb-1">{tb.callTitle}</span>
                <span className="block text-xs text-[rgba(255,255,255,0.4)] font-light">
                  {tb.callDesc}
                </span>
              </span>
            </button>
          </div>

          {/* Summary */}
          <div className="project-card p-8 md:p-10">
            <span className="text-xs tracking-[0.2em] uppercase text-[rgba(74,144,217,0.6)] block mb-6">
              {tb.summary}
            </span>
            <div className="space-y-3 text-sm font-light mb-8">
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">{tb.typeField}</span>
                <span className="text-white">{typeLabel || '—'}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">{tb.featuresField}</span>
                <span className="text-white">{allFeatures.length ? allFeatures.join(', ') : '—'}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[rgba(255,255,255,0.4)] w-24 shrink-0">{tb.contactField}</span>
                <span className="text-white">
                  {[email.trim(), phone.trim()].filter(Boolean).join(' · ') || '—'}
                  {wantsCall && tb.prefersCall}
                </span>
              </div>
            </div>

            {status === 'sent' ? (
              <div className="flex items-center gap-3 text-[#4a90d9]">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(74,144,217,0.15)] border border-[rgba(74,144,217,0.4)]">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-sm font-light text-white">
                  {tb.sent}
                </span>
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
                  {status === 'sending' ? tb.sending : tb.send}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-[rgba(255,255,255,0.3)] font-light mt-4">
                  {tb.consent}
                </p>
                {!ready && (
                  <p className="text-xs text-[rgba(255,255,255,0.3)] font-light mt-2">
                    {tb.needInfo}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-[#e0796b] font-light mt-4">
                    {tb.error}
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

export default function BuildPage() {
  return (
    <LangProvider>
      <BuildPageInner />
    </LangProvider>
  );
}
