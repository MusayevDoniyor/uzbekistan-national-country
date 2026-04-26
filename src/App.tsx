import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import NationalitySection from './components/NationalitySection';
import ParticipantsSection from './components/ParticipantsSection';
import AiHelperSection from './components/AiHelperSection';
import FinalSection from './components/FinalSection';
import { nationalities } from './data';

export default function App() {
  return (
    <main className="bg-[#F8F5F2]">
      <HeroSection />
      <IntroSection />
      {nationalities.map((item, index) => (
        <NationalitySection key={item.id} data={item} index={index} />
      ))}
      <ParticipantsSection />
      <AiHelperSection />
      <FinalSection />
    </main>
  );
}
