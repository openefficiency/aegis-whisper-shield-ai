
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-montserrat text-4xl font-bold text-aegis-blue mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: May 18, 2025</p>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the AegisWhistle platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">2. Description of Service</h2>
              <p>
                AegisWhistle provides a secure, anonymous platform for reporting fraud, waste, abuse, and other ethical concerns within organizations. Our service uses AI assistant technology and blockchain verification to ensure secure and tamper-proof reporting.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">3. User Responsibilities</h2>
              <p>
                When using our service, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide truthful information in your reports</li>
                <li>Not use the platform to make knowingly false accusations</li>
                <li>Not attempt to compromise the security of the platform</li>
                <li>Not use the platform for any illegal purpose</li>
                <li>Maintain the confidentiality of your account credentials (if applicable)</li>
              </ul>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">4. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the AegisWhistle platform, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of AegisWhistle and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">5. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL AEGISWHISTLE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. If we make changes, we will provide notice by updating the date at the top of these terms and by maintaining a current version of the terms at [website URL].
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: <a href="mailto:legal@aegiswhistle.com" className="text-aegis-accent hover:underline">legal@aegiswhistle.com</a><br />
                Address: 123 Transparency Avenue, San Francisco, CA 94105, United States
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
