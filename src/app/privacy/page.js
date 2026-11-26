'use client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ParticleBackground } from '../shared';
import { LangProvider, useLang } from '../i18n';

const CONTACT = 'jakubknotte17@gmail.com';

const content = {
  en: {
    back: 'Back',
    title: 'Privacy Policy',
    updated: 'Last updated: 26 November 2026',
    sections: [
      {
        h: 'Who we are',
        p: [
          `This website (buildary.cz), operating under the name Buildary, is run by Jakub Knotte ("we"). We are the controller of the personal data processed through this site. For anything related to your privacy, contact us at ${CONTACT}.`,
        ],
      },
      {
        h: 'What data we collect',
        p: [
          'When you use the contact form, we collect the information you choose to enter: your name, e-mail address, phone number (optional) and the message or project details you send us.',
          'We also process basic, aggregated and anonymous visit statistics (see Cookies & analytics below). We do not knowingly collect any special categories of data.',
        ],
      },
      {
        h: 'Why we process it and on what legal basis',
        p: [
          'We use your data solely to respond to your enquiry and to take the steps you ask for toward a possible cooperation. We do not sell your data or use it for advertising.',
          'The legal basis is your consent (given by submitting the form), our legitimate interest in replying to you, and taking steps at your request prior to entering a contract — Art. 6(1)(a), (b) and (f) of the GDPR.',
        ],
      },
      {
        h: 'Who has access (processors)',
        p: ['To run the form and the website, we use trusted service providers who process data on our behalf:'],
        list: [
          'Google (Firebase / Firestore) — securely stores the requests submitted through the form.',
          'EmailJS — delivers the notification e-mail of your request to us.',
          'Vercel — website hosting and cookieless visit analytics.',
        ],
        after: [
          'Some of these providers may process data outside the EU (e.g. in the USA). Such transfers are covered by appropriate safeguards, such as the EU Standard Contractual Clauses or adequacy decisions.',
        ],
      },
      {
        h: 'How long we keep it',
        p: [
          'We keep your message only for as long as necessary to handle it and our related communication, and then delete it — at the latest within 24 months — or sooner if you ask us to.',
        ],
      },
      {
        h: 'Cookies & analytics',
        p: [
          'This site does not use advertising or tracking cookies. We use Vercel Web Analytics, which measures visits without cookies and without identifying individual visitors, so no cookie-consent banner is required.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'Under the GDPR you have the right to access your data, to rectification, erasure ("right to be forgotten"), restriction of processing, objection, data portability, and to withdraw your consent at any time.',
          `To exercise any of these rights, write to ${CONTACT}. You also have the right to lodge a complaint with the supervisory authority — in the Czech Republic the Office for Personal Data Protection (Úřad pro ochranu osobních údajů, www.uoou.cz).`,
        ],
      },
      {
        h: 'Changes to this policy',
        p: ['We may update this policy from time to time. The current version is always available on this page.'],
      },
    ],
  },
  cs: {
    back: 'Zpět',
    title: 'Zásady ochrany osobních údajů',
    updated: 'Poslední aktualizace: 26. listopadu 2026',
    sections: [
      {
        h: 'Kdo jsme',
        p: [
          `Tento web (buildary.cz), provozovaný pod názvem Buildary, provozuje Jakub Knotte („my"). Jsme správcem osobních údajů zpracovávaných prostřednictvím tohoto webu. V čemkoli ohledně ochrany soukromí nás kontaktujte na ${CONTACT}.`,
        ],
      },
      {
        h: 'Jaké údaje sbíráme',
        p: [
          'Když použijete kontaktní formulář, sbíráme údaje, které do něj zadáte: vaše jméno, e-mailovou adresu, telefon (nepovinné) a zprávu nebo detaily projektu, které nám pošlete.',
          'Dále zpracováváme základní, souhrnné a anonymní statistiky návštěvnosti (viz Cookies a analytika níže). Vědomě nezpracováváme žádné zvláštní kategorie údajů.',
        ],
      },
      {
        h: 'Proč údaje zpracováváme a na jakém právním základě',
        p: [
          'Vaše údaje používáme výhradně k tomu, abychom reagovali na vaši poptávku a podnikli kroky, o které nás požádáte, směrem k případné spolupráci. Údaje neprodáváme ani nepoužíváme k reklamě.',
          'Právním základem je váš souhlas (udělený odesláním formuláře), náš oprávněný zájem vám odpovědět a provedení kroků na vaši žádost před uzavřením smlouvy — čl. 6 odst. 1 písm. a), b) a f) GDPR.',
        ],
      },
      {
        h: 'Kdo má přístup (zpracovatelé)',
        p: ['Pro provoz formuláře a webu využíváme důvěryhodné poskytovatele, kteří údaje zpracovávají naším jménem:'],
        list: [
          'Google (Firebase / Firestore) — bezpečně ukládá poptávky odeslané formulářem.',
          'EmailJS — doručuje nám e-mailové upozornění o vaší poptávce.',
          'Vercel — hosting webu a analytika návštěvnosti bez cookies.',
        ],
        after: [
          'Někteří z těchto poskytovatelů mohou údaje zpracovávat mimo EU (např. v USA). Takové předání je kryto vhodnými zárukami, jako jsou standardní smluvní doložky EU nebo rozhodnutí o odpovídající ochraně.',
        ],
      },
      {
        h: 'Jak dlouho údaje uchováváme',
        p: [
          'Vaši zprávu uchováváme jen po dobu nezbytně nutnou k jejímu vyřízení a související komunikaci a poté ji smažeme — nejpozději do 24 měsíců — nebo dříve, pokud o to požádáte.',
        ],
      },
      {
        h: 'Cookies a analytika',
        p: [
          'Tento web nepoužívá reklamní ani sledovací cookies. Používáme Vercel Web Analytics, která měří návštěvnost bez cookies a bez identifikace jednotlivých návštěvníků, takže není potřeba cookie lišta se souhlasem.',
        ],
      },
      {
        h: 'Vaše práva',
        p: [
          'Podle GDPR máte právo na přístup ke svým údajům, na opravu, výmaz („právo být zapomenut"), omezení zpracování, vznesení námitky, přenositelnost údajů a kdykoli odvolat svůj souhlas.',
          `Pro uplatnění kteréhokoli z těchto práv nám napište na ${CONTACT}. Máte také právo podat stížnost u dozorového úřadu — v České republice je to Úřad pro ochranu osobních údajů (www.uoou.cz).`,
        ],
      },
      {
        h: 'Změny těchto zásad',
        p: ['Tyto zásady můžeme čas od času aktualizovat. Aktuální verze je vždy dostupná na této stránce.'],
      },
    ],
  },
};

function PrivacyInner() {
  const { lang, setLang } = useLang();
  const c = content[lang] || content.en;

  return (
    <>
      <main className="relative z-10 min-h-screen px-8 md:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[rgba(234,240,251,0.5)] hover:text-[#EAF0FB] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {c.back}
            </motion.a>
            <div className="flex items-center gap-0.5 border border-[rgba(234,240,251,0.14)] rounded-full p-0.5">
              {['cs', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-label={l === 'cs' ? 'Čeština' : 'English'}
                  className={`px-2.5 py-1 rounded-full text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 ${
                    lang === l ? 'bg-[#4DA3FF] text-white' : 'text-[rgba(234,240,251,0.5)] hover:text-[#EAF0FB]'
                  }`}
                >
                  {l === 'cs' ? 'CZ' : 'EN'}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl md:text-5xl font-light mb-3">{c.title}</h1>
            <p className="text-xs tracking-[0.1em] uppercase text-[rgba(234,240,251,0.4)] mb-14">
              {c.updated}
            </p>

            <div className="space-y-12">
              {c.sections.map((s, i) => (
                <section key={i}>
                  <h2 className="text-lg md:text-xl font-light text-white mb-4">{s.h}</h2>
                  <div className="space-y-4 text-[rgba(234,240,251,0.62)] font-light leading-relaxed text-sm md:text-base">
                    {s.p.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                    {s.list && (
                      <ul className="space-y-2 pl-1">
                        {s.list.map((item, k) => (
                          <li key={k} className="flex gap-3">
                            <span className="text-[#4DA3FF] mt-0.5 shrink-0">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.after && s.after.map((para, j) => <p key={`a${j}`}>{para}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default function PrivacyPage() {
  return (
    <LangProvider>
      <PrivacyInner />
    </LangProvider>
  );
}
