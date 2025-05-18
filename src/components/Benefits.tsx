
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefitsList = [
  "Increase detection of fraud, waste, and abuse by up to 40%",
  "Reduce investigation time through AI-assisted report processing",
  "Protect whistleblowers with state-of-the-art anonymity protection",
  "Build trust through blockchain-verified immutable records",
  "Ensure fair rewards for valuable whistleblower contributions",
  "Mitigate organizational risk through early detection of issues"
];

const Benefits = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-aegis-blue mb-6">
              Transform Your Organization's Integrity Culture
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              AegisWhistle provides a secure channel for reports while strengthening your organization's ethical foundation and protecting against financial and reputational damage.
            </p>
            
            <div className="space-y-4 mb-10">
              {benefitsList.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-aegis-accent mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-aegis-accent hover:bg-aegis-blue text-white font-bold text-base">
              <a href="https://secure-whisper-reports.lovable.app/ai-assistant">Support Our Pilot</a>
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
              alt="Team discussion about corporate integrity" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
