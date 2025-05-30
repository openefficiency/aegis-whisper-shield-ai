
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const scrollToVapiAgent = () => {
    const heroSection = document.querySelector('.bg-gradient-to-b');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSupportPilot = () => {
    window.open('https://openefficiency.org', '_blank');
  };

  return (
    <section className="py-20 bg-aegis-blue text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-6">
          Ready to strengthen your organization's integrity?
        </h2>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
          Join forward-thinking organizations using AegisWhistle to create a culture of accountability and trust.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={scrollToVapiAgent}
            size="lg" 
            className="bg-white text-aegis-blue hover:bg-gray-100 font-bold text-base"
          >
            Begin Your Report <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            onClick={handleSupportPilot}
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10 font-bold text-base"
          >
            Support Our Pilot
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
