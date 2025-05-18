
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6">
          <h1 className="font-montserrat text-4xl font-bold text-aegis-blue mb-6">About AegisWhistle</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            AegisWhistle is revolutionizing how organizations handle whistleblowing with AI-powered, blockchain-anchored reporting that protects both reporters and organizations.
          </p>
          
          <div className="mb-16">
            <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We're on a mission to transform corporate integrity by empowering whistleblowers and organizations with secure, empathetic technology that encourages accountability and transparency.
            </p>
            <p className="text-gray-600 mb-6">
              AegisWhistle provides a platform where reporting wrongdoing is safe, secure, and effective—protecting both the individual and the organization from harm while promoting ethical business practices.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mb-4">Our Approach</h2>
            <p className="text-gray-600 mb-6">
              We've combined cutting-edge AI with blockchain verification to create a whistleblowing platform that:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Provides psychological safety through empathetic AI interactions</li>
              <li>Ensures complete anonymity and security for whistleblowers</li>
              <li>Creates immutable records through blockchain anchoring</li>
              <li>Facilitates fair, transparent rewards for valuable reports</li>
              <li>Streamlines the investigation process while maintaining integrity</li>
            </ul>
          </div>
          
          <div className="mb-16">
            <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mb-4">Join Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Whether you're an organization committed to ethical practices or an individual wanting to report wrongdoing, AegisWhistle provides the tools you need to make a difference.
            </p>
            <Button asChild className="bg-aegis-accent hover:bg-aegis-blue text-white">
              <a href="https://secure-whisper-reports.lovable.app/ai-assistant">Support Our Pilot</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
