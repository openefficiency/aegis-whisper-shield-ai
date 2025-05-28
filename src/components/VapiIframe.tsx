
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

const VapiIframe = () => {
  const [isActive, setIsActive] = useState(false);
  
  const vapiAgentId = "bb8029bb-dde6-485a-9c32-d41b684568ff";
  const vapiUrl = `https://vapi.ai/embed/${vapiAgentId}`;

  const toggleAgent = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-aegis-accent/20 hover:border-aegis-accent/40 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center">
            <Mic className="h-6 w-6 text-aegis-accent" />
            Aegis Voice Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-6">
              Speak confidentially with our empathetic AI agent. Your voice is never recorded - only transcribed and summarized for investigation.
            </p>
            
            <Button
              onClick={toggleAgent}
              size="lg"
              className={`w-full ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-aegis-accent hover:bg-aegis-blue text-white'
              }`}
            >
              {isActive ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  End Conversation
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
                  height="400"
                  frameBorder="0"
                  allow="microphone"
                  className="rounded-lg border border-gray-300"
                  title="Aegis Voice Agent"
                />
              </div>
            )}

            {!isActive && (
              <div className="text-sm text-gray-500 mt-4">
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
