
import VapiIframe from './VapiIframe';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-aegis-blue to-aegis-teal text-white">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-6 leading-tight">
            The next Enron is brewing.<br />Will you shield it—or expose it?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Secure, empathetic AI for reporting fraud, waste, and abuse with blockchain verification and rewards.
          </p>
        </div>
        
        {/* VAPI Agent Section */}
        <div className="max-w-4xl mx-auto">
          <VapiIframe />
          
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              size="sm"
              className="border-white text-white hover:bg-white/10 text-sm"
            >
              Write Report Instead
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
