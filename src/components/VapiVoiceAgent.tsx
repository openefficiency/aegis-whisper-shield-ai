
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    vapi: {
      start: (assistantId: string) => void;
      stop: () => void;
      isSessionActive: () => boolean;
      on: (event: string, callback: (data: any) => void) => void;
    };
  }
}

const VapiVoiceAgent = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize VAPI event listeners
    if (typeof window !== 'undefined' && window.vapi) {
      window.vapi.on('call-start', () => {
        console.log('VAPI call started');
        setIsCallActive(true);
        setIsLoading(false);
      });

      window.vapi.on('call-end', async (data: any) => {
        console.log('VAPI call ended', data);
        setIsCallActive(false);
        setIsLoading(false);
        
        // Handle the transcript/summary from VAPI
        if (data.transcript || data.summary) {
          await handleComplaintSubmission(data);
        }
      });

      window.vapi.on('error', (error: any) => {
        console.error('VAPI error:', error);
        setIsCallActive(false);
        setIsLoading(false);
        toast({
          title: "Voice Error",
          description: "There was an issue with the voice connection. Please try again.",
          variant: "destructive",
        });
      });
    }
  }, []);

  const generateReportId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `WR-${timestamp}-${random}`;
  };

  const handleComplaintSubmission = async (vapiData: any) => {
    try {
      const newReportId = generateReportId();
      
      // Extract key information from VAPI data
      const summary = vapiData.summary || vapiData.transcript || "Voice complaint submitted";
      const title = extractTitle(summary) || "Voice Complaint";
      const category = detectCategory(summary) || "General";

      // Save to database
      const { error } = await supabase
        .from('complaints')
        .insert({
          report_id: newReportId,
          title: title,
          summary: summary,
          category: category,
          status: 'open',
          company_subdomain: 'company'
        });

      if (error) throw error;

      setReportId(newReportId);
      toast({
        title: "Report Submitted Successfully",
        description: `Your report ID is: ${newReportId}. Please save this for follow-up.`,
      });

    } catch (error) {
      console.error('Error saving complaint:', error);
      toast({
        title: "Submission Error",
        description: "Failed to save your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const extractTitle = (text: string): string => {
    // Simple title extraction - take first 50 characters or until first period
    const firstSentence = text.split('.')[0];
    return firstSentence.length > 50 ? firstSentence.substring(0, 50) + '...' : firstSentence;
  };

  const detectCategory = (text: string): string => {
    const categories = {
      'harassment': ['harassment', 'harass', 'discriminat', 'hostile', 'bullying'],
      'financial': ['money', 'fraud', 'financial', 'accounting', 'budget', 'expense'],
      'safety': ['safety', 'dangerous', 'unsafe', 'injury', 'accident', 'hazard'],
      'ethics': ['ethics', 'unethical', 'corrupt', 'bribe', 'kickback']
    };

    const lowerText = text.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return category.charAt(0).toUpperCase() + category.slice(1);
      }
    }
    
    return 'General';
  };

  const startVapiCall = () => {
    if (typeof window !== 'undefined' && window.vapi) {
      setIsLoading(true);
      try {
        window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
      } catch (error) {
        console.error('Failed to start VAPI call:', error);
        setIsLoading(false);
        toast({
          title: "Connection Error",
          description: "Failed to start voice agent. Please refresh the page and try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Voice Agent Unavailable",
        description: "Voice agent is not loaded. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  const endVapiCall = () => {
    if (typeof window !== 'undefined' && window.vapi) {
      window.vapi.stop();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aegis-blue/5 to-aegis-teal/5 flex flex-col items-center justify-center p-6">
      {/* Main Voice Interface */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-aegis-blue mb-6">
          Speak Up. Stay Safe.
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Share your concerns confidentially with our empathetic AI agent
        </p>

        {reportId && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 rounded-lg">
            <h3 className="font-bold text-green-800">Report Submitted Successfully!</h3>
            <p className="text-green-700">Your Report ID: <strong>{reportId}</strong></p>
            <p className="text-sm text-green-600">Please save this ID for future reference and follow-up.</p>
          </div>
        )}

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
                disabled={isLoading}
                className={`w-full ${
                  isCallActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-aegis-accent hover:bg-aegis-blue text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : isCallActive ? (
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
                size="lg"
                variant="outline"
                className="w-full border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
                disabled
              >
                <FileText className="mr-2 h-5 w-5" />
                Write Report (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Message */}
        {isCallActive && (
          <div className="mb-8 p-4 bg-blue-100 border border-blue-400 rounded-lg">
            <p className="text-blue-800 font-medium">
              🎤 Voice agent is active. Speak naturally about your concerns.
            </p>
          </div>
        )}
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
