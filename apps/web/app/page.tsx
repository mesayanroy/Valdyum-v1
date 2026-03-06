import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { EcosystemSection } from '../components/sections/EcosystemSection';
import { CtaBanner } from '../components/sections/CtaBanner';
import { ScrollOrchestrator } from '../components/ScrollOrchestrator';

export default function Home() {
  return (
    <main className="w-full">
      <ScrollOrchestrator />
      <HeroSection />
      <HowItWorksSection />
      <EcosystemSection />
      <CtaBanner />
    </main>
  );
}
