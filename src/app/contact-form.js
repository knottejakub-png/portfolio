'use client';
import { useState, useRef } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from './firebase';

const EMAILJS_SERVICE_ID = 'service_d916iek';
const EMAILJS_TEMPLATE_ID = 'template_fjtsc0s';
const EMAILJS_PUBLIC_KEY = 'rUytQhCFYQc6WeuFy';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState('');
  const mountedAt = useRef(Date.now());

  const ready = name.trim() && email.trim() && message.trim();

  const inputClass =
    'w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#4a90d9] outline-none px-4 py-3 text-sm text-white placeholder:text-[rgba(255,255,255,0.35)] transition-colors duration-300 font-light';

  const handleSubmit = async e => {
    e.preventDefault();
    if (!ready || status === 'sending') return;

    // Anti-spam
    if (botField || Date.now() - mountedAt.current < 2500) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      await addDoc(collection(db, 'requests'), {
        type: 'Contact message',
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        features: [],
        wantsCall: false,
        status: 'new',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Failed to save message:', err);
      setStatus('error');
      return;
    }

    setStatus('sent');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          type: `Contact — ${name.trim()}`,
          features: message.trim(),
          reply_email: email.trim(),
          phone: '—',
          wants_call: 'No',
          time: new Date().toLocaleString('en-GB'),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
    } catch (err) {
      console.error('Email notification failed:', err);
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex items-center gap-3 text-[#4a90d9]">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(74,144,217,0.15)] border border-[rgba(74,144,217,0.4)]">
          <Check className="w-4 h-4" />
        </span>
        <span className="text-base font-light text-white">
          Thanks! Your message is on its way — we'll get back to you soon.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-3">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={botField}
        onChange={e => setBotField(e.target.value)}
        className="absolute -left-[9999px] top-0 w-px h-px opacity-0"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          className={inputClass}
        />
      </div>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Tell us what you'd like to build…"
        rows={4}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={!ready || status === 'sending'}
        className={`inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full font-medium transition-all duration-300 ${
          ready && status !== 'sending'
            ? 'text-white bg-[#4a90d9] hover:scale-[1.03] shadow-[0_0_25px_-4px_rgba(74,144,217,0.6)]'
            : 'text-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] cursor-not-allowed'
        }`}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <ArrowUpRight className="w-4 h-4" />
      </button>
      {status === 'error' && (
        <p className="text-xs text-[#e0796b] font-light">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
