
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SilenceCosts = () => {
  const startVapiCall = () => {
    if (typeof window !== 'undefined' && window.vapi) {
      window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
    }
  };

  return (
    <section id="silence-costs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Silence Costs Trillions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white border-aegis-accent border-t-4 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-aegis-blue">72% face retaliation</h3>
              <p className="text-gray-700 mb-2">
                Nearly three-quarters of whistleblowers experience some form of retaliation after reporting misconduct.
              </p>
              <p className="text-sm text-gray-500 italic">(Deloitte, 2023)</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-aegis-accent border-t-4 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-aegis-blue">63% fraud exposed by tips</h3>
              <p className="text-gray-700 mb-2">
                The majority of fraud is uncovered through whistleblower tips, but most misconduct goes unreported due to fear.
              </p>
              <p className="text-sm text-gray-500 italic">(ACFE)</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-aegis-accent border-t-4 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-aegis-blue">Legacy systems fail</h3>
              <p className="text-gray-700 mb-2">
                Traditional reporting channels leak identities, delay investigations, and ultimately let fraudsters win.
              </p>
              <p className="text-sm text-gray-500 italic">Leak identities, delay justice, let fraudsters win</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6">
            The next Enron is brewing. Will you shield it—or expose it?
          </p>
          <Button 
            onClick={startVapiCall}
            className="bg-aegis-accent hover:bg-aegis-blue text-white font-medium px-8 py-3 rounded-md transition-colors"
          >
            Begin Your Report →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SilenceCosts;
