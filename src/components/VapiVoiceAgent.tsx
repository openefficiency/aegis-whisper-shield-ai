
import VapiIframe from './VapiIframe';

const VapiVoiceAgent = () => {
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

        <VapiIframe />
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
