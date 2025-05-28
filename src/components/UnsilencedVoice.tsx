
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UnsilencedVoice = () => {
  const startVapiCall = () => {
    if (window.vapi) {
      window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
    }
  };

  return (
    <section id="unsilenced-voice" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Your Voice. Unsilenced</h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-center mb-12">
            AegisWhistle combines:
          </p>
          
          <div className="space-y-8">
            <Card className="border-l-4 border-l-aegis-accent">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Military-grade anonymity</h3>
                <p className="text-gray-700">
                  Built on Tor networks and zero-knowledge proofs, ensuring your identity remains completely protected.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-aegis-accent">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">AI-driven case triage</h3>
                <p className="text-gray-700">
                  Our AI system achieves 94% fraud detection accuracy, ensuring legitimate cases are prioritized and addressed quickly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-aegis-accent">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Blockchain-sealed evidence</h3>
                <p className="text-gray-700">
                  All reports are secured with tamper-proof Hyperledger and IPFS technology, ensuring evidence cannot be altered or destroyed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-aegis-accent">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Untraceable crypto rewards</h3>
                <p className="text-gray-700">
                  Secure cryptocurrency payouts available post-investigation, allowing whistleblowers to be compensated without compromising their identity.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={startVapiCall}
              className="bg-aegis-accent hover:bg-aegis-blue text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Start Your Secure Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnsilencedVoice;
