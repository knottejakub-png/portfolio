'use client';
import { useState } from 'react';
import {
  Sparkles, LayoutDashboard, Calendar, ClipboardList, Tag, Wallet, FileBarChart,
  CheckSquare, ShoppingCart, MessageSquare, BarChart3, ArrowLeft, Bell, Plus,
} from 'lucide-react';

function Frame({ url, children }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0c0c0c] text-[11px] md:text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
        <div className="ml-3 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.4)] truncate max-w-[60%]">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-3">
      <div className="text-[10px] uppercase tracking-wide text-[rgba(255,255,255,0.4)] mb-1" style={color ? { color } : undefined}>
        {label}
      </div>
      <div className="text-base font-light text-white">{value}</div>
    </div>
  );
}

// ─── RENTAL DEMO ───────────────────────────────────────────────────────────

const rentalNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'reservations', label: 'Reservations', icon: ClipboardList },
  { id: 'pricing', label: 'Pricing', icon: Tag },
  { id: 'costs', label: 'Costs', icon: Wallet },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
];

function RentalDashboard() {
  const guests = [
    ['Guest A.', 'Cabin A', '19–21 Jun', '8', 'Airbnb'],
    ['Guest B.', 'Cabin B', '19–21 Jun', '4', 'Airbnb'],
    ['Guest C.', 'Cabin A', '26–28 Jun', '8', 'Booking'],
    ['Guest D.', 'Cabin A', '26–29 Jun', '3', 'Direct'],
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">Dashboard</span>
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#4a90d9] text-white">
          <Plus className="w-3 h-3" /> New reservation
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {['All cabins', 'Cabin A', 'Cabin B', '2026', 'Full year'].map((t, i) => (
          <span
            key={t}
            className={`px-2.5 py-1 rounded-full border ${
              i === 0
                ? 'border-[#4a90d9] text-white bg-[rgba(74,144,217,0.12)]'
                : 'border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)]'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatCard label="Revenue 2026" value="€38,200" />
        <StatCard label="Reservations" value="65" />
        <StatCard label="Next cleanup" value="Jun 21" />
        <StatCard label="Next arrival" value="in 3 days" />
      </div>
      <div className="rounded-lg border border-[rgba(255,255,255,0.07)] overflow-hidden">
        <div className="grid grid-cols-5 gap-2 px-3 py-2 text-[10px] uppercase tracking-wide text-[rgba(255,255,255,0.35)] border-b border-[rgba(255,255,255,0.06)]">
          <span>Guest</span><span>Cabin</span><span>Stay</span><span>People</span><span>Source</span>
        </div>
        {guests.map((g, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 px-3 py-2 items-center border-b border-[rgba(255,255,255,0.04)] last:border-0">
            <span className="text-white">{g[0]}</span>
            <span><span className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)]">{g[1]}</span></span>
            <span className="text-[rgba(255,255,255,0.6)]">{g[2]}</span>
            <span className="text-[rgba(255,255,255,0.6)]">{g[3]}</span>
            <span><span className="px-2 py-0.5 rounded-full bg-[rgba(74,144,217,0.12)] text-[#4a90d9]">{g[4]}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RentalCalendar() {
  const booked = new Set([3, 4, 5, 11, 12, 18, 19, 20, 25, 26]);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">June 2026</span>
        <div className="flex gap-1">
          <span className="px-2 py-1 rounded border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)]">‹</span>
          <span className="px-2 py-1 rounded border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)]">›</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-[rgba(255,255,255,0.35)]">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
          <span key={d} className="text-center">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const b = booked.has(day);
          return (
            <div
              key={i}
              className={`h-10 rounded border p-1 ${
                b
                  ? 'border-[rgba(74,144,217,0.4)] bg-[rgba(74,144,217,0.12)] text-white'
                  : 'border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.4)]'
              }`}
            >
              {day}
              {b && <div className="mt-1 h-1 rounded-full bg-[rgba(74,144,217,0.6)]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RentalReservations() {
  const rows = [
    ['#1042', 'Guest A.', 'Cabin A', '19–21 Jun', 'Confirmed'],
    ['#1043', 'Guest B.', 'Cabin B', '19–21 Jun', 'Confirmed'],
    ['#1044', 'Guest C.', 'Cabin A', '26–28 Jun', 'Pending'],
    ['#1045', 'Guest D.', 'Cabin A', '26–29 Jun', 'Confirmed'],
  ];
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-white">Reservations</span>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="text-[rgba(255,255,255,0.4)]">{r[0]}</span>
              <span className="text-white">{r[1]}</span>
              <span className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)]">{r[2]}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[rgba(255,255,255,0.6)]">{r[3]}</span>
              <span className={`px-2 py-0.5 rounded-full ${
                r[4] === 'Confirmed'
                  ? 'bg-[rgba(74,144,217,0.12)] text-[#4a90d9]'
                  : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)]'
              }`}>
                {r[4]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RentalPlaceholder({ label }) {
  return (
    <div className="h-[260px] flex items-center justify-center text-[rgba(255,255,255,0.3)]">
      {label} — preview
    </div>
  );
}

export function RentalDemo() {
  const [view, setView] = useState('dashboard');
  return (
    <Frame url="cabin-manager.app/dashboard">
      <div className="flex">
        <div className="hidden sm:flex flex-col w-44 shrink-0 border-r border-[rgba(255,255,255,0.06)] p-3 gap-1">
          <div className="flex items-center gap-2 px-2 py-2 mb-2">
            <div className="w-6 h-6 rounded bg-[rgba(74,144,217,0.15)] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#4a90d9]" />
            </div>
            <span className="font-medium text-white">Cabin Manager</span>
          </div>
          {rentalNav.map(n => {
            const Icon = n.icon;
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                  active ? 'bg-[rgba(74,144,217,0.12)] text-white' : 'text-[rgba(255,255,255,0.5)] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {n.label}
              </button>
            );
          })}
        </div>
        <div className="flex-1 p-4 min-h-[340px]">
          {view === 'dashboard' && <RentalDashboard />}
          {view === 'calendar' && <RentalCalendar />}
          {view === 'reservations' && <RentalReservations />}
          {['pricing', 'costs', 'reports'].includes(view) && (
            <RentalPlaceholder label={rentalNav.find(n => n.id === view).label} />
          )}
        </div>
      </div>
    </Frame>
  );
}

// ─── ADMIN HUB DEMO ──────────────────────────────────────────────────────────

const hubApps = [
  { id: 'tasks', label: 'Task Management', desc: 'Tasks, projects & deadlines', icon: CheckSquare },
  { id: 'orders', label: 'Order Management', desc: 'Orders, tracking & exports', icon: ShoppingCart },
  { id: 'chat', label: 'Team Chat', desc: 'Team messaging', icon: MessageSquare },
  { id: 'market', label: 'Market Info', desc: 'Market data & charts', icon: BarChart3 },
];

function TasksScreen() {
  const tasks = [
    ['Prepare Q3 report', 'Internal', 'Jun 20', 'High'],
    ['Approve new orders', 'Orders', 'Jun 18', 'Medium'],
    ['Update market sheet', 'Market', 'Jun 24', 'Low'],
    ['Client follow-up', 'PR Agency', 'Jun 25', 'Medium'],
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatCard label="Active" value="12" />
        <StatCard label="Overdue" value="3" />
        <StatCard label="Due soon" value="5" />
        <StatCard label="Closed" value="48" />
      </div>
      <div className="rounded-lg border border-[rgba(255,255,255,0.07)] overflow-hidden">
        <div className="grid grid-cols-4 gap-2 px-3 py-2 text-[10px] uppercase tracking-wide text-[rgba(255,255,255,0.35)] border-b border-[rgba(255,255,255,0.06)]">
          <span>Task</span><span>Module</span><span>Due</span><span>Priority</span>
        </div>
        {tasks.map((t, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2 items-center border-b border-[rgba(255,255,255,0.04)] last:border-0">
            <span className="text-white">{t[0]}</span>
            <span><span className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)]">{t[1]}</span></span>
            <span className="text-[rgba(255,255,255,0.6)]">{t[2]}</span>
            <span>
              <span className={`px-2 py-0.5 rounded-full ${
                t[3] === 'High'
                  ? 'bg-[rgba(224,121,107,0.15)] text-[#e0796b]'
                  : t[3] === 'Medium'
                  ? 'bg-[rgba(74,144,217,0.12)] text-[#4a90d9]'
                  : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)]'
              }`}>
                {t[3]}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersScreen() {
  const stats = [
    ['Open', '4', '#4a90d9'], ['Approved', '7', '#7da9e0'], ['Manufactured', '3', '#e0b96b'],
    ['On the way', '2', '#6bc0e0'], ['Delivered', '18', '#6be0a1'], ['Cancelled', '1', '#e0796b'],
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {['Month', 'Quarter', 'Year'].map((t, i) => (
          <span key={t} className={`px-2.5 py-1 rounded ${i === 0 ? 'bg-[rgba(74,144,217,0.12)] text-white' : 'text-[rgba(255,255,255,0.5)]'}`}>{t}</span>
        ))}
        <span className="ml-auto px-2.5 py-1 rounded bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)]">CZK</span>
      </div>
      <div className="text-[10px] uppercase tracking-wide text-[rgba(255,255,255,0.4)]">Orders in period</div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map(([l, v, c]) => (
          <div key={l} className="rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-3 text-center">
            <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: c }}>{l}</div>
            <div className="text-lg font-light text-white">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  const convos = ['Team General', 'Logistics', 'Management', 'Support'];
  const msgs = [
    ['them', 'Hi, any update on the order?'],
    ['me', 'Shipped this morning ✅'],
    ['them', 'Great, thanks!'],
  ];
  return (
    <div className="flex gap-3 h-[300px]">
      <div className="hidden sm:flex flex-col w-32 shrink-0 gap-1">
        {convos.map((c, i) => (
          <div key={c} className={`px-2 py-2 rounded ${i === 0 ? 'bg-[rgba(74,144,217,0.12)] text-white' : 'text-[rgba(255,255,255,0.5)]'}`}>{c}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col rounded-lg border border-[rgba(255,255,255,0.07)] p-3">
        <div className="flex-1 space-y-2">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m[0] === 'me' ? 'justify-end' : 'justify-start'}`}>
              <span className={`px-3 py-2 rounded-2xl max-w-[75%] ${
                m[0] === 'me' ? 'bg-[#4a90d9] text-white' : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.8)]'
              }`}>
                {m[1]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 items-center">
          <div className="flex-1 h-8 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]" />
          <div className="w-8 h-8 rounded-full bg-[#4a90d9]" />
        </div>
      </div>
    </div>
  );
}

function MarketScreen() {
  const bars = [40, 65, 50, 80, 60, 75, 55, 90, 70, 85, 60, 78];
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-3">
        <div className="text-[10px] uppercase tracking-wide text-[rgba(255,255,255,0.4)] mb-3">Monthly units</div>
        <div className="flex items-end gap-1 h-28">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t bg-[rgba(74,144,217,0.7)]" style={{ height: `${b}%` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatCard label="Total" value="165k" />
        <StatCard label="Share" value="12%" />
        <StatCard label="Top brand" value="Brand A" />
        <StatCard label="YoY" value="+8%" />
      </div>
    </div>
  );
}

export function HubDemo() {
  const [app, setApp] = useState(null);
  const current = hubApps.find(a => a.id === app);
  return (
    <Frame url={`admin-hub.app/${app || ''}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          {app && (
            <button onClick={() => setApp(null)} className="inline-flex items-center gap-1 text-[rgba(255,255,255,0.5)] hover:text-white mr-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Hub
            </button>
          )}
          <span className="font-medium text-white">{current ? current.label : 'Admin Hub'}</span>
        </div>
        <div className="flex items-center gap-2 text-[rgba(255,255,255,0.4)]">
          <Bell className="w-3.5 h-3.5" />
          <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.08)]" />
        </div>
      </div>
      <div className="p-4 min-h-[340px]">
        {!app && (
          <div>
            <div className="mb-1 text-base font-light text-white">Hello, Admin 👋</div>
            <div className="text-[rgba(255,255,255,0.4)] mb-4">Choose an application to continue.</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {hubApps.map(a => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.id}
                    onClick={() => setApp(a.id)}
                    className="text-left rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-4 hover:border-[rgba(74,144,217,0.4)] hover:bg-[rgba(74,144,217,0.06)] transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[rgba(74,144,217,0.12)] flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-[#4a90d9]" />
                    </div>
                    <div className="text-white mb-0.5">{a.label}</div>
                    <div className="text-[rgba(255,255,255,0.4)] text-[10px]">{a.desc}</div>
                  </button>
                );
              })}
            </div>
            <div className="text-center text-[rgba(255,255,255,0.3)] mt-5">More applications coming soon</div>
          </div>
        )}
        {app === 'tasks' && <TasksScreen />}
        {app === 'orders' && <OrdersScreen />}
        {app === 'chat' && <ChatScreen />}
        {app === 'market' && <MarketScreen />}
      </div>
    </Frame>
  );
}
