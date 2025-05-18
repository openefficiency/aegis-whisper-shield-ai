
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SilenceCosts from "@/components/SilenceCosts";
import UnsilencedVoice from "@/components/UnsilencedVoice";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <SilenceCosts />
        <UnsilencedVoice />
        <Testimonials />
        <Benefits />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
