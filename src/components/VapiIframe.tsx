
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

const VapiIframe = () => {
  const [isActive, setIsActive] = useState(false);
  
  const vapiAgentId = "bb8029bb-dde6-485a-9c32-d41b684568ff";
  const vapiPublicKey = "4669de51-f9ba-4e99-a9dd-e39279a6f510";
  const vapiUrl = `https://vapi.ai/embed/${vapiAgentId}?publicKey=${vapiPublicKey}`;

  const toggleAgent = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-2 border-white/20 hover:border-white/40 transition-colors bg-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center text-white">
            <Mic className="h-6 w-6 text-white" />
            Speak Up. Stay Safe.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-white/90 mb-6">
              Share your concerns confidentially with our empathetic AI agent. Your voice is never recorded - only transcribed and summarized for investigation.
            </p>
            
            <Button
              onClick={toggleAgent}
              size="lg"
              className={`w-full ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-white text-aegis-blue hover:bg-gray-100'
              }`}
            >
              {isActive ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  End Voice Report
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  Start Voice Report
                </>
              )}
            </Button>

            {isActive && (
              <div className="mt-6">
                <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 font-medium">
                    🎤 Voice agent is active. Speak naturally about your concerns.
                  </p>
                </div>
                
                <iframe
                  src={vapiUrl}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  allow="microphone"
                  className="rounded-lg border border-gray-300"
                  title="Aegis Voice Agent"
                />
              </div>
            )}

            {!isActive && (
              <div className="text-sm text-white/70 mt-4">
                Click "Start Voice Report" to begin your confidential conversation
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VapiIframe;
