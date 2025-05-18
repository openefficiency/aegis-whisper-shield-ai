
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: "01",
    title: "Begin your confidential report",
    description: "Access our secure platform and start your report with complete anonymity. No personal details required unless you choose to share them."
  },
  {
    number: "02",
    title: "Interact with our empathetic AI",
    description: "Our AI assistant guides you through the reporting process, asking relevant questions without judgment to gather comprehensive information."
  },
  {
    number: "03",
    title: "Review and submit",
    description: "Review your report before submission. Once confirmed, it's securely encrypted and blockchain-anchored for immutable record-keeping."
  },
  {
    number: "04", 
    title: "Secure investigation process",
    description: "Qualified investigators review your report while maintaining your anonymity. Follow up securely through our platform."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-aegis-blue mb-4">How AegisWhistle Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes reporting fraud, waste, and abuse simple, secure, and effective
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl font-montserrat font-bold text-aegis-accent/20 mb-4">{step.number}</div>
              <h3 className="font-montserrat text-xl font-bold text-aegis-blue mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-full h-1 border-t-2 border-dashed border-aegis-accent/30"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-aegis-accent hover:bg-aegis-blue text-white font-bold text-base">
            <a href="https://secure-whisper-reports.lovable.app/ai-assistant">Start Your Secure Report</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
