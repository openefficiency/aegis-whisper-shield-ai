
import { Shield, MessageCircle, Database, Flag } from 'lucide-react';

const featuresList = [
  {
    icon: <MessageCircle className="h-10 w-10 text-aegis-accent" />,
    title: "Empathetic AI Assistant",
    description: "Our non-judgmental AI guides reporters through the process, ensuring psychological safety while capturing comprehensive details.",
  },
  {
    icon: <Shield className="h-10 w-10 text-aegis-accent" />,
    title: "Secure & Anonymous",
    description: "Industry-leading encryption and anonymity options protect whistleblowers' identities while preserving the integrity of their reports.",
  },
  {
    icon: <Database className="h-10 w-10 text-aegis-accent" />,
    title: "Blockchain Anchored",
    description: "All reports are immutably anchored to blockchain technology, creating an unalterable record that prevents tampering or deletion.",
  },
  {
    icon: <Flag className="h-10 w-10 text-aegis-accent" />,
    title: "Transparent Rewards",
    description: "Our platform features a structured rewards system that fairly compensates whistleblowers based on report impact and accuracy.",
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-aegis-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-aegis-blue mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AegisWhistle transforms corporate integrity with cutting-edge AI and blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="font-montserrat text-xl font-bold text-aegis-blue mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
