import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// --- COMPONENTS ---
import SectionPreview from '../components/SectionPreview';
import Hero from '../sections/Hero';
import FoundryPulse from '../sections/FoundryPulse';
import ValueProposition from '../sections/ValueProposition';
import EnterFoundry from '../sections/EnterFoundry';
import StarterKit from '../sections/StarterKit';
import Crucible from '../sections/Crucible';

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Hero />
      
      {/* Wrapper for content */}
      <div className="content-grid-bg">
        
      

        <FoundryPulse />
        <ValueProposition />
        
        <SectionPreview
          subtitle="Our Services"
          title="The Forge"
          description="From robust SaaS platforms to data-driven marketing strategies, we offer a complete suite of digital services built by the next generation of talent."
          imageUrl="https://placehold.co/800x600/0A0A0A/EAEAEA?text=Services"
          linkTo="/forge"
        />
        
        <SectionPreview
          subtitle="Our Work"
          title="The Showroom"
          description="We don't just talk about quality, we deliver it. Explore our gallery of finished projects and see the impact of our student-led teams."
          imageUrl="https://placehold.co/800x600/0A0A0A/EAEAEA?text=Portfolio"
          linkTo="/showroom"
          reverse={true}
        />
        
        <EnterFoundry />
        <StarterKit />
        <Crucible />
        
      </div>
    </>
  );
}