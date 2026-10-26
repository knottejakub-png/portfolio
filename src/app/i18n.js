'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const en = {
  nav: { projects: 'Projects', about: 'About', skills: 'Skills', build: 'Build', contact: 'Contact us', contactShort: 'Contact', startProject: 'Start your project' },
  hero: {
    eyebrow: 'Buildary — Digital product studio',
    h1a: 'We build apps',
    h1b: '& webs that',
    h1c: 'work.',
    phrases: [
      { prefix: 'Web', suffix: 'developer.' },
      { prefix: 'Web', suffix: 'builder.' },
      { prefix: 'App', suffix: 'builder.' },
      { prefix: 'Web app', suffix: 'developer.' },
    ],
    sub: 'Buildary turns your idea into a finished product — professional websites, custom web apps, dashboards, internal tools and e-commerce. We design, build and deploy it for you, end-to-end, so you get something fast, reliable and actually used.',
    cta: 'Start your project',
    viewWork: 'View Work',
    getInTouch: 'Get in touch →',
  },
  services: {
    eyebrow: '001 / What we build',
    h2a: 'From your idea to',
    h2b: 'launched product.',
    items: [
      { num: '01', title: 'Professional websites', desc: 'Modern, fast company websites and landing pages — designed and built to make a strong first impression.' },
      { num: '02', title: 'Web applications', desc: 'Custom, full-stack web apps built around your exact workflow — fast, secure and ready to scale.' },
      { num: '03', title: 'Dashboards & internal tools', desc: 'Admin panels, reporting and team tools that replace messy spreadsheets and manual work.' },
      { num: '04', title: 'Mobile / PWA', desc: 'Installable, mobile-first apps that feel native and work great on any device.' },
      { num: '05', title: 'E-commerce & booking', desc: 'Online stores, reservations and payments wired up end-to-end and ready to sell.' },
    ],
  },
  projects: {
    eyebrow: '002 / Projects',
    tagline: 'Building things that work',
    h2a: 'Selected',
    h2b: 'work.',
    openDemo: 'Open live demo',
    demoCaption: 'Interactive demo — click around to explore. Sample data only; real client data is kept private.',
    items: [
      { id: '01', name: 'Rental Property Manager', category: 'Full-Stack Web App', status: 'Live', preview: 'rental', tech: ['Next.js 14', 'PostgreSQL', 'Tailwind CSS', 'PWA', 'REST API'], description: 'A comprehensive management platform for short-term rental properties. Built for a private client — handles reservations, guest communication, cleaning schedules, invoicing, and reporting across multiple properties.' },
      { id: '02', name: 'Enterprise Admin Platform', category: 'Internal Business Tool', status: 'Live', preview: 'hub', tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Cloud Deploy'], description: 'An internal web application built for a technology company. Covers task management, order tracking, team communication, market data dashboards, and role-based access control for multiple user levels.' },
    ],
  },
  process: {
    eyebrow: '/ How it works',
    h2a: 'Simple',
    h2b: 'process.',
    steps: [
      { num: '01', title: 'Tell us what you need', desc: 'Fill in the project brief — what you want to build, what features matter, and how to reach you. No tech knowledge needed.' },
      { num: '02', title: 'We agree on a plan', desc: "We'll come back with a clear plan and timeline. You decide if you want to move forward — no commitment at this stage." },
      { num: '03', title: 'We build and launch', desc: "We build your product, keep you updated along the way, and deploy it when it's ready. You get something real that works." },
    ],
  },
  testimonials: {
    eyebrow: '/ What clients say',
    h2a: 'Trusted by',
    h2b: 'real clients.',
    items: [
      { quote: 'Jakub delivered exactly what we needed — fast, clean, and without any back-and-forth. The app has been running without issues since day one.', name: 'Private client', role: 'Property management' },
      { quote: 'We needed an internal tool that our whole team could use. Buildary built it in weeks, and it replaced three separate spreadsheets we were struggling with.', name: 'Private client', role: 'Technology company' },
      { quote: 'Great communication throughout the project. They understood what we wanted and turned it into something better than we imagined.', name: 'Private client', role: 'E-commerce' },
    ],
  },
  about: {
    eyebrow: '003 / About us',
    h2a: 'Who we',
    h2b: 'are.',
    p: [
      'Buildary is a software studio from the Czech Republic. We design and build websites, web and mobile applications for businesses that want software which actually works.',
      'We handle the whole product end-to-end — from database and API design to a polished interface and deployment. Our work is built around the modern Next.js and React ecosystem.',
      "Whether it's a professional website, a custom web app, an internal tool or an online store, we turn the idea into a reliable product your team and customers use every day.",
    ],
  },
  skills: {
    eyebrow: '004 / Skills',
    h2a: 'Tech we',
    h2b: 'work with.',
    intro: 'Our stack is built around the modern JavaScript ecosystem — proven, battle-tested tools that let us ship fast and build products that scale. Next.js and React are at the core of everything we make.',
    core: 'Core stack',
    groups: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'] },
      { label: 'Backend & data', items: ['Node.js', 'PostgreSQL', 'REST API', 'Firebase'] },
      { label: 'Tooling & delivery', items: ['Git', 'Vercel', 'Cloud Deploy', 'PWA'] },
    ],
  },
  contact: {
    eyebrow: '005 / Contact us',
    h2a: "Let's work",
    h2b: 'together.',
    sub: "Tell us what you'd like to build and we'll get back to you with a plan. No commitment — just a starting point.",
  },
  contactForm: {
    name: 'Your name',
    email: 'Your email',
    message: "Tell us what you'd like to build…",
    send: 'Send message',
    sending: 'Sending…',
    success: "Thanks! Your message is on its way — we'll get back to you soon.",
    error: 'Something went wrong. Please try again.',
    consent: 'By sending, you agree we can use your details to get back to you about your request.',
  },
  build: {
    back: 'Back',
    eyebrow: 'Start your project',
    h1a: "Let's build",
    h1b: 'your app.',
    intro: "Pick what you need and we'll send you back a tailored plan. No commitment — just a starting point.",
    step1: '01 — What are you building?',
    types: [
      { id: 'website', label: 'Business Website', desc: 'A site for your company' },
      { id: 'web', label: 'Web App', desc: 'A custom web application' },
      { id: 'ecommerce', label: 'E-commerce', desc: 'Online store & payments' },
      { id: 'internal', label: 'Internal Tool', desc: 'Dashboard for your team' },
      { id: 'pwa', label: 'Mobile / PWA', desc: 'Installable, mobile-first' },
      { id: 'other', label: 'Something else', desc: 'Tell us what you need' },
    ],
    otherPlaceholder: "Describe what you'd like to build…",
    step2: '02 — Which features do you need?',
    features: ['User accounts & login', 'Payments / subscriptions', 'Admin dashboard', 'Notifications', 'Multi-language', 'Analytics & reporting', 'API integration', 'File uploads', 'Booking / reservations', 'Real-time updates'],
    addPlaceholder: 'Add something else…',
    add: 'Add',
    step3: '03 — How can we reach you?',
    emailPlaceholder: 'Your email',
    phonePlaceholder: 'Your phone (optional)',
    callTitle: "Let's configure it together",
    callDesc: "Prefer a call? We'll reach out and plan it step by step.",
    summary: 'Your configuration',
    typeField: 'Type',
    featuresField: 'Features',
    contactField: 'Contact',
    prefersCall: ' · prefers a call',
    sent: "Request sent — we'll get back to you soon. Thanks!",
    send: 'Send my request',
    sending: 'Sending…',
    needInfo: "Pick what you're building and leave an email or phone so we can get back to you.",
    error: 'Something went wrong sending your request. Please try again.',
    consent: 'By sending, you agree we can use your details to get back to you about your request.',
  },
};

const cs = {
  nav: { projects: 'Projekty', about: 'O nás', skills: 'Technologie', build: 'Sestavit', contact: 'Napište nám', contactShort: 'Kontakt', startProject: 'Začít projekt' },
  hero: {
    eyebrow: 'Buildary — Digitální produktové studio',
    h1a: 'Stavíme aplikace',
    h1b: 'a weby, které',
    h1c: 'fungují.',
    phrases: [
      { prefix: 'Tvoříme', suffix: 'weby.' },
      { prefix: 'Tvoříme', suffix: 'aplikace.' },
      { prefix: 'Tvoříme', suffix: 'e-shopy.' },
      { prefix: 'Tvoříme', suffix: 'nástroje.' },
    ],
    sub: 'Buildary promění váš nápad v hotový produkt — profesionální weby, webové aplikace na míru, dashboardy, interní nástroje i e-shopy. Navrhneme, postavíme a nasadíme to za vás, od začátku do konce, takže dostanete něco rychlého, spolehlivého a opravdu používaného.',
    cta: 'Začít projekt',
    viewWork: 'Naše práce',
    getInTouch: 'Napsat nám →',
  },
  services: {
    eyebrow: '001 / Co stavíme',
    h2a: 'Z vašeho nápadu',
    h2b: 'hotový produkt.',
    items: [
      { num: '01', title: 'Profesionální weby', desc: 'Moderní a rychlé firemní weby a landing pages — navržené a postavené tak, aby udělaly skvělý první dojem.' },
      { num: '02', title: 'Webové aplikace', desc: 'Full-stack webové aplikace na míru, postavené přesně kolem vašeho procesu — rychlé, bezpečné a připravené růst.' },
      { num: '03', title: 'Dashboardy & interní nástroje', desc: 'Administrace, reporty a týmové nástroje, které nahradí nepřehledné tabulky a ruční práci.' },
      { num: '04', title: 'Mobil / PWA', desc: 'Instalovatelné, mobile-first aplikace, které působí nativně a fungují skvěle na jakémkoli zařízení.' },
      { num: '05', title: 'E-commerce & rezervace', desc: 'Online obchody, rezervace a platby propojené od A do Z a připravené prodávat.' },
    ],
  },
  projects: {
    eyebrow: '002 / Projekty',
    tagline: 'Děláme věci, co fungují',
    h2a: 'Vybraná',
    h2b: 'práce.',
    openDemo: 'Spustit živé demo',
    demoCaption: 'Interaktivní demo — klidně si ho proklikejte. Jen ukázková data; reálná klientská data zůstávají soukromá.',
    items: [
      { id: '01', name: 'Správa pronájmů', category: 'Full-Stack webová aplikace', status: 'Běží', preview: 'rental', tech: ['Next.js 14', 'PostgreSQL', 'Tailwind CSS', 'PWA', 'REST API'], description: 'Komplexní platforma pro správu krátkodobých pronájmů. Vytvořeno pro soukromého klienta — řeší rezervace, komunikaci s hosty, úklidové harmonogramy, fakturaci a reporting napříč více nemovitostmi.' },
      { id: '02', name: 'Firemní admin platforma', category: 'Interní firemní nástroj', status: 'Běží', preview: 'hub', tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Cloud Deploy'], description: 'Interní webová aplikace pro technologickou firmu. Pokrývá správu úkolů, sledování objednávek, týmovou komunikaci, dashboardy s tržními daty a řízení přístupů podle rolí pro více úrovní uživatelů.' },
    ],
  },
  process: {
    eyebrow: '/ Jak to funguje',
    h2a: 'Jednoduchý',
    h2b: 'proces.',
    steps: [
      { num: '01', title: 'Řeknete nám, co potřebujete', desc: 'Vyplníte zadání projektu — co chcete postavit, na jakých funkcích záleží a jak vás kontaktovat. Žádné technické znalosti netřeba.' },
      { num: '02', title: 'Domluvíme se na plánu', desc: 'Vrátíme se k vám s jasným plánem a termínem. Vy se rozhodnete, jestli do toho jdeme — v této fázi bez závazků.' },
      { num: '03', title: 'Postavíme a spustíme', desc: 'Postavíme váš produkt, průběžně vás informujeme a nasadíme ho, jakmile je hotový. Dostanete něco reálného, co funguje.' },
    ],
  },
  testimonials: {
    eyebrow: '/ Co říkají klienti',
    h2a: 'Důvěřují nám',
    h2b: 'reální klienti.',
    items: [
      { quote: 'Jakub dodal přesně to, co jsme potřebovali — rychle, čistě a bez zbytečného dohadování. Aplikace běží bez problémů od prvního dne.', name: 'Soukromý klient', role: 'Správa nemovitostí' },
      { quote: 'Potřebovali jsme interní nástroj pro celý tým. Buildary ho postavil během pár týdnů a nahradil tři oddělené tabulky, se kterými jsme se trápili.', name: 'Soukromý klient', role: 'Technologická firma' },
      { quote: 'Skvělá komunikace po celou dobu projektu. Pochopili, co jsme chtěli, a udělali z toho něco lepšího, než jsme si představovali.', name: 'Soukromý klient', role: 'E-commerce' },
    ],
  },
  about: {
    eyebrow: '003 / O nás',
    h2a: 'Kdo',
    h2b: 'jsme.',
    p: [
      'Buildary je softwarové studio z České republiky. Navrhujeme a stavíme weby, webové a mobilní aplikace pro firmy, které chtějí software, který opravdu funguje.',
      'Postaráme se o celý produkt od začátku do konce — od návrhu databáze a API po vyladěné rozhraní a nasazení. Pracujeme s moderním ekosystémem Next.js a React.',
      'Ať jde o profesionální web, webovou aplikaci na míru, interní nástroj nebo e-shop, proměníme nápad ve spolehlivý produkt, který váš tým i zákazníci používají každý den.',
    ],
  },
  skills: {
    eyebrow: '004 / Technologie',
    h2a: 'S čím',
    h2b: 'pracujeme.',
    intro: 'Náš stack stojí na moderním JavaScript ekosystému — ověřené, prověřené nástroje, které nám umožňují dodávat rychle a stavět produkty, které škálují. Next.js a React jsou jádrem všeho, co děláme.',
    core: 'Hlavní stack',
    groups: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'] },
      { label: 'Backend & data', items: ['Node.js', 'PostgreSQL', 'REST API', 'Firebase'] },
      { label: 'Nástroje & nasazení', items: ['Git', 'Vercel', 'Cloud Deploy', 'PWA'] },
    ],
  },
  contact: {
    eyebrow: '005 / Kontakt',
    h2a: 'Pojďme do toho',
    h2b: 'spolu.',
    sub: 'Napište nám, co byste chtěli postavit, a ozveme se vám s plánem. Žádný závazek — jen první krok.',
  },
  contactForm: {
    name: 'Vaše jméno',
    email: 'Váš e-mail',
    message: 'Napište, co byste chtěli postavit…',
    send: 'Odeslat zprávu',
    sending: 'Odesílám…',
    success: 'Díky! Vaše zpráva je na cestě — brzy se vám ozveme.',
    error: 'Něco se pokazilo. Zkuste to prosím znovu.',
    consent: 'Odesláním souhlasíte, že vaše údaje můžeme použít, abychom se vám ozvali ohledně vaší poptávky.',
  },
  build: {
    back: 'Zpět',
    eyebrow: 'Začít projekt',
    h1a: 'Pojďme postavit',
    h1b: 'vaši aplikaci.',
    intro: 'Vyberte, co potřebujete, a ozveme se vám s plánem na míru. Žádný závazek — jen první krok.',
    step1: '01 — Co stavíte?',
    types: [
      { id: 'website', label: 'Firemní web', desc: 'Web pro vaši firmu' },
      { id: 'web', label: 'Webová aplikace', desc: 'Webová aplikace na míru' },
      { id: 'ecommerce', label: 'E-shop', desc: 'Online obchod & platby' },
      { id: 'internal', label: 'Interní nástroj', desc: 'Dashboard pro váš tým' },
      { id: 'pwa', label: 'Mobil / PWA', desc: 'Instalovatelná, mobile-first' },
      { id: 'other', label: 'Něco jiného', desc: 'Řekněte nám, co potřebujete' },
    ],
    otherPlaceholder: 'Popište, co byste chtěli postavit…',
    step2: '02 — Jaké funkce potřebujete?',
    features: ['Uživatelské účty & přihlášení', 'Platby / předplatné', 'Admin dashboard', 'Notifikace', 'Vícejazyčnost', 'Analytika & reporty', 'Napojení na API', 'Nahrávání souborů', 'Rezervace', 'Real-time aktualizace'],
    addPlaceholder: 'Přidat něco dalšího…',
    add: 'Přidat',
    step3: '03 — Jak vás kontaktovat?',
    emailPlaceholder: 'Váš e-mail',
    phonePlaceholder: 'Váš telefon (nepovinné)',
    callTitle: 'Nakonfigurujeme to spolu',
    callDesc: 'Radši telefonicky? Ozveme se a naplánujeme to krok za krokem.',
    summary: 'Vaše konfigurace',
    typeField: 'Typ',
    featuresField: 'Funkce',
    contactField: 'Kontakt',
    prefersCall: ' · preferuje hovor',
    sent: 'Poptávka odeslána — brzy se vám ozveme. Díky!',
    send: 'Odeslat poptávku',
    sending: 'Odesílám…',
    needInfo: 'Vyberte, co stavíte, a nechte e-mail nebo telefon, ať se vám můžeme ozvat.',
    error: 'Při odesílání se něco pokazilo. Zkuste to prosím znovu.',
    consent: 'Odesláním souhlasíte, že vaše údaje můžeme použít, abychom se vám ozvali ohledně vaší poptávky.',
  },
};

const translations = { en, cs };
const LangContext = createContext({ lang: 'en', setLang: () => {}, t: en });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    let initial = 'en';
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'cs' || saved === 'en') initial = saved;
      else if (navigator.language && navigator.language.toLowerCase().startsWith('cs')) initial = 'cs';
    } catch {}
    setLang(initial);
  }, []);

  const change = l => {
    setLang(l);
    try {
      localStorage.setItem('lang', l);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang: change, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
