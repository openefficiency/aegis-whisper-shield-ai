
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
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
            <Button asChild size="lg" className="bg-white text-aegis-blue hover:bg-gray-100 font-bold text-base">
              <a href="https://secure-whisper-reports.lovable.app/ai-assistant" className="flex items-center">
                Begin Your Report <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold text-base">
              <a href="https://secure-whisper-reports.lovable.app/ai-assistant">See Example Report</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <p className="text-aegis-blue font-medium text-lg">Trusted by organizations worldwide</p>
            <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Company logo" className="h-8 w-auto grayscale opacity-50" />
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" alt="Company logo" className="h-8 w-auto grayscale opacity-50" />
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Company logo" className="h-8 w-auto grayscale opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
