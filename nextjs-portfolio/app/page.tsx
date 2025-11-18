import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Dissertations from '@/components/Dissertations';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Services />
      <Skills />
      <Portfolio />
      <Dissertations />
      <Certifications />
      <Contact />
    </main>
  );
}
