'use client';
import { LangProvider } from '../i18n';
import { Navbar, Footer, About, Process, Skills, Testimonials } from '../page';

export default function StudioPage() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pt-20">
        <About />
        <Process />
        <Skills />
        <Testimonials />
      </main>
      <Footer />
    </LangProvider>
  );
}
