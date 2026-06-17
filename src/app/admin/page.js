'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Trash2, LogOut, Check, RotateCcw } from 'lucide-react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ParticleBackground } from '../shared';
import { db, auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const inputClass =
    'w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#4a90d9] outline-none px-4 py-3 text-sm text-white placeholder:text-[rgba(255,255,255,0.3)] transition-colors duration-300 font-light';

  const submit = async e => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError('Wrong email or password.');
      setBusy(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
      <form onSubmit={submit} className="w-full max-w-sm">
        <span className="text-xs tracking-[0.3em] uppercase text-[rgba(74,144,217,0.6)] block mb-6">
          Admin
        </span>
        <h1 className="text-3xl font-light mb-8">Sign in</h1>
        <div className="space-y-3 mb-6">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className={inputClass}
          />
        </div>
        {error && <p className="text-xs text-[#e0796b] font-light mb-4">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase px-8 py-3 border border-[rgba(74,144,217,0.4)] text-[#4a90d9] hover:bg-[rgba(74,144,217,0.08)] transition-all duration-300 disabled:opacity-40"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

function formatDate(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Dashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleDone = r =>
    updateDoc(doc(db, 'requests', r.id), { status: r.status === 'done' ? 'new' : 'done' });

  const remove = r => {
    if (confirm('Delete this request?')) deleteDoc(doc(db, 'requests', r.id));
  };

  const newCount = requests.filter(r => r.status !== 'done').length;

  return (
    <main className="relative z-10 min-h-screen px-6 md:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[rgba(74,144,217,0.6)] block mb-3">
              Admin — Requests
            </span>
            <h1 className="text-3xl md:text-4xl font-light">
              {newCount} new<span className="text-[rgba(255,255,255,0.25)]"> / {requests.length} total</span>
            </h1>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] hover:text-white transition-colors duration-300"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>

        {loading ? (
          <p className="text-[rgba(255,255,255,0.4)] font-light">Loading…</p>
        ) : requests.length === 0 ? (
          <p className="text-[rgba(255,255,255,0.4)] font-light">No requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map(r => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`project-card p-6 md:p-8 ${r.status === 'done' ? 'opacity-50' : ''}`}
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    <span className="text-xs tracking-[0.15em] uppercase text-[rgba(74,144,217,0.6)] block mb-1">
                      {formatDate(r.createdAt)}
                      {r.status === 'done' && ' · done'}
                      {r.wantsCall && ' · wants a call'}
                    </span>
                    <h3 className="text-xl font-light">{r.type || '—'}</h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => toggleDone(r)}
                      title={r.status === 'done' ? 'Mark as new' : 'Mark as done'}
                      className="p-2 border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] hover:text-[#4a90d9] hover:border-[rgba(74,144,217,0.4)] transition-all duration-300"
                    >
                      {r.status === 'done' ? <RotateCcw className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => remove(r)}
                      title="Delete"
                      className="p-2 border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] hover:text-[#e0796b] hover:border-[rgba(224,121,107,0.4)] transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {r.features?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {r.features.map(f => (
                      <span key={f} className="skill-pill">{f}</span>
                    ))}
                  </div>
                )}

                {r.message && (
                  <p className="text-sm font-light text-[rgba(255,255,255,0.7)] leading-relaxed mb-4 border-l-2 border-[rgba(74,144,217,0.4)] pl-4">
                    {r.name ? <span className="text-[rgba(255,255,255,0.4)]">{r.name}: </span> : null}
                    {r.message}
                  </p>
                )}

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-light text-[rgba(255,255,255,0.6)]">
                  {r.email && (
                    <a href={`mailto:${r.email}`} className="inline-flex items-center gap-2 hover:text-[#4a90d9] transition-colors">
                      <Mail className="w-4 h-4 text-[#4a90d9]" />
                      {r.email}
                    </a>
                  )}
                  {r.phone && (
                    <a href={`tel:${r.phone}`} className="inline-flex items-center gap-2 hover:text-[#4a90d9] transition-colors">
                      <Phone className="w-4 h-4 text-[#4a90d9]" />
                      {r.phone}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u));
  }, []);

  return (
    <>
      <ParticleBackground />
      {user === undefined ? (
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <p className="text-[rgba(255,255,255,0.4)] font-light">Loading…</p>
        </div>
      ) : user ? (
        <Dashboard user={user} />
      ) : (
        <Login />
      )}
    </>
  );
}
