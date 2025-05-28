
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import SilenceCosts from '@/components/SilenceCosts';
import UnsilencedVoice from '@/components/UnsilencedVoice';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SilenceCosts />
      <UnsilencedVoice />
      <Benefits />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
