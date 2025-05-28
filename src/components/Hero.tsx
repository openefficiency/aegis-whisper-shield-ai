
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const startVapiCall = () => {
    if (window.vapi) {
      window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
    }
  };

  return (
    <div className="bg-gradient-to-b from-aegis-blue to-aegis-teal text-white">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-6 leading-tight">
            The next Enron is brewing.<br />Will you shield it—or expose it?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Secure, empathetic AI for reporting fraud, waste, and abuse with blockchain verification and rewards.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={startVapiCall}
              size="lg" 
              className="bg-white text-aegis-blue hover:bg-gray-100 font-bold text-base"
            >
              Begin Your Report <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={startVapiCall}
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 font-bold text-base"
            >
              See Example Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
