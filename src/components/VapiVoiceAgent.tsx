
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, FileText } from 'lucide-react';

const VapiVoiceAgent = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const startVapiCall = () => {
    if (window.vapi) {
      window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
      setIsCallActive(true);
    }
  };

  const endVapiCall = () => {
    if (window.vapi) {
      window.vapi.stop();
      setIsCallActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aegis-blue/5 to-aegis-teal/5 flex flex-col items-center justify-center p-6">
      {/* Header with Logo and Team Aegis Button */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-montserrat text-2xl font-bold text-aegis-blue">
              Aegis<span className="text-aegis-accent">Whistle</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white">
              Follow-up
            </Button>
            <Button className="bg-aegis-accent hover:bg-aegis-blue">
              Team Aegis Login
            </Button>
          </div>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="mt-20 mb-16 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-aegis-blue mb-6">
          Speak Up. Stay Safe.
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Share your concerns confidentially with our empathetic AI agent
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Voice Component */}
          <Card className="border-2 border-aegis-accent/20 hover:border-aegis-accent/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-6 w-6 text-aegis-accent" />
                Voice Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Speak naturally with our AI agent. Your voice is transcribed and summarized - never recorded.
              </p>
              <Button
                onClick={isCallActive ? endVapiCall : startVapiCall}
                size="lg"
                className={`w-full ${
                  isCallActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-aegis-accent hover:bg-aegis-blue text-white'
                }`}
              >
                {isCallActive ? (
                  <>
                    <MicOff className="mr-2 h-5 w-5" />
                    End Call
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-5 w-5" />
                    Start Voice Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Write Component */}
          <Card className="border-2 border-aegis-blue/20 hover:border-aegis-blue/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-aegis-blue" />
                Written Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Prefer to type? Document your concerns through our secure written form.
              </p>
              <Button
                onClick={() => setShowWriteModal(true)}
                size="lg"
                variant="outline"
                className="w-full border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
              >
                <FileText className="mr-2 h-5 w-5" />
                Write Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dashboard Indicators */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-aegis-blue">24</div>
            <div className="text-sm text-gray-600">Open Complaints</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Resolved Cases</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-aegis-accent">$48K</div>
            <div className="text-sm text-gray-600">Rewards Issued</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$92K</div>
            <div className="text-sm text-gray-600">Bounty Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VapiVoiceAgent;
