import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';

import { FaqSection } from '../components/sections/FaqSection';
import { CtaBanner } from '../components/sections/CtaBanner';
import { FoundersSection } from '../components/sections/FoundersSection';
import { ScrollOrchestrator } from '../components/ScrollOrchestrator';

export default function Home() {
  return (
    <main className="w-full">
      <ScrollOrchestrator />
      <HeroSection />
      <HowItWorksSection />
      <FaqSection />

      <CtaBanner />
      <FoundersSection />
    </main>
  );
}
